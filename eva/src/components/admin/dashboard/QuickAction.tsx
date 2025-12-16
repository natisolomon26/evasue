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
      className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors group"
    >
      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{label}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}