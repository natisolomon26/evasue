"use client";

interface StatusItemProps {
  label: string;
  status: string;
}

export function StatusItem({ label, status }: StatusItemProps) {
  const statusColors = {
    operational: 'bg-green-500',
    degraded: 'bg-yellow-500',
    outage: 'bg-red-500'
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${statusColors[status as keyof typeof statusColors] || 'bg-gray-500'}`}></div>
        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{status}</span>
      </div>
    </div>
  );
}