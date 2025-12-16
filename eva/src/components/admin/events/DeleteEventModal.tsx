// components/admin/events/DeleteEventModal.tsx
"use client";

import { Event } from "@/types";
import { X, AlertTriangle, Trash2, Shield, Users, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

interface DeleteEventModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: Event;
  onDelete: () => Promise<void>;
}

export default function DeleteEventModal({ open, setOpen, event, onDelete }: DeleteEventModalProps) {
  const [loading, setLoading] = useState(false);
  const [deleteRegistrations, setDeleteRegistrations] = useState(true);
  const [confirmationText, setConfirmationText] = useState("");
  const [error, setError] = useState("");

  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();
  const hasRegistrations = (event.registrationsCount || 0) > 0;
  const totalRevenue = (event.price || 0) * (event.registrationsCount || 0);

  const handleDelete = async () => {
    if (confirmationText !== event.title) {
      setError(`Please type "${event.title}" to confirm deletion`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onDelete();
      setOpen(false);
      resetForm();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDeleteRegistrations(true);
    setConfirmationText("");
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(resetForm, 300); // Reset after modal closes
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Delete Event</h3>
              </div>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Warning Banner */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-900 mb-1">Critical Action</h4>
                  <p className="text-sm text-red-700">
                    Deleting this event will permanently remove it and all associated data.
                  </p>
                </div>
              </div>
            </div>

            {/* Event Summary */}
            <div className="border border-gray-200 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Event Details</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Title</span>
                  <span className="font-medium">{event.title}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Date
                  </span>
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                
                {hasRegistrations && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        Registrations
                      </span>
                      <span className="font-medium text-red-600">
                        {event.registrationsCount || 0} registered
                      </span>
                    </div>
                    
                    {event.isPaid && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Total Revenue
                        </span>
                        <span className="font-medium text-red-600">
                          ${totalRevenue.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Options */}
            {hasRegistrations && (
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="deleteRegistrations"
                    checked={deleteRegistrations}
                    onChange={(e) => setDeleteRegistrations(e.target.checked)}
                    className="h-4 w-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <label htmlFor="deleteRegistrations" className="ml-2 text-sm text-gray-700">
                    Also delete all {event.registrationsCount} registration(s) for this event
                  </label>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  If unchecked, registrations will remain in the database but wont be associated with any event.
                </p>
              </div>
            )}

            {/* Confirmation */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type the event title to confirm deletion:
              </label>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => {
                  setConfirmationText(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  error ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder={`Type "${event.title}" here`}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Impact Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">What will be deleted:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                  Event: "{event.title}"
                </li>
                {deleteRegistrations && hasRegistrations && (
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    {event.registrationsCount} registration record(s)
                  </li>
                )}
                {event.isPaid && hasRegistrations && (
                  <li className="flex items-center">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    Payment records and transaction history
                  </li>
                )}
                <li className="flex items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                  All registration form data
                </li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || confirmationText !== event.title}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Event
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}