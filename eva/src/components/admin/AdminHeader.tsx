// src/components/admin/AdminHeader.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();
  
  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "POST" })
      .then(() => {
        // Use router.push for Next.js navigation instead of window.location.href
        router.push("/login"); 
      })
      .catch(error => {
        console.error("Logout failed:", error);
      });
  };
  
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}