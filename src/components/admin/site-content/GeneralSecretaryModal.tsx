// components/admin/site/GeneralSecretaryModal.tsx
"use client";

import { useState, useEffect } from "react";

interface GSModalProps {
  open: boolean;
  item?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function GeneralSecretaryModal({ open, item, onClose, onSave }: GSModalProps) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("General Secretary");
  const [description, setDescription] = useState("");
  const [education, setEducation] = useState("");
  const [personal, setPersonal] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (item) {
      setFullName(item.fullName);
      setDescription(item.description);
      setEducation(item.education);
      setPersonal(item.personal);
      setImage(item.image);
    } else {
      setFullName("");
      setDescription("");
      setEducation("");
      setPersonal("");
      setImage("");
    }
  }, [item]);

  const handleSubmit = async () => {
    const method = item ? "PUT" : "POST";
    const url = item ? `/api/general-secretary/${item._id}` : "/api/general-secretary";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, role, description, education, personal, image }),
    });

    onSave();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">{item ? "Edit General Secretary" : "Add General Secretary"}</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Personal Info"
          value={personal}
          onChange={(e) => setPersonal(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
            {item ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
