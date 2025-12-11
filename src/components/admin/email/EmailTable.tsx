"use client";

import { Eye, Edit, Trash2 } from "lucide-react";

interface Campaign {
  _id: string;
  subject: string;
  category: string;
  sentAt: string;
  sentTo: string[];
}

interface EmailTableProps {
  campaigns: Campaign[];
  onView?: (c: Campaign) => void;
  onEdit?: (c: Campaign) => void;
  onDelete?: (c: Campaign) => void;
}

export default function EmailTable({ campaigns, onView, onEdit, onDelete }: EmailTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
      <table className="min-w-full text-left text-gray-800">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Sent At</th>
            <th className="px-4 py-2">Recipients</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr
              key={c._id}
              className="border-b hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="px-4 py-2 font-medium">{c.subject}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    c.category === "newsletter"
                      ? "bg-blue-100 text-blue-800"
                      : c.category === "promotion"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {c.category}
                </span>
              </td>
              <td className="px-4 py-2">{new Date(c.sentAt).toLocaleString()}</td>
              <td className="px-4 py-2">{c.sentTo.length}</td>
              <td className="px-4 py-2 flex justify-center gap-3">
                <button
                  onClick={() => onView?.(c)}
                  className="p-2 rounded hover:bg-gray-200 transition"
                  title="View"
                >
                  <Eye className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => onEdit?.(c)}
                  className="p-2 rounded hover:bg-gray-200 transition"
                  title="Edit"
                >
                  <Edit className="h-5 w-5 text-blue-600" />
                </button>
                <button
                  onClick={() => onDelete?.(c)}
                  className="p-2 rounded hover:bg-red-100 transition"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
