// components/admin/EmailChart.tsx
"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

interface EmailChartProps {
  data: { date: string; sent: number }[];
}

export default function EmailChart({ data }: EmailChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full h-80">
      <h3 className="text-lg font-semibold mb-2">Campaigns Sent Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sent" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
