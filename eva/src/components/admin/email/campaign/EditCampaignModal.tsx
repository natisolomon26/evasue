"use client";

import { useState } from "react";
import CampaignEditor from "./CampaignEditor";

interface EditCampaignModalProps {
  open: boolean;
  onClose: () => void;
  campaign: {
    _id: string;
    subject: string;
    category: string;
    htmlBody: string;
  } | null;
  onSave: (data: { _id: string; subject: string; category: string; htmlBody: string }) => void;
}

export default function EditCampaignModal({ open, onClose, campaign, onSave }: EditCampaignModalProps) {
  const [subject, setSubject] = useState(campaign?.subject || "");
  const [category, setCategory] = useState(campaign?.category || "");
  const [htmlBody, setHtmlBody] = useState(campaign?.htmlBody || "");

  if (!open || !campaign) return null;

  const handleSave = () => {
    onSave({ _id: campaign._id, subject, category, htmlBody });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Campaign</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">✕</button>
        </div>

        <input
          type="text"
          className="w-full border px-3 py-2 rounded mb-4"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />

        <select
          className="w-full border px-3 py-2 rounded mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="newsletter">Newsletter</option>
          <option value="promotion">Promotion</option>
          <option value="event">Event</option>
        </select>

        <CampaignEditor value={htmlBody} onChange={setHtmlBody} />

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
