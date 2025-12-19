'use client';

import toast from 'react-hot-toast';

interface Props {
  seminarId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteSeminarModal({ seminarId, onClose, onSuccess }: Props) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/seminars/${seminarId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete seminar');

      toast.success('Seminar deleted successfully');
      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete seminar');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-xl font-semibold mb-4">Delete Seminar</h2>
        <p className="mb-6">Are you sure you want to delete this seminar? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  );
}
