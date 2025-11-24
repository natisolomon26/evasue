"use client";

import { useState, useEffect } from "react";

interface Permission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface UserPermissions {
  events: Permission;
  newsletter: Permission;
  emails: Permission;
  materials: Permission;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: UserPermissions;
}

interface EditUserModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  user: User | null;
  onUpdate: () => void;
}

const modules = ["events", "newsletter", "emails", "materials"];
const roles = ["superadmin", "admin", "staff"];

export default function EditUserModal({ open, setOpen, user, onUpdate }: EditUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("staff");
  const [permissions, setPermissions] = useState<UserPermissions>({
    events: { create: false, read: true, update: false, delete: false },
    newsletter: { create: false, read: true, update: false, delete: false },
    emails: { create: false, read: true, update: false, delete: false },
    materials: { create: false, read: true, update: false, delete: false },
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPermissions(user.permissions);
    }
  }, [user]);

  function togglePermission(module: string, key: keyof Permission) {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [key]: !prev[module][key],
      },
    }));
  }

  async function handleUpdate() {
    try {
      const res = await fetch(`/api/admin/users/${user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, permissions }),
      });
      if (!res.ok) throw new Error("Update failed");
      onUpdate();
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  }

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold">Edit User</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Name"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Email"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <div>
          <h3 className="font-semibold mb-1">Permissions:</h3>
          {modules.map((mod) => (
            <div key={mod} className="flex items-center gap-2 mb-1">
              <span className="w-24 capitalize">{mod}</span>
              {["create", "read", "update", "delete"].map((key) => (
                <label key={key} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={permissions[mod as keyof UserPermissions][key as keyof Permission]}
                    onChange={() => togglePermission(mod, key as keyof Permission)}
                  />
                  {key}
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
        </div>
      </div>
    </div>
  );
}
