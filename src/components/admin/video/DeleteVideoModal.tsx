"use client";

interface DeleteVideoModalProps {
  open: boolean;
  videoTitle?: string;
  onClose: () => void;
  onDelete: () => void;
}


export default function DeleteVideoModal({ open, videoTitle, onClose, onDelete }: DeleteVideoModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold">Delete Video</h2>
        <p>Are you sure you want to delete <strong>{videoTitle}</strong>?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
