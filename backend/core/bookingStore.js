import { getDatabase } from "./db.js";
import { bookEvent } from "./eventStore.js";

let bookingsDb = null;
let eventsDb = null;

// Initialize databases connection
const initializeDatabases = async () => {
  if (!bookingsDb || !eventsDb) {
    try {
      bookingsDb = await getDatabase("bookings");
      eventsDb = await getDatabase("events");
      
      // Create index if it doesn't exist
      await bookingsDb.createIndex({
        index: { fields: ["user_id", "type"] },
        name: "user-type-index"
      }).catch(() => console.log("Index already exists"));
      
    } catch (error) {
      console.error("Database initialization error:", error);
      throw error;
    }
  }
  return { bookingsDb, eventsDb };
};

// Buchung erstellen
export const addBooking = async (user_id, event_id, seats = 1) => {
  await initializeDatabases();

  const booking = {
    user_id,
    event_id,
    seats,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    type: "booking",
  };

  try {
    const eventResult = await bookEvent(event_id, seats);
    if (!eventResult.success) {
      throw new Error(eventResult.error);
    }

    const result = await bookingsDb.insert(booking);
    const event = await eventsDb.get(event_id);
    
    return { ...booking, _id: result.id, event };
  } catch (error) {
    console.error("Fehler bei Buchungserstellung:", error);
    throw error;
  }
};

// Get bookings for a user
export const getBookingsByUser = async (user_id) => {
  try {
    const { bookingsDb, eventsDb } = await initializeDatabases();
    
    const result = await bookingsDb.find({
      selector: {
        user_id: { "$eq": user_id },
        type: { "$eq": "booking" }
      },
      use_index: "user-type-index"
    });

    // No bookings found
    if (!result.docs || result.docs.length === 0) {
      return [];
    }

    // Get event details for each booking
    const enrichedBookings = await Promise.all(
      result.docs.map(async (booking) => {
        try {
          const event = await eventsDb.get(booking.event_id);
          return { ...booking, event };
        } catch (err) {
          console.warn(`Event ${booking.event_id} not found for booking ${booking._id}`);
          return booking;
        }
      })
    );

    return enrichedBookings;
  } catch (error) {
    console.error("Error in getBookingsByUser:", error);
    throw new Error("Fehler beim Abrufen der Buchungen");
  }
};

