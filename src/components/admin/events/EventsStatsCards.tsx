"use client";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: CardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl bg-white shadow-md border border-gray-200 flex flex-col gap-2"
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
    </motion.div>
  );
};

export default function EventStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Total Events" value={12} />
      <StatCard title="Active Events" value={4} />
      <StatCard title="Pending Events" value={8} />
    </div>
  );
}
