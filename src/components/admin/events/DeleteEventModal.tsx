"use client";

import { EventType } from "@/types/events";

interface DeleteEventModalProps {
  data: EventType | null;
  setData: (data: EventType | null) => void;
  refreshEvents: () => void;
}

export default function DeleteEventModal({ data, setData, refreshEvents }: DeleteEventModalProps) {
  if (!data) return null;

  const deleteEvent = async () => {
    try {
      const res = await fetch(`/api/events/${data._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      refreshEvents();
      setData(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Delete Event</h2>
          <button className="text-gray-600 hover:text-black text-xl" onClick={() => setData(null)}>✕</button>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-700 mb-4">Are you sure you want to delete <strong>{data.title}</strong>?</p>
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" onClick={() => setData(null)}>Cancel</button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700" onClick={deleteEvent}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
