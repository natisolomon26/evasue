'use client';

import { useState, useMemo, useCallback } from 'react';
import { Trash, Edit, Eye, ChevronUp, ChevronDown, Filter, Search, Users, Calendar, MapPin, MoreVertical, SortableHeader,  } from 'lucide-react';
import RegistrationViewModal from './RegistrationViewModal';

interface Seminar {
  _id: string;
  title: string;
  date: string;
  location: string;
  capacity: number;
  currentRegistrations: number;
  isOpen: boolean;
  description?: string;
  category?: string;
}

interface Props {
  seminars: Seminar[];
  onEdit: (seminar: Seminar) => void;
  onDelete: (seminar: Seminar) => void;
  refetch: () => void;
}

type SortField = 'title' | 'date' | 'capacity' | 'currentRegistrations' | 'location';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export default function SeminarTable({ seminars, onEdit, onDelete, refetch }: Props) {
  const [selectedSeminarId, setSelectedSeminarId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  }, [sortField, sortDirection]);

  const getStatusBadge = useCallback((seminar: Seminar) => {
    const isFull = seminar.currentRegistrations >= seminar.capacity;
    const isUpcoming = new Date(seminar.date) > new Date();

    if (!seminar.isOpen) return { label: 'Closed', className: 'bg-gray-100 text-gray-800 border border-gray-200' };
    if (isFull) return { label: 'Full', className: 'bg-red-100 text-red-800 border border-red-200' };
    if (!isUpcoming) return { label: 'Completed', className: 'bg-blue-100 text-blue-800 border border-blue-200' };
    return { label: 'Open', className: 'bg-green-100 text-green-800 border border-green-200' };
  }, []);

  const getFillPercentage = useCallback((seminar: Seminar) => {
    return Math.min((seminar.currentRegistrations / seminar.capacity) * 100, 100);
  }, []);

  // Memoized filtered and sorted seminars
  const { filteredSeminars, totalPages, paginatedSeminars } = useMemo(() => {
    const filtered = seminars.filter(seminar => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        seminar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seminar.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seminar.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        statusFilter === 'all' ||
        (statusFilter === 'open' && seminar.isOpen && seminar.currentRegistrations < seminar.capacity) ||
        (statusFilter === 'closed' && (!seminar.isOpen || seminar.currentRegistrations >= seminar.capacity));
      
      return matchesSearch && matchesStatus;
    });

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = sorted.slice(startIndex, endIndex);

    return {
      filteredSeminars: sorted,
      totalPages,
      paginatedSeminars: paginated,
    };
  }, [seminars, searchTerm, statusFilter, sortField, sortDirection, currentPage]);

  const handleOpenRegistrationModal = (id: string) => {
    setSelectedSeminarId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSeminarId(null);
    setOpenModal(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    const tableContainer = document.querySelector('.overflow-x-auto');
    if (tableContainer) {
      tableContainer.scrollTop = 0;
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: 'all' | 'open' | 'closed') => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors">
      <button 
        onClick={() => handleSort(field)} 
        className="flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
        )}
      </button>
    </th>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Filters & Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search seminars..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[180px]"
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value as any)}
              >
                <option value="all">All Seminars</option>
                <option value="open">Open for Registration</option>
                <option value="closed">Closed/Full</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>Total: {seminars.length} seminars</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Showing: {filteredSeminars.length} filtered</span>
            </div>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Page</span>
              <span className="font-medium">{currentPage} of {totalPages}</span>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="title">
                <span className="flex items-center gap-1">
                  Title
                </span>
              </SortableHeader>
              <SortableHeader field="date">
                <span className="flex items-center gap-1">
                  Date & Time
                </span>
              </SortableHeader>
              <SortableHeader field="location">
                <span className="flex items-center gap-1">
                  Location
                </span>
              </SortableHeader>
              <SortableHeader field="capacity">
                <span className="flex items-center gap-1">
                  Capacity
                </span>
              </SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Registration Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedSeminars.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Calendar className="mb-3" size={48} />
                    <p className="text-lg font-medium text-gray-600">No seminars found</p>
                    {searchTerm || statusFilter !== 'all' ? (
                      <p className="text-sm mt-1 text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    ) : (
                      <p className="text-sm mt-1 text-gray-500">
                        No seminars available. Add a new seminar to get started.
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedSeminars.map((seminar) => {
                const status = getStatusBadge(seminar);
                const fillPercentage = getFillPercentage(seminar);
                const isUpcoming = new Date(seminar.date) > new Date();
                
                return (
                  <tr 
                    key={seminar._id} 
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {seminar.title}
                        </div>
                        {seminar.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs mt-1">
                            {seminar.description}
                          </div>
                        )}
                        {seminar.category && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                            {seminar.category}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">
                          {new Date(seminar.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(seminar.date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className={`text-xs ${isUpcoming ? 'text-green-600' : 'text-gray-500'}`}>
                          {isUpcoming ? 'Upcoming' : 'Past'}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{seminar.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{seminar.capacity}</div>
                        <div className="text-xs text-gray-500">max</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-2 min-w-[180px]">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => handleOpenRegistrationModal(seminar._id)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1"
                          >
                            <Users size={14} />
                            {seminar.currentRegistrations} registered
                          </button>
                          <span className={`text-xs font-medium ${
                            fillPercentage >= 90 ? 'text-red-600' :
                            fillPercentage >= 70 ? 'text-amber-600' :
                            'text-green-600'
                          }`}>
                            {Math.round(fillPercentage)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              fillPercentage >= 90
                                ? 'bg-gradient-to-r from-red-500 to-red-600'
                                : fillPercentage >= 70
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                                : 'bg-gradient-to-r from-green-500 to-green-600'
                            }`}
                            style={{ width: `${fillPercentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500">
                          {seminar.capacity - seminar.currentRegistrations} spots remaining
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.className}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          status.label === 'Open' ? 'bg-green-500' :
                          status.label === 'Full' ? 'bg-red-500' :
                          status.label === 'Completed' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }`} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenRegistrationModal(seminar._id)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="View Registrations"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => onEdit(seminar)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Seminar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(seminar)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Seminar"
                          disabled={seminar.currentRegistrations > 0}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                      {seminar.currentRegistrations > 0 && (
                        <div className="text-xs text-gray-500 mt-2">
                          Has {seminar.currentRegistrations} registration{seminar.currentRegistrations !== 1 ? 's' : ''}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredSeminars.length)} of{' '}
            {filteredSeminars.length} seminars
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded text-sm ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-1">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 text-sm"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {openModal && selectedSeminarId && (
        <RegistrationViewModal seminarId={selectedSeminarId} onClose={handleCloseModal} />
      )}
    </div>
  );
}

// Add missing Clock and ChevronLeft/Right icons
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';