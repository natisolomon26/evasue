/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

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

interface CreateAdminModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function CreateAdminModal({ open, setOpen }: CreateAdminModalProps) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // default role
    permissions: {
      events: { create: false, read: true, update: false, delete: false },
      newsletter: { create: false, read: true, update: false, delete: false },
      emails: { create: false, read: true, update: false, delete: false },
      materials: { create: false, read: true, update: false, delete: false },
    } as UserPermissions,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handlePermissionChange = (
    module: keyof UserPermissions,
    type: keyof Permission
  ) => {
    setData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: { ...prev.permissions[module], [type]: !prev.permissions[module][type] },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // token from superadmin login
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to create user");
        setLoading(false);
        return;
      }

      // Reset form
      setData({
        name: "",
        email: "",
        password: "",
        role: "admin",
        permissions: {
          events: { create: false, read: true, update: false, delete: false },
          newsletter: { create: false, read: true, update: false, delete: false },
          emails: { create: false, read: true, update: false, delete: false },
          materials: { create: false, read: true, update: false, delete: false },
        },
      });

      setOpen(false);
      alert("User created successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const modules = ["events", "newsletter", "emails", "materials"] as (keyof UserPermissions)[];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Create Admin/Staff</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />

          <select
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          {/* Permissions */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            {modules.map((mod) => (
              <div key={mod} className="border p-2 rounded-lg">
                <h3 className="font-semibold mb-2 capitalize">{mod}</h3>
                {(["create", "read", "update", "delete"] as (keyof Permission)[]).map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={data.permissions[mod][type]}
                      onChange={() => handlePermissionChange(mod, type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
