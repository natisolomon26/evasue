"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CreateAdminModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type Permissions = {
  [key: string]: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
};

export default function CreateAdminModal({ open, setOpen }: CreateAdminModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    permissions: {
      events: { create: false, read: false, update: false, delete: false },
      newsletter: { create: false, read: false, update: false, delete: false },
      email: { create: false, read: false, update: false, delete: false },
      materials: { create: false, read: false, update: false, delete: false },
    } as Permissions,
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin to create:", form);
    // TODO: connect to backend API
    setOpen(false);
  };

  const togglePermission = (category: string, type: keyof Permissions[string]) => {
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        [category]: {
          ...form.permissions[category],
          [type]: !form.permissions[category][type],
        },
      },
    });
  };

  const categories = Object.keys(form.permissions);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-auto"
      >
        <h2 className="text-xl font-bold mb-4">Create Admin</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <input
            type="text"
            placeholder="Full Name"
            className="border w-full p-2 rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border w-full p-2 rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border w-full p-2 rounded-lg"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* Permissions */}
          <div className="border-t pt-3 space-y-4">
            <h3 className="font-semibold">Access Rights</h3>
            {categories.map((cat) => (
              <div key={cat} className="space-y-1">
                <p className="font-medium">{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
                <div className="flex gap-4 flex-wrap">
                  {["create", "read", "update", "delete"].map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={form.permissions[cat][perm as keyof Permissions[string]]}
                        onChange={() =>
                          togglePermission(cat, perm as keyof Permissions[string])
                        }
                      />
                      <span className="capitalize">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
