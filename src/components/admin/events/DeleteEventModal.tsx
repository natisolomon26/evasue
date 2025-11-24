"use client";

import { motion } from "framer-motion";
import { EventType } from "@/types/events";

interface DeleteEventModalProps {
  data: EventType | null;
  setData: (value: EventType | null) => void;
  refreshEvents: () => void;
}

export default function DeleteEventModal({ data, setData, refreshEvents }: DeleteEventModalProps) {
  if (!data) return null;

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/events/${data.id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to delete");

      setData(null);
      refreshEvents();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl w-[350px]"
      >
        <h2 className="text-xl font-bold mb-3">Delete Event</h2>
        <p className="text-gray-600">
          Are you sure you want to delete <b>{data.title}</b>?
        </p>

        <div className="flex justify-end mt-5 gap-3">
          <button className="px-4 py-2" onClick={() => setData(null)} disabled={false}>
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
