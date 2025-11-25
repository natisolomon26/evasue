"use client";

import { useEffect, useState } from "react";
import RegistrationModal from "@/components/events/RegistrationModal";
import { EventType } from "@/types/events";

interface User {
  id: string;
  // Add other user properties as needed
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [openRegistration, setOpenRegistration] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Fetch current user (you'll need to implement this based on your auth system)
  const fetchCurrentUser = async () => {
    try {
      // Replace this with your actual user fetching logic
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const userData = await res.json();
        setCurrentUser(userData);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

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
    fetchCurrentUser();
  }, []);

  // Check if user is registered for an event
  const isUserRegistered = (event: EventType) => {
    if (!currentUser) return false;
    return event.registrations?.some(reg => reg.userId === currentUser.id);
  };

  // Get registration count for an event
  const getRegistrationCount = (event: EventType) => {
    return event.registrations?.length || 0;
  };

  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  // Check if event is in the past
  const isPastEvent = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const handleRegistrationSuccess = () => {
    fetchEvents(); // Refresh events to update registration status
    alert("Registered successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and register for amazing events. Connect, learn, and grow with our community.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Available</h3>
            <p className="text-gray-600">Check back later for upcoming events.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const { date, time } = formatDate(event.date);
              const registered = isUserRegistered(event);
              const pastEvent = isPastEvent(event.date);
              const registrationCount = getRegistrationCount(event);

              return (
                <div 
                  key={event._id} 
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    pastEvent ? 'opacity-75' : ''
                  }`}
                >
                  {/* Event Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h2>
                    <div className="flex items-center text-blue-100 text-sm">
                      <span>👥 {registrationCount} registered</span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    {event.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                    )}
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-700">
                        <span className="mr-3">📅</span>
                        <div>
                          <div className="font-medium">{date}</div>
                          <div className="text-sm text-gray-500">{time}</div>
                        </div>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center text-gray-700">
                          <span className="mr-3">📍</span>
                          <span className="text-sm">{event.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Registration Button */}
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          alert("Please log in to register for events");
                          return;
                        }
                        setSelectedEvent(event);
                        setOpenRegistration(true);
                      }}
                      disabled={pastEvent || registered}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        pastEvent
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : registered
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {pastEvent
                        ? 'Event Ended'
                        : registered
                        ? '✓ Registered'
                        : 'Register Now'}
                    </button>

                    {/* Additional info for registered users */}
                    {registered && (
                      <div className="mt-3 text-center">
                        <p className="text-sm text-green-600 font-medium">
                          Youre registered for this event!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Registration Modal */}
        {selectedEvent && (
          <RegistrationModal
            open={openRegistration}
            setOpen={setOpenRegistration}
            event={selectedEvent}
            onSuccess={handleRegistrationSuccess}
          />
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-600">
        <p>Need help? Contact our support team.</p>
      </div>
    </div>
  );
}