// components/SubscribeBanner.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Mail, 
  Send, 
  Check, 
  X,
  Loader2,
  Sparkles,
  Bell,
  Calendar,
  Gift
} from "lucide-react";

export default function SubscribeBanner() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-dismiss message after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          categories: ["newsletter", "event"] 
        }),
      });
      
      const data = await res.json();

      if (res.ok) {
        setShowSuccess(true);
        setMessage({ 
          type: "success", 
          text: "🎉 Subscribed successfully!" 
        });
        setEmail("");
        
        setTimeout(() => {
          setShowSuccess(false);
          setIsExpanded(false);
        }, 2000);
      } else {
        setMessage({ type: "error", text: data.error || "Subscription failed" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-8 md:py-10 px-4">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'shadow-xl' : ''
          }`}
        >
          {/* Compact Header */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left: Text Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Stay in the Loop
                  </h2>
                </div>
                
                <p className="text-gray-600 mb-0 md:mb-4">
                  Get event updates, announcements, and exclusive content delivered to your inbox
                </p>

                {/* Expanded view content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                        {[
                          { icon: Calendar, label: "Event Invites", color: "text-blue-600 bg-blue-50" },
                          { icon: Gift, label: "Exclusive Offers", color: "text-purple-600 bg-purple-50" },
                          { icon: Sparkles, label: "Early Access", color: "text-amber-600 bg-amber-50" }
                        ].map((item) => (
                          <span
                            key={item.label}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${item.color}`}
                          >
                            <item.icon className="h-3 w-3" />
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: Form */}
              <div className="flex-1 max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setIsExpanded(true)}
                          disabled={loading}
                        />
                      </div>
                      
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            <span className="sr-only">Subscribe</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    {/* Expand/Collapse toggle */}
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                  </div>

                  {/* Message Display */}
                  <AnimatePresence>
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          message.type === 'success'
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {message.type === 'success' ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm font-medium ${
                            message.type === 'success' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {message.text}
                          </span>
                        </div>
                        <button
                          onClick={() => setMessage(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>

          {/* Success Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="bg-white rounded-xl p-6 shadow-2xl border border-green-200"
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900">You're In!</h3>
                    <p className="text-gray-600 text-center">Welcome to our community</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Note */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Join <span className="font-semibold text-blue-600">5,000+</span> members • 
            No spam • Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
}