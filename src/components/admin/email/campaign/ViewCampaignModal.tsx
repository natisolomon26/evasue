"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Mail, 
  Calendar, 
  Users, 
  Eye, 
  MousePointerClick, 
  BarChart3,
  Copy,
  Download,
  ExternalLink,
  Clock,
  Tag,
  MessageSquare,
  ChevronRight,
  Globe,
  Smartphone,
  Tablet,
  Monitor
} from "lucide-react";

interface ViewCampaignModalProps {
  open: boolean;
  onClose: () => void;
  campaign: {
    _id: string;
    subject: string;
    category: string;
    sentAt: string;
    sentTo: string[];
    htmlBody: string;
    previewText?: string;
    fromName?: string;
    fromEmail?: string;
    status?: 'draft' | 'scheduled' | 'sent' | 'failed';
    openRate?: number;
    clickRate?: number;
    bounceRate?: number;
    unsubscribes?: number;
    spamReports?: number;
  } | null;
}

export default function ViewCampaignModal({ open, onClose, campaign }: ViewCampaignModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'analytics' | 'details'>('preview');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!campaign) return null;

  // Calculate stats
  const stats = {
    delivered: campaign.sentTo.length,
    opens: Math.floor(campaign.sentTo.length * (campaign.openRate || 0.65)),
    clicks: Math.floor(campaign.sentTo.length * (campaign.clickRate || 0.15)),
    unsubscribes: campaign.unsubscribes || 0,
    bounces: Math.floor(campaign.sentTo.length * (campaign.bounceRate || 0.02)),
    spamReports: campaign.spamReports || 0
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleString(),
      relative: getRelativeTime(date),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(campaign.htmlBody);
    // Add toast notification here
  };

  const handleExportHTML = () => {
    const blob = new Blob([campaign.htmlBody], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${campaign.subject.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${getCategoryColor(campaign.category)}`}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{campaign.subject}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Tag className="w-4 h-4" />
                          <span className="text-sm font-medium capitalize">{campaign.category}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{formatDate(campaign.sentAt).relative}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">ID: {campaign._id.slice(-8)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyHTML}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Copy HTML"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-medium">Copy HTML</span>
                    </button>
                    <button
                      onClick={handleExportHTML}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Export HTML"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Export</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mt-6">
                  {[
                    { id: 'preview', label: 'Preview', icon: Eye },
                    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                    { id: 'details', label: 'Details', icon: ExternalLink }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as any)}
                      className={`flex items-center gap-2 px-6 py-3 font-medium text-sm border-b-2 transition-all ${
                        activeTab === id
                          ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'preview' && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Preview Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-700">Preview Mode:</span>
                          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
                            {[
                              { mode: 'desktop', icon: Monitor, label: 'Desktop' },
                              { mode: 'tablet', icon: Tablet, label: 'Tablet' },
                              { mode: 'mobile', icon: Smartphone, label: 'Mobile' }
                            ].map(({ mode, icon: Icon, label }) => (
                              <button
                                key={mode}
                                onClick={() => setPreviewMode(mode as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                                  previewMode === mode
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          Preview dimensions: {
                            previewMode === 'desktop' ? '1024px' :
                            previewMode === 'tablet' ? '768px' : '375px'
                          }
                        </div>
                      </div>

                      {/* Email Preview */}
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">Email Preview</h4>
                              <p className="text-sm text-gray-600">
                                {campaign.fromName} &lt;{campaign.fromEmail || 'noreply@example.com'}&gt;
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              {campaign.previewText || 'No preview text available'}
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`
                            bg-white overflow-auto mx-auto transition-all duration-200
                            ${previewMode === 'desktop' ? 'max-w-4xl' : ''}
                            ${previewMode === 'tablet' ? 'max-w-2xl' : ''}
                            ${previewMode === 'mobile' ? 'max-w-md' : ''}
                          `}
                        >
                          {/* Email container with responsive scaling */}
                          <div 
                            className={`
                              relative bg-white mx-auto transition-all duration-200
                              ${previewMode === 'desktop' ? 'w-full' : ''}
                              ${previewMode === 'tablet' ? 'w-[768px] scale-75 origin-top' : ''}
                              ${previewMode === 'mobile' ? 'w-[375px] scale-[0.6] origin-top' : ''}
                            `}
                          >
                            {/* Email content */}
                            <div className="min-h-[600px] border border-gray-200">
                              <div dangerouslySetInnerHTML={{ __html: campaign.htmlBody }} />
                            </div>
                            
                            {/* Email footer info */}
                            <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                              <p>This is a preview of the email sent to {campaign.sentTo.length} recipients.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'analytics' && (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Analytics Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { 
                            label: 'Delivered', 
                            value: stats.delivered.toLocaleString(), 
                            icon: Mail,
                            color: 'from-blue-500 to-cyan-500',
                            description: 'Emails successfully delivered'
                          },
                          { 
                            label: 'Opened', 
                            value: `${((stats.opens / stats.delivered) * 100).toFixed(1)}%`, 
                            subValue: `${stats.opens.toLocaleString()} opens`,
                            icon: Eye,
                            color: 'from-emerald-500 to-green-500',
                            description: 'Open rate performance'
                          },
                          { 
                            label: 'Clicked', 
                            value: `${((stats.clicks / stats.opens) * 100).toFixed(1)}%`, 
                            subValue: `${stats.clicks.toLocaleString()} clicks`,
                            icon: MousePointerClick,
                            color: 'from-purple-500 to-pink-500',
                            description: 'Click-through rate'
                          },
                          { 
                            label: 'Engagement', 
                            value: `${(((stats.opens + stats.clicks) / (stats.delivered * 2)) * 100).toFixed(1)}%`, 
                            icon: BarChart3,
                            color: 'from-amber-500 to-orange-500',
                            description: 'Overall engagement score'
                          }
                        ].map((stat, index) => (
                          <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                                <stat.icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-xs font-medium text-gray-500">{stat.label}</span>
                            </div>
                            <div className="mb-2">
                              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                              {stat.subValue && (
                                <div className="text-sm text-gray-600">{stat.subValue}</div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">{stat.description}</div>
                          </div>
                        ))}
                      </div>

                      {/* Detailed Metrics */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Performance Metrics */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                          <div className="space-y-4">
                            {[
                              { label: 'Open Rate', value: campaign.openRate || 65, color: 'bg-emerald-500' },
                              { label: 'Click Rate', value: campaign.clickRate || 15, color: 'bg-purple-500' },
                              { label: 'Bounce Rate', value: campaign.bounceRate || 2, color: 'bg-amber-500' },
                              { label: 'Unsubscribe Rate', value: ((stats.unsubscribes / stats.delivered) * 100).toFixed(1), color: 'bg-gray-500' }
                            ].map((metric, index) => (
                              <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-700">{metric.label}</span>
                                  <span className="font-semibold text-gray-900">{metric.value}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metric.value}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className={`h-full rounded-full ${metric.color}`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recipient Info */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">Recipient Information</h4>
                          <div className="space-y-4">
                            {[
                              { icon: Users, label: 'Total Recipients', value: stats.delivered.toLocaleString() },
                              { icon: Globe, label: 'Delivery Status', value: 'Completed', status: 'success' },
                              { icon: Calendar, label: 'Sent Date', value: formatDate(campaign.sentAt).full },
                              { icon: Tag, label: 'Category', value: campaign.category, badge: true }
                            ].map((item, index) => (
                              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gray-100 rounded-lg">
                                    <item.icon className="w-4 h-4 text-gray-600" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                </div>
                                {item.badge ? (
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.value)} text-white`}>
                                    {item.value}
                                  </span>
                                ) : (
                                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Campaign Details */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">Campaign Details</h4>
                          <dl className="space-y-3">
                            {[
                              { label: 'Campaign ID', value: campaign._id },
                              { label: 'Subject', value: campaign.subject },
                              { label: 'From Name', value: campaign.fromName || 'Not specified' },
                              { label: 'From Email', value: campaign.fromEmail || 'Not specified' },
                              { label: 'Preview Text', value: campaign.previewText || 'Not specified' },
                              { label: 'Status', value: campaign.status?.toUpperCase() || 'SENT' }
                            ].map((detail, index) => (
                              <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                                <dt className="text-sm font-medium text-gray-700">{detail.label}</dt>
                                <dd className="text-sm text-gray-900 font-medium">{detail.value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>

                        {/* Technical Details */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">Technical Information</h4>
                          <dl className="space-y-3">
                            {[
                              { label: 'HTML Size', value: `${(campaign.htmlBody.length / 1024).toFixed(2)} KB` },
                              { label: 'Character Count', value: campaign.htmlBody.length.toLocaleString() },
                              { label: 'Line Count', value: campaign.htmlBody.split('\n').length },
                              { label: 'Images', value: (campaign.htmlBody.match(/<img/g) || []).length },
                              { label: 'Links', value: (campaign.htmlBody.match(/<a/g) || []).length },
                              { label: 'Encoding', value: 'UTF-8' }
                            ].map((detail, index) => (
                              <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                                <dt className="text-sm font-medium text-gray-700">{detail.label}</dt>
                                <dd className="text-sm text-gray-900 font-medium">{detail.value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>

                      {/* HTML Source */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">HTML Source Code</h4>
                          <button
                            onClick={handleCopyHTML}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="text-sm font-medium">Copy HTML</span>
                          </button>
                        </div>
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm max-h-[400px]">
                            <code>{campaign.htmlBody}</code>
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Campaign created on {formatDate(campaign.sentAt).date}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        // Handle resend or other actions
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-medium shadow-sm"
                    >
                      Resend Campaign
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}