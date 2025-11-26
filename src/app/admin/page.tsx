"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, 
  FileText, 
  Mail, 
  Users, 
  Plus,
  Activity,
  UserPlus,
  FileDown,
  MailOpen,
  BarChart3,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

import { StatCard } from "@/components/admin/dashboard/StatCard";
import { MetricCard } from "@/components/admin/dashboard/MetricCard";
import { EventCard } from "@/components/admin/dashboard/EventCard";
import { MaterialCard } from "@/components/admin/dashboard/MaterialCard";
import { QuickAction } from "@/components/admin/dashboard/QuickAction";
import { StatusItem } from "@/components/admin/dashboard/StatusItem";
import { SectionHeader } from "@/components/admin/dashboard/SectionHeader";
import { MetricItem } from "@/components/admin/dashboard/MetricItem";
import { DashboardSkeleton } from "@/components/admin/dashboard/DashboardSkeleton";

// Types
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
          <h1 className="text-3xl font-bold text-sky-900">Dashboard Overview</h1>
          <p className="text-sky-700 mt-1">
            Welcome back! Heres whats happening today.
          </p>
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
        {/* Recent Events & Materials */}
        <div className="xl:col-span-2 space-y-6">
          <SectionHeader 
            title="Recent Events" 
            action={{
              label: "View All Events",
              href: "/admin/events"
            }}
          />
          <div className="bg-white/10 rounded-2xl shadow-sm border border-white/90 overflow-hidden">
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

          <SectionHeader 
            title="Popular Materials" 
            action={{
              label: "View All Materials",
              href: "/admin/materials"
            }}
          />
          <div className="bg-blue-200/30 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
          {/* Performance Metrics */}
          <div className="bg-yellow-300/50 rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
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
          <div className="bg-green-300/30 rounded-2xl shadow-sm border border-green-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
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
          <div className="bg-red-300/50 rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">System Status</h3>
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