'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Seminar {
  _id: string;
  title: string;
  date: string;
  location: string;
  capacity: number;
  isOpen: boolean;
}

interface Props {
  seminar: Seminar;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditSeminarModal({ seminar, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(seminar.title);
    setDate(seminar.date.split('T')[0]);
    setLocation(seminar.location);
    setCapacity(seminar.capacity);
    setIsOpen(seminar.isOpen);
  }, [seminar]);

  const handleEdit = async () => {
    if (!title || !date || !location || !capacity) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/seminars/${seminar._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, location, capacity, isOpen }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update seminar');

      toast.success('Seminar updated successfully');
      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Failed to update seminar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Seminar</h2>

        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded" />
          <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 rounded" />
          <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} className="border p-2 rounded" />
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} id="isOpenEdit" />
            <label htmlFor="isOpenEdit">Is Open</label>
          </div>
          <button onClick={handleEdit} disabled={loading} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {loading ? 'Updating...' : 'Update Seminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
