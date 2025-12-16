// app/admin/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import EventsTable, { Event } from "@/components/admin/events/EventsTable";
import Loader from "@/components/Loader";
import CreateEventModal from "@/components/admin/events/CreateEventModal";
import EditEventModal from "@/components/admin/events/EditEventModal";
import ViewEventModal from "@/components/admin/events/ViewEventModal";
import DeleteEventModal from "@/components/admin/events/DeleteEventModal";
import { 
  Plus, 
  RefreshCw, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Filter,
  Download
} from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    past: 0,
    paid: 0,
    free: 0,
    totalRegistrations: 0,
    totalRevenue: 0
  });

  const fetchEvents = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      const eventsArray = Array.isArray(data) ? data : data.events || [];
      setEvents(eventsArray);
      calculateStats(eventsArray);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const calculateStats = (eventsData: Event[]) => {
    const now = new Date();
    const statsData = {
      total: eventsData.length,
      upcoming: eventsData.filter(e => new Date(e.date) > now).length,
      past: eventsData.filter(e => new Date(e.date) <= now).length,
      paid: eventsData.filter(e => e.isPaid).length,
      free: eventsData.filter(e => !e.isPaid).length,
      totalRegistrations: eventsData.reduce((sum, e) => sum + (e.registrationsCount || 0), 0),
      totalRevenue: eventsData.reduce((sum, e) => sum + ((e.isPaid ? e.price || 0 : 0) * (e.registrationsCount || 0)), 0)
    };
    setStats(statsData);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const handleDelete = async (event: Event) => {
  setSelectedEvent(event);
  setDeleteModalOpen(true);
};

  const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    // You can replace this with a proper notification system like toast
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const exportEvents = () => {
    const csvData = events.map(event => ({
      Title: event.title,
      Date: new Date(event.date).toLocaleString(),
      Location: event.location || "N/A",
      Type: event.isPaid ? "Paid" : "Free",
      Price: event.isPaid ? `$${event.price}` : "Free",
      Registrations: event.registrationsCount || 0,
      Status: new Date(event.date) > new Date() ? "Upcoming" : "Past"
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map(row => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `events_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification("Events exported successfully", "success");
  };

  const confirmDelete = async () => {
  if (!selectedEvent) return;
  
  try {
    const res = await fetch(`/api/events/${selectedEvent._id}`, { 
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      // Optional: Send whether to delete registrations
      body: JSON.stringify({
        deleteRegistrations: true // You can get this from the modal
      })
    });
    
    if (res.ok) {
      fetchEvents();
      showNotification("Event deleted successfully", "success");
    } else {
      const error = await res.json();
      throw new Error(error.error || "Failed to delete event");
    }
  } catch (err: any) {
    showNotification(err.message || "Failed to delete event", "error");
    throw err; // Re-throw so modal can catch it
  }
};

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
            <p className="text-gray-600 mt-1">
              Manage all your events, registrations, and payments in one place
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportEvents}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Events
            </button>
            
            <button
              onClick={fetchEvents}
              disabled={refreshing}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            
            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-green-600 font-medium">{stats.upcoming} upcoming</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-600">{stats.past} past</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Registrations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalRegistrations}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-gray-600">Across all events</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Event Types</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.paid + stats.free}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Filter className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-purple-600 font-medium">{stats.paid} paid</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-green-600">{stats.free} free</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${stats.totalRevenue}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-600">From paid events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Events</h2>
          <p className="text-sm text-gray-600 mt-1">
            Click on an event to view details or manage registrations
          </p>
        </div>
        
        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Created Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first event to start accepting registrations and payments
            </p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Event
            </button>
          </div>
        ) : (
          <EventsTable
            events={events}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modals */}
      {createModalOpen && (
        <CreateEventModal
          open={createModalOpen}
          setOpen={setCreateModalOpen}
          refreshEvents={fetchEvents}
        />
      )}

      {editModalOpen && selectedEvent && (
        <EditEventModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          event={selectedEvent}
          refreshEvents={fetchEvents}
        />
      )}

      {viewModalOpen && selectedEvent && (
        <ViewEventModal
          open={viewModalOpen}
          setOpen={setViewModalOpen}
          event={selectedEvent}
          onEdit={() => {
            setViewModalOpen(false);
            setEditModalOpen(true);
          }}
        />
      )}

      {deleteModalOpen && selectedEvent && (
  <DeleteEventModal
    open={deleteModalOpen}
    setOpen={setDeleteModalOpen}
    event={selectedEvent}
    onDelete={confirmDelete}
  />
)}
    </div>
  );
}