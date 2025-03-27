// Pfad: frontend/my-app/pages/api/auth/login.js

import userStore from '@/lib/userStore';
import jwt from 'jsonwebtoken'; // ⬅️ Token-Generierung hinzugefügt

const SECRET = "Geheim_Key_1234"; // ⬅️ Gleicher Key wie im Backend

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await userStore.authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ⬇️ Token generieren
    const token = jwt.sign({ user }, SECRET, { expiresIn: "1h" });

    // ⬇️ Token wird mit dem User-Objekt zurückgegeben
    return res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token // ⬅️ wichtig für späteren Zugriff!
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
