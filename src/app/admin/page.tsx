// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, 
  FileText, 
  Mail, 
  Users, 
  TrendingUp, 
  Download, 
  Eye, 
  MoreVertical,
  Plus,
  BarChart3,
  Activity,
  Clock,
  UserPlus,
  FileDown,
  MailOpen
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock data types
interface Event {
  id: string;
  title: string;
  date: string;
  registrations: number;
  status: 'active' | 'upcoming' | 'completed';
}

interface Material {
  id: string;
  title: string;
  type: string;
  downloads: number;
  uploadedAt: string;
  size: string;
}

interface Stats {
  totalEvents: number;
  totalMaterials: number;
  totalSubscribers: number;
  totalUsers: number;
  activeEvents: number;
  newRegistrations: number;
  materialDownloads: number;
  newsletterOpenRate: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [recentMaterials, setRecentMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data fetch
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalEvents: 24,
        totalMaterials: 48,
        totalSubscribers: 1230,
        totalUsers: 142,
        activeEvents: 8,
        newRegistrations: 45,
        materialDownloads: 892,
        newsletterOpenRate: 68
      });

      setRecentEvents([
        { id: '1', title: "NLS - National Leadership Summit", date: "2024-01-15", registrations: 142, status: 'active' },
        { id: '2', title: "Prayer Night - January", date: "2024-01-20", registrations: 89, status: 'upcoming' },
        { id: '3', title: "Campus Fellowship", date: "2024-01-25", registrations: 67, status: 'upcoming' },
        { id: '4', title: "Youth Conference", date: "2023-12-15", registrations: 234, status: 'completed' }
      ]);

      setRecentMaterials([
        { id: '1', title: "Evangelism Guide 2024", type: "PDF", downloads: 156, uploadedAt: "2024-01-10", size: "2.4 MB" },
        { id: '2', title: "Discipleship Manual", type: "DOCX", downloads: 89, uploadedAt: "2024-01-08", size: "1.8 MB" },
        { id: '3', title: "Sermon Notes Template", type: "PPTX", downloads: 203, uploadedAt: "2024-01-05", size: "3.1 MB" },
        { id: '4', title: "Leadership Training Slides", type: "PPTX", downloads: 67, uploadedAt: "2024-01-02", size: "4.2 MB" }
      ]);

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Heres whats happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <Link
            href="/admin/events?create=true"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Event
          </Link>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Events"
          value={stats?.totalEvents.toString() || "0"}
          change="+12%"
          trend="up"
          icon={Calendar}
          href="/admin/events"
          color="blue"
        />
        <StatCard
          title="Materials"
          value={stats?.totalMaterials.toString() || "0"}
          change="+8%"
          trend="up"
          icon={FileText}
          href="/admin/materials"
          color="green"
        />
        <StatCard
          title="Newsletter Subs"
          value={stats?.totalSubscribers.toLocaleString() || "0"}
          change="+23%"
          trend="up"
          icon={Mail}
          href="/admin/newsletter"
          color="purple"
        />
        <StatCard
          title="Active Users"
          value={stats?.totalUsers.toString() || "0"}
          change="+5%"
          trend="up"
          icon={Users}
          href="/admin/users"
          color="orange"
        />
      </div>

      {/* Secondary Stats & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Active Events"
          value={stats?.activeEvents.toString() || "0"}
          icon={Activity}
          description="Currently running events"
          trend="up"
        />
        <MetricCard
          title="New Registrations"
          value={stats?.newRegistrations.toString() || "0"}
          icon={UserPlus}
          description="This week"
          trend="up"
        />
        <MetricCard
          title="Material Downloads"
          value={stats?.materialDownloads.toString() || "0"}
          icon={FileDown}
          description="Total downloads"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Events */}
        <div className="xl:col-span-2 space-y-6">
          <SectionHeader 
            title="Recent Events" 
            action={{
              label: "View All Events",
              href: "/admin/events"
            }}
          />
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 space-y-4">
              {recentEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Materials */}
          <SectionHeader 
            title="Popular Materials" 
            action={{
              label: "View All Materials",
              href: "/admin/materials"
            }}
          />
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 space-y-4">
              {recentMaterials.map((material, index) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MaterialCard material={material} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <MetricItem
                icon={MailOpen}
                label="Newsletter Open Rate"
                value={`${stats?.newsletterOpenRate}%`}
                trend="up"
              />
              <MetricItem
                icon={Users}
                label="User Engagement"
                value="78%"
                trend="up"
              />
              <MetricItem
                icon={BarChart3}
                label="Platform Growth"
                value="+34%"
                trend="up"
              />
              <MetricItem
                icon={Clock}
                label="Avg. Response Time"
                value="2.3h"
                trend="down"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <QuickAction
                icon={Plus}
                label="Create New Event"
                href="/admin/events?create=true"
                description="Set up a new event"
              />
              <QuickAction
                icon={Mail}
                label="Send Newsletter"
                href="/admin/newsletter?compose=true"
                description="Reach your subscribers"
              />
              <QuickAction
                icon={FileText}
                label="Upload Material"
                href="/admin/materials?upload=true"
                description="Share new resources"
              />
              <QuickAction
                icon={Users}
                label="Manage Users"
                href="/admin/users"
                description="View and manage users"
              />
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">System Status</h3>
            <div className="space-y-3">
              <StatusItem label="API Server" status="operational" />
              <StatusItem label="Database" status="operational" />
              <StatusItem label="File Storage" status="operational" />
              <StatusItem label="Email Service" status="degraded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------ COMPONENTS ------------------ */

function StatCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  href, 
  color 
}: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -2 }}
        className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {change}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            <span>View details</span>
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend 
}: {
  title: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  description: string;
  trend: 'up' | 'down';
}) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{value}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{description}</p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[event.status]}`}>
            {event.status}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{new Date(event.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{event.registrations} registrations</span>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}

function MaterialCard({ material }: { material: Material }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{material.title}</h4>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{material.type}</span>
            <span>•</span>
            <span>{material.size}</span>
            <span>•</span>
            <span>{material.downloads} downloads</span>
          </div>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
        <Download className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}

function MetricItem({ icon: Icon, label, value, trend }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  value: string;
  trend: 'up' | 'down';
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </div>
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
        <TrendingUp className={`w-4 h-4 ${
          trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'
        }`} />
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, href, description }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  href: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
    >
      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">{label}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}

function StatusItem({ label, status }: { label: string; status: string }) {
  const statusColors = {
    operational: 'bg-green-500',
    degraded: 'bg-yellow-500',
    outage: 'bg-red-500'
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${statusColors[status as keyof typeof statusColors] || 'bg-gray-500'}`}></div>
        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{status}</span>
      </div>
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action?: { label: string; href: string } }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      {action && (
        <Link
          href={action.href}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-32 animate-pulse"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}