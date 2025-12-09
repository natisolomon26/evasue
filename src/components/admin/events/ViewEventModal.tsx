// components/admin/events/ViewEventModal.tsx
"use client";

import { Event } from "@/types";
import { 
  X, 
  Edit, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";

interface ViewEventModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: Event;
  onEdit: () => void;
}

export default function ViewEventModal({ open, setOpen, event, onEdit }: ViewEventModalProps) {
  if (!open) return null;

  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleEditClick = () => {
    setOpen(false);
    onEdit();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setOpen(false)} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Event Details</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleEditClick}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Status Badge */}
            <div className="mb-6">
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                isPastEvent 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {isPastEvent ? (
                  <>
                    <Clock className="h-4 w-4 mr-2" />
                    Past Event
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Upcoming Event
                  </>
                )}
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                {event.description && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-blue-900">{event.registrationsCount || 0}</div>
                        <div className="text-sm text-blue-700">Registrations</div>
                      </div>
                    </div>
                  </div>

                  <div className={`border rounded-xl p-5 ${
                    event.isPaid 
                      ? 'bg-purple-50 border-purple-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center">
                      <DollarSign className={`h-8 w-8 mr-3 ${
                        event.isPaid ? 'text-purple-600' : 'text-green-600'
                      }`} />
                      <div>
                        <div className={`text-2xl font-bold ${
                          event.isPaid ? 'text-purple-900' : 'text-green-900'
                        }`}>
                          {event.isPaid ? `$${event.price}` : 'FREE'}
                        </div>
                        <div className={`text-sm ${
                          event.isPaid ? 'text-purple-700' : 'text-green-700'
                        }`}>
                          {event.isPaid ? 'Paid Event' : 'Free Event'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                {event.formFields && event.formFields.length > 0 && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Registration Form Fields</h4>
                      <span className="text-sm text-gray-600">
                        {event.formFields.length} field{event.formFields.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {event.formFields.map((field) => (
                        <div key={field._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div>
                            <div className="font-medium text-gray-900">{field.label}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FileText className="h-3 w-3 mr-1" />
                              {field.type} • {field.required ? 'Required' : 'Optional'}
                            </div>
                          </div>
                          {field.type === 'select' && field.options && (
                            <div className="text-sm text-gray-600">
                              {field.options.length} option{field.options.length !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Info */}
              <div className="space-y-6">
                {/* Event Info Card */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Event Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">Date & Time</span>
                      </div>
                      <div className="font-medium text-gray-900">{formattedDate}</div>
                    </div>

                    {event.location && (
                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">Location</span>
                        </div>
                        <div className="font-medium text-gray-900">{event.location}</div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Created</span>
                      </div>
                      <div className="font-medium text-gray-900">
                        {new Date(event.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Edit className="h-4 w-4 mr-2" />
                        <span className="text-sm">Last Updated</span>
                      </div>
                      <div className="font-medium text-gray-900">
                        {new Date(event.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        // Navigate to registrations page for this event
                        window.open(`/admin/registrations?eventId=${event._id}`, '_blank');
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View Registrations
                    </button>
                    
                    <button
                      onClick={() => {
                        // Copy registration link
                        const link = `${window.location.origin}/events/${event._id}`;
                        navigator.clipboard.writeText(link);
                        alert('Registration link copied to clipboard!');
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Copy Registration Link
                    </button>
                    
                    <button
                      onClick={() => {
                        // Share on social media
                        const text = `Join me at ${event.title}! ${window.location.origin}/events/${event._id}`;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Share Event
                    </button>
                  </div>
                </div>

                {/* Revenue Estimate */}
                {event.isPaid && (
                  <div className="border border-purple-200 bg-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-900 mb-3">Revenue Estimate</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-purple-700">Price per ticket:</span>
                        <span className="font-medium">${event.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-purple-700">Total registrations:</span>
                        <span className="font-medium">{event.registrationsCount || 0}</span>
                      </div>
                      <div className="border-t border-purple-200 pt-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-purple-900">Estimated revenue:</span>
                          <span className="text-lg font-bold text-purple-900">
                            ${(event.price * (event.registrationsCount || 0)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}