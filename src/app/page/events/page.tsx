// app/events/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Event, EventsResponse } from '@/types';
import EventCard from '@/components/events/EventCard';
import RegistrationModal from '@/components/events/RegistrationModal';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modals state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data: EventsResponse = await response.json();
      setEvents(data.events || []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (event: Event) => {
    // Navigate to event details page
    window.location.href = `/events/${event._id}`;
  };

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  // In your EventsPage component, update the handleRegistrationSubmit:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRegistrationSubmit = async (formData: any) => {
  if (!selectedEvent) return;

  try {
    const registrationData = {
      eventId: selectedEvent._id,
      answers: formData.answers,
      email: formData.email,
      amount: selectedEvent.isPaid ? selectedEvent.price : 0,
      isGuest: true
    };

    const response = await fetch(`/api/registrations?eventId=${selectedEvent._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed');
    }

    // For paid events, redirect to Chapa after showing success message
    if (selectedEvent.isPaid && result.checkoutUrl) {
      // Show success message for 2 seconds, then redirect
      setTimeout(() => {
        window.location.href = result.checkoutUrl;
      }, 2000);
      
      // Return success to modal
      return;
    } else {
      // For free events, redirect to thank you page
      window.location.href = `/event/thank-you?status=completed&registrationId=${result.registrationId}`;
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.message || 'Registration failed');
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-sky-800 to-sky-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-xl opacity-90">
              Discover amazing events with easy registration and secure payments
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {events.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Events Available</h3>
              <p className="text-gray-600">Check back later for upcoming events</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  All Events <span className="text-gray-500">({events.length})</span>
                </h2>
                <div className="text-gray-600">
                  Showing {events.length} event{events.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    onView={() => handleEventClick(event)}
                    onRegister={() => handleRegisterClick(event)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <RegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          event={selectedEvent}
          onSubmit={handleRegistrationSubmit}
        />
      )}

    </>
  );
}