// components/EventCard.tsx
import { Event } from '@/types';
import { Calendar, MapPin, Users, CreditCard } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onView: () => void;
  onRegister: () => void;
}

export default function EventCard({ event, onView, onRegister }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Event Header */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
        
        <div className="space-y-3 mb-4">
          {/* Date & Time */}
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{formattedDate} • {formattedTime}</span>
          </div>
          
          {/* Location */}
          {event.location && (
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
          )}
          
          {/* Registrations Count */}
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {event.registrationsCount || 0} registered
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center text-gray-600">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {event.isPaid ? `$${event.price} • Paid` : 'Free Event'}
            </span>
          </div>
        </div>
        
        {/* Description Preview */}
        {event.description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-6">
            {event.description}
          </p>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="px-6 pb-6">
        <div className="flex space-x-3">
          <button
            onClick={onView}
            className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            View Details
          </button>
          
          <button
            onClick={onRegister}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              event.isPaid
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
            }`}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}