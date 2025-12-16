"use client";

import { FileText, Download } from "lucide-react";

interface Material {
  id: string;
  title: string;
  type: string;
  downloads: number;
  uploadedAt: string;
  size: string;
}

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{material.title}</h4>
          <div className="flex items-center gap-4 text-sm text-gray-700">
            <span>{material.type}</span>
            <span>•</span>
            <span>{material.size}</span>
            <span>•</span>
            <span>{material.downloads} downloads</span>
          </div>
        </div>
      </div>
      <button className="p-2 hover:bg-red-200 rounded-lg transition-colors">
        <Download className="w-4 h-4 text-blue-800" />
      </button>
    </div>
  );
}