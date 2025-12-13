// components/admin/site/GeneralSecretaryTable.tsx
"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface GS {
  _id: string;
  fullName: string;
  role: string;
  description: string;
  education: string;
  personal: string;
  image: string;
  isActive: boolean;
}

interface GSTableProps {
  gsList: GS[];
  onEdit: (item: GS) => void;
  onDelete: (item: GS) => void; // Fixed: should pass the item for confirmation
}

export default function GeneralSecretaryTable({ gsList, onEdit, onDelete }: GSTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(gsList.length / pageSize);
  const paginatedGS = gsList.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-left">
            <th className="px-5 py-4 font-medium">Image</th>
            <th className="px-5 py-4 font-medium">Full Name</th>
            <th className="px-5 py-4 font-medium">Role</th>
            <th className="px-5 py-4 font-medium">Active</th>
            <th className="px-5 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedGS.map((gs) => (
            <tr
              key={gs._id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-5 py-4">
                {gs.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={gs.image}
                      alt={gs.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 font-medium">
                    {gs.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </td>
              <td className="px-5 py-4 font-medium text-gray-900">{gs.fullName}</td>
              <td className="px-5 py-4 text-gray-600">{gs.role}</td>
              <td className="px-5 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    gs.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {gs.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-5 py-4 flex gap-2">
                <button
                  onClick={() => onEdit(gs)}
                  className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors duration-150"
                  aria-label="Edit"
                  title="Edit"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => onDelete(gs)} // Pass `gs` for context (e.g., confirm deletion)
                  className="p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition-colors duration-150"
                  aria-label="Delete"
                  title="Delete"
                >
                  <FaTrash size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-end items-center gap-2 px-4 pb-3">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              page === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              page === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}