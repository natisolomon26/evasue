"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface StaffModalProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function StaffModal({ open, item, onClose, onSave }: StaffModalProps) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (item) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFullName(item.fullName);
      setRole(item.role);
      setEmail(item.email);
      setImage(item.image);
    } else {
      setFullName("");
      setRole("");
      setEmail("");
      setImage("");
    }
  }, [item]);

  // Convert selected file to Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const method = item ? "PUT" : "POST";
    const url = item ? `/api/staff/${item._id}` : "/api/staff";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, role, email, image }),
    });

    onSave();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">{item ? "Edit Staff" : "Add Staff"}</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* File input for image */}
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
        {image && (
  <Image
    src={image}
    alt="Preview"
    width={96}  // e.g., 24 * 4 px
    height={96}
    className="object-cover rounded mt-2 border"
  />
)}


        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            {item ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
