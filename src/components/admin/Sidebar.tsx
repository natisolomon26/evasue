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
  BarChart3,
  Download,
  Upload
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
    badge: "5" // Example: pending events count
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
    badge: "12" // Example: new subscribers
  },
  { 
    name: "Users", 
    href: "/admin/users", 
    icon: Users, 
    permissionKey: "users",
    badge: "3" // Example: new users
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

const quickActions = [
  { name: "Create Event", icon: Calendar, href: "/admin/events?create=true" },
  { name: "Send Newsletter", icon: Mail, href: "/admin/newsletter?compose=true" },
  { name: "Upload Material", icon: Upload, href: "/admin/materials?upload=true" },
  { name: "View Reports", icon: Download, href: "/admin/analytics?reports=true" },
];

export default function Sidebar({ isOpen, onToggle, onClose }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  // Filter nav items based on permissions
  const allowedNavItems = navItems.filter(item => {
    if (!user) return false;
    if (user.role === "superadmin") return true;
    if (!item.permissionKey) return true;
    return user.permissions[item.permissionKey]?.read === true;
  });

  const isActiveLink = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
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

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex fixed top-6 left-64 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 -translate-x-1/2"
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
            className={`fixed md:relative h-screen bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl z-40 ${
              isCollapsed ? "w-20" : "w-80"
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 min-w-0"
                  >
                    <h2 className="text-xl font-bold text-white truncate">Admin Portal</h2>
                    <p className="text-slate-400 text-sm truncate">
                      {user?.role === "superadmin" ? "Super Administrator" : 
                       user?.role === "admin" ? "Administrator" : "Staff"}
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
                className="p-4 border-b border-slate-700/50"
              >
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      user.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{user.name}</p>
                    <p className="text-slate-400 text-xs truncate">{user.email}</p>
                  </div>
                  <button className="p-1 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <Bell className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-4 border-b border-slate-700/50"
              >
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                  Quick Actions
                </h3>
                <div className="space-y-1">
                  {quickActions.map((action) => (
                    <Link
                      key={action.name}
                      href={action.href}
                      onClick={() => window.innerWidth < 768 && onClose()}
                      className="flex items-center gap-3 p-2 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 group"
                    >
                      <action.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                      <span className="text-sm font-medium">{action.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Main Navigation */}
            <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
              <h3 className={`text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2 ${
                isCollapsed ? "text-center" : ""
              }`}>
                {isCollapsed ? "..." : "Navigation"}
              </h3>
              
              {allowedNavItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);
                
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => window.innerWidth < 768 && onClose()}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
                        isActive
                          ? "bg-blue-600/20 text-white border-l-4 border-blue-500"
                          : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${
                        isActive ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"
                      }`} />
                      
                      {!isCollapsed && (
                        <>
                          <span className="font-medium flex-1">{item.name}</span>
                          {item.badge && (
                            <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full min-w-5 text-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
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
            <div className="p-4 border-t border-slate-700/50">
              <div className={`space-y-1 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200 group w-full ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  {!isCollapsed && <span className="font-medium">Logout</span>}
                </button>
                
                
                
                
              </div>

              
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
      </AnimatePresence>
    </>
  );
}