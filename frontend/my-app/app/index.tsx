import { useEffect, useState } from "react";

const Home = () => {
  const [events, setEvents] = useState([]); // Events in den State speichern
  const [name, setName] = useState(""); // Name des Events
  const [value, setValue] = useState(""); // Wert des Events
  const [seats, setSeats] = useState(50); // Beispielwert für Sitze
  const [booked, setBooked] = useState(0); // Beispielwert für gebuchte Plätze

  // Abrufen der Events beim Laden der Seite
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/events");
      const data = await response.json();
      setEvents(data.events);  // Events in den State speichern
    } catch (error) {
      console.error("Fehler beim Abrufen der Events:", error);
    }
  };

  const addEvent = async () => {
    if (!name || !value) {
      alert("Bitte alle Felder ausfüllen");
      return;
    }
    const eventData = { name, value: parseInt(value), seats, booked };

    try {
      const response = await fetch("http://127.0.0.1:3001/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      const data = await response.json();
      if (data.message === "Event hinzugefügt!") {
        alert("Event erfolgreich hinzugefügt");
        fetchEvents();  // Nach dem Hinzufügen das Event neu laden
      } else {
        alert("Fehler beim Hinzufügen des Events");
      }
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Events:", error);
    }
  };

  const bookEvent = async (eventId: string) => { // Typisierung des eventId-Parameters
    try {
      const response = await fetch("http://127.0.0.1:3001/events/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });
      const data = await response.json();
      if (data.message === "Buchung erfolgreich!") {
        alert("Buchung erfolgreich!");
        fetchEvents();  // Nach der Buchung Events neu laden
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Fehler beim Buchen des Events:", error);
    }
  };

  return (
    <div>
      <h1>Event Buchungssystem</h1>

      <div>
        <h2>Neues Event hinzufügen</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Wert"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={addEvent}>Event hinzufügen</button>
      </div>

      <div>
        <h2>Verfügbare Events</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event: { _id: string; name: string; value: number; seats: number; booked: number }) => (
              <li key={event._id}>
                {event.name} - Wert: {event.value} - Verfügbar: {event.seats - event.booked}
                <button onClick={() => bookEvent(event._id)}>Buchen</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Keine Events verfügbar.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
