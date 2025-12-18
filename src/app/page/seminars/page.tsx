'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SeminarRegistrationModal from '@/components/seminars/SeminarRegistrationModal';

interface Seminar {
  _id: string;
  title: string;
  date: string;
  location: string;
  instructor: string;
  capacity: number;
  currentRegistrations: number;
  isOpen: boolean;
  availableSeats: number;
}

export default function SeminarsPage() {
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['seminars'],
    queryFn: async () => {
      const res = await fetch('/api/seminars?isOpen=true');
      if (!res.ok) throw new Error('Failed to fetch seminars');
      return res.json();
    },
  });

  if (isLoading) return <p>Loading seminars...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Seminars</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((seminar: Seminar) => (
          <div key={seminar._id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{seminar.title}</h2>
            <p>Date: {new Date(seminar.date).toLocaleDateString()}</p>
            <p>Location: {seminar.location}</p>
            <p>Instructor: {seminar.instructor}</p>
            <p>Seats Available: {seminar.capacity - seminar.currentRegistrations}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
              disabled={!seminar.isOpen}
              onClick={() => setSelectedSeminar(seminar)}
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {selectedSeminar && (
        <SeminarRegistrationModal
          seminar={selectedSeminar}
          onClose={() => setSelectedSeminar(null)}
        />
      )}
    </div>
  );
}
