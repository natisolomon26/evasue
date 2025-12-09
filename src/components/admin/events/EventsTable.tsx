"use client";

import React from "react";
import { Pencil, Eye, Trash2 } from "lucide-react";

export interface Event {
  _id: string;
  title: string;
  date: string;
  location?: string;
  isPaid?: boolean;
  price?: number;
  registrationsCount?: number;
}

interface EventsTableProps {
  events: Event[];
  onEdit?: (event: Event) => void;
  onView?: (event: Event) => void;
  onDelete?: (event: Event) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ events, onEdit, onView, onDelete }) => {
  if (!events || events.length === 0) {
    return <div className="text-center py-8 text-gray-500">No events found.</div>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registrations</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {events.map((event) => (
          <tr key={event._id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-4">{event.title}</td>
            <td className="px-6 py-4">{new Date(event.date).toLocaleString()}</td>
            <td className="px-6 py-4">{event.location || "-"}</td>
            <td className="px-6 py-4 text-center">{event.registrationsCount || 0}</td>
            <td className="px-6 py-4 flex justify-center gap-2">
              <button
                onClick={() => onEdit?.(event)}
                className="p-1 rounded hover:bg-gray-100"
                title="Edit"
              >
                <Pencil className="w-4 h-4 text-blue-500" />
              </button>
              <button
                onClick={() => onView?.(event)}
                className="p-1 rounded hover:bg-gray-100"
                title="View"
              >
                <Eye className="w-4 h-4 text-green-500" />
              </button>
              <button
                onClick={() => onDelete?.(event)}
                className="p-1 rounded hover:bg-gray-100"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
