"use client";

import { useEffect, useState } from "react";
import { EventType } from "@/types/events";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";
import CreateEventModal from "./CreateEventModal";

export default function EventsTable() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<EventType | null>(null);
  const [deleteData, setDeleteData] = useState<EventType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

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

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const getStatus = (dateStr: string) => {
    return new Date(dateStr) > new Date() ? "Active" : "Past";
  };

  return (
    <div className="border rounded-xl p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">All Events</h2>

        <button
          className="bg-black text-white px-4 py-2 rounded-xl"
          onClick={() => setOpenCreate(true)}
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
              <tr key={item._id} className="border-b">
                <td className="py-3">{item.title}</td>
                <td>{formatDate(item.date)}</td>
                <td>{getStatus(item.date)}</td>

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

            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modals */}
      <CreateEventModal
        open={openCreate}
        setOpen={setOpenCreate}
        refreshEvents={fetchEvents}
      />
      <EditEventModal
        data={editData}
        setData={setEditData}
        refreshEvents={fetchEvents}
      />
      <DeleteEventModal
        data={deleteData}
        setData={setDeleteData}
        refreshEvents={fetchEvents}
      />
    </div>
  );
}
