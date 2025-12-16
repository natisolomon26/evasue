"use client";

import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Staff {
  _id: string;
  fullName: string;
  role: string;
  email: string;
  image?: string;
}

interface StaffTableProps {
  staffList: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
}

export default function StaffTable({ staffList, onEdit, onDelete }: StaffTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-left">
            <th className="px-5 py-4 font-medium">Photo</th>
            <th className="px-5 py-4 font-medium">Full Name</th>
            <th className="px-5 py-4 font-medium">Role</th>
            <th className="px-5 py-4 font-medium">Email</th>
            <th className="px-5 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {staffList.map((staff) => (
            <tr
              key={staff._id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-5 py-4">
                {staff.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={staff.image}
                      alt={staff.fullName}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 font-medium">
                    {staff.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </td>
              <td className="px-5 py-4 font-medium text-gray-900">{staff.fullName}</td>
              <td className="px-5 py-4 text-gray-600">{staff.role}</td>
              <td className="px-5 py-4 text-gray-600">{staff.email}</td>
              <td className="px-5 py-4 flex gap-3">
                <button
                  onClick={() => onEdit(staff)}
                  className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors duration-150"
                  aria-label="Edit"
                  title="Edit"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => onDelete(staff)}
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
    </div>
  );
}