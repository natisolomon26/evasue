"use client";

import { TrendingUp } from "lucide-react";

interface MetricItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  value: string;
  trend: 'up' | 'down';
}

export function MetricItem({ icon: Icon, label, value, trend }: MetricItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-gray-600" />
        </div>
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-900">{value}</span>
        <TrendingUp className={`w-4 h-4 ${
          trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'
        }`} />
      </div>
    </div>
  );
}