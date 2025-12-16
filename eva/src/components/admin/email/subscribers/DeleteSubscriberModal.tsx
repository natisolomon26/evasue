"use client";

interface DeleteSubscriberModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  email?: string;
}

export default function DeleteSubscriberModal({ open, onClose, onDelete, email }: DeleteSubscriberModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Delete Subscriber</h2>
        <p>Are you sure you want to delete <strong>{email}</strong>?</p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => { onDelete(); onClose(); }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
