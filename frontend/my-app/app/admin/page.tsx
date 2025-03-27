"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "../../lib/authUtils";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  capacity: number;
  available_seats: number;
  date: string;
  location: string;
  type: string;
  short_description: string;
  long_description: string;
  tags: string[];
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  // Form fields for editing
  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [tags, setTags] = useState("");

  const eventTypes = ["Konzert", "Sport", "Networking", "Workshop", "Weiterbildung"];

  useEffect(() => {
    // Check if user is admin, if not redirect to home
    if (!isAdmin()) {
      router.push("/");
      return;
    }
    
    fetchEvents();
  }, [router]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/events");
      if (!response.ok) throw new Error("Fehler beim Abrufen der Events");
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setCapacity(event.capacity.toString());
    setDate(event.date);
    setLocation(event.location);
    setType(event.type);
    setShortDescription(event.short_description);
    setLongDescription(event.long_description);
    setTags(event.tags ? event.tags.join(", ") : "");
    setIsEditMode(true);
  };

  const handleDeleteClick = async (eventId: string) => {
    if (!confirm("Sind Sie sicher, dass Sie dieses Event löschen möchten?")) {
      return;
    }

    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;
    const token = userData ? userData.token : null;

    try {
      const response = await fetch(`http://127.0.0.1:3001/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Fehler beim Löschen des Events");
      }

      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      alert("Event erfolgreich gelöscht!");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unbekannter Fehler");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;
    const token = userData ? userData.token : null;

    const eventCapacity = parseInt(capacity.trim(), 10);

    const updatedEventData = {
      title: title.trim(),
      capacity: eventCapacity,
      available_seats: Math.min(eventCapacity, selectedEvent.available_seats), // Don't exceed new capacity
      date,
      location: location.trim(),
      type: type.trim(),
      short_description: shortDescription.trim(),
      long_description: longDescription.trim(),
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await fetch(`http://127.0.0.1:3001/events/${selectedEvent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Fehler beim Aktualisieren des Events");
      }

      // Update event in local state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === selectedEvent._id ? { ...event, ...updatedEventData } : event
        )
      );

      setIsEditMode(false);
      setSelectedEvent(null);
      alert("Event erfolgreich aktualisiert!");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unbekannter Fehler");
    }
  };

  if (loading) {
    return (
      <div className="container mt-8">
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>Lädt...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link href="/" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Zurück zur Hauptseite
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <p>{error}</p>
        </div>
      )}

      {isEditMode && selectedEvent ? (
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Event bearbeiten: {selectedEvent.title}</h2>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Titel</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium">Kapazität</label>
              <input
                id="capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="1"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium">Datum</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium">Ort</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium">Kategorie</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Bitte wählen</option>
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium">Kurzbeschreibung</label>
              <input
                id="shortDescription"
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="longDescription" className="block text-sm font-medium">Eventbeschreibung</label>
              <textarea
                id="longDescription"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                required
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium">Tags (durch Komma getrennt)</label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Aktualisieren
              </button>
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Event Management</h2>
          <p className="text-gray-600 mb-4">Hier können Sie Events bearbeiten oder löschen.</p>
          <Link href="/" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 inline-block">
            Neues Event erstellen
          </Link>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Titel</th>
              <th className="py-2 px-4 border-b text-left">Datum</th>
              <th className="py-2 px-4 border-b text-left">Ort</th>
              <th className="py-2 px-4 border-b text-center">Kapazität</th>
              <th className="py-2 px-4 border-b text-center">Verfügbar</th>
              <th className="py-2 px-4 border-b text-center">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-center">Keine Events verfügbar.</td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{event.title}</td>
                  <td className="py-2 px-4 border-b">{event.date}</td>
                  <td className="py-2 px-4 border-b">{event.location}</td>
                  <td className="py-2 px-4 border-b text-center">{event.capacity}</td>
                  <td className="py-2 px-4 border-b text-center">{event.available_seats}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditClick(event)}
                        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDeleteClick(event._id)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}