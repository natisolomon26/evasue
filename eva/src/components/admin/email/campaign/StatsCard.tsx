// components/admin/email/StatsCard.tsx
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  change: string;
  loading: boolean;
}

export default function StatsCard({ title, value, icon, color, change, loading }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group"
    >
      {/* Background gradient */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-full -translate-y-6 translate-x-6 group-hover:scale-125 transition-transform duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white`}>
            {icon}
          </div>
          <span className="text-sm font-medium text-gray-500">{title}</span>
        </div>
        
        <div className="mb-2">
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
          ) : (
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          )}
        </div>
        
        <div className="flex items-center">
          <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {loading ? '...' : change}
          </span>
          <span className="text-gray-400 text-sm ml-2">from last period</span>
        </div>
      </div>
    </motion.div>
  );
}