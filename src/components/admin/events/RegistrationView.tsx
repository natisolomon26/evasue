// components/RegistrationView.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Event, Registration } from '@/types';
import { 
  X, 
  Download, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  Search, 
  Filter, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Eye
} from 'lucide-react';

interface RegistrationViewProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = 'all' | 'paid' | 'pending' | 'failed';
type SortBy = 'date' | 'name' | 'amount' | 'status';

export default function RegistrationView({ event, isOpen, onClose }: RegistrationViewProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Helper function to get field value by label
  const getFieldValue = useCallback((registration: Registration, fieldLabel: string): string => {
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
  }, [event.formFields]);

  const fetchRegistrations = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`/api/registrations?eventId=${event._id}`);
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [event._id]);

  useEffect(() => {
    if (isOpen && event._id) {
      fetchRegistrations();
    }
  }, [isOpen, event._id, fetchRegistrations]);

  // Auto-refresh
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isOpen && autoRefresh && !loading) {
      interval = setInterval(() => {
        fetchRegistrations();
      }, 10000); // Refresh every 10 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, autoRefresh, loading, fetchRegistrations]);

  // Filter and sort registrations
  const filteredRegistrations = registrations
    .filter(reg => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        Object.values(reg.answers).some(val => 
          val.toLowerCase().includes(searchLower)
        ) ||
        reg.email.toLowerCase().includes(searchLower) ||
        getFieldValue(reg, 'name').toLowerCase().includes(searchLower);

      // View mode filter
      const matchesView = 
        viewMode === 'all' || 
        (viewMode === 'paid' && reg.paymentStatus === 'completed') ||
        (viewMode === 'pending' && reg.paymentStatus === 'pending') ||
        (viewMode === 'failed' && reg.paymentStatus === 'failed');

      return matchesSearch && matchesView;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.registeredAt).getTime();
          bValue = new Date(b.registeredAt).getTime();
          break;
        case 'name':
          aValue = getFieldValue(a, 'name').toLowerCase();
          bValue = getFieldValue(b, 'name').toLowerCase();
          break;
        case 'amount':
          aValue = a.amountPaid || 0;
          bValue = b.amountPaid || 0;
          break;
        case 'status':
          aValue = a.paymentStatus;
          bValue = b.paymentStatus;
          break;
        default:
          return 0;
      }
      
      return sortOrder === 'asc' 
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
    });

  // Statistics
  const stats = {
    total: registrations.length,
    paid: registrations.filter(r => r.paymentStatus === 'completed').length,
    pending: registrations.filter(r => r.paymentStatus === 'pending').length,
    failed: registrations.filter(r => r.paymentStatus === 'failed').length,
    revenue: registrations
      .filter(r => r.paymentStatus === 'completed')
      .reduce((sum, reg) => sum + (reg.amountPaid || 0), 0),
    pendingValue: registrations
      .filter(r => r.paymentStatus === 'pending')
      .reduce((sum, reg) => sum + (event.isPaid ? event.price : 0), 0)
  };

  const getPaymentStatusBadge = (registration: Registration) => {
    const status = registration.paymentStatus;
    const isOldPending = status === 'pending' && 
      new Date(registration.createdAt) < new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    switch (status) {
      case 'completed':
        return (
          <div className="flex flex-col">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Paid
            </span>
            {registration.paymentType && (
              <span className="text-xs text-gray-500 mt-1">{registration.paymentType}</span>
            )}
          </div>
        );
      case 'pending':
        return (
          <div className="flex flex-col">
            <span className={`px-2 py-1 text-xs font-medium rounded flex items-center ${
              isOldPending 
                ? 'bg-red-100 text-red-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              <Clock className="h-3 w-3 mr-1" />
              {isOldPending ? 'Expired' : 'Pending'}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {new Date(registration.createdAt).toLocaleDateString()}
            </span>
          </div>
        );
      case 'failed':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
            Unknown
          </span>
        );
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Registered At', 'Payment Status', 'Amount', 'Transaction ID'];
    
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
        new Date(reg.registeredAt).toISOString(),
        reg.paymentStatus,
        reg.amountPaid || 0,
        reg.transactionId || ''
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
    a.download = `${event.title}_registrations_${new Date().toISOString().split('T')[0]}.csv`
      .replace(/[^a-z0-9]/gi, '_');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
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
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Registrations for: {event.title}</h3>
                <p className="text-sm text-gray-600">
                  {stats.total} registration{stats.total !== 1 ? 's' : ''} • 
                  ${stats.revenue} collected • 
                  ${stats.pendingValue} pending
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchRegistrations}
                  disabled={refreshing}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition p-1"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                  viewMode === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setViewMode('paid')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                  viewMode === 'paid'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Paid ({stats.paid})
              </button>
              <button
                onClick={() => setViewMode('pending')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                  viewMode === 'pending'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setViewMode('failed')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
                  viewMode === 'failed'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Failed ({stats.failed})
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, or any field..."
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
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value as SortBy)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="ml-2 px-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoRefresh"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="autoRefresh" className="ml-2 text-sm text-gray-700">
                    Auto-refresh
                  </label>
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
                  {searchTerm || viewMode !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'No one has registered for this event yet'
                  }
                </p>
              </div>
            ) : (
              <>
                {/* Enhanced Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg mr-4">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total Registrations</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg mr-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.paid}</div>
                        <div className="text-sm text-gray-600">Paid ({stats.revenue} ETB)</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
                        <div className="text-sm text-gray-600">Pending ({stats.pendingValue} ETB)</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg mr-4">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {stats.revenue + stats.pendingValue}
                        </div>
                        <div className="text-sm text-gray-600">Total Value</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registrations Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            Phone
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('date')}
                        >
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Registered {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Status
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('amount')}
                        >
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRegistrations.map((registration) => {
                        const name = getFieldValue(registration, 'name');
                        const phone = getFieldValue(registration, 'phone');
                        const isOldPending = registration.paymentStatus === 'pending' && 
                          new Date(registration.createdAt) < new Date(Date.now() - 24 * 60 * 60 * 1000);

                        return (
                          <tr 
                            key={registration._id} 
                            className={`hover:bg-gray-50 transition ${
                              isOldPending ? 'bg-red-50' : ''
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className={`p-2 rounded-lg mr-3 ${
                                  registration.paymentStatus === 'completed' ? 'bg-green-100' :
                                  registration.paymentStatus === 'pending' ? 
                                    (isOldPending ? 'bg-red-100' : 'bg-yellow-100') :
                                  'bg-gray-100'
                                }`}>
                                  <User className={`h-4 w-4 ${
                                    registration.paymentStatus === 'completed' ? 'text-green-600' :
                                    registration.paymentStatus === 'pending' ? 
                                      (isOldPending ? 'text-red-600' : 'text-yellow-600') :
                                    'text-gray-600'
                                  }`} />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{name}</div>
                                  {isOldPending && (
                                    <div className="text-xs text-red-600 mt-1 flex items-center">
                                      <AlertCircle className="h-3 w-3 mr-1" />
                                      Registration expired
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center text-gray-700">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="truncate max-w-[200px]">{registration.email}</span>
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
                                    {new Date(registration.registeredAt).toLocaleTimeString([], { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getPaymentStatusBadge(registration)}
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
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedRegistration(registration)}
                                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Details
                                </button>
                                {registration.paymentStatus === 'pending' && !isOldPending && (
                                  <button
                                    onClick={() => {
                                      // TODO: Implement resend payment link
                                      alert('Resend payment link functionality coming soon!');
                                    }}
                                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                                    title="Resend Payment Link"
                                  >
                                    Resend
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Info */}
                <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                  <div>
                    Showing {filteredRegistrations.length} of {registrations.length} registrations
                    {viewMode !== 'all' && ` (filtered by ${viewMode})`}
                  </div>
                  <div>
                    Last updated: {new Date().toLocaleTimeString()}
                    {autoRefresh && ' • Auto-refresh enabled'}
                  </div>
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
                <button 
                  onClick={() => setSelectedRegistration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
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