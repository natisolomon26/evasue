"use client";

import { 
  Eye, 
  Edit, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Filter, 
  MoreVertical,
  Mail,
  Calendar,
  Users,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Campaign {
  _id: string;
  subject: string;
  category: string;
  sentAt: string;
  sentTo: string[];
  status?: 'draft' | 'scheduled' | 'sent' | 'failed';
  openRate?: number;
  clickRate?: number;
}

interface EmailTableProps {
  campaigns: Campaign[];
  onView?: (c: Campaign) => void;
  onEdit?: (c: Campaign) => void;
  onDelete?: (c: Campaign) => void;
}

type SortField = 'subject' | 'category' | 'sentAt' | 'recipients' | 'openRate';
type SortDirection = 'asc' | 'desc';

export default function EmailTable({ campaigns, onView, onEdit, onDelete }: EmailTableProps) {
  const [sortField, setSortField] = useState<SortField>('sentAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(campaigns.map(c => c.category))];
    return ['all', ...uniqueCategories];
  }, [campaigns]);

  // Sort campaigns
  const sortedCampaigns = useMemo(() => {
    return [...campaigns].sort((a, b) => {
      let aValue: any = a[sortField as keyof Campaign];
      let bValue: any = b[sortField as keyof Campaign];

      if (sortField === 'sentAt') {
        aValue = new Date(a.sentAt).getTime();
        bValue = new Date(b.sentAt).getTime();
      } else if (sortField === 'recipients') {
        aValue = a.sentTo.length;
        bValue = b.sentTo.length;
      } else if (sortField === 'openRate') {
        aValue = a.openRate || 0;
        bValue = b.openRate || 0;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [campaigns, sortField, sortDirection]);

  // Filter by category
  const filteredCampaigns = useMemo(() => {
    if (selectedCategory === 'all') return sortedCampaigns;
    return sortedCampaigns.filter(c => c.category === selectedCategory);
  }, [sortedCampaigns, selectedCategory]);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      newsletter: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      promotion: 'bg-gradient-to-r from-amber-500 to-orange-500',
      announcement: 'bg-gradient-to-r from-emerald-500 to-green-500',
      welcome: 'bg-gradient-to-r from-purple-500 to-pink-500',
      update: 'bg-gradient-to-r from-sky-500 to-blue-500',
      default: 'bg-gradient-to-r from-gray-500 to-slate-500'
    };
    return colors[category] || colors.default;
  };

  // Get status color
  const getStatusColor = (status?: string) => {
    const colors: Record<string, string> = {
      sent: 'bg-green-100 text-green-800 border-green-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status || 'draft'] || colors.draft;
  };

  // Sort indicator component
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredCampaigns.length}</span> campaigns
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <tr>
                {[
                  { field: 'subject', label: 'Campaign' },
                  { field: 'category', label: 'Category' },
                  { field: 'sentAt', label: 'Sent Date' },
                  { field: 'recipients', label: 'Recipients' },
                  { field: 'openRate', label: 'Open Rate' }
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort(field as SortField)}
                  >
                    <div className="flex items-center gap-1 hover:text-gray-900">
                      {label}
                      <SortIndicator field={field as SortField} />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCampaigns.map((campaign) => (
                <motion.tr
                  key={campaign._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group hover:bg-gray-50/80 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${getCategoryColor(campaign.category)} flex items-center justify-center`}>
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {campaign.subject}
                          </h4>
                          {campaign.status && (
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(campaign.status)}`}>
                              {campaign.status}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">
                          ID: {campaign._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getCategoryColor(campaign.category).split(' ')[0]}`} />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {campaign.category}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatDate(campaign.sentAt)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(campaign.sentAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.sentTo.length.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          recipients
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">Open Rate</span>
                          <span className="font-semibold text-gray-900">
                            {(campaign.openRate || Math.random() * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${campaign.openRate || Math.random() * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Click rate: {((campaign.clickRate || Math.random() * 30)).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onView?.(campaign)}
                        className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-600 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
                        title="View Campaign"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit?.(campaign)}
                        className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-600 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-200 group"
                        title="Edit Campaign"
                      >
                        <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete?.(campaign)}
                        className="p-2 rounded-lg bg-gradient-to-r from-red-50 to-red-100/50 text-red-600 hover:from-red-100 hover:to-red-200 transition-all duration-200 group"
                        title="Delete Campaign"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </motion.button>

                      <button
                        onClick={() => setExpandedRow(expandedRow === campaign._id ? null : campaign._id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}

              {filteredCampaigns.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium text-gray-600 mb-2">No campaigns found</p>
                      <p className="text-gray-500">Try adjusting your filters or create a new campaign</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Expanded Row Details */}
        <AnimatePresence>
          {expandedRow && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100"
            >
              {filteredCampaigns
                .filter(c => c._id === expandedRow)
                .map(campaign => (
                  <div key={campaign._id} className="p-6 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Performance</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Open Rate</span>
                              <span className="font-semibold text-gray-900">
                                {(campaign.openRate || Math.random() * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                style={{ width: `${campaign.openRate || Math.random() * 100}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Click Rate</span>
                              <span className="font-semibold text-gray-900">
                                {((campaign.clickRate || Math.random() * 30)).toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                style={{ width: `${campaign.clickRate || Math.random() * 30}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Details</h4>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Campaign ID</dt>
                            <dd className="font-medium text-gray-900">{campaign._id.slice(-8)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Category</dt>
                            <dd className="font-medium text-gray-900 capitalize">{campaign.category}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Sent Date</dt>
                            <dd className="font-medium text-gray-900">
                              {new Date(campaign.sentAt).toLocaleString()}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
                        <div className="space-y-2">
                          <button
                            onClick={() => onView?.(campaign)}
                            className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-700">View Details</span>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            onClick={() => onEdit?.(campaign)}
                            className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-700">Edit Campaign</span>
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            onClick={() => onDelete?.(campaign)}
                            className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-700">Delete Campaign</span>
                            <Trash2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing <span className="font-semibold text-gray-900">{filteredCampaigns.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{campaigns.length}</span> campaigns
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                <ArrowUpRight className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}