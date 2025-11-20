// app/events/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  createdBy: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data.events);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <div key={event._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">
              Date: {new Date(event.eventDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
