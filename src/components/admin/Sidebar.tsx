"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Mail, 
  Users, 
  Settings, 
  X, 
  Menu,
  ChevronRight,
  LogOut,
  User,
  Bell,
  Shield,
  BarChart3
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface UserPermissions {
  events?: { read: boolean; write: boolean };
  newsletter?: { read: boolean; write: boolean };
  emails?: { read: boolean; write: boolean };
  materials?: { read: boolean; write: boolean };
  users?: { read: boolean; write: boolean };
  settings?: { read: boolean; write: boolean };
  [key: string]: { read: boolean; write: boolean } | undefined;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: UserPermissions;
}

const navItems = [
  { 
    name: "Dashboard", 
    href: "/admin", 
    icon: LayoutDashboard, 
    permissionKey: null,
    badge: null 
  },
  { 
    name: "Events", 
    href: "/admin/events", 
    icon: Calendar, 
    permissionKey: "events",
    badge: "5" 
  },
  { 
    name: "Materials", 
    href: "/admin/materials", 
    icon: FileText, 
    permissionKey: "materials",
    badge: null 
  },
  { 
    name: "Newsletter", 
    href: "/admin/newsletter", 
    icon: Mail, 
    permissionKey: "newsletter",
    badge: "12" 
  },
  { 
    name: "Users", 
    href: "/admin/users", 
    icon: Users, 
    permissionKey: "users",
    badge: "3" 
  },
  { 
    name: "Analytics", 
    href: "/admin/analytics", 
    icon: BarChart3, 
    permissionKey: "analytics",
    badge: null 
  },
  { 
    name: "Settings", 
    href: "/admin/settings", 
    icon: Settings, 
    permissionKey: "settings",
    badge: null 
  },
];

export default function Sidebar({ isOpen, onToggle, onClose }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    }
    fetchUser();
  }, []);

  const allowedNavItems = navItems.filter(item => {
    if (!user) return false;
    if (user.role === "superadmin") return true;
    if (!item.permissionKey) return true;
    return user.permissions[item.permissionKey]?.read === true;
  });

  const isActiveLink = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "superadmin": return "Super Admin";
      case "admin": return "Admin";
      default: return "Staff";
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex fixed top-6 left-64 z-50 p-2 rounded-lg bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all duration-200 -translate-x-1/2"
      >
        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed h-screen  bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl z-40 ${
              isCollapsed ? "w-20" : "w-80"
            } transition-all duration-300 flex flex-col`}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-700/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 min-w-0"
                  >
                    <h2 className="text-xl font-bold text-white truncate">Admin Portal</h2>
                    <p className="text-slate-400 text-sm truncate">
                      {user ? getRoleLabel(user.role) : "Loading..."}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* User Profile */}
            {!isCollapsed && user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-4 border-b border-slate-700/40"
              >
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 backdrop-blur-sm hover:bg-slate-800/60 transition-colors">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-br from-emerald-500 to-teal-600">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      user.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{user.name}</p>
                    <p className="text-slate-400 text-xs truncate">{user.email}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <Bell className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Main Navigation */}
            <nav className="flex-1 px-4 py-3 overflow-y-auto">
              <h3 className={`text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2 ${
                isCollapsed ? "text-center" : ""
              }`}>
                {isCollapsed ? "Nav" : "Main Menu"}
              </h3>
              
              {allowedNavItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);
                
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => window.innerWidth < 768 && onClose()}
                      className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600/20 text-white border-l-3 border-blue-500"
                          : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <Icon className={`w-5 h-5 ${
                        isActive ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"
                      }`} />
                      
                      {!isCollapsed && (
                        <>
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <span className="ml-auto px-2 py-0.5 text-xs bg-rose-500/90 text-white rounded-full min-w-[1.5rem] text-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900/95 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-slate-700">
                          {item.name}
                          {item.badge && ` (${item.badge})`}
                        </div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-700/40">
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:bg-rose-500/15 hover:text-rose-400 transition-all duration-200 w-full ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <LogOut className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">Logout</span>}
              </button>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="md:hidden absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}