// components/RegistrationView.tsx - Updated version
'use client';

import { useState, useEffect } from 'react';
import { Event, Registration } from '@/types';
import { X, Download, Mail, Phone, Calendar, User, Search, Filter, MapPin, CreditCard } from 'lucide-react';

interface RegistrationViewProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationView({ event, isOpen, onClose }: RegistrationViewProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    if (isOpen && event._id) {
      fetchRegistrations();
    }
  }, [isOpen, event._id]);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch(`/api/registrations?eventId=${event._id}`);
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get field value by label
  const getFieldValue = (registration: Registration, fieldLabel: string): string => {
    // Find field ID by label
    const field = event.formFields?.find(f => 
      f.label.toLowerCase().includes(fieldLabel.toLowerCase())
    );
    
    if (field) {
      return registration.answers[field._id] || 'N/A';
    }
    
    // Fallback: search in all answers
    const fieldId = Object.keys(registration.answers).find(key => {
      const field = event.formFields?.find(f => f._id === key);
      return field?.label.toLowerCase().includes(fieldLabel.toLowerCase());
    });
    
    return fieldId ? registration.answers[fieldId] : 'N/A';
  };

  const filteredRegistrations = registrations.filter(reg => {
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      // Search in all answers
      Object.values(reg.answers).some(val => 
        val.toLowerCase().includes(searchLower)
      ) ||
      reg.email.toLowerCase().includes(searchLower) ||
      // Search by name
      getFieldValue(reg, 'name').toLowerCase().includes(searchLower);

    // Payment filter
    const matchesPayment = 
      paymentFilter === 'all' || 
      reg.paymentStatus === paymentFilter;

    return matchesSearch && matchesPayment;
  });

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Paid</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Failed</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">Unknown</span>;
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Registered At', 'Payment Status', 'Amount'];
    
    // Add custom form fields as headers
    event.formFields?.forEach(field => {
      if (!headers.includes(field.label)) {
        headers.push(field.label);
      }
    });

    const rows = registrations.map(reg => {
      const rowData = [
        getFieldValue(reg, 'name'),
        reg.email,
        getFieldValue(reg, 'phone'),
        new Date(reg.registeredAt).toLocaleString(),
        reg.paymentStatus,
        `$${reg.amountPaid || 0}`
      ];

      // Add custom form field values
      event.formFields?.forEach(field => {
        rowData.push(reg.answers[field._id] || '');
      });

      return rowData;
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title}_registrations.csv`.replace(/[^a-z0-9]/gi, '_');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Registrations for: {event.title}</h3>
                <p className="text-sm text-gray-600">
                  {registrations.length} registration{registrations.length !== 1 ? 's' : ''}
                  {event.registrationsCount && ` (${event.registrationsCount} total)`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or any field..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Payments</option>
                    <option value="completed">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                
                <button
                  onClick={exportToCSV}
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading registrations...</p>
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📭</div>
                <h4 className="text-xl font-semibold text-gray-700 mb-2">No Registrations Found</h4>
                <p className="text-gray-600">
                  {searchTerm || paymentFilter !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'No one has registered for this event yet'
                  }
                </p>
              </div>
            ) : (
              <>
                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-900">{registrations.length}</div>
                    <div className="text-sm text-blue-700">Total Registrations</div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-900">
                      {registrations.filter(r => r.paymentStatus === 'completed').length}
                    </div>
                    <div className="text-sm text-green-700">Paid Registrations</div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-900">
                      {registrations.filter(r => r.paymentStatus === 'pending').length}
                    </div>
                    <div className="text-sm text-yellow-700">Pending Payments</div>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-900">
                      ${registrations.reduce((sum, reg) => sum + (reg.amountPaid || 0), 0)}
                    </div>
                    <div className="text-sm text-purple-700">Total Revenue</div>
                  </div>
                </div>

                {/* Registrations Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRegistrations.map((registration) => {
                        const name = getFieldValue(registration, 'name');
                        const phone = getFieldValue(registration, 'phone');

                        return (
                          <tr key={registration._id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                <div>
                                  <div className="font-medium text-gray-900">{name}</div>
                                  {phone && phone !== 'N/A' && (
                                    <div className="text-sm text-gray-500 flex items-center">
                                      <Phone className="h-3 w-3 mr-1" />
                                      {phone}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center text-gray-700">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                {registration.email}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-700">
                                {phone}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center text-gray-700">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                <div className="text-sm">
                                  {new Date(registration.registeredAt).toLocaleDateString()}
                                  <br />
                                  <span className="text-gray-500 text-xs">
                                    {new Date(registration.registeredAt).toLocaleTimeString()}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getPaymentStatusBadge(registration.paymentStatus)}
                              {registration.paymentType && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {registration.paymentType}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium">
                                ${registration.amountPaid || 0}
                              </div>
                              {registration.transactionId && (
                                <div className="text-xs text-gray-500 truncate max-w-[120px]">
                                  {registration.transactionId.substring(0, 8)}...
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => setSelectedRegistration(registration)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Registration Details Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSelectedRegistration(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Registration Details</h3>
                <button onClick={() => setSelectedRegistration(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Name</div>
                  <div className="font-medium">{getFieldValue(selectedRegistration, 'name')}</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <div className="font-medium">{selectedRegistration.email}</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Phone</div>
                  <div className="font-medium">{getFieldValue(selectedRegistration, 'phone')}</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Registered At</div>
                  <div className="font-medium">
                    {new Date(selectedRegistration.registeredAt).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {/* Answers */}
              {event.formFields && event.formFields.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Registration Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.formFields.map((field) => (
                      <div key={field._id} className="border border-gray-200 rounded-lg p-3">
                        <div className="text-sm text-gray-500">{field.label}</div>
                        <div className="font-medium">
                          {selectedRegistration.answers[field._id] || 'Not provided'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Details */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">Payment Details</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className={`font-medium ${
                        selectedRegistration.paymentStatus === 'completed' ? 'text-green-600' :
                        selectedRegistration.paymentStatus === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedRegistration.paymentStatus}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Amount</div>
                      <div className="font-medium">${selectedRegistration.amountPaid || 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Payment Type</div>
                      <div className="font-medium">{selectedRegistration.paymentType || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Transaction ID</div>
                      <div className="font-medium text-sm truncate">
                        {selectedRegistration.transactionId || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}