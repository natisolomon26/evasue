"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Calendar, FileText, Mail, Users, Settings, X, Menu 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Materials", href: "/admin/materials", icon: FileText },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onToggle, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 text-white shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed md:static w-64 h-screen bg-white/90 backdrop-blur-xl shadow-xl border-r border-slate-200/50 z-40"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => window.innerWidth < 768 && onClose()}
                      className="flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 group"
                    >
                      <Icon className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Close button (mobile only) */}
            <button
              onClick={onClose}
              className="md:hidden absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
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
            className="md:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
}
