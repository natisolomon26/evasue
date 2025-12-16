// components/admin/email/campaign/CampaignModal/ContentStep.tsx
"use client";

import { useState, useRef } from "react";
import { AlertCircle, Eye, EyeOff, Upload, Image as ImageIcon, Link as LinkIcon, Trash2 } from "lucide-react";
import CampaignEditor from "../CampaignEditor";
import { StepProps } from "./types";

export default function ContentStep({ data, errors, onUpdate, onValidate }: StepProps) {
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHtmlBodyChange = (value: string) => {
    onUpdate({ htmlBody: value });
    if (!value.trim()) {
      onValidate('htmlBody', 'Email content is required');
    } else if (value.length < 100) {
      onValidate('htmlBody', 'Content seems too short');
    } else {
      onValidate('htmlBody', '');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onUpdate({ attachments: [...(data.attachments || []), ...files] });
  };

  const removeAttachment = (index: number) => {
    onUpdate({
      attachments: data.attachments?.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Email Content</h3>
          <p className="text-gray-600">Design your email using the editor below</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </span>
          </button>
        </div>
      </div>

      {showPreview ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Preview</h4>
            <div className="text-sm text-gray-500">
              From: {data.fromName || 'Campus Ministry'} &lt;{data.fromEmail || 'noreply@campusministry.org'}&gt;
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <div className="font-semibold">{data.subject || 'No subject'}</div>
              <div className="text-sm text-gray-600">{data.previewText || 'No preview text'}</div>
            </div>
            <div 
              className="p-4 min-h-[400px] bg-white"
              dangerouslySetInnerHTML={{ __html: data.htmlBody || '<p>No content yet</p>' }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <CampaignEditor 
            value={data.htmlBody} 
            onChange={handleHtmlBodyChange} 
          />
          {errors.htmlBody && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {errors.htmlBody}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Attachments */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-gray-900">Attachments</h4>
            <p className="text-sm text-gray-600">Add files to include with your email</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Upload Files</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          />
        </div>
        
        {data.attachments && data.attachments.length > 0 && (
          <div className="space-y-2">
            {data.attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    {file.type.startsWith('image/') ? (
                      <ImageIcon className="w-4 h-4 text-gray-600" />
                    ) : (
                      <LinkIcon className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{file.name}</div>
                    <div className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}