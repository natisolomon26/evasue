"use client";

import { useEffect, useState } from "react";
import { EventType } from "@/types/events";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";

export default function EventsTable() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const [editData, setEditData] = useState<EventType | null>(null);
  const [deleteData, setDeleteData] = useState<EventType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const [view, setView] = useState<"events" | "registrations">("events");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(false);

  // Fetch all events
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

  // Fetch registrations for a selected event
  const fetchRegistrations = async (eventId: string) => {
    setLoadingRegs(true);
    try {
      const res = await fetch(`/api/events/${eventId}/register`);
      const data = await res.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch registrations");
    } finally {
      setLoadingRegs(false);
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

  const handleSelectEvent = (event: EventType) => {
    setSelectedEvent(event);
    setView("registrations");
    fetchRegistrations(event._id);
  };

  return (
    <div className="border rounded-xl p-4">
      {/* Toggle + Actions */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-xl ${
              view === "events" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("events")}
          >
            Events
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${
              view === "registrations" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              if (!selectedEvent) return alert("Select an event first");
              setView("registrations");
              fetchRegistrations(selectedEvent._id);
            }}
          >
            Registrations
          </button>
        </div>

        {view === "events" && (
          <button
            className="bg-black text-white px-4 py-2 rounded-xl"
            onClick={() => setOpenCreate(true)}
          >
            + Create Event
          </button>
        )}
      </div>

      {/* TABLE */}
      {view === "events" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Event Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Registrations</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading events...
                  </td>
                </tr>
              ) : events.length > 0 ? (
                events.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-3">{item.title}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{getStatus(item.date)}</td>
                    <td>
                      <button
                        className="text-blue-600 underline"
                        onClick={() => handleSelectEvent(item)}
                      >
                        {item.registrations?.length || 0} Registrations
                      </button>
                    </td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>User ID</th>
                <th>Answers</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {loadingRegs ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    Loading registrations...
                  </td>
                </tr>
              ) : registrations.length > 0 ? (
                registrations.map((r) => (
                  <tr key={r.userId} className="border-b">
                    <td>{r.userId}</td>
                    <td>
                      {Object.entries(r.answers).map(([k, v]) => (
                        <div key={k}>
                          <b>{k}</b>: {v}
                        </div>
                      ))}
                    </td>
                    <td>{new Date(r.registeredAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No registrations
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODALS */}
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
