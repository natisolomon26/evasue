"use client";

interface ViewModalProps {
  open: boolean;
  onClose: () => void;
  item: {
    _id: string;
    key: string;
    label: string;
    value: string;
  } | null;
}

export default function ViewModal({ open, onClose, item }: ViewModalProps) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">View Content</h2>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Key</p>
            <p className="font-medium">{item.key}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Label</p>
            <p className="font-medium">{item.label}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Value</p>
            <p className="font-medium whitespace-pre-wrap">{item.value}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
