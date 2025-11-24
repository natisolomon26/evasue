"use client";

interface DeleteUserModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  userId: string | null;
  onDelete: () => void;
}

export default function DeleteUserModal({ open, setOpen, userId, onDelete }: DeleteUserModalProps) {
  if (!open || !userId) return null;

  async function handleDelete() {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      onDelete();
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Delete User</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
