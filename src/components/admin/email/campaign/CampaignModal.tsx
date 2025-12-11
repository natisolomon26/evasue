"use client";

import { useState } from "react";
import CampaignEditor from "./CampaignEditor";

interface CampaignModalProps {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSaveDraft: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSend: (data: any) => void;
}

export default function CampaignModal({
  open,
  onClose,
  onSaveDraft,
  onSend,
}: CampaignModalProps) {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("newsletter");
  const [htmlBody, setHtmlBody] = useState("");
  const [preview, setPreview] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-xl animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Campaign</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            ✕
          </button>
        </div>

        {/* Subject */}
        <label className="block mb-4">
          <span className="font-semibold">Subject</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            placeholder="Enter subject"
          />
        </label>

        {/* Category */}
        <label className="block mb-4">
          <span className="font-semibold">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          >
            <option value="newsletter">Newsletter</option>
            <option value="promotion">Promotion</option>
            <option value="event">Event</option>
          </select>
        </label>

        {/* Body / Preview */}
        {!preview ? (
          <CampaignEditor value={htmlBody} onChange={setHtmlBody} />
        ) : (
          <div className="border p-4 mb-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setPreview(!preview)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            {preview ? "Back to Editor" : "Preview"}
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => onSaveDraft({ subject, category, htmlBody })}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Save Draft
            </button>

            <button
              onClick={() => onSend({ subject, category, htmlBody })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
