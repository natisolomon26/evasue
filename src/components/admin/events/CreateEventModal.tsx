"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CreateEventModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refreshEvents: () => void;
}

export default function CreateEventModal({ open, setOpen, refreshEvents }: CreateEventModalProps) {
  const [form, setForm] = useState({ name: "", date: "", status: "Open" });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSave = async () => {
    if (!form.name || !form.date) return alert("Please fill all fields");

    setLoading(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.name,
          description: form.name,
          eventDate: form.date,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create event");

      setForm({ name: "", date: "", status: "Open" });
      setOpen(false);
      refreshEvents();
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4">Create Event</h2>

        <div className="space-y-3">
          <input
            className="border w-full p-2 rounded-lg"
            placeholder="Event Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="date"
            className="border w-full p-2 rounded-lg"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <select
            className="border w-full p-2 rounded-lg"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button className="px-4 py-2" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Event"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
