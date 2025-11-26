"use client";

import { TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  description: string;
  trend: 'up' | 'down';
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend 
}: MetricCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{value}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{description}</p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </div>
  );
}