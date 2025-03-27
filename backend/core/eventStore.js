// Pfad: my-app/backend/core/eventStore.js

import nano from "nano";
import { getDatabase } from "./db.js";

// JSDoc-Typdefinition für ein Event-Dokument
/**
 * @typedef {Object} EventDocument
 * @property {string} _id
 * @property {string} title
 * @property {number} capacity
 * @property {number} available_seats
 * @property {string} date
 * @property {string} location
 * @property {string} type
 * @property {string} short_description
 * @property {string} long_description
 * @property {string[]} [tags]
 */

const couchDBUrl = "http://admin:passwort1234@127.0.0.1:5984";
const couch = nano(couchDBUrl);
const eventDB = couch.use("events");

/**
 * Initialisiert die Datenbank "events", falls sie noch nicht existiert.
 */
async function initializeDatabases() {
  try {
    const dbs = await couch.db.list();
    if (!dbs.includes("events")) {
      await couch.db.create("events");
      console.log(`✅ Datenbank "events" wurde erstellt.`);
    }
  } catch (err) {
    console.error(`❌ Fehler beim Erstellen der Datenbank: ${err.message}`);
  }
}
initializeDatabases();

/**
 * Ruft alle Events ab.
 * @returns {Promise<EventDocument[]>} Array mit Event-Dokumenten.
 */
export const getEvents = async () => {
  const response = await eventDB.list({ include_docs: true });
  return response.rows.map((row) => row.doc);
};

/**
 * Fügt ein neues Event hinzu.
 * @param {Object} eventData - Daten für das neue Event.
 * @returns {Promise<Object>} Antwortobjekt von CouchDB.
 * @throws {Error} Falls ein erforderliches Feld fehlt.
 */
export const addEvent = async (eventData) => {
  const requiredFields = [
    "title",
    "capacity",
    "date",
    "location",
    "type",
    "short_description",
    "long_description",
  ];
  for (const field of requiredFields) {
    if (
      !eventData[field] ||
      (typeof eventData[field] === "string" && eventData[field].trim() === "")
    ) {
      throw new Error(`Feld "${field}" darf nicht leer sein.`);
    }
  }

  const newEvent = {
    title: eventData.title,
    capacity: eventData.capacity,
    available_seats: eventData.available_seats ?? eventData.capacity,
    date: eventData.date,
    location: eventData.location,
    type: eventData.type,
    short_description: eventData.short_description,
    long_description: eventData.long_description,
    tags: eventData.tags || [],
  };

  const response = await eventDB.insert(newEvent);
  return response;
};

/**
 * Bucht ein Event, indem es die verfügbaren Plätze reduziert.
 * @param {string} eventId - Die ID des Events.
 * @param {number} [seats=1] - Anzahl der zu buchenden Plätze.
 * @returns {Promise<Object>} Objekt mit Erfolgsmeldung und aktualisiertem Event oder Fehlermeldung.
 */
export const bookEvent = async (eventId, seats = 1) => {
  try {
    const event = await eventDB.get(eventId);
    if (event.available_seats >= seats) {
      event.available_seats -= seats;
      await eventDB.insert(event);
      return { success: true, updatedEvent: event };
    } else {
      return { success: false, error: "Nicht genügend freie Plätze" };
    }
  } catch (err) {
    console.error(`❌ Fehler beim Buchen: ${err.message}`);
    return { success: false, error: "Interner Fehler" };
  }
};

/**
 * Ruft ein einzelnes Event anhand der ID ab.
 * @param {string} id - Die ID des Events.
 * @returns {Promise<EventDocument|null>} Das Event-Dokument oder null, falls nicht gefunden.
 */
export const getEventById = async (id) => {
  try {
    const doc = await eventDB.get(id);
    return doc;
  } catch (err) {
    console.error("Fehler beim Abrufen eines Events nach ID:", err);
    return null;
  }
};
