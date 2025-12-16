// components/admin/email/campaign/CampaignModal/BasicInfoStep.tsx
"use client";

import { useState } from "react";
import { AlertCircle, Clock, Tag as TagIcon, Plus, X } from "lucide-react";
import { StepProps } from "./types";

export default function BasicInfoStep({ data, errors, onUpdate, onValidate }: StepProps) {
  const [newTag, setNewTag] = useState("");

  const categories = [
    { value: 'newsletter', label: 'Newsletter', color: 'bg-blue-100 text-blue-800' },
    { value: 'promotion', label: 'Promotion', color: 'bg-amber-100 text-amber-800' },
    { value: 'event', label: 'Event', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'announcement', label: 'Announcement', color: 'bg-purple-100 text-purple-800' },
    { value: 'update', label: 'Update', color: 'bg-sky-100 text-sky-800' },
    { value: 'welcome', label: 'Welcome', color: 'bg-pink-100 text-pink-800' }
  ];

  const handleSubjectChange = (value: string) => {
    onUpdate({ subject: value });
    if (value.length > 150) {
      onValidate('subject', 'Subject must be less than 150 characters');
    } else if (!value.trim()) {
      onValidate('subject', 'Subject is required');
    } else {
      onValidate('subject', '');
    }
  };

  const handlePreviewTextChange = (value: string) => {
    onUpdate({ previewText: value });
    if (!value.trim()) {
      onValidate('previewText', 'Preview text is required');
    } else {
      onValidate('previewText', '');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !data.tags?.includes(newTag.trim())) {
      onUpdate({ tags: [...(data.tags || []), newTag.trim()] });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdate({ tags: data.tags?.filter(tag => tag !== tagToRemove) });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Subject Line
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={data.subject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Enter an attention-grabbing subject line"
            />
            {errors.subject && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.subject}
              </p>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                {data.subject.length}/150 characters
              </span>
              <span className="text-xs text-gray-500">
                Tip: Keep it under 50 characters for best results
              </span>
            </div>
          </div>

          {/* Preview Text */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Preview Text
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              value={data.previewText || ''}
              onChange={(e) => handlePreviewTextChange(e.target.value)}
              rows={2}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.previewText ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              placeholder="Brief text that appears next to the subject in inboxes"
            />
            {errors.previewText && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.previewText}
              </p>
            )}
            <div className="text-xs text-gray-500 mt-2">
              Recommended: 85-100 characters
            </div>
          </div>

          {/* Sender Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                From Name
              </label>
              <input
                type="text"
                value={data.fromName || ''}
                onChange={(e) => onUpdate({ fromName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Organization or sender name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                From Email
              </label>
              <input
                type="email"
                value={data.fromEmail || ''}
                onChange={(e) => onUpdate({ fromEmail: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="noreply@yourdomain.com"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => onUpdate({ category: cat.value })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    data.category === cat.value
                      ? `${cat.color} border-current shadow-sm`
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              <TagIcon className="w-4 h-4 inline mr-2" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {data.tags?.map((tag) => (
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
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Schedule Delivery (Optional)
            </label>
            <input
              type="datetime-local"
              value={data.scheduledFor || ''}
              onChange={(e) => onUpdate({ scheduledFor: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <div className="text-xs text-gray-500 mt-2">
              Leave empty to send immediately
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}