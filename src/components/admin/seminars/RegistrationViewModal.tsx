'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useCallback, useDeferredValue } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';

interface Props {
  seminarId: string;
  onClose: () => void;
}

interface Registration {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  status: string;
  registeredAt?: string;
}

const ITEMS_PER_PAGE = 20;

export default function RegistrationViewModal({ seminarId, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use deferred value for search to prevent UI blocking
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Fetch registrations with optimized query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['registrations', seminarId],
    queryFn: async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // Reduced timeout

      try {
        const res = await fetch(`/api/seminaregistration?seminarId=${seminarId}`, {
          signal: controller.signal,
          // Remove no-store to allow caching
          next: { revalidate: 30 } // Revalidate every 30 seconds
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch registrations: ${errorText}`);
        }
        
        return await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error('Request took too long. Try again.');
        }
        throw err;
      }
    },
    retry: 1,
    staleTime: 30000,
    gcTime: 2 * 60 * 1000, // Reduced cache time
    refetchOnWindowFocus: false, // Prevent refetch on focus
  });

  // Memoized filtering and pagination
  const { filteredRegistrations, totalPages } = useMemo(() => {
    const registrations: Registration[] = data?.data || [];
    
    const filtered = registrations.filter((reg) => {
      const matchesSearch = 
        deferredSearchTerm === '' ||
        reg.fullName.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        reg.phoneNumber.includes(deferredSearchTerm) ||
        reg.email?.toLowerCase().includes(deferredSearchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        reg.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    
    // Paginate results
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, endIndex);

    return {
      filteredRegistrations: paginated,
      totalPages,
      totalFiltered: filtered.length,
    };
  }, [data, deferredSearchTerm, statusFilter, currentPage]);

  // Memoized status color function
  const getStatusColor = useCallback((status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }, []);

  // Memoized date formatter
  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '-';
    }
  }, []);

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleRetry = () => {
    refetch();
  };

  const handleExport = () => {
    if (!data?.data) return;
    
    const csvContent = [
      ['Name', 'Phone', 'Email', 'Status', 'Registered Date'],
      ...data.data.map((reg: Registration) => [
        reg.fullName,
        reg.phoneNumber,
        reg.email || '',
        reg.status,
        formatDate(reg.registeredAt)
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${seminarId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const registrations: Registration[] = data?.data || [];
  const isLoadingInitial = isLoading && !data;

  if (isLoadingInitial) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="p-6 space-y-4 flex-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-red-600">Unable to Load</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            {error.message.includes('timeout') 
              ? 'The request is taking longer than expected.' 
              : 'Failed to load registration data.'}
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
            >
              Close
            </button>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Registrations</h2>
            <p className="text-sm text-gray-600">
              {registrations.length} total • {filteredRegistrations.length} showing
              {statusFilter !== 'all' && ` • Filtered by: ${statusFilter}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={statusFilter}
                  onChange={(e) => handleStatusFilterChange(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                onClick={handleExport}
                disabled={registrations.length === 0}
                className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {filteredRegistrations.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No matching registrations found'
                  : 'No registrations yet'}
              </div>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{reg.fullName}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{reg.phoneNumber}</div>
                          {reg.email && (
                            <a 
                              href={`mailto:${reg.email}`}
                              className="text-sm text-blue-600 hover:text-blue-800 hover:underline block"
                            >
                              {reg.email}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-600">
                          {formatDate(reg.registeredAt)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination & Footer */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {filteredRegistrations.length} of {registrations.length} registrations
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex items-center gap-1">
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">
                  {currentPage}
                </span>
                <span className="text-gray-500">of</span>
                <span className="text-gray-700">{totalPages}</span>
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}