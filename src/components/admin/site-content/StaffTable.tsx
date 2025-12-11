// components/admin/site/StaffTable.tsx
import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface Staff {
  _id: string;
  fullName: string;
  role: string;
  email: string;
  image: string;
}

interface StaffTableProps {
  staffList: Staff[];
  onEdit: (item: Staff) => void;
  onDelete: () => void;
}

export default function StaffTable({ staffList, onEdit, onDelete }: StaffTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(staffList.length / pageSize);
  const paginatedStaff = staffList.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
      <table className="min-w-full text-left text-gray-800">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStaff.map((staff) => (
            <tr key={staff._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">
                <img src={staff.image} className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="px-4 py-2">{staff.fullName}</td>
              <td className="px-4 py-2">{staff.role}</td>
              <td className="px-4 py-2">{staff.email}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => onEdit(staff)} className="text-blue-600 hover:text-blue-800">
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
