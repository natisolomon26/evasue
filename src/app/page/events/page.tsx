"use client";

import { useEffect, useState } from "react";
import RegistrationModal from "@/components/events/RegistrationModal";
import PaymentModal from "@/components/events/PaymentModal";
import { EventType } from "@/types/events";

interface User {
  id: string;
  name: string;
  email: string;
}

interface PaymentData {
  eventId: string;
  eventTitle: string;
  amount: number;
  userData: {
    name: string;
    email: string;
    phone: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  // Fetch current user
  const fetchCurrentUser = async () => {
    try {
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

  // NEW: Handle registration form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegistrationSubmit = (formData: any) => {
    if (!selectedEvent) return;

    console.log("Form submitted:", formData);
    console.log("Selected event:", selectedEvent);

    // If it's a paid event, open payment modal
    if (selectedEvent.isPaid && selectedEvent.price) {
      console.log("Opening payment modal for paid event");
      
      setPaymentData({
        eventId: selectedEvent._id,
        eventTitle: selectedEvent.title,
        amount: selectedEvent.price,
        userData: formData
      });
      
      // Close registration modal and open payment modal
      setOpenRegistration(false);
      setOpenPayment(true);
    } else {
      // For free events, complete registration immediately
      console.log("Completing free event registration");
      completeRegistration(formData);
    }
  };

  // Complete registration (for free events or after payment)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const completeRegistration = async (formData: any) => {
    if (!selectedEvent) return;

    try {
      console.log("Calling registration API...");
      
      const res = await fetch(`/api/events/${selectedEvent._id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: formData }),
      });

      if (res.ok) {
        console.log("Registration successful");
        fetchEvents(); // Refresh events to update registration status
        setOpenRegistration(false);
        alert("Registered successfully!");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Registration failed");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error.message}`);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = async () => {
    if (!paymentData || !selectedEvent) return;

    console.log("Payment successful, completing registration...");
    
    // Complete registration after successful payment
    await completeRegistration(paymentData.userData);
    setOpenPayment(false);
    setPaymentData(null);
    setSelectedEvent(null);
  };

  // Handle payment cancellation
  const handlePaymentCancel = () => {
    console.log("Payment cancelled");
    // User cancelled payment, allow them to retry registration
    setOpenPayment(false);
    setOpenRegistration(true);
  };

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
                  <div className={`p-6 text-white ${
                    event.isPaid 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-700' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold line-clamp-2 pr-4">{event.title}</h2>
                      {event.isPaid && (
                        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                          <span>💰 Paid</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-blue-100 text-sm">
                      <span>👥 {registrationCount} registered</span>
                      {event.isPaid && event.price && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="font-semibold">ETB {event.price}</span>
                        </>
                      )}
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
                          : event.isPaid
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {pastEvent
                        ? 'Event Ended'
                        : registered
                        ? '✓ Registered'
                        : event.isPaid
                        ? `Register - ETB ${event.price}`
                        : 'Register Now (Free)'}
                    </button>

                    {/* Additional info */}
                    {registered && (
                      <div className="mt-3 text-center">
                        <p className="text-sm text-green-600 font-medium">
                          Youre registered for this event!
                        </p>
                      </div>
                    )}
                    {event.isPaid && !registered && !pastEvent && (
                      <div className="mt-3 text-center">
                        <p className="text-xs text-gray-500">
                          Payment required to complete registration
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
            onSuccess={handleRegistrationSubmit} // Updated to new handler
          />
        )}

        {/* Payment Modal */}
        {selectedEvent && paymentData && (
          <PaymentModal
            open={openPayment}
            setOpen={setOpenPayment}
            paymentData={paymentData}
            event={selectedEvent}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
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