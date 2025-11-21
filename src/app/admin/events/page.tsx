"use client";

import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Fetch all events
  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => setEvents(data.events));
  }, []);

  // Create event
  const handleCreate = async () => {
    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ title, description, eventDate }),
    });

    if (res.ok) {
      const data = await res.json();
      setEvents(prev => [data.event, ...prev]);
      setTitle("");
      setDescription("");
      setEventDate("");
      alert("Event created!");
    } else {
      alert("Error creating event");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>

      {/* Create Event Form */}
      <div className="p-4 bg-white rounded shadow mb-6">
        <h3 className="font-semibold mb-2">Create New Event</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="date"
          value={eventDate}
          onChange={e => setEventDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Event
        </button>
      </div>

      {/* Events List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <div key={event._id} className="p-4 bg-white rounded shadow">
            <h4 className="font-semibold">{event.title}</h4>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.eventDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
