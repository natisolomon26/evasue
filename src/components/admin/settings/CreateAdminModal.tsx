/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Shield,
  Calendar,
  Mail as NewsletterIcon,
  MessageSquare,
  FileText,
  Save,
  Loader2
} from "lucide-react";

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
  onCreated: () => void;
}

export default function CreateAdminModal({ open, setOpen, onCreated }: CreateAdminModalProps) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    permissions: {
      events: { create: false, read: true, update: false, delete: false },
      newsletter: { create: false, read: true, update: false, delete: false },
      emails: { create: false, read: true, update: false, delete: false },
      materials: { create: false, read: true, update: false, delete: false },
    } as UserPermissions,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"basic" | "permissions">("basic");

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      onCreated();
      alert("User created successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    { key: "events" as keyof UserPermissions, label: "Events", icon: Calendar, color: "blue" },
    { key: "newsletter" as keyof UserPermissions, label: "Newsletter", icon: NewsletterIcon, color: "green" },
    { key: "emails" as keyof UserPermissions, label: "Emails", icon: MessageSquare, color: "purple" },
    { key: "materials" as keyof UserPermissions, label: "Materials", icon: FileText, color: "orange" },
  ];

  const permissionTypes = [
    { key: "create" as keyof Permission, label: "Create", description: "Can create new items" },
    { key: "read" as keyof Permission, label: "Read", description: "Can view items" },
    { key: "update" as keyof Permission, label: "Update", description: "Can edit existing items" },
    { key: "delete" as keyof Permission, label: "Delete", description: "Can remove items" },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500 border-blue-200 text-blue-600",
      green: "bg-green-500 border-green-200 text-green-600",
      purple: "bg-purple-500 border-purple-200 text-purple-600",
      orange: "bg-orange-500 border-orange-200 text-orange-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Create New User</h2>
                    <p className="text-blue-100">Add admin or staff member with specific permissions</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`flex-1 py-4 font-medium transition-colors ${
                    activeTab === "basic"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Basic Information
                </button>
                <button
                  onClick={() => setActiveTab("permissions")}
                  className={`flex-1 py-4 font-medium transition-colors ${
                    activeTab === "permissions"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  Permissions
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 max-h-[60vh] overflow-y-auto">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
                >
                  {error}
                </motion.div>
              )}

              {/* Basic Information Tab */}
              {activeTab === "basic" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a secure password"
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Shield className="w-4 h-4 inline mr-2" />
                      User Role
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setData({ ...data, role: "admin" })}
                        className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                          data.role === "admin"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <div className="font-semibold">Admin</div>
                        <div className="text-sm mt-1">Full access to all features</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setData({ ...data, role: "staff" })}
                        className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                          data.role === "staff"
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <div className="font-semibold">Staff</div>
                        <div className="text-sm mt-1">Limited access based on permissions</div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Permissions Tab */}
              {activeTab === "permissions" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> Select the permissions you want to grant this user. 
                      Read access is enabled by default for all modules.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules.map((module) => {
                      const Icon = module.icon;
                      return (
                        <div key={module.key} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 ${getColorClasses(module.color).split(' ')[0]} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{module.label}</h3>
                              <p className="text-sm text-gray-600">Manage {module.label.toLowerCase()} content</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {permissionTypes.map((type) => (
                              <label key={type.key} className="flex items-center justify-between group cursor-pointer">
                                <div>
                                  <span className="font-medium text-gray-700 text-sm">
                                    {type.label}
                                  </span>
                                  <p className="text-xs text-gray-500">
                                    {type.description}
                                  </p>
                                </div>
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={data.permissions[module.key][type.key]}
                                    onChange={() => handlePermissionChange(module.key, type.key)}
                                    className="sr-only"
                                  />
                                  <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                                    data.permissions[module.key][type.key]
                                      ? getColorClasses(module.color).split(' ')[0]
                                      : "bg-gray-200"
                                  }`}>
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-200 ${
                                      data.permissions[module.key][type.key] ? "translate-x-6" : "translate-x-0"
                                    }`} />
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating User...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Create User
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}