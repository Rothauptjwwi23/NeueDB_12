"use client";

import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  type: string;
  capacity: number;
  location: string;
  long_description: string;
  date: string;
}

interface Booking {
  _id: string;
  event_id: string;
  seats: number;
  status: string;
  createdAt: string;
  event?: Event;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedBookingIds, setExpandedBookingIds] = useState<string[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      console.log("Stored user data:", storedUser); // Debug log

      if (!storedUser) {
        setError("Bitte melde dich an, um deine Buchungen zu sehen.");
        return;
      }

      const userData = JSON.parse(storedUser);
      if (!userData.token) {
        setError("Ungültige Anmeldedaten. Bitte erneut einloggen.");
        return;
      }

      const res = await fetch("http://127.0.0.1:3001/bookings/me", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("user");
          setError("Sitzung abgelaufen. Bitte erneut anmelden.");
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || "Fehler beim Abrufen der Buchungen");
        }
        return;
      }

      const data = await res.json();
      console.log("Received bookings data:", data); // Debug log
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Booking fetch error:", err);
      setError(err instanceof Error ? err.message : "Ein unerwarteter Fehler ist aufgetreten");
    }
  };

  const toggleDetails = (bookingId: string) => {
    setExpandedBookingIds((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  return (
    <div className="container">
      <h2>Meine Buchungen</h2>

      {error && <p className="error-message">{error}</p>}

      {bookings.length === 0 && !error ? (
        <p>Keine Buchungen vorhanden.</p>
      ) : (
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          {bookings.map((b) => (
            <div
              key={b._id}
              className="card"
              style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            >
              <h3 style={{ wordBreak: "break-word" }}>
                Buchung:<br />
                <span style={{ fontWeight: 500 }}>{b._id}</span>
              </h3>
              <p><strong>Sitzplätze:</strong> {b.seats}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <p><strong>Gebucht am:</strong> {new Date(b.createdAt).toLocaleString()}</p>

              {b.event && (
                <button className="book-button" onClick={() => toggleDetails(b._id)}>
                  {expandedBookingIds.includes(b._id)
                    ? "Details ausblenden"
                    : "Eventdetails anzeigen"}
                </button>
              )}

              {expandedBookingIds.includes(b._id) && b.event && (
                <div
                  className="event-details"
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    borderRadius: "10px",
                    backgroundColor: "#1f2937",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e5e7eb",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem"
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.5rem 1.5rem",
                    }}
                  >
                    <p><strong>Titel:</strong> {b.event.title}</p>
                    <p><strong>Typ:</strong> {b.event.type}</p>
                    <p><strong>Kapazität:</strong> {b.event.capacity}</p>
                    <p><strong>Ort:</strong> {b.event.location}</p>
                    <p><strong>Datum:</strong> {new Date(b.event.date).toLocaleDateString()}</p>
                  </div>

                  <div style={{ marginTop: "0.5rem" }}>
                    <p><strong>Beschreibung:</strong></p>
                    <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {b.event.long_description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
