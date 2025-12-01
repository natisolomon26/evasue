"use client";

import { useEffect, useState } from "react";
import { EventType } from "@/types/events";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";
import RegistrationsView from "./RegistrationView";

export default function EventsTable() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "past">("all");

  const [editData, setEditData] = useState<EventType | null>(null);
  const [deleteData, setDeleteData] = useState<EventType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  const [view, setView] = useState<"events" | "registrations">("events");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  // Fetch all events from backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();

      // Backend returns a plain array, not { events: [...] }
      setEvents(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events from backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events based on search and status
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const isActive = new Date(event.date) > new Date();
    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "active" && isActive) ||
      (statusFilter === "past" && !isActive);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      date: d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const getStatus = (dateStr: string) => {
    const isActive = new Date(dateStr) > new Date();
    return {
      text: isActive ? "Active" : "Past",
      color: isActive ? "text-green-600 bg-green-100" : "text-gray-600 bg-gray-100",
    };
  };

  const handleSelectEvent = (event: EventType) => {
    setSelectedEvent(event);
    setView("registrations");
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setView("events");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold mb-2">Event Management</h1>
            <p className="text-blue-100">Manage your events and track registrations</p>
          </div>
          <div className="flex gap-3">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === "events" ? "bg-white text-blue-600" : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
              onClick={() => setView("events")}
            >
              📅 Events
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === "registrations" ? "bg-white text-blue-600" : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
              onClick={() => {
                if (!selectedEvent && view !== "registrations") {
                  return alert("Select an event first");
                }
                setView("registrations");
              }}
              disabled={!selectedEvent && view !== "registrations"}
            >
              👥 Registrations
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {view === "events" ? (
          <>
            {/* Filters and Create Button */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "past")}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Events</option>
                  <option value="active">Active</option>
                  <option value="past">Past</option>
                </select>
              </div>

              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                onClick={() => setOpenCreate(true)}
              >
                <span>+</span>
                Create Event
              </button>
            </div>

            {/* Events Table */}
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Event</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Date & Time</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Registrations</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => {
                        const { date, time } = formatDate(event.date);
                        const status = getStatus(event.date);

                        return (
                          <tr key={event._id} className="hover:bg-gray-100 transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-semibold text-gray-900">{event.title}</div>
                                {event.description && (
                                  <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {event.description}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{date}</div>
                              <div className="text-sm text-gray-500">{time}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                {status.text}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleSelectEvent(event)}
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                              >
                                <span>👥</span>
                                {event.registrations?.length ?? 0} Registered
                              </button>
                            </td>
                            <td className="px-6 py-4 flex gap-3">
                              <button onClick={() => setEditData(event)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">✏️ Edit</button>
                              <button onClick={() => setDeleteData(event)} className="text-red-600 hover:text-red-800 flex items-center gap-1">🗑️ Delete</button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No events found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats */}
            {!loading && events.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                  <div className="text-sm text-blue-800">Total Events</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {events.filter(e => new Date(e.date) > new Date()).length}
                  </div>
                  <div className="text-sm text-green-800">Active Events</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">
                    {events.reduce((total, e) => total + (e.registrations?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-purple-800">Total Registrations</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <RegistrationsView
            selectedEvent={selectedEvent}
            onBack={handleBackToEvents}
          />
        )}
      </div>

      {/* Modals */}
      <CreateEventModal open={openCreate} setOpen={setOpenCreate} refreshEvents={fetchEvents} />
      <EditEventModal data={editData} setData={setEditData} refreshEvents={fetchEvents} />
      <DeleteEventModal data={deleteData} setData={setDeleteData} refreshEvents={fetchEvents} />
    </div>
  );
}
