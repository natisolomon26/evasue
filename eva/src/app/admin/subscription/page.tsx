"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Plus, 
  Download, 
  Upload, 
  Filter, 
  Search, 
  RefreshCw,
  BarChart3,
  Mail,
  Calendar,
  ChevronDown,
  Globe,
  Sparkles,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SubscriberCard from "@/components/admin/email/subscribers/SubscribersCard";
import SubscriberTable from "@/components/admin/email/subscribers/SubscriberTable";
import ViewSubscriberModal from "@/components/admin/email/subscribers/ViewSubscriberModal";
import DeleteSubscriberModal from "@/components/admin/email/subscribers/DeleteSubscriberModal";
import ImportSubscribersModal from "@/components/admin/email/subscribers/ImportSubscribersModal";
import ExportSubscribersModal from "@/components/admin/email/subscribers/ExportSubscribersModal";
import AddSubscriberModal from "@/components/admin/email/subscribers/AddSubscriberModal";

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  categories: string[];
  status: 'active' | 'inactive' | 'unsubscribed' | 'bounced';
  createdAt: string;
  lastActive?: string;
  source?: string;
  tags?: string[];
}

interface Stats {
  total: number;
  active: number;
  inactive: number;
  unsubscribed: number;
  bounced: number;
  growthRate: number;
  engagementRate: number;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [viewSubscriber, setViewSubscriber] = useState<Subscriber | null>(null);
  const [deleteSubscriber, setDeleteSubscriber] = useState<Subscriber | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'email'>('newest');

  // Calculate statistics
  const stats = useMemo<Stats>(() => {
    const total = subscribers.length;
    const active = subscribers.filter(s => s.status === 'active').length;
    const inactive = subscribers.filter(s => s.status === 'inactive').length;
    const unsubscribed = subscribers.filter(s => s.status === 'unsubscribed').length;
    const bounced = subscribers.filter(s => s.status === 'bounced').length;
    
    // Calculate growth rate (mock data - replace with actual calculation)
    const growthRate = total > 0 ? ((active / total) * 100) - 10 : 0;
    const engagementRate = total > 0 ? ((active + 0.5 * inactive) / total) * 100 : 0;

    return {
      total,
      active,
      inactive,
      unsubscribed,
      bounced,
      growthRate: parseFloat(growthRate.toFixed(1)),
      engagementRate: parseFloat(engagementRate.toFixed(1))
    };
  }, [subscribers]);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscribers");
      if (!res.ok) throw new Error("Failed to fetch subscribers");
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter and sort subscribers
  useEffect(() => {
    let result = [...subscribers];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscriber.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscriber.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(subscriber => subscriber.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(subscriber => 
        subscriber.categories.includes(categoryFilter)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });

    setFilteredSubscribers(result);
  }, [subscribers, searchQuery, statusFilter, categoryFilter, sortBy]);

  // Get unique categories for filter
  const uniqueCategories = useMemo(() => {
    const categories = subscribers.flatMap(s => s.categories);
    return ['all', ...Array.from(new Set(categories))];
  }, [subscribers]);

  // Handle import success
  const handleImportSuccess = (importedCount: number) => {
    fetchData();
    // Show success toast
    console.log(`Successfully imported ${importedCount} subscribers`);
  };

  // Handle export
  const handleExport = (format: 'csv' | 'json') => {
    console.log(`Exporting subscribers as ${format}`);
    // Implement export logic
  };

  // Handle subscriber added
  const handleSubscriberAdded = () => {
    fetchData();
  };

  // Chart data for growth visualization
  const growthChartData = useMemo(() => {
    const now = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (29 - i));
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        subscribers: Math.floor(stats.total * (0.8 + (i / 30) * 0.2)) // Mock growth
      };
    });
    return last30Days;
  }, [stats.total]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Subscribers</h1>
            <p className="text-gray-600 mt-2">Manage your email list subscribers and their preferences</p>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchData()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              Add Subscriber
            </motion.button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search subscribers by email, name, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="unsubscribed">Unsubscribed</option>
                <option value="bounced">Bounced</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="email">Sort by Email</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1"
        >
          <SubscriberCard 
            title="Total Subscribers" 
            value={stats.total} 
            icon={<Users className="w-6 h-6" />}
            color="from-blue-500 to-cyan-500"
            change={`+${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate}% this month`}
            loading={loading}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1"
        >
          <SubscriberCard 
            title="Active Subscribers" 
            value={stats.active} 
            icon={<UserCheck className="w-6 h-6" />}
            color="from-emerald-500 to-green-500"
            change={`${((stats.active / stats.total) * 100).toFixed(1)}% of total`}
            loading={loading}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1"
        >
          <SubscriberCard 
            title="Inactive Subscribers" 
            value={stats.inactive} 
            icon={<UserX className="w-6 h-6" />}
            color="from-amber-500 to-orange-500"
            change={`${((stats.inactive / stats.total) * 100).toFixed(1)}% of total`}
            loading={loading}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1"
        >
          <SubscriberCard 
            title="Engagement Rate" 
            value={`${stats.engagementRate}%`} 
            icon={<BarChart3 className="w-6 h-6" />}
            color="from-purple-500 to-pink-500"
            change="+2.1% from last month"
            loading={loading}
          />
        </motion.div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Subscriber List</h2>
              <p className="text-gray-600 text-sm">
                Showing {filteredSubscribers.length} of {subscribers.length} subscribers
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {loading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              )}
              <div className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-1">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredSubscribers.length > 0 ? (
            <SubscriberTable
              subscribers={filteredSubscribers}
              pageSize={10}
              onView={(s) => setViewSubscriber(s)}
              onDelete={(s) => setDeleteSubscriber(s)}
            />
          ) : (
            <div className="h-64 flex flex-col items-center justify-center">
              <Users className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? 'No matching subscribers' : 'No subscribers yet'}
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                {searchQuery 
                  ? 'Try adjusting your search terms or filters'
                  : 'Start by importing subscribers or adding them manually'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all"
                >
                  Add First Subscriber
                </button>
                <button
                  onClick={() => setImportModalOpen(true)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Import Subscribers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      
      {/* Modals */}
      <AnimatePresence>
        <ViewSubscriberModal
          open={!!viewSubscriber}
          onClose={() => setViewSubscriber(null)}
          subscriber={viewSubscriber}
        />

        <DeleteSubscriberModal
          open={!!deleteSubscriber}
          onClose={() => setDeleteSubscriber(null)}
          onDelete={async () => {
            await fetch(`/api/subscribers/${deleteSubscriber?._id}`, { method: "DELETE" });
            setDeleteSubscriber(null);
            fetchData();
          }}
          email={deleteSubscriber?.email}
        />

        <ImportSubscribersModal
          open={importModalOpen}
          onClose={() => setImportModalOpen(false)}
          onSuccess={handleImportSuccess}
        />

        <ExportSubscribersModal
          open={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          onExport={handleExport}
          totalSubscribers={subscribers.length}
        />

        <AddSubscriberModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSuccess={handleSubscriberAdded}
        />
      </AnimatePresence>
    </div>
  );
}