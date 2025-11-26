"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Eye } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export function StatCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  href, 
  color 
}: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -2 }}
        className="group p-6 bg-sky-200/50 rounded-2xl shadow-sm border border-sky-200 hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {change}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-sky-900 mb-1">{value}</h3>
        <p className="text-sky-800 text-sm">{title}</p>
        
        <div className="mt-4 pt-4 border-t border-sky-200 ">
          <div className="flex items-center gap-2 text-sm text-sky-500 group-hover:text-sky-700 transition-colors">
            <span>View details</span>
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}