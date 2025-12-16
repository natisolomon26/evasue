// components/admin/email/campaign/CampaignModal/ReviewStep.tsx
"use client";

import { AlertCircle, Users, Calendar, Tag as TagIcon, Mail, Globe } from "lucide-react";
import { StepProps } from "./types";

export default function ReviewStep({ data, errors }: StepProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Immediately';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Send</h3>
        <p className="text-gray-600">Review your campaign before sending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Campaign Details</h4>
            <dl className="space-y-3">
              {[
                { label: 'Subject', value: data.subject || 'Not set', icon: Mail },
                { label: 'Preview Text', value: data.previewText || 'Not set' },
                { label: 'Category', value: data.category.charAt(0).toUpperCase() + data.category.slice(1) },
                { label: 'From', value: `${data.fromName || 'Campus Ministry'} <${data.fromEmail || 'noreply@campusministry.org'}>` },
                { label: 'Delivery', value: data.scheduledFor ? 'Scheduled' : 'Immediate', icon: Calendar }
              ].map((detail, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    {detail.icon && <detail.icon className="w-4 h-4 text-gray-400" />}
                    <dt className="text-sm font-medium text-gray-700">{detail.label}</dt>
                  </div>
                  <dd className="text-sm text-gray-900 font-medium text-right max-w-[60%] truncate">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {data.tags?.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full border border-blue-200"
                >
                  <TagIcon className="w-3 h-3" />
                  <span className="text-sm font-medium">{tag}</span>
                </div>
              ))}
              {(!data.tags || data.tags.length === 0) && (
                <p className="text-gray-500 text-sm">No tags added</p>
              )}
            </div>
          </div>
        </div>

        {/* Recipients & Preview */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Recipients</h4>
            <div className="space-y-2">
              {data.recipients && data.recipients.length > 0 ? (
                data.recipients.map((recipient, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{recipient}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recipients selected</p>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Preview</h4>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <div className="font-semibold">{data.subject || 'No subject'}</div>
                <div className="text-sm text-gray-600">{data.previewText || 'No preview text'}</div>
              </div>
              <div 
                className="p-4 max-h-[200px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: data.htmlBody?.substring(0, 300) + '...' || '<p>No content</p>' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Attachments */}
      {data.attachments && data.attachments.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Attachments</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg">
                  <Globe className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 truncate">{file.name}</div>
                  <div className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB • {file.type.split('/')[1].toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {errors.submit}
          </p>
        </div>
      )}
    </div>
  );
}