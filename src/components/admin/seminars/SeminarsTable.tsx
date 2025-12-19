'use client';

import { useState } from 'react';
import { Trash, Edit, Eye, ChevronUp, ChevronDown, Filter, Search, Users, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
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
  refetch: () => void;
}

type SortField = 'title' | 'date' | 'capacity' | 'currentRegistrations' | 'location';
type SortDirection = 'asc' | 'desc';

export default function SeminarTable({ seminars, onEdit, refetch }: Props) {
  const [selectedSeminarId, setSelectedSeminarId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (seminar: Seminar) => {
    const isFull = seminar.currentRegistrations >= seminar.capacity;
    const isUpcoming = new Date(seminar.date) > new Date();

    if (!seminar.isOpen) return { label: 'Closed', className: 'bg-gray-100 text-gray-800' };
    if (isFull) return { label: 'Full', className: 'bg-red-100 text-red-800' };
    if (!isUpcoming) return { label: 'Completed', className: 'bg-blue-100 text-blue-800' };
    return { label: 'Open', className: 'bg-green-100 text-green-800' };
  };

  const getFillPercentage = (seminar: Seminar) => {
    return Math.min((seminar.currentRegistrations / seminar.capacity) * 100, 100);
  };

  const filteredSeminars = seminars
    .filter(seminar => {
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
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this seminar? This action cannot be undone.')) return;

    try {
      const res = await fetch(`/api/seminars/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      toast.success('Seminar deleted successfully');
      refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete seminar');
    }
  };

  const handleOpenRegistrationModal = (id: string) => {
    setSelectedSeminarId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSeminarId(null);
    setOpenModal(false);
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
      <button onClick={() => handleSort(field)} className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
        )}
      </button>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filters & Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search seminars by title, location, or description..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="open">Open for Registration</option>
              <option value="closed">Closed/Full</option>
            </select>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>Total: {seminars.length} seminars</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Showing: {filteredSeminars.length} filtered</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="title">
                Title
              </SortableHeader>
              <SortableHeader field="date">
                Date & Time
              </SortableHeader>
              <SortableHeader field="location">
                Location
              </SortableHeader>
              <SortableHeader field="capacity">
                Capacity
              </SortableHeader>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Registration
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSeminars.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="text-gray-300 mb-2" size={48} />
                    <p>No seminars found</p>
                    {searchTerm && (
                      <p className="text-sm mt-1">Try adjusting your search terms</p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredSeminars.map((seminar) => {
                const status = getStatusBadge(seminar);
                const fillPercentage = getFillPercentage(seminar);
                
                return (
                  <tr 
                    key={seminar._id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{seminar.title}</div>
                        {seminar.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {seminar.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="font-medium">
                          {new Date(seminar.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-gray-500">
                          {new Date(seminar.date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin size={14} className="text-gray-400" />
                        {seminar.location}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium">{seminar.capacity}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                            onClick={() => handleOpenRegistrationModal(seminar._id)}
                          >
                            {seminar.currentRegistrations} registered
                          </button>
                          <span className="text-gray-500">
                            {Math.round(fillPercentage)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              fillPercentage >= 90
                                ? 'bg-red-500'
                                : fillPercentage >= 70
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${fillPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenRegistrationModal(seminar._id)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="View Registrations"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => onEdit(seminar)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Seminar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(seminar._id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Seminar"
                          disabled={seminar.currentRegistrations > 0}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                      {seminar.currentRegistrations > 0 && (
                        <div className="text-xs text-red-500 mt-1">
                          Cannot delete with registrations
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

      {/* Pagination (Optional) */}
      {filteredSeminars.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredSeminars.length} of {seminars.length} seminars
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              Next
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