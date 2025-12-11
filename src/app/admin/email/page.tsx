"use client";

import { useEffect, useState } from "react";
import EmailCard from "@/components/admin/email/EmailCard";
import EmailTable from "@/components/admin/email/EmailTable";
import EmailChart from "@/components/admin/email/EmailCharts";
import CampaignModal from "@/components/admin/email/campaign/CampaignModal";
import ViewCampaignModal from "@/components/admin/email/campaign/ViewCampaignModal";
import EditCampaignModal from "@/components/admin/email/campaign/EditCampaignModal";
import DeleteCampaignModal from "@/components/admin/email/campaign/DeleteCampaignModal";

export default function AdminEmailPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewCampaign, setViewCampaign] = useState<Campaign | null>(null);
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null);
  const [deleteCampaign, setDeleteCampaign] = useState<Campaign | null>(null);

  const fetchData = async () => {
    const subsRes = await fetch("/api/subscribers");
    const subs = await subsRes.json();
    setSubscribersCount(subs.length);

    const res = await fetch("/api/campaign");
    const data = await res.json();
    const campaigns = Array.isArray(data.campaigns) ? data.campaigns : [];
    setCampaigns(campaigns);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  // prepare chart data
  const chartData = campaigns.map((c) => ({
    date: new Date(c.sentAt).toLocaleDateString(),
    sent: c.sentTo.length,
  }));

  // Handlers for modal actions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveDraft = async (data: any) => {
    await fetch("/api/campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setModalOpen(false);
    fetchData();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSend = async (data: any) => {
    await fetch("/api/campaign/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setModalOpen(false);
    fetchData();
  };

  return (
    <div className="p-6 md:p-12 space-y-8">
      {/* Cards */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EmailCard title="Total Subscribers" value={subscribersCount} color="bg-blue-500" />
        <EmailCard title="Campaigns Sent" value={campaigns.length} color="bg-green-500" />
        <EmailCard
          title="Total Emails Sent"
          value={campaigns.reduce((acc, c) => acc + c.sentTo.length, 0)}
          color="bg-purple-500"
        />
      </div>

      {/* Chart */}
      <EmailChart data={chartData} />

      {/* Send Form */}

      {/* Campaign Table */}
      <EmailTable
  campaigns={campaigns}
  onView={(c) => setViewCampaign(c)}
  onEdit={(c) => setEditCampaign(c)}
  onDelete={(c) => setDeleteCampaign(c)}
/>


      <ViewCampaignModal
  open={!!viewCampaign}
  onClose={() => setViewCampaign(null)}
  campaign={viewCampaign}
/>

<EditCampaignModal
  open={!!editCampaign}
  onClose={() => setEditCampaign(null)}
  campaign={editCampaign}
  onSave={async (data) => {
    await fetch(`/api/campaign/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setEditCampaign(null);
    fetchData();
  }}
/>


<DeleteCampaignModal
  open={!!deleteCampaign}
  onClose={() => setDeleteCampaign(null)}
  onDelete={async () => {
    await fetch(`/api/campaign/${deleteCampaign?._id}`, { method: "DELETE" });
    setDeleteCampaign(null);
    fetchData();
  }}
  subject={deleteCampaign?.subject}
/>

      {/* Campaign Modal */}
      <CampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaveDraft={handleSaveDraft}
        onSend={handleSend}
      />
    </div>
  );
}
