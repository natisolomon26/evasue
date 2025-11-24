"use client";

import { useState } from "react";
import CreateAdminModal from "@/components/admin/settings/CreateAdminModal";

export default function AdminSettingsPage() {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg"
          onClick={() => setOpenCreate(true)}
        >
          + Create Admin
        </button>
      </div>

      {/* Admin List - placeholder */}
      <div className="border rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">All Admins</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Access Rights</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder data */}
            <tr className="border-b">
              <td className="py-3">John Doe</td>
              <td>john@example.com</td>
              <td>Events, Newsletter</td>
              <td className="text-right space-x-2">
                <button className="text-blue-600">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Create Admin Modal */}
      <CreateAdminModal open={openCreate} setOpen={setOpenCreate} />
    </div>
  );
}
