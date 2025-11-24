// app/admin/page.tsx
"use client";

import { Calendar, FileText, Mail, Users } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      {/* Page title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your system activity</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <DashboardCard
          title="Total Events"
          value="12"
          icon={Calendar}
          href="/admin/events"
        />

        <DashboardCard
          title="Materials"
          value="48"
          icon={FileText}
          href="/admin/materials"
        />

        <DashboardCard
          title="Newsletter Subs"
          value="230"
          icon={Mail}
          href="/admin/newsletter"
        />

        <DashboardCard
          title="Users"
          value="14"
          icon={Users}
          href="/admin/users"
        />

      </div>

      {/* Recent events */}
      <section>
        <SectionHeader title="Recent Events" />
        <div className="bg-white p-6 shadow-sm rounded-xl border border-slate-200">
          <ul className="space-y-4">
            {["Prayer Night", "Campus Fellowship", "Leadership Training"].map((item, i) => (
              <li key={i} className="flex justify-between items-center pb-3 border-b last:border-none">
                <span className="font-medium text-slate-700">{item}</span>
                <button className="text-sm text-blue-600 hover:underline">
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent Materials */}
      <section>
        <SectionHeader title="Latest Materials" />
        <div className="bg-white p-6 shadow-sm rounded-xl border border-slate-200">
          <ul className="space-y-4">
            {["Evangelism Guide.pdf", "Discipleship Manual.docx", "Sermon Notes.ppt"].map((item, i) => (
              <li key={i} className="flex justify-between items-center pb-3 border-b last:border-none">
                <span className="font-medium text-slate-700">{item}</span>
                <button className="text-sm text-blue-600 hover:underline">
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}

/* ------------------ COMPONENTS ------------------ */

function DashboardCard({
  title,
  value,
  icon: Icon,
  href,
}: {
  title: string;
  value: string;
  icon: any;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition flex items-center gap-4 group"
    >
      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-white group-hover:bg-slate-700">
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <h3 className="text-sm text-slate-500">{title}</h3>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </Link>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
  );
}
