"use client";

import { useState } from "react";
import { EventType } from "@/types/events";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";

interface EventsTableProps {
  events: EventType[];
  loading: boolean;
  refreshEvents: () => void;
  onCreateClick: () => void;
}

export default function EventsTable({ events, loading, refreshEvents, onCreateClick }: EventsTableProps) {
  const [editData, setEditData] = useState<EventType | null>(null);
  const [deleteData, setDeleteData] = useState<EventType | null>(null);

  return (
    <div className="border rounded-xl p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">All Events</h2>

        <button
          className="bg-black text-white px-4 py-2 rounded-xl"
          onClick={onCreateClick}
        >
          + Create Event
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Event Name</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3">{item.name}</td>
                <td>{item.date}</td>
                <td>{item.status}</td>

                <td className="text-right space-x-2">
                  <button
                    className="text-blue-600"
                    onClick={() => setEditData(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600"
                    onClick={() => setDeleteData(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <EditEventModal data={editData} setData={setEditData} refreshEvents={refreshEvents} />
      <DeleteEventModal data={deleteData} setData={setDeleteData} refreshEvents={refreshEvents} />
    </div>
  );
}
