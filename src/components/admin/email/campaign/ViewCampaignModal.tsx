"use client";

interface ViewCampaignModalProps {
  open: boolean;
  onClose: () => void;
  campaign: {
    subject: string;
    category: string;
    sentAt: string;
    sentTo: string[];
    htmlBody: string;
  } | null;
}

export default function ViewCampaignModal({ open, onClose, campaign }: ViewCampaignModalProps) {
  if (!open || !campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">View Campaign</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">✕</button>
        </div>

        <p><strong>Subject:</strong> {campaign.subject}</p>
        <p><strong>Category:</strong> {campaign.category}</p>
        <p><strong>Sent At:</strong> {new Date(campaign.sentAt).toLocaleString()}</p>
        <p><strong>Recipients:</strong> {campaign.sentTo.length}</p>

        <div className="mt-4 border p-3 rounded bg-gray-50">
          <div dangerouslySetInnerHTML={{ __html: campaign.htmlBody }} />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
