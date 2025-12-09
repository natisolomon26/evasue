"use client";

import { useEffect, useState } from "react";
import EventsTable, { Event } from "@/components/admin/events/EventsTable";
import Loader from "@/components/Loader";
import CreateEventModal from "@/components/admin/events/CreateEventModal";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();

      // Ensure events is always an array
      setEvents(Array.isArray(data) ? data : data.events || []);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event: Event) => {
    alert(`Edit event: ${event.title}`);
    // You can open an edit modal here
  };

  const handleView = (event: Event) => {
    alert(`View event: ${event.title}`);
    // You can open a view modal or redirect
  };

  const handleDelete = async (event: Event) => {
    if (!confirm(`Are you sure you want to delete "${event.title}"?`)) return;
    try {
      const res = await fetch(`/api/events/${event._id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEvents();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to delete event");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Events</h1>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Event
        </button>
      </div>

      <EventsTable
        events={events}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />

      {createModalOpen && (
        <CreateEventModal
          open={createModalOpen}
          setOpen={setCreateModalOpen}
          refreshEvents={fetchEvents}
        />
      )}
    </div>
  );
}
