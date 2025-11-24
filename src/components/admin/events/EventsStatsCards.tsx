"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: CardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl bg-white shadow-md border border-gray-200 flex flex-col gap-2"
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
    </motion.div>
  );
};

interface Event {
  _id: string;
  title: string;
  date: string;
  createdBy: string;
  // Add other fields if needed
}

export default function EventStatsCards() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Calculate stats
  const totalEvents = events.length;
  const now = new Date();
  const activeEvents = events.filter(e => new Date(e.date) > now).length;
  const pastEvents = events.filter(e => new Date(e.date) <= now).length;

  if (loading) {
    return <p>Loading event stats...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Total Events" value={totalEvents} />
      <StatCard title="Active Events" value={activeEvents} />
      <StatCard title="Past Events" value={pastEvents} />
    </div>
  );
}
