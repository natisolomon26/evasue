"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Trash2, Shield, User, Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteUserModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  userId: string | null;
  onDelete: () => void;
}

export default function DeleteUserModal({ open, setOpen, userId, onDelete }: DeleteUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string; role: string } | null>(null);

  // Fetch user details when modal opens
  useState(() => {
    if (open && userId && !userData) {
      fetchUserDetails();
    }
  });

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (res.ok) {
        const user = await res.json();
        setUserData({
          name: user.name,
          email: user.email,
          role: user.role
        });
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  async function handleDelete() {
    if (!userId) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (!res.ok) throw new Error("Delete failed");
      
      onDelete();
      setOpen(false);
      // Show success message or trigger refresh in parent
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setUserData(null);
    setOpen(false);
  };

  const getRoleColor = (role: string) => {
    const colors = {
      superadmin: "bg-purple-100 text-purple-800 border-purple-200",
      admin: "bg-blue-100 text-blue-800 border-blue-200",
      staff: "bg-green-100 text-green-800 border-green-200"
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      superadmin: Shield,
      admin: Shield,
      staff: User
    };
    return icons[role as keyof typeof icons] || User;
  };

  return (
    <AnimatePresence>
      {open && userId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Delete User</h2>
                    <p className="text-red-100">This action cannot be undone</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Warning Message */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Warning: Destructive Action</h3>
                    <p className="text-red-700 text-sm">
                      You are about to permanently delete this user account. This action cannot be undone and all associated data will be lost.
                    </p>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">User Details</h4>
                {userData ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Name</span>
                      <span className="font-semibold text-gray-900">{userData.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email</span>
                      <span className="font-medium text-gray-900">{userData.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Role</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(userData.role)}`}>
                        {(() => {
                          const Icon = getRoleIcon(userData.role);
                          return <Icon className="w-3 h-3" />;
                        })()}
                        {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    <span className="text-gray-500 ml-2">Loading user details...</span>
                  </div>
                )}
              </div>

              {/* Confirmation Text */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800 text-center">
                  <strong>Type DELETE</strong> in the field below to confirm this action
                </p>
                <input
                  type="text"
                  placeholder="Type DELETE to confirm"
                  className="w-full mt-3 px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-center font-mono"
                  id="confirmationInput"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Delete User
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}