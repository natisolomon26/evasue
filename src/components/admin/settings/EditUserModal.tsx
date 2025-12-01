"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Shield, 
  Save, 
  X, 
  Calendar,
  Mail as NewsletterIcon,
  MessageSquare,
  FileText,
  Loader2,
  Crown,
  UserCheck,
  UserCog
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

const modules = [
  { key: "events" as keyof UserPermissions, label: "Events", icon: Calendar, color: "blue" },
  { key: "newsletter" as keyof UserPermissions, label: "Newsletter", icon: NewsletterIcon, color: "green" },
  { key: "emails" as keyof UserPermissions, label: "Emails", icon: MessageSquare, color: "purple" },
  { key: "materials" as keyof UserPermissions, label: "Materials", icon: FileText, color: "orange" },
];

const roles = [
  { value: "superadmin", label: "Super Admin", icon: Crown, description: "Full system access" },
  { value: "admin", label: "Admin", icon: UserCheck, description: "Administrative access" },
  { value: "staff", label: "Staff", icon: UserCog, description: "Limited access" },
];

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
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "permissions">("basic");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPermissions(user.permissions);
    }
  }, [user]);

  function togglePermission(module: keyof UserPermissions, key: keyof Permission) {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [key]: !prev[module][key],
      },
    }));
  }

  async function handleUpdate() {
    if (!user) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, email, role, permissions }),
      });
      if (!res.ok) throw new Error("Update failed");
      onUpdate();
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    } finally {
      setLoading(false);
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500 border-blue-200 text-blue-600",
      green: "bg-green-500 border-green-200 text-green-600",
      purple: "bg-purple-500 border-purple-200 text-purple-600",
      orange: "bg-orange-500 border-orange-200 text-orange-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const permissionTypes = [
    { key: "create" as keyof Permission, label: "Create", description: "Can create new items" },
    { key: "read" as keyof Permission, label: "Read", description: "Can view items" },
    { key: "update" as keyof Permission, label: "Update", description: "Can edit existing items" },
    { key: "delete" as keyof Permission, label: "Delete", description: "Can remove items" },
  ];

  const getRoleColor = (roleValue: string) => {
    const colors = {
      superadmin: "border-purple-500 bg-purple-50 text-purple-700",
      admin: "border-blue-500 bg-blue-50 text-blue-700",
      staff: "border-green-500 bg-green-50 text-green-700"
    };
    return colors[roleValue as keyof typeof colors] || colors.staff;
  };

  return (
    <AnimatePresence>
      {open && user && (
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
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Edit User</h2>
                    <p className="text-blue-100">Update user details and permissions</p>
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

            <div className="p-6 max-h-[60vh] overflow-y-auto">
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter full name"
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Shield className="w-4 h-4 inline mr-2" />
                      User Role
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {roles.map((roleOption) => {
                        const Icon = roleOption.icon;
                        return (
                          <button
                            key={roleOption.value}
                            type="button"
                            onClick={() => setRole(roleOption.value)}
                            className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                              role === roleOption.value
                                ? getRoleColor(roleOption.value)
                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="w-5 h-5" />
                              <span className="font-semibold">{roleOption.label}</span>
                            </div>
                            <div className="text-sm text-gray-600">{roleOption.description}</div>
                          </button>
                        );
                      })}
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
                      <strong>Tip:</strong> Configure the specific permissions for this user. 
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
                                    checked={permissions[module.key][type.key]}
                                    onChange={() => togglePermission(module.key, type.key)}
                                    className="sr-only"
                                  />
                                  <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                                    permissions[module.key][type.key]
                                      ? getColorClasses(module.color).split(' ')[0]
                                      : "bg-gray-200"
                                  }`}>
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-200 ${
                                      permissions[module.key][type.key] ? "translate-x-6" : "translate-x-0"
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
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating User...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Update User
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