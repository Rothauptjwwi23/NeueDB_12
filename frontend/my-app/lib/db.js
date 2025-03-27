import nano from "nano";

// CouchDB-Verbindung
const couchDBUrl = "http://admin:passwort1234@127.0.0.1:5984";
const couch = nano(couchDBUrl);

// Funktion zum Abrufen einer Datenbank (oder Erstellen, falls sie nicht existiert)
export async function getDatabase(dbName) {
  try {
    const dbs = await couch.db.list();
    if (!dbs.includes(dbName)) {
      await couch.db.create(dbName);
      console.log(`✅ Datenbank "${dbName}" wurde erstellt.`);
    }
    return couch.use(dbName);
  } catch (err) {
    console.error(`❌ Fehler beim Zugriff auf die Datenbank "${dbName}": ${err.message}`);
    throw err;
  }
}

// Datenbanken initialisieren
export async function initializeDatabases() {
  try {
    const dbs = await couch.db.list();
    
    // Users Datenbank
    if (!dbs.includes("users")) {
      await couch.db.create("users");
      console.log(`✅ Datenbank "users" wurde erstellt.`);
      
      // Indizes für die users Datenbank erstellen (für email Suche)
      const usersDb = couch.use("users");
      await usersDb.createIndex({
        index: { fields: ["email"] },
        name: "email-index"
      });
    }
  } catch (err) {
    console.error(`❌ Fehler beim Erstellen der Datenbanken: ${err.message}`);
  }
}

// Führe die Initialisierung aus
initializeDatabases().catch(console.error);