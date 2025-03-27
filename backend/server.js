import dotenv from "dotenv";
import Fastify from 'fastify';
import cors from '@fastify/cors';
import eventRoutes from './roots/eventRoutes.js';
import { init as initDb } from './core/db.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

dotenv.config();
console.log("Server starting...");

const fastify = Fastify({ logger: true });

// Kill existing process on port 3001 (Windows)
async function killPort(port) {
  try {
    if (process.platform === "win32") {
      await execAsync(`netstat -ano | findstr :${port}`).then(async ({ stdout }) => {
        const pid = stdout.split(/\s+/)[4];
        if (pid) {
          await execAsync(`taskkill /F /PID ${pid}`);
          console.log(`Killed process on port ${port}`);
        }
      });
    }
  } catch (err) {
    // Ignore errors - port might not be in use
  }
}

// Initialize server
const startServer = async () => {
  try {
    // Initialize databases
    await initDb();

    // Configure CORS
    fastify.register(cors, {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });

    // Register routes
    fastify.register(eventRoutes);

    // Kill existing process on port 3001
    await killPort(3001);

    // Start server
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Server running on http://localhost:3001");
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await fastify.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  await fastify.close();
  process.exit(0);
});

// Start server
startServer();