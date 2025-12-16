"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

interface Item {
  _id: string;
  key: string;       // Example: "generalSecretary"
  label: string;     // Example: "General Secretary"
  value: string;
}

interface Props {
  items: Item[];
  onView: (item: Item) => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function SiteContentTable({ items, onView, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-5">
      <table className="min-w-full text-left text-gray-800">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Label</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{item.label}</td>

              <td className="px-4 py-2 text-gray-700 max-w-[280px] truncate">
                {item.value}
              </td>

              <td className="px-4 py-2 flex items-center gap-3 justify-center">
                <button onClick={() => onView(item)}>
                  <Eye size={20} className="text-blue-600 hover:text-blue-800" />
                </button>

                <button onClick={() => onEdit(item)}>
                  <Pencil size={20} className="text-green-600 hover:text-green-800" />
                </button>

                <button onClick={() => onDelete(item)}>
                  <Trash2 size={20} className="text-red-600 hover:text-red-800" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
