'use client';

import { useState } from 'react';
import { X, Calendar, MapPin, Users, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSeminarModal({ onClose, onSuccess }: Props) {
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
        else if (parseInt(value) < 1) error = 'Capacity must be at least 1';
        else if (parseInt(value) > 10000) error = 'Capacity cannot exceed 10,000';
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

  const handleAdd = async () => {
    // Mark all fields as touched
    setTouched({
      title: true,
      date: true,
      location: true,
      capacity: true,
    });

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      const seminarData = {
        title: formData.title.trim(),
        date: formData.date,
        location: formData.location.trim(),
        capacity: parseInt(formData.capacity),
        isOpen: formData.isOpen,
      };

      const res = await fetch('/api/seminars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seminarData),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add seminar');

      toast.success('Seminar added successfully!', {
        icon: '🎯',
        duration: 3000,
      });
      
      // Reset form
      setFormData({
        title: '',
        date: '',
        location: '',
        capacity: '',
        isOpen: true,
      });
      
      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Failed to add seminar');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today) for date input
  const today = new Date().toISOString().split('T')[0];

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
    step
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
    step?: string;
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
          step={step}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
            error && touched ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
          }`}
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
            <h2 className="text-xl font-bold text-gray-900">Create New Seminar</h2>
            <p className="text-sm text-gray-600 mt-1">Fill in the seminar details</p>
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
          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Seminar Title *
            </label>
            <InputWithIcon
              icon={CheckCircle}
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
            <label className="text-sm font-medium text-gray-700">
              Capacity *
            </label>
            <InputWithIcon
              icon={Users}
              type="number"
              placeholder="Enter maximum participants"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              onBlur={() => handleBlur('capacity')}
              error={errors.capacity}
              touched={touched.capacity}
              min="1"
              step="1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum number of participants allowed
            </p>
          </div>

          {/* Registration Status */}
          <div className="pt-2">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <label className="font-medium text-gray-700 block">Open for Registration</label>
                <p className="text-sm text-gray-500">Allow participants to register</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  id="isOpenAdd"
                  checked={formData.isOpen}
                  onChange={(e) => handleChange('isOpen', e.target.checked)}
                  className="sr-only"
                  disabled={loading}
                />
                <label
                  htmlFor="isOpenAdd"
                  className={`block w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ${
                    formData.isOpen ? 'bg-green-500' : 'bg-gray-300'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full bg-white transition-transform duration-200 ${
                      formData.isOpen ? 'transform translate-x-6' : ''
                    }`}
                  />
                </label>
              </div>
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
              onClick={handleAdd}
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Create Seminar
                </>
              )}
            </button>
          </div>
          
          {/* Form status indicator */}
          {Object.keys(touched).length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Form Status:</span>
                <span className={`font-medium ${
                  Object.keys(errors).some(key => errors[key] && touched[key]) 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  {Object.keys(errors).some(key => errors[key] && touched[key]) 
                    ? 'Has errors' 
                    : 'All good ✓'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}