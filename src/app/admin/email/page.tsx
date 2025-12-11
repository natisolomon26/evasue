"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  Plus, 
  RefreshCw, 
  Mail, 
  Users, 
  Send, 
  BarChart3,
  Filter,
  Download,
  Search,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EmailTable from "@/components/admin/email/EmailTable";
import CampaignModal from "@/components/admin/email/campaign/CampaignModal";
import ViewCampaignModal from "@/components/admin/email/campaign/ViewCampaignModal";
import EditCampaignModal from "@/components/admin/email/campaign/EditCampaignModal";
import DeleteCampaignModal from "@/components/admin/email/campaign/DeleteCampaignModal";
import StatsCard from "@/components/admin/email/campaign/StatsCard";

interface Campaign {
  _id: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  sentAt: string;
  sentTo: string[];
  content?: string;
  scheduledFor?: string;
}

export default function AdminEmailPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewCampaign, setViewCampaign] = useState<Campaign | null>(null);
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null);
  const [deleteCampaign, setDeleteCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stats, setStats] = useState({
    totalSent: 0,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch subscribers
      const subsRes = await fetch("/api/subscribers");
      if (!subsRes.ok) throw new Error("Failed to fetch subscribers");
      const subs = await subsRes.json();
      setSubscribersCount(subs.length || 0);

      // Fetch campaigns
      const res = await fetch("/api/campaign");
      if (!res.ok) throw new Error("Failed to fetch campaigns");
      const data = await res.json();
      const campaigns = Array.isArray(data.campaigns) ? data.campaigns : [];
      setCampaigns(campaigns);

      // Calculate stats
      const totalSent = campaigns.reduce((acc: number, c: Campaign) => acc + (c.sentTo?.length || 0), 0);
      const sentCampaigns = campaigns.filter((c: Campaign) => c.status === 'sent');
      const totalRecipients = sentCampaigns.reduce((acc: number, c: Campaign) => acc + (c.sentTo?.length || 0), 0);
      
      // Mock analytics data (replace with actual API call)
      const mockAnalytics = {
        openRate: sentCampaigns.length > 0 ? Math.min(85, Math.random() * 100) : 0,
        clickRate: sentCampaigns.length > 0 ? Math.min(25, Math.random() * 100) : 0,
        bounceRate: sentCampaigns.length > 0 ? Math.min(5, Math.random() * 100) : 0
      };

      setStats({
        totalSent,
        openRate: parseFloat(mockAnalytics.openRate.toFixed(1)),
        clickRate: parseFloat(mockAnalytics.clickRate.toFixed(1)),
        bounceRate: parseFloat(mockAnalytics.bounceRate.toFixed(1))
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter campaigns based on search and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (campaign.content?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Prepare chart data
  const chartData = campaigns
    .filter(c => c.status === 'sent')
    .map((c) => ({
      date: new Date(c.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sent: c.sentTo?.length || 0,
      opens: Math.floor((c.sentTo?.length || 0) * (Math.random() * 0.8 + 0.2)), // Mock opens
      clicks: Math.floor((c.sentTo?.length || 0) * (Math.random() * 0.3 + 0.1)) // Mock clicks
    }))
    .slice(-10); // Last 10 campaigns

  // Handlers
  const handleSaveDraft = async (data: Partial<Campaign>) => {
    try {
      await fetch("/api/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleSend = async (data: Partial<Campaign>) => {
    try {
      await fetch("/api/campaign/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error("Error sending campaign:", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch("/api/export/campaigns");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "campaigns-export.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Email Campaigns</h1>
            <p className="text-gray-600 mt-2">Manage and track your email campaigns</p>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchData()}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              Create Campaign
            </motion.button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search campaigns by subject or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2.5 rounded-lg border border-gray-200">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Subscribers"
          value={subscribersCount}
          icon={<Users className="w-6 h-6" />}
          color="from-blue-500 to-cyan-500"
          change="+12% this month"
          loading={isLoading}
        />
        
        <StatsCard
          title="Campaigns Sent"
          value={campaigns.filter(c => c.status === 'sent').length}
          icon={<Send className="w-6 h-6" />}
          color="from-green-500 to-emerald-500"
          change="+8% this month"
          loading={isLoading}
        />
        
        <StatsCard
          title="Total Emails Sent"
          value={stats.totalSent}
          icon={<Mail className="w-6 h-6" />}
          color="from-purple-500 to-pink-500"
          change="+15% this month"
          loading={isLoading}
        />
        
        <StatsCard
          title="Average Open Rate"
          value={`${stats.openRate}%`}
          icon={<BarChart3 className="w-6 h-6" />}
          color="from-amber-500 to-orange-500"
          change="+2.5% from last month"
          loading={isLoading}
        />
      </div>

      

        {/* Performance Metrics */}
        

        

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Campaigns</h2>
              <p className="text-gray-600 text-sm">
                Showing {filteredCampaigns.length} of {campaigns.length} campaigns
              </p>
            </div>
            {isLoading && (
              <div className="flex items-center gap-2 text-blue-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-1">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <EmailTable
              campaigns={filteredCampaigns}
              onView={(c) => setViewCampaign(c)}
              onEdit={(c) => setEditCampaign(c)}
              onDelete={(c) => setDeleteCampaign(c)}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        <ViewCampaignModal
          open={!!viewCampaign}
          onClose={() => setViewCampaign(null)}
          campaign={viewCampaign}
        />

        <EditCampaignModal
          open={!!editCampaign}
          onClose={() => setEditCampaign(null)}
          campaign={editCampaign}
          onSave={async (data) => {
            await fetch(`/api/campaign/${data._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            setEditCampaign(null);
            fetchData();
          }}
        />

        <DeleteCampaignModal
          open={!!deleteCampaign}
          onClose={() => setDeleteCampaign(null)}
          onDelete={async () => {
            await fetch(`/api/campaign/${deleteCampaign?._id}`, { method: "DELETE" });
            setDeleteCampaign(null);
            fetchData();
          }}
          subject={deleteCampaign?.subject}
        />

        <CampaignModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSaveDraft={handleSaveDraft}
          onSend={handleSend}
        />
      </AnimatePresence>
    </div>
  );
}