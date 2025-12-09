// app/admin/email/page.tsx
"use client";

import { useEffect, useState } from "react";
import EmailCard from "@/components/admin/email/EmailCard";
import EmailTable from "@/components/admin/email/EmailTable";
import EmailChart from "@/components/admin/email/EmailCharts";
import EmailForm from "@/components/admin/email/EmailForm";

export default function AdminEmailPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [subscribersCount, setSubscribersCount] = useState(0);

  const fetchData = async () => {
    const subsRes = await fetch("/api/subscribers");
    const subs = await subsRes.json();
    setSubscribersCount(subs.length);

    const campRes = await fetch("/api/campaigns"); // create this API to list campaigns
    const campData = await campRes.json();
    setCampaigns(campData);
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

  return (
    <div className="p-6 md:p-12 space-y-8">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EmailCard title="Total Subscribers" value={subscribersCount} color="bg-blue-500" />
        <EmailCard title="Campaigns Sent" value={campaigns.length} color="bg-green-500" />
        <EmailCard title="Total Emails Sent" value={campaigns.reduce((acc, c) => acc + c.sentTo.length, 0)} color="bg-purple-500" />
      </div>

      {/* Chart */}
      <EmailChart data={chartData} />

      {/* Send Form */}
      <EmailForm onSent={fetchData} />

      {/* Campaign Table */}
      <EmailTable campaigns={campaigns} />
    </div>
  );
}
