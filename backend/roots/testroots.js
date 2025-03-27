import path from "path";
import { fileURLToPath } from "url";

// ✅ Konvertiere `import.meta.url` in einen Dateipfad
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { productDB } from "../core/db.js";

export default async function testroots(fastify, options) {
    // **GET-Route: Gibt alle gespeicherten Produkte zurück**
    fastify.get('/data', async (request, reply) => {
        try {
            const result = await productDB.list({ include_docs: true });
            const products = result.rows.map(row => row.doc);
            return { data: products };
        } catch (error) {
            console.error("❌ Fehler beim Abrufen der Produkte:", error);
            return reply.status(500).send({ error: "Fehler beim Abrufen der Produkte" });
        }
    });

    // **POST: Fügt ein neues Produkt hinzu**
    fastify.post('/data', async (request, reply) => {
        const { name, value } = request.body;
        if (!name || !value) {
            return reply.status(400).send({ error: 'Name und Wert sind erforderlich!' });
        }

        try {
            const newEntry = { name, value };
            const response = await productDB.insert(newEntry);
            return { message: "Daten hinzugefügt", id: response.id };
        } catch (error) {
            console.error("❌ Fehler beim Hinzufügen eines Produkts:", error);
            return reply.status(500).send({ error: "Fehler beim Hinzufügen" });
        }
    });
}
