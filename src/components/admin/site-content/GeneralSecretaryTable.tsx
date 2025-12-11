// components/admin/site/GeneralSecretaryTable.tsx
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
  onDelete: () => void;
}

export default function GeneralSecretaryTable({ gsList, onEdit, onDelete }: GSTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(gsList.length / pageSize);
  const paginatedGS = gsList.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
      <table className="min-w-full text-left text-gray-800">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedGS.map((gs) => (
            <tr key={gs._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">
                <img src={gs.image} className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="px-4 py-2">{gs.fullName}</td>
              <td className="px-4 py-2">{gs.role}</td>
              <td className="px-4 py-2">{gs.isActive ? "Yes" : "No"}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => onEdit(gs)} className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </button>
                <button onClick={onDelete} className="text-red-600 hover:text-red-800">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>
        <span className="px-2 py-1">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
