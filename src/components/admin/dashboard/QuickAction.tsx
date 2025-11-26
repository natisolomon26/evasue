"use client";

import Link from "next/link";

interface QuickActionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  href: string;
  description: string;
}

export function QuickAction({ icon: Icon, label, href, description }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
    >
      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">{label}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}