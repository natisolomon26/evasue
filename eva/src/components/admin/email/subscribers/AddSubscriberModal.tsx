// components/admin/email/subscribers/AddSubscriberModal.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, UserPlus, Mail, Tag, Check, AlertCircle } from "lucide-react";

interface AddSubscriberModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSubscriberModal({ open, onClose, onSuccess }: AddSubscriberModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<string[]>(["newsletter"]);
  const [tags, setTags] = useState<string[]>(["manual"]);
  const [newTag, setNewTag] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const availableCategories = [
    { id: "newsletter", label: "Newsletter" },
    { id: "promotion", label: "Promotion" },
    { id: "event", label: "Event Announcements" },
    { id: "update", label: "Weekly Updates" },
    { id: "prayer", label: "Prayer Requests" },
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          categories,
          tags,
          status: "active",
          source: "manual"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add subscriber");
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (err) {
      setError("Failed to add subscriber. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setCategories(["newsletter"]);
    setTags(["manual"]);
    setError("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-lg w-full"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Add New Subscriber</h3>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-900 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="subscriber@example.com"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {error}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium text-gray-900 mb-2">Name (Optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block font-medium text-gray-900 mb-2">Categories</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableCategories.map((cat) => {
                const isSelected = categories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategories(prev =>
                        isSelected
                          ? prev.filter(c => c !== cat.id)
                          : [...prev, cat.id]
                      );
                    }}
                    className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                      {cat.label}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-blue-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium text-gray-900 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full border border-blue-200"
                >
                  <span className="text-sm font-medium">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add tag..."
                  className="px-3 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>
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
              onClick={handleSubmit}
              disabled={saving || !email.trim()}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Add Subscriber
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}