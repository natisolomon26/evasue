"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { FaEdit, FaTrash, FaSort, FaSearch, FaUser } from "react-icons/fa";

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

type SortField = "fullName" | "role" | "email";
type SortDirection = "asc" | "desc";

export default function StaffTable({ staffList, onEdit, onDelete }: StaffTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("fullName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Memoized filtered and sorted staff list
  const filteredAndSortedStaff = useMemo(() => {
    let filtered = staffList;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = staffList.filter(
        (staff) =>
          staff.fullName.toLowerCase().includes(term) ||
          staff.role.toLowerCase().includes(term) ||
          staff.email.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [staffList, searchTerm, sortField, sortDirection]);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }, [sortField, sortDirection]);

  const handleDelete = useCallback(async (staff: Staff) => {
    if (isDeleting) return;
    
    setIsDeleting(staff._id);
    try {
      await onDelete(staff);
    } finally {
      setIsDeleting(null);
    }
  }, [onDelete, isDeleting]);

  // Sort indicator component
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <FaSort className="ml-1 opacity-30" size={12} />;
    
    return (
      <FaSort
        className="ml-1"
        size={12}
        style={{
          transform: sortDirection === "desc" ? "rotate(180deg)" : "none",
          transition: "transform 0.2s ease"
        }}
      />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Search and Controls */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, role, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedStaff.length} of {staffList.length} staff members
          </div>
        </div>
      </div>

      {/* Table Container with Scroll */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left">
              <th className="px-6 py-4 font-medium whitespace-nowrap">
                Photo
              </th>
              <th 
                className="px-6 py-4 font-medium whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("fullName")}
              >
                <div className="flex items-center">
                  Full Name
                  <SortIndicator field="fullName" />
                </div>
              </th>
              <th 
                className="px-6 py-4 font-medium whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center">
                  Role
                  <SortIndicator field="role" />
                </div>
              </th>
              <th 
                className="px-6 py-4 font-medium whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  Email
                  <SortIndicator field="email" />
                </div>
              </th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAndSortedStaff.map((staff) => (
              <tr
                key={staff._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="w-12 h-12">
                    {staff.image ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                          src={staff.image}
                          alt={staff.fullName}
                          fill
                          sizes="48px"
                          className="object-cover"
                          priority={false}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white shadow-sm flex items-center justify-center">
                        <FaUser className="text-blue-600" size={20} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{staff.fullName}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {staff.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a 
                    href={`mailto:${staff.email}`}
                    className="hover:text-blue-600 hover:underline transition-colors"
                  >
                    {staff.email}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(staff)}
                      className="p-2.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors duration-150"
                      aria-label="Edit"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(staff)}
                      disabled={isDeleting === staff._id}
                      className={`p-2.5 rounded-lg transition-colors duration-150 ${
                        isDeleting === staff._id
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-600 hover:text-red-800 hover:bg-red-50"
                      }`}
                      aria-label="Delete"
                      title="Delete"
                    >
                      {isDeleting === staff._id ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin" />
                      ) : (
                        <FaTrash size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredAndSortedStaff.length === 0 && (
        <div className="py-16 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FaUser className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No matching staff found" : "No staff members"}
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            {searchTerm
              ? "Try adjusting your search terms to find what you're looking for."
              : "Start by adding your first staff member to get started."}
          </p>
        </div>
      )}
    </div>
  );
}