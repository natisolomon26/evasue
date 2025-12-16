// components/admin/email/campaign/CampaignModal/RecipientsStep.tsx
"use client";

import { useState } from "react";
import { AlertCircle, Users, Search, Check, Plus, Globe, Sparkles } from "lucide-react";
import { StepProps } from "./types";

export default function RecipientsStep({ data, errors, onUpdate, onValidate }: StepProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const availableRecipients = [
    "All Subscribers (1,250)",
    "Active Students (850)",
    "Campus Leaders (45)",
    "Monthly Donors (120)",
    "Recent Contacts (230)",
    "New Members (65)",
    "Event Attendees (320)",
    "Volunteers (180)"
  ];

  const toggleRecipient = (recipient: string) => {
    const currentRecipients = data.recipients || [];
    let newRecipients: string[];
    
    if (currentRecipients.includes(recipient)) {
      newRecipients = currentRecipients.filter(r => r !== recipient);
    } else {
      newRecipients = [...currentRecipients, recipient];
    }
    
    onUpdate({ recipients: newRecipients });
    
    if (newRecipients.length === 0) {
      onValidate('recipients', 'At least one recipient is required');
    } else {
      onValidate('recipients', '');
    }
  };

  const selectAll = () => {
    const currentRecipients = data.recipients || [];
    let newRecipients: string[];
    
    if (currentRecipients.length === availableRecipients.length) {
      newRecipients = [];
      onValidate('recipients', 'At least one recipient is required');
    } else {
      newRecipients = [...availableRecipients];
      onValidate('recipients', '');
    }
    
    onUpdate({ recipients: newRecipients });
  };

  const filteredRecipients = availableRecipients.filter(recipient =>
    recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEstimatedReach = () => {
    const recipientCount = data.recipients?.length || 0;
    return recipientCount * 250; // Simplified estimation
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Recipients</h3>
        <p className="text-gray-600">Choose who will receive this campaign</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipients..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={selectAll}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {data.recipients?.length === availableRecipients.length ? 'Deselect All' : 'Select All'}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onUpdate({ recipients: ["All Subscribers (1,250)"] })}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">All Subscribers</span>
        </button>
      </div>

      {/* Recipient List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {filteredRecipients.map((recipient) => {
            const isSelected = data.recipients?.includes(recipient) || false;
            return (
              <div
                key={recipient}
                onClick={() => toggleRecipient(recipient)}
                className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-0 cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isSelected ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Users className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{recipient}</div>
                    <div className="text-sm text-gray-500">
                      {recipient.includes('(') ? recipient.split('(')[1].replace(')', '') : 'Custom list'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      Selected
                    </div>
                  )}
                  <Plus className={`w-5 h-5 transition-transform ${
                    isSelected ? 'rotate-45 text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {errors.recipients && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {errors.recipients}
          </p>
        </div>
      )}

      {/* Delivery Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Delivery Summary</h4>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Selected Recipients</span>
            <span className="font-semibold text-gray-900">
              {data.recipients?.length || 0} lists
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Estimated Reach</span>
            <span className="font-semibold text-gray-900">
              ~{getEstimatedReach().toLocaleString()} people
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Delivery Time</span>
            <span className="font-semibold text-gray-900">
              {data.scheduledFor ? new Date(data.scheduledFor).toLocaleString() : 'Immediately'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}