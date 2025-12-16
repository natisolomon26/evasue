"use client";

interface ViewSubscriberModalProps {
  open: boolean;
  onClose: () => void;
  subscriber: {
    email: string;
    categories: string[];
    status: string;
    createdAt: string;
  } | null;
}

export default function ViewSubscriberModal({ open, onClose, subscriber }: ViewSubscriberModalProps) {
  if (!open || !subscriber) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Subscriber Details</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">✕</button>
        </div>

        <p><strong>Email:</strong> {subscriber.email}</p>
        <p><strong>Categories:</strong> {subscriber.categories.join(", ")}</p>
        <p><strong>Status:</strong> {subscriber.status}</p>
        <p><strong>Subscribed At:</strong> {new Date(subscriber.createdAt).toLocaleString()}</p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
