// app/admin/newsletter/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Plus, 
  Users, 
  Send, 
  BarChart3,
  Search,
  Filter,
  Calendar,
  Edit3,
  Trash2,
} from "lucide-react";
import CreateNewsletterModal from "@/components/admin/newsletter/CreateNewsletterModal";
import EditNewsletterModal from "@/components/admin/newsletter/EditNewsletterModal";
import DeleteNewsletterModal from "@/components/admin/newsletter/DeleteNewsletterModal";
import SendNewsletterModal from "@/components/admin/newsletter/SendNewsletterModal";

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  content: string;
  status: "draft" | "scheduled" | "sent";
  scheduledFor?: string;
  sentAt?: string;
  recipients: number;
  opened: number;
  clicks: number;
  createdAt: string;
  createdBy: string;
}

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "scheduled" | "sent">("all");
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editNewsletter, setEditNewsletter] = useState<Newsletter | null>(null);
  const [deleteNewsletter, setDeleteNewsletter] = useState<Newsletter | null>(null);
  const [sendNewsletter, setSendNewsletter] = useState<Newsletter | null>(null);

  // Fetch newsletters
  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/newsletters");
      if (!res.ok) throw new Error("Failed to fetch newsletters");
      const data = await res.json();
      setNewsletters(data);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      alert("Failed to load newsletters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  // Filter newsletters
  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || newsletter.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const stats = {
    total: newsletters.length,
    drafts: newsletters.filter(n => n.status === "draft").length,
    scheduled: newsletters.filter(n => n.status === "scheduled").length,
    sent: newsletters.filter(n => n.status === "sent").length,
    totalRecipients: newsletters.reduce((sum, n) => sum + n.recipients, 0),
    avgOpenRate: newsletters.length > 0 
      ? (newsletters.reduce((sum, n) => sum + (n.opened / n.recipients * 100), 0) / newsletters.length).toFixed(1)
      : "0"
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: "bg-gray-100 text-gray-800 border-gray-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      sent: "bg-green-100 text-green-800 border-green-200"
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2"
            >
              Newsletter Management
            </motion.h1>
            <p className="text-gray-600 text-lg">
              Create and manage email campaigns for your audience
            </p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Newsletter
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Newsletters"
            value={stats.total}
            icon={Mail}
            color="blue"
            delay={0.1}
          />
          <StatCard
            title="Drafts"
            value={stats.drafts}
            icon={Edit3}
            color="gray"
            delay={0.2}
          />
          <StatCard
            title="Scheduled"
            value={stats.scheduled}
            icon={Calendar}
            color="blue"
            delay={0.3}
          />
          <StatCard
            title="Sent"
            value={stats.sent}
            icon={Send}
            color="green"
            delay={0.4}
          />
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recipients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalRecipients.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Open Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.avgOpenRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search newsletters by title or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="sent">Sent</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Grid/Table View */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Newsletters ({filteredNewsletters.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">Loading newsletters...</span>
              </div>
            </div>
          ) : filteredNewsletters.length > 0 ? (
            <div className="overflow-x-auto">
              <NewsletterTable
                newsletters={filteredNewsletters}
                onEdit={setEditNewsletter}
                onDelete={setDeleteNewsletter}
                onSend={setSendNewsletter}
                getStatusBadge={getStatusBadge}
                formatDate={formatDate}
              />
            </div>
          ) : (
            <EmptyState
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              onCreate={() => setShowCreateModal(true)}
            />
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <CreateNewsletterModal
        open={showCreateModal}
        setOpen={setShowCreateModal}
        onCreated={fetchNewsletters}
      />
      <EditNewsletterModal
        open={!!editNewsletter}
        setOpen={() => setEditNewsletter(null)}
        newsletter={editNewsletter}
        onUpdated={fetchNewsletters}
      />
      <DeleteNewsletterModal
        open={!!deleteNewsletter}
        setOpen={() => setDeleteNewsletter(null)}
        newsletter={deleteNewsletter}
        onDeleted={fetchNewsletters}
      />
      <SendNewsletterModal
        open={!!sendNewsletter}
        setOpen={() => setSendNewsletter(null)}
        newsletter={sendNewsletter}
        onSent={fetchNewsletters}
      />
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: any;
  color: string;
  delay: number;
}

function StatCard({ title, value, icon: Icon, color, delay }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    gray: "bg-gray-100 text-gray-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${colorClasses[color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}

// Newsletter Table Component
interface NewsletterTableProps {
  newsletters: Newsletter[];
  onEdit: (newsletter: Newsletter) => void;
  onDelete: (newsletter: Newsletter) => void;
  onSend: (newsletter: Newsletter) => void;
  getStatusBadge: (status: string) => string;
  formatDate: (date: string) => string;
}

function NewsletterTable({ 
  newsletters, 
  onEdit, 
  onDelete, 
  onSend,
  getStatusBadge,
  formatDate 
}: NewsletterTableProps) {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Newsletter</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Recipients</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Performance</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created</th>
          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {newsletters.map((newsletter, index) => (
          <motion.tr
            key={newsletter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="px-6 py-4">
              <div>
                <p className="font-semibold text-gray-900">{newsletter.title}</p>
                <p className="text-sm text-gray-600 mt-1">{newsletter.subject}</p>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(newsletter.status)}`}>
                {newsletter.status.charAt(0).toUpperCase() + newsletter.status.slice(1)}
              </span>
              {newsletter.scheduledFor && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(newsletter.scheduledFor)}
                </p>
              )}
            </td>
            <td className="px-6 py-4">
              <p className="text-sm font-medium text-gray-900">
                {newsletter.recipients.toLocaleString()}
              </p>
            </td>
            <td className="px-6 py-4">
              {newsletter.status === "sent" ? (
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Opens: <span className="font-medium text-gray-900">{((newsletter.opened / newsletter.recipients) * 100).toFixed(1)}%</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Clicks: <span className="font-medium text-gray-900">{((newsletter.clicks / newsletter.recipients) * 100).toFixed(1)}%</span>
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Not sent yet</p>
              )}
            </td>
            <td className="px-6 py-4">
              <p className="text-sm text-gray-600">{formatDate(newsletter.createdAt)}</p>
              <p className="text-xs text-gray-500">by {newsletter.createdBy}</p>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end gap-2">
                {newsletter.status === "draft" && (
                  <>
                    <button
                      onClick={() => onSend(newsletter)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      title="Send newsletter"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(newsletter)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Edit newsletter"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => onDelete(newsletter)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Delete newsletter"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}

// Empty State Component
interface EmptyStateProps {
  searchTerm: string;
  statusFilter: string;
  onCreate: () => void;
}

function EmptyState({ searchTerm, statusFilter, onCreate }: EmptyStateProps) {
  return (
    <div className="p-12 text-center">
      <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No newsletters found</h3>
      <p className="text-gray-600 mb-4">
        {searchTerm || statusFilter !== "all" 
          ? "Try adjusting your search or filters" 
          : "Get started by creating your first newsletter"
        }
      </p>
      {!searchTerm && statusFilter === "all" && (
        <button
          onClick={onCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Create Newsletter
        </button>
      )}
    </div>
  );
}