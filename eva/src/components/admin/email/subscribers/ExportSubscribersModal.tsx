// components/admin/email/subscribers/ExportSubscribersModal.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Download, FileText, FileSpreadsheet, FileJson } from "lucide-react";

interface ExportSubscribersModalProps {
  open: boolean;
  onClose: () => void;
  onExport: (format: 'csv' | 'json' | 'excel') => void;
  totalSubscribers: number;
}

export default function ExportSubscribersModal({ 
  open, 
  onClose, 
  onExport, 
  totalSubscribers 
}: ExportSubscribersModalProps) {
  const [format, setFormat] = useState<'csv' | 'json' | 'excel'>('csv');
  const [exporting, setExporting] = useState(false);
  const [includeInactive, setIncludeInactive] = useState(true);

  const handleExport = async () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      onExport(format);
      setExporting(false);
      onClose();
    }, 1500);
  };

  if (!open) return null;

  const formatOptions = [
    { id: 'csv', label: 'CSV', icon: FileText, description: 'Comma-separated values' },
    { id: 'json', label: 'JSON', icon: FileJson, description: 'JavaScript Object Notation' },
    { id: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Microsoft Excel format' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-lg w-full"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Export Subscribers</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Summary */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Ready to Export</p>
                <p className="text-sm text-gray-600">
                  {totalSubscribers.toLocaleString()} subscribers found
                </p>
              </div>
              <Download className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <label className="block font-medium text-gray-900">Export Format</label>
            <div className="grid grid-cols-3 gap-3">
              {formatOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormat(option.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    format === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <option.icon className={`w-6 h-6 ${
                      format === option.id ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500 truncate">{option.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeInactive}
                onChange={(e) => setIncludeInactive(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-900">Include Inactive Subscribers</span>
                <p className="text-sm text-gray-600">Export all subscribers regardless of status</p>
              </div>
            </label>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Export Includes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Email address</li>
                <li>• Name (if available)</li>
                <li>• Subscription categories</li>
                <li>• Status and subscription date</li>
                <li>• Source and tags</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={exporting || totalSubscribers === 0}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {exporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export {totalSubscribers.toLocaleString()} Subscribers
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}