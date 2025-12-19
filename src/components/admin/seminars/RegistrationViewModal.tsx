'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

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

export default function RegistrationViewModal({ seminarId, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['registrations', seminarId],
    queryFn: async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      try {
        const res = await fetch(`/api/seminaregistration?seminarId=${seminarId}`, {
          signal: controller.signal,
          cache: 'no-store', // Prevent caching for fresh data
        });
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error('Failed to fetch registrations');
        const data = await res.json();
        return data;
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error('Request timeout. Please try again.');
        }
        throw err;
      }
    },
    retry: 1, // Only retry once
    staleTime: 30000, // Data is fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Filter registrations when data or search term changes
  useEffect(() => {
    if (data?.data) {
      const filtered = data.data.filter((reg: Registration) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          reg.fullName.toLowerCase().includes(searchLower) ||
          reg.phoneNumber.includes(searchTerm) ||
          reg.email?.toLowerCase().includes(searchLower) ||
          reg.status.toLowerCase().includes(searchLower)
        );
      });
      setFilteredRegistrations(filtered);
    }
  }, [data, searchTerm]);

  const registrations: Registration[] = data?.data || [];

  const handleClose = () => {
    onClose();
  };

  // Format status with colors
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Loading Registrations...</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-red-600">Error</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-600 mb-4">Failed to load registrations. {error.message}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Registrations</h2>
            <p className="text-sm text-gray-600">
              {registrations.length} total • {filteredRegistrations.length} filtered
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {filteredRegistrations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {searchTerm ? 'No matching registrations found' : 'No registrations yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium">{reg.fullName}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="text-sm">{reg.phoneNumber}</div>
                          {reg.email && (
                            <div className="text-sm text-blue-600">{reg.email}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-600">
                          {formatDate(reg.registeredAt)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(reg.status)}`}>
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredRegistrations.length} of {registrations.length} registrations
          </div>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}