import nano from "nano";

const couchDBUrl = "http://admin:passwort1234@127.0.0.1:5984";
const couch = nano(couchDBUrl);
const eventDB = couch.use("events");

// Datenbank abrufen oder erstellen
async function getDatabase(dbName) {
  try {
    const dbs = await couch.db.list();
    if (!dbs.includes(dbName)) {
      await couch.db.create(dbName);
      console.log(`Datenbank "${dbName}" wurde erstellt.`);
    }
    return couch.use(dbName);
  } catch (err) {
    console.error(`Fehler beim Zugriff auf die Datenbank "${dbName}": ${err.message}`);
    throw err;
  }
}

// Datenbank-Initialisierung
export async function init() {
  try {
    const dbs = await couch.db.list();
    
    // Events Datenbank
    if (!dbs.includes("events")) {
      await couch.db.create("events");
      console.log("Events-Datenbank erstellt");
    }
    
    // Users Datenbank
    if (!dbs.includes("users")) {
      await couch.db.create("users");
      console.log("Users-Datenbank erstellt");
      
      const usersDB = couch.use("users");
      await usersDB.createIndex({
        index: { fields: ["email"] },
        name: "email-index"
      });
      console.log("Email-Index für Users erstellt");
    }

    // Bookings Datenbank
    if (!dbs.includes("bookings")) {
      await couch.db.create("bookings");
      console.log("Bookings-Datenbank erstellt");
      
      const bookingsDB = couch.use("bookings");
      await bookingsDB.createIndex({
        index: { fields: ["user_id", "type"] },
        name: "user-type-index"
      });
      console.log("User-Type-Index für Bookings erstellt");
    }
  } catch (err) {
    console.error("Fehler bei Datenbank-Initialisierung:", err.message);
  }
}

export { eventDB, getDatabase };