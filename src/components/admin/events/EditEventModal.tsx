"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { EventType } from "@/types/events";

interface EditEventModalProps {
  data: EventType | null;
  setData: (value: EventType | null) => void;
  refreshEvents: () => void;
}

export default function EditEventModal({ data, setData, refreshEvents }: EditEventModalProps) {
  const [form, setForm] = useState({ name: "", date: "", status: "Open" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) return;
    setForm({ name: data.name, date: data.date, status: data.status });
  }, [data]);

  if (!data) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.name,
          description: form.name,
          eventDate: form.date,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update");

      setData(null);
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
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>

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
          <button className="px-4 py-2" onClick={() => setData(null)}>Cancel</button>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
