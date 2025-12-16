// components/admin/email/subscribers/ImportSubscribersModal.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface ImportSubscribersModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (count: number) => void;
}

export default function ImportSubscribersModal({ open, onClose, onSuccess }: ImportSubscribersModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; failed: number } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.json'))) {
      setFile(selectedFile);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setUploading(true);
    // Simulate import process
    setTimeout(() => {
      const success = Math.floor(Math.random() * 100) + 50;
      const failed = Math.floor(Math.random() * 20);
      setImportResult({ success, failed });
      setUploading(false);
      onSuccess(success);
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-md w-full"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Import Subscribers</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {!importResult ? (
            <>
              {/* Drop zone */}
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  file 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {file ? (
                  <div className="space-y-2">
                    <FileText className="w-12 h-12 text-blue-500 mx-auto" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {(file.size / 1024).toFixed(1)} KB • {file.type.split('/')[1].toUpperCase()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="font-medium text-gray-900">Drop your file here</p>
                      <p className="text-sm text-gray-600">CSV or JSON format up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">File Format Requirements:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CSV: email,name,categories (comma-separated)</li>
                  <li>• JSON: Array of subscriber objects</li>
                  <li>• Email field is required</li>
                  <li>• Maximum 10,000 records per import</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Import Complete!</h4>
                <div className="space-y-2">
                  <p className="text-green-600 flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {importResult.success} subscribers imported successfully
                  </p>
                  {importResult.failed > 0 && (
                    <p className="text-amber-600 flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {importResult.failed} subscribers failed to import
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {!importResult ? (
              <button
                onClick={handleImport}
                disabled={!file || uploading}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Importing...
                  </>
                ) : (
                  'Import Subscribers'
                )}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}