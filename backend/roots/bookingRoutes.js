// Pfad: my-app/backend/roots/eventRoutes.js

import { getEvents, addEvent, bookEvent, getEventById } from "../core/eventStore.js";
import jwt from "jsonwebtoken";

const checkAdminRole = async (request, reply, done) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ error: "Kein Authentifizierungstoken gefunden" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "Geheim_Key_1234");

    if (!decoded.user || decoded.user.role !== "admin") {
      return reply.status(403).send({ error: "Zugriff verweigert. Nur Administratoren können Events erstellen." });
    }
    request.user = decoded.user;
    done();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return reply.status(401).send({ error: "Ungültiges Token" });
    }
    return reply.status(500).send({ error: "Interner Serverfehler bei der Authentifizierung" });
  }
};

export default async function eventRoutes(fastify, options) {
  // Alle Events abrufen (mit Filter)
  fastify.get("/events", async (request, reply) => {
    try {
      const { search, location, date, category } = request.query;
      let events = await getEvents();

      if (search && search.trim() !== "") {
        const s = search.toLowerCase();
        events = events.filter((e) => {
          const inTitle = e.title?.toLowerCase().includes(s);
          const inLocation = e.location?.toLowerCase().includes(s);
          const inTags = Array.isArray(e.tags) && e.tags.some((tag) => tag.toLowerCase().includes(s));
          return inTitle || inLocation || inTags;
        });
      }

      if (location && location.trim() !== "") {
        const loc = location.toLowerCase();
        events = events.filter((e) => e.location?.toLowerCase().includes(loc));
      }

      if (date && date.trim() !== "") {
        events = events.filter((e) => e.date === date);
      }

      if (category && category.trim() !== "") {
        events = events.filter((e) => e.type === category);
      }

      return { events };
    } catch (error) {
      reply.status(500).send({ error: "Fehler beim Abrufen der Events" });
    }
  });

  // Einzelnes Event abrufen
  fastify.get("/events/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const event = await getEventById(id);
      if (!event) {
        return reply.status(404).send({ error: "Event nicht gefunden" });
      }
      return event;
    } catch (err) {
      console.error("Fehler beim Abrufen eines Events:", err);
      reply.status(500).send({ error: "Fehler beim Abrufen des Events" });
    }
  });

  // Neues Event erstellen
  fastify.post("/events", async (request, reply) => {
    const eventData = request.body;
    const requiredFields = ["title", "capacity", "date", "location", "type", "short_description", "long_description"];
    for (const field of requiredFields) {
      if (!eventData[field] || (typeof eventData[field] === "string" && eventData[field].trim() === "")) {
        return reply.status(400).send({ error: `Feld "${field}" darf nicht leer sein.` });
      }
    }
    try {
      const result = await addEvent(eventData);
      reply.status(201).send({ message: "Event hinzugefügt!", id: result.id });
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });

  // Buchung eines Events
  fastify.post("/events/book", async (request, reply) => {
    const { eventId } = request.body;
    if (!eventId) {
      return reply.status(400).send({ error: "Event ID erforderlich!" });
    }
    try {
      const result = await bookEvent(eventId);
      if (result.success) {
        reply.send({
          message: "Buchung erfolgreich! Ihnen wurde eine Bestätigungsmail geschickt.",
          updatedEvent: result.updatedEvent,
        });
      } else {
        reply.status(400).send({ error: result.error });
      }
    } catch (error) {
      reply.status(500).send({ error: "Fehler beim Buchen des Events" });
    }
  });
}
