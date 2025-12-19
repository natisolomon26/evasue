'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Users, AlertCircle, Save, Lock, Unlock, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Seminar {
  _id: string;
  title: string;
  date: string;
  location: string;
  capacity: number;
  currentRegistrations: number;
  isOpen: boolean;
  description?: string;
}

interface Props {
  seminar: Seminar;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditSeminarModal({ seminar, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    capacity: '',
    isOpen: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Format date for input (YYYY-MM-DD)
    const formattedDate = seminar.date.split('T')[0];
    
    setFormData({
      title: seminar.title,
      date: formattedDate,
      location: seminar.location,
      capacity: seminar.capacity.toString(),
      isOpen: seminar.isOpen,
    });
  }, [seminar]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateField = (field: string, value: any) => {
    let error = '';
    
    switch (field) {
      case 'title':
        if (!value.trim()) error = 'Title is required';
        else if (value.trim().length < 3) error = 'Title must be at least 3 characters';
        break;
      case 'date':
        if (!value) error = 'Date is required';
        else if (new Date(value) < new Date()) error = 'Date cannot be in the past';
        break;
      case 'location':
        if (!value.trim()) error = 'Location is required';
        break;
      case 'capacity':
        if (!value) error = 'Capacity is required';
        else {
          const capacityNum = parseInt(value);
          if (isNaN(capacityNum)) error = 'Capacity must be a number';
          else if (capacityNum < 1) error = 'Capacity must be at least 1';
          else if (capacityNum > 10000) error = 'Capacity cannot exceed 10,000';
          else if (capacityNum < seminar.currentRegistrations) {
            error = `Cannot set capacity lower than current registrations (${seminar.currentRegistrations})`;
          }
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    const fields = ['title', 'date', 'location', 'capacity'];
    let isValid = true;
    
    fields.forEach(field => {
      const fieldValue = formData[field as keyof typeof formData];
      if (!validateField(field, fieldValue)) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  const handleEdit = async () => {
    // Mark all fields as touched
    const allTouched = {
      title: true,
      date: true,
      location: true,
      capacity: true,
    };
    setTouched(allTouched);

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        title: formData.title.trim(),
        date: formData.date,
        location: formData.location.trim(),
        capacity: parseInt(formData.capacity),
        isOpen: formData.isOpen,
      };

      const res = await fetch(`/api/seminars/${seminar._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update seminar');

      toast.success('Seminar updated successfully!', {
        icon: '✅',
        duration: 3000,
      });
      
      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Failed to update seminar');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today) for date input
  const today = new Date().toISOString().split('T')[0];

  // Check if capacity can be reduced
  const canReduceCapacity = parseInt(formData.capacity) >= seminar.currentRegistrations;

  const InputWithIcon = ({ 
    icon: Icon, 
    type, 
    placeholder, 
    value, 
    onChange, 
    onBlur,
    error,
    touched,
    min,
    disabled
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error?: string;
    touched?: boolean;
    min?: string;
    disabled?: boolean;
  }) => (
    <div className="space-y-1">
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
            error && touched ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      </div>
      {error && touched && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Seminar</h2>
            <p className="text-sm text-gray-600 mt-1">Update seminar information</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
            disabled={loading}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Current Info Summary */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">Current Seminar Info</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Current Capacity:</div>
              <div className="font-medium">{seminar.capacity}</div>
              
              <div className="text-gray-600">Registrations:</div>
              <div className={`font-medium ${seminar.currentRegistrations >= seminar.capacity ? 'text-red-600' : 'text-green-600'}`}>
                {seminar.currentRegistrations} / {seminar.capacity}
              </div>
              
              <div className="text-gray-600">Status:</div>
              <div className={`font-medium ${seminar.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                {seminar.isOpen ? 'Open' : 'Closed'}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Seminar Title *
            </label>
            <InputWithIcon
              icon={Save}
              type="text"
              placeholder="Enter seminar title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              error={errors.title}
              touched={touched.title}
            />
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Date *
            </label>
            <InputWithIcon
              icon={Calendar}
              type="date"
              placeholder="Select date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              onBlur={() => handleBlur('date')}
              error={errors.date}
              touched={touched.date}
              min={today}
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Location *
            </label>
            <InputWithIcon
              icon={MapPin}
              type="text"
              placeholder="Enter location or venue"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              onBlur={() => handleBlur('location')}
              error={errors.location}
              touched={touched.location}
            />
          </div>

          {/* Capacity */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Capacity *
              </label>
              <span className="text-xs text-gray-500">
                Current: {seminar.currentRegistrations}
              </span>
            <div/>
            </div>
            <InputWithIcon
              icon={Users}
              type="number"
              placeholder="Enter maximum participants"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              onBlur={() => handleBlur('capacity')}
              error={errors.capacity}
              touched={touched.capacity}
              min={seminar.currentRegistrations.toString()}
            />
            {!canReduceCapacity && (
              <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                Cannot reduce capacity below current registrations
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Minimum allowed: {seminar.currentRegistrations}
            </p>
          </div>

          {/* Registration Status */}
          <div className="pt-2">
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="font-medium text-gray-700 block">Registration Status</label>
                  <p className="text-sm text-gray-500">
                    {formData.isOpen ? 'Accepting new registrations' : 'Registration closed'}
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="isOpenEdit"
                    checked={formData.isOpen}
                    onChange={(e) => handleChange('isOpen', e.target.checked)}
                    className="sr-only"
                    disabled={loading}
                  />
                  <label
                    htmlFor="isOpenEdit"
                    className={`block w-14 h-7 rounded-full cursor-pointer transition-colors duration-200 ${
                      formData.isOpen ? 'bg-green-500' : 'bg-gray-400'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-200 flex items-center justify-center ${
                        formData.isOpen ? 'transform translate-x-7' : ''
                      }`}
                    >
                      {formData.isOpen ? (
                        <Unlock size={12} className="text-green-500" />
                      ) : (
                        <Lock size={12} className="text-gray-400" />
                      )}
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Status warnings */}
              {formData.isOpen && seminar.currentRegistrations >= parseInt(formData.capacity || '0') && (
                <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded mt-2">
                  <AlertCircle size={14} className="inline mr-1" />
                  Seminar is at full capacity. Consider increasing capacity or closing registration.
                </div>
              )}
              
              {!formData.isOpen && seminar.currentRegistrations > 0 && (
                <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded mt-2">
                  <Clock size={14} className="inline mr-1" />
                  {seminar.currentRegistrations} participants are already registered.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              disabled={loading || !canReduceCapacity}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Seminar
                </>
              )}
            </button>
          </div>
          
          {/* Validation summary */}
          {Object.keys(touched).some(key => touched[key]) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Changes:</span>
                <span className={`font-medium ${
                  !canReduceCapacity ? 'text-red-600' :
                  Object.keys(errors).some(key => errors[key] && touched[key]) 
                    ? 'text-amber-600' 
                    : 'text-green-600'
                }`}>
                  {!canReduceCapacity 
                    ? 'Fix capacity issue' 
                    : Object.keys(errors).some(key => errors[key] && touched[key]) 
                      ? 'Needs attention' 
                      : 'Ready to update ✓'
                  }
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}