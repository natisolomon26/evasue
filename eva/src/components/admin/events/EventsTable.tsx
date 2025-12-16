// components/EventsTable.tsx
'use client';

import React, { useState } from 'react';
import { Event } from '@/types';
import { Pencil, Eye, Trash2, Search, Filter, Calendar, DollarSign, Users } from 'lucide-react';
import RegistrationView from './RegistrationView';

interface EventsTableProps {
  events: Event[];
  onEdit?: (event: Event) => void;
  onView?: (event: Event) => void;
  onDelete?: (event: Event) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ events, onEdit, onView, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all'); // 'all', 'upcoming', 'past'
  const [paymentFilter, setPaymentFilter] = useState<string>('all'); // 'all', 'paid', 'free'
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationView, setShowRegistrationView] = useState(false);

  // Filter events
  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    // Date filter
    const eventDate = new Date(event.date);
    const now = new Date();
    const matchesDate = 
      dateFilter === 'all' ||
      (dateFilter === 'upcoming' && eventDate >= now) ||
      (dateFilter === 'past' && eventDate < now);

    // Payment filter
    const matchesPayment = 
      paymentFilter === 'all' ||
      (paymentFilter === 'paid' && event.isPaid) ||
      (paymentFilter === 'free' && !event.isPaid);

    return matchesSearch && matchesDate && matchesPayment;
  });

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Found</h3>
        <p className="text-gray-600">Create your first event to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search events by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past Events</option>
            </select>

            {/* Payment Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="paid">Paid Events</option>
              <option value="free">Free Events</option>
            </select>

            {/* Sort Options */}
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Sort by Date</option>
              <option>Sort by Title</option>
              <option>Sort by Registrations</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="md:ml-auto text-sm text-gray-600">
            {filteredEvents.length} of {events.length} events
          </div>
        </div>
      </div>

      {/* Events Grid/Table View */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Event Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Date & Time
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Registrations
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Price
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const isPastEvent = eventDate < new Date();
              
              return (
                <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                  {/* Event Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                        isPastEvent ? 'bg-gray-100' : event.isPaid ? 'bg-purple-100' : 'bg-blue-100'
                      }`}>
                        <Calendar className={`h-6 w-6 ${
                          isPastEvent ? 'text-gray-600' : event.isPaid ? 'text-purple-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        {event.location && (
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <span className="mr-1">📍</span>
                            {event.location}
                          </p>
                        )}
                        {event.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {event.description}
                          </p>
                        )}
                        {isPastEvent && (
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            Past Event
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {eventDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {eventDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>

                  {/* Registrations */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.registrationsCount && event.registrationsCount > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <span className="font-bold">{event.registrationsCount || 0}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowRegistrationView(true);
                        }}
                        className="ml-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      event.isPaid 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.isPaid ? `$${event.price}` : 'FREE'}
                    </div>
                    {event.isPaid && (
                      <div className="text-xs text-gray-500 mt-1">
                        Paid Event
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onView?.(event)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                        title="View Event"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => onEdit?.(event)}
                        className="p-2 rounded-lg hover:bg-yellow-50 text-yellow-600 transition"
                        title="Edit Event"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => onDelete?.(event)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                        title="Delete Event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Events Match Your Filters</h4>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setDateFilter('all');
                setPaymentFilter('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Registration View Modal */}
      {selectedEvent && (
        <RegistrationView
          event={selectedEvent}
          isOpen={showRegistrationView}
          onClose={() => {
            setShowRegistrationView(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </>
  );
};

export default EventsTable;