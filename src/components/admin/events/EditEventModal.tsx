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
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) return;
    setForm({
      title: data.title,
      description: data.description || "",
      date: new Date(data.date).toISOString().split("T")[0], // YYYY-MM-DD format for input
    });
  }, [data]);

  if (!data) return null;

  const handleSave = async () => {
    if (!form.title || !form.date) {
      alert("Title and date are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          date: new Date(form.date),
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update");

      setData(null);
      refreshEvents();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>

        <div className="space-y-3">
          <input
            className="border w-full p-2 rounded-lg"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="border w-full p-2 rounded-lg"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="date"
            className="border w-full p-2 rounded-lg"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            className="px-4 py-2"
            onClick={() => setData(null)}
            disabled={loading}
          >
            Cancel
          </button>
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
