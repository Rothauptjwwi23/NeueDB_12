"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface IEvent {
  _id: string;
  title: string;
  capacity: number;
  available_seats: number;
  date: string;
  location: string;
  type: string;
  short_description: string;
  long_description: string;
  tags?: string[];
}

export default function SingleEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [eventData, setEventData] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'booking' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!id) return;
    fetchSingleEvent();
  }, [id]);

  async function fetchSingleEvent() {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:3001/events/${id}`);
      if (!res.ok) {
        throw new Error("Fehler beim Abrufen des Events");
      }
      const data = await res.json();
      setEventData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  async function bookEvent() {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Bitte melde dich an, um Events zu buchen.");
      router.push("/auth/login");
      return;
    }

    const token = JSON.parse(user).token;
    if (!eventData) return;

    setBookingStatus("booking");
    try {
      const response = await fetch("http://127.0.0.1:3001/events/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: eventData._id }),
      });

      const data = await response.json();
      if (response.ok) {
        setBookingStatus("success");
        setEventData((prev) =>
          prev
            ? {
                ...prev,
                available_seats: prev.available_seats - 1,
              }
            : null
        );
        alert("Buchung erfolgreich! Eine Bestätigungsmail wurde an Sie verschickt.");
      } else {
        setBookingStatus("error");
        alert(data.error || "Buchung fehlgeschlagen");
      }
    } catch (error) {
      setBookingStatus("error");
      console.error("Buchungsfehler:", error);
      alert("Ein Fehler ist aufgetreten");
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="spinner"></div>
        <p className="text-gray-300 mt-4">Event wird geladen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-400">Fehler: {error}</p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-300">Kein Event gefunden.</p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <div className="event-detail-page container mx-auto max-w-2xl px-4 py-8">
      <div className="bg-card-bg rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-white">{eventData.title}</h1>

        <div className="event-meta grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400">
              <strong>Datum:</strong> {new Date(eventData.date).toLocaleDateString()}
            </p>
            <p className="text-gray-400">
              <strong>Ort:</strong> {eventData.location}
            </p>
            <p className="text-gray-400">
              <strong>Kategorie:</strong> {eventData.type}
            </p>
          </div>
          <div>
            <p className="text-gray-400">
              <strong>Kapazität:</strong> {eventData.capacity}
            </p>
            <p className="text-gray-400">
              <strong>Verfügbare Plätze:</strong> {eventData.available_seats}
            </p>
            {eventData.tags && eventData.tags.length > 0 && (
              <div className="mt-2">
                <strong className="text-gray-400 block mb-1">Tags:</strong>
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-200 text-sm px-3 py-1 rounded-xl shadow-sm hover:bg-gray-700 transition-colors duration-200"
                    >
                      #{tag.trim().toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="event-description mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">Beschreibung</h2>
          <p className="text-gray-300">{eventData.long_description}</p>
        </div>

        <button
          onClick={bookEvent}
          disabled={eventData.available_seats === 0 || bookingStatus === "booking"}
          className={`w-full p-3 rounded-lg transition-colors ${
            eventData.available_seats === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-secondary text-white"
          } ${bookingStatus === "booking" ? "opacity-50" : ""}`}
        >
          {eventData.available_seats === 0
            ? "Ausgebucht"
            : bookingStatus === "booking"
            ? "Wird gebucht..."
            : "Jetzt buchen"}
        </button>
      </div>
    </div>
  );
}
