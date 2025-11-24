"use client";

import { useEffect, useState } from "react";
import CreateAdminModal from "@/components/admin/settings/CreateAdminModal";
import EditUserModal from "@/components/admin/settings/EditUserModal";
import DeleteUserModal from "@/components/admin/settings/DeleteUserModal";

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
  role: "superadmin" | "admin" | "staff";
  permissions: UserPermissions;
}

export default function AdminSettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  // Fetch users from API
  // Fetch users from API
const fetchUsers = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/admin/users");
    if (!res.ok) throw new Error("Failed to fetch users");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = await res.json(); // expecting array
    // Map _id to id for frontend
    const usersWithId: User[] = data.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      permissions: u.permissions,
    }));

    setUsers(usersWithId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Failed to fetch users");
    setUsers([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);
  

  // Format permissions to display
  const formatPermissions = (permissions: UserPermissions) => {
    const activeModules = Object.entries(permissions)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, perm]) => perm.create || perm.update || perm.delete)
      .map(([mod]) => mod.charAt(0).toUpperCase() + mod.slice(1));
    return activeModules.join(", ") || "None";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg"
          onClick={() => setOpenCreate(true)}
        >
          + Create User
        </button>
      </div>

      {/* Users Table */}
      <div className="border rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Access Rights</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2">{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>{formatPermissions(user.permissions)}</td>
                  <td className="text-right space-x-2">
                    <button
                      className="text-blue-600"
                      onClick={() => setEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => setDeleteUserId(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <CreateAdminModal open={openCreate} setOpen={setOpenCreate} onCreated={fetchUsers} />
      <EditUserModal open={!!editUser} setOpen={() => setEditUser(null)} user={editUser} onUpdate={fetchUsers} />
      <DeleteUserModal open={!!deleteUserId} setOpen={() => setDeleteUserId(null)} userId={deleteUserId} onDelete={fetchUsers} />
    </div>
  );
}
