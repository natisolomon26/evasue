import Link from "next/link";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-bold text-xl border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block p-2 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
          <Link href="/admin/events" className="block p-2 hover:bg-gray-700 rounded">
            Events
          </Link>
          <Link href="/admin/subscribers" className="block p-2 hover:bg-gray-700 rounded">
            Subscribers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              fetch("/api/auth/logout", { method: "POST" }).then(() =>
                window.location.assign("/login")
              );
            }}
          >
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
