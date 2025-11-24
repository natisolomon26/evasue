"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventsTable from "@/components/admin/events/EventsTable";
import CreateEventModal from "@/components/admin/events/CreateEventModal";
import EventStatsCards from "@/components/admin/events/EventsStatsCards"; // imported
import { EventType } from "@/types/events";

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setEvents(data.events.map((e: any) => ({
        id: e._id,
        name: e.title,
        description: e.description,
        date: new Date(e.eventDate).toLocaleDateString(),
        status: "Open",
      })));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
  (async () => {
    await fetchEvents();
  })();
}, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
      </div>

      {/* Stats Cards */}
      <EventStatsCards events={events} />

      {/* Events Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <EventsTable
          events={events}
          refreshEvents={fetchEvents}
          onCreateClick={() => setOpenCreate(true)}
          loading={loading}
        />
      </motion.div>

      {/* Create Event Modal */}
      <CreateEventModal
        open={openCreate}
        setOpen={setOpenCreate}
        refreshEvents={fetchEvents}
      />
    </div>
  );
}
