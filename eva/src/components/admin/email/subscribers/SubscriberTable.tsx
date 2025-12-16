"use client";

import { useState, useMemo } from "react";
import { 
  Eye, 
  Trash2, 
  Edit, 
  Mail, 
  ChevronUp, 
  ChevronDown, 
  Filter, 
  MoreVertical,
  Search,
  Check,
  User,
  Calendar,
  Tag,
  AlertCircle,
  Ban,
  CheckCircle,
  Clock,
  Download,
  Copy,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface SubscriberTableProps {
  subscribers: Subscriber[];
  onView?: (s: Subscriber) => void;
  onEdit?: (s: Subscriber) => void;
  onDelete?: (s: Subscriber) => void;
  pageSize?: number;
  loading?: boolean;
}

type SortField = 'email' | 'name' | 'status' | 'createdAt' | 'lastActive';
type SortDirection = 'asc' | 'desc';

export default function SubscriberTable({ 
  subscribers, 
  onView, 
  onEdit, 
  onDelete, 
  pageSize = 10,
  loading = false
}: SubscriberTableProps) {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Sort subscribers
  const sortedSubscribers = useMemo(() => {
    return [...subscribers].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'createdAt' || sortField === 'lastActive') {
        aValue = new Date(aValue || 0).getTime();
        bValue = new Date(bValue || 0).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [subscribers, sortField, sortDirection]);

  // Filter subscribers
  const filteredSubscribers = useMemo(() => {
    return sortedSubscribers.filter(subscriber => {
      const matchesSearch = 
        subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscriber.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscriber.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [sortedSubscribers, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredSubscribers.length / pageSize);
  const currentData = filteredSubscribers.slice((page - 1) * pageSize, page * pageSize);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedSubscribers.length === currentData.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(currentData.map(s => s._id));
    }
  };

  // Handle individual select
  const handleSelectSubscriber = (id: string) => {
    setSelectedSubscribers(prev =>
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: React.ReactNode; bgColor: string }> = {
      active: {
        color: 'text-emerald-700',
        icon: <CheckCircle className="w-4 h-4" />,
        bgColor: 'bg-emerald-100'
      },
      inactive: {
        color: 'text-amber-700',
        icon: <Clock className="w-4 h-4" />,
        bgColor: 'bg-amber-100'
      },
      unsubscribed: {
        color: 'text-gray-700',
        icon: <Ban className="w-4 h-4" />,
        bgColor: 'bg-gray-100'
      },
      bounced: {
        color: 'text-red-700',
        icon: <AlertCircle className="w-4 h-4" />,
        bgColor: 'bg-red-100'
      }
    };
    return statusConfig[status] || statusConfig.inactive;
  };

  // Sort indicator
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  // Bulk actions
  const handleBulkDelete = () => {
    if (selectedSubscribers.length > 0 && window.confirm(`Delete ${selectedSubscribers.length} subscribers?`)) {
      selectedSubscribers.forEach(id => {
        // Handle bulk delete - you might want to implement a bulk API endpoint
        console.log('Delete subscriber:', id);
      });
      setSelectedSubscribers([]);
    }
  };

  const handleBulkExport = () => {
    if (selectedSubscribers.length > 0) {
      console.log('Export selected subscribers:', selectedSubscribers);
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    // Add toast notification here
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Bulk Actions */}
        {selectedSubscribers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-blue-800">
                {selectedSubscribers.length} selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkExport}
                className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4 inline mr-1" />
                Export
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4 inline mr-1" />
                Delete
              </button>
              <button
                onClick={() => setSelectedSubscribers([])}
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscribers..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="unsubscribed">Unsubscribed</option>
              <option value="bounced">Bounced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th className="w-12 px-6 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSubscribers.length === currentData.length && currentData.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                </th>
                {[
                  { field: 'email' as SortField, label: 'Subscriber' },
                  { field: 'status' as SortField, label: 'Status' },
                  { field: 'createdAt' as SortField, label: 'Subscribed' },
                  { field: 'lastActive' as SortField, label: 'Last Active' }
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer group"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center gap-1 hover:text-gray-900">
                      {label}
                      <SortIndicator field={field} />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Categories
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-4"></div></td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                        <div className="h-3 bg-gray-100 rounded w-32"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium text-gray-600 mb-2">No subscribers found</p>
                      <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentData.map((subscriber) => {
                  const isSelected = selectedSubscribers.includes(subscriber._id);
                  const statusInfo = getStatusInfo(subscriber.status);
                  
                  return (
                    <motion.tr
                      key={subscriber._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group hover:bg-gray-50/80 transition-colors duration-150 ${
                        isSelected ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectSubscriber(subscriber._id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                      </td>

                      {/* Email & Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                            {subscriber.name ? (
                              <span className="font-semibold">
                                {subscriber.name.charAt(0).toUpperCase()}
                              </span>
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                {subscriber.email}
                              </h4>
                              <button
                                onClick={() => copyEmail(subscriber.email)}
                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
                                title="Copy email"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                            {subscriber.name && (
                              <p className="text-sm text-gray-600 truncate">{subscriber.name}</p>
                            )}
                            {subscriber.tags && subscriber.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {subscriber.tags.slice(0, 2).map(tag => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {subscriber.tags.length > 2 && (
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                    +{subscriber.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="text-sm font-medium capitalize">{subscriber.status}</span>
                        </div>
                      </td>

                      {/* Subscribed Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(subscriber.createdAt)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(subscriber.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Last Active */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {subscriber.lastActive ? formatDate(subscriber.lastActive) : 'Never'}
                        </div>
                      </td>

                      {/* Categories */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {subscriber.categories.slice(0, 3).map(category => (
                            <span
                              key={category}
                              className="px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-100"
                            >
                              {category}
                            </span>
                          ))}
                          {subscriber.categories.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                              +{subscriber.categories.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onView?.(subscriber)}
                            className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-600 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </motion.button>

                          {onEdit && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onEdit?.(subscriber)}
                              className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-600 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-200 group"
                              title="Edit Subscriber"
                            >
                              <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </motion.button>
                          )}

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onDelete?.(subscriber)}
                            className="p-2 rounded-lg bg-gradient-to-r from-red-50 to-red-100/50 text-red-600 hover:from-red-100 hover:to-red-200 transition-all duration-200 group"
                            title="Delete Subscriber"
                          >
                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </motion.button>

                          <button
                            onClick={() => setExpandedRow(expandedRow === subscriber._id ? null : subscriber._id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Expanded Row Details */}
        <AnimatePresence>
          {expandedRow && currentData.find(s => s._id === expandedRow) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100"
            >
              {currentData
                .filter(s => s._id === expandedRow)
                .map(subscriber => (
                  <div key={subscriber._id} className="p-6 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Subscriber Details</h4>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Email</dt>
                            <dd className="font-medium text-gray-900">{subscriber.email}</dd>
                          </div>
                          {subscriber.name && (
                            <div className="flex justify-between">
                              <dt className="text-gray-600">Name</dt>
                              <dd className="font-medium text-gray-900">{subscriber.name}</dd>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Source</dt>
                            <dd className="font-medium text-gray-900 capitalize">
                              {subscriber.source || 'Manual'}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Categories & Tags</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Categories</p>
                            <div className="flex flex-wrap gap-2">
                              {subscriber.categories.map(category => (
                                <span
                                  key={category}
                                  className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm rounded-full border border-blue-200"
                                >
                                  <Tag className="w-3 h-3 inline mr-1" />
                                  {category}
                                </span>
                              ))}
                            </div>
                          </div>
                          {subscriber.tags && subscriber.tags.length > 0 && (
                            <div>
                              <p className="text-sm text-gray-600 mb-2">Tags</p>
                              <div className="flex flex-wrap gap-2">
                                {subscriber.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
                        <div className="space-y-2">
                          <button
                            onClick={() => onView?.(subscriber)}
                            className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-700">View Details</span>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </button>
                          {onEdit && (
                            <button
                              onClick={() => onEdit?.(subscriber)}
                              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <span className="text-sm font-medium text-gray-700">Edit Subscriber</span>
                              <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                          )}
                          <button
                            onClick={() => onDelete?.(subscriber)}
                            className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-700">Delete Subscriber</span>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredSubscribers.length)} of{' '}
                {filteredSubscribers.length} subscribers
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          page === pageNum
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && page < totalPages - 2 && (
                    <>
                      <span className="text-gray-400">...</span>
                      <button
                        onClick={() => setPage(totalPages)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          page === totalPages
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}