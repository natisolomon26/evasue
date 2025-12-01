// components/admin/newsletter/SendNewsletterModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Users, Calendar, Loader2, Mail } from "lucide-react";
import { useState } from "react";

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  status: string;
}

interface SendNewsletterModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  newsletter: Newsletter | null;
  onSent: () => void;
}

export default function SendNewsletterModal({ open, setOpen, newsletter, onSent }: SendNewsletterModalProps) {
  const [loading, setLoading] = useState(false);
  const [sendOption, setSendOption] = useState<"now" | "schedule">("now");
  const [scheduledDate, setScheduledDate] = useState("");

  async function handleSend() {
    if (!newsletter) return;
    
    setLoading(true);
    try {
      const payload = {
        action: sendOption,
        scheduledFor: sendOption === "schedule" ? scheduledDate : undefined
      };

      const res = await fetch(`/api/admin/newsletters/${newsletter.id}/send`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error("Send failed");
      
      onSent();
      setOpen(false);
      setScheduledDate("");
      alert(sendOption === "now" ? "Newsletter sent successfully!" : "Newsletter scheduled successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send newsletter");
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setScheduledDate("");
    setSendOption("now");
    setOpen(false);
  };

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
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Send Newsletter</h2>
                    <p className="text-green-100">Distribute your email campaign</p>
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
                </div>
              </div>

              {/* Send Options */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-900">Send Options</h4>
                
                {/* Send Now */}
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-green-500 transition-colors">
                  <input
                    type="radio"
                    name="sendOption"
                    value="now"
                    checked={sendOption === "now"}
                    onChange={() => setSendOption("now")}
                    className="mt-1 text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Send className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900">Send Immediately</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Send this newsletter to all subscribers right now
                    </p>
                  </div>
                </label>

                {/* Schedule */}
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="sendOption"
                    value="schedule"
                    checked={sendOption === "schedule"}
                    onChange={() => setSendOption("schedule")}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">Schedule for Later</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Schedule this newsletter to be sent at a specific time
                    </p>
                    {sendOption === "schedule" && (
                      <input
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    )}
                  </div>
                </label>
              </div>

              {/* Recipient Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Estimated Recipients</p>
                    <p className="text-sm text-blue-700">
                      This newsletter will be sent to approximately <strong>1,247 subscribers</strong>
                    </p>
                  </div>
                </div>
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
                  onClick={handleSend}
                  disabled={loading || (sendOption === "schedule" && !scheduledDate)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {sendOption === "now" ? "Sending..." : "Scheduling..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {sendOption === "now" ? "Send Now" : "Schedule"}
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