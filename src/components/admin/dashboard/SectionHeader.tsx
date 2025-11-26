"use client";

import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    href: string;
  };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {action && (
        <Link
          href={action.href}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}