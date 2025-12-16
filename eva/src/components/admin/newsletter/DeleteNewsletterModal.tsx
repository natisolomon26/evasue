// components/admin/newsletter/DeleteNewsletterModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Trash2, Loader2, Mail } from "lucide-react";
import { useState } from "react";

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  status: string;
}

interface DeleteNewsletterModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  newsletter: Newsletter | null;
  onDeleted: () => void;
}

export default function DeleteNewsletterModal({ open, setOpen, newsletter, onDeleted }: DeleteNewsletterModalProps) {
  const [loading, setLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  async function handleDelete() {
    if (!newsletter) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletters/${newsletter.id}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (!res.ok) throw new Error("Delete failed");
      
      onDeleted();
      setOpen(false);
      setConfirmationText("");
    } catch (err) {
      console.error(err);
      alert("Failed to delete newsletter");
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setConfirmationText("");
    setOpen(false);
  };

  const isDeleteEnabled = confirmationText === "DELETE" && !loading;

  return (
    <AnimatePresence>
      {open && newsletter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Delete Newsletter</h2>
                    <p className="text-red-100">This action cannot be undone</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Warning Message */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Warning: Destructive Action</h3>
                    <p className="text-red-700 text-sm">
                      You are about to permanently delete this newsletter. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Newsletter Information */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Newsletter Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Title</span>
                    <span className="font-semibold text-gray-900">{newsletter.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subject</span>
                    <span className="font-medium text-gray-900">{newsletter.subject}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="capitalize text-sm text-gray-600">{newsletter.status}</span>
                  </div>
                </div>
              </div>

              {/* Confirmation Text */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800 text-center mb-3">
                  <strong>Type "DELETE"</strong> to confirm this action
                </p>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-center font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={!isDeleteEnabled}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Delete Newsletter
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}