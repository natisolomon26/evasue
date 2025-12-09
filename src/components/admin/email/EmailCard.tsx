// components/admin/EmailCard.tsx
"use client";

import { motion } from "framer-motion";

interface EmailCardProps {
  title: string;
  value: number;
  color?: string;
}

export default function EmailCard({ title, value, color = "bg-blue-500" }: EmailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col justify-center items-center p-6 rounded-xl shadow-lg text-white ${color}`}
    >
      <p className="text-lg font-medium">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </motion.div>
  );
}
