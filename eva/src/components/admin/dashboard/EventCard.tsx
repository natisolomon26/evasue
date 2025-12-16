"use client";

import { MoreVertical } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  registrations: number;
  status: 'active' | 'upcoming' | 'completed';
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray/90 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-semibold text-sky-900 ">{event.title}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[event.status]}`}>
            {event.status}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-sky-600">
          <span>{new Date(event.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{event.registrations} registrations</span>
        </div>
      </div>
      <button className="p-2 hover:bg-sky-200  rounded-lg transition-colors">
        <MoreVertical className="w-4 h-4 text-sky-500" />
      </button>
    </div>
  );
}