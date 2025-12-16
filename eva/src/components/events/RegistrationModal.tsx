// components/RegistrationModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types';
import { X, Loader2, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (formData: any) => Promise<void>; // Changed to async
}

export default function RegistrationModal({ isOpen, onClose, event, onSubmit }: RegistrationModalProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');
  const [emailFieldId, setEmailFieldId] = useState<string>('');

  // Initialize email field
  useEffect(() => {
    const emailField = event.formFields.find(f => 
      f.label.toLowerCase().includes('email') || f.type === 'email'
    );
    if (emailField) {
      setEmailFieldId(emailField._id);
    }
  }, [event.formFields]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setAnswers({});
      setErrors({});
      setSubmitting(false);
      setSuccess(false);
      setErrorMessage('');
      setCheckoutUrl('');
    }
  }, [isOpen]);

  const handleInputChange = (fieldId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [fieldId]: value }));
    
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    event.formFields.forEach(field => {
      const value = answers[field._id]?.trim() || '';
      
      if (field.required && !value) {
        newErrors[field._id] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field._id] = 'Please enter a valid email address';
      }
      
      if (field.type === 'number' && value && isNaN(Number(value))) {
        newErrors[field._id] = 'Please enter a valid number';
      }
    });

    // Validate email for payment events
    if (event.isPaid) {
      const emailValue = answers[emailFieldId]?.trim() || '';
      if (!emailValue) {
        newErrors['email'] = 'Email is required for payment processing';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        newErrors['email'] = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    
    try {
      // Prepare form data
      const formData = {
        answers: Object.fromEntries(
          Object.entries(answers).map(([key, value]) => [key, value.trim()])
        ),
        email: answers[emailFieldId]?.trim() || ''
      };

      await onSubmit(formData);
      // If onSubmit doesn't throw, registration was successful
      
      if (event.isPaid) {
        // For paid events, show success message with redirect info
        setSuccess(true);
      } else {
        // For free events, close modal after delay
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleManualRedirect = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      // This should be handled by the parent component's onSubmit
      window.location.reload();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (field: any) => {
    const error = errors[field._id];
    const value = answers[field._id] || '';
    
    const baseClasses = "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed";
    const errorClasses = error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field._id, e.target.value)}
            className={`${baseClasses} ${errorClasses} min-h-[100px] resize-y`}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            disabled={submitting || success}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field._id, e.target.value)}
            className={`${baseClasses} ${errorClasses} ${!value ? 'text-gray-400' : ''}`}
            disabled={submitting || success}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string, idx: number) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 disabled:hover:bg-transparent">
            <input
              type="checkbox"
              id={field._id}
              checked={value === 'true'}
              onChange={(e) => handleInputChange(field._id, e.target.checked.toString())}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
              disabled={submitting || success}
            />
            <label htmlFor={field._id} className="text-gray-700 cursor-pointer disabled:cursor-not-allowed">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );
      
      default:
        const inputType = field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text';
        return (
          <input
            type={inputType}
            value={value}
            onChange={(e) => handleInputChange(field._id, e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            disabled={submitting || success}
            {...(field.type === 'number' ? { min: "0", step: "any" } : {})}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={submitting || success ? undefined : onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {success ? 'Registration Successful!' : 'Register for Event'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{event.title}</p>
              </div>
              {!submitting && !success && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition p-1"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {errorMessage && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-900 mb-1">Registration Failed</h4>
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {success ? (
              // Success State
              <div className="text-center py-6">
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-green-100 rounded-full">
                      <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {event.isPaid ? 'Ready for Payment!' : 'Registration Complete!'}
                  </h4>
                  
                  <p className="text-gray-600 mb-6">
                    {event.isPaid 
                      ? 'You will be redirected to the secure payment page in a few seconds...'
                      : 'Thank you for registering for this event!'
                    }
                  </p>

                  {event.isPaid && (
                    <div className="mb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                        <div className="flex items-center">
                          <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-2" />
                          <span className="text-blue-700">Preparing secure payment...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {event.isPaid && (
                      <button
                        onClick={handleManualRedirect}
                        className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
                      >
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Click here if not redirected automatically
                      </button>
                    )}
                    
                    <button
                      onClick={onClose}
                      className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition"
                    >
                      {event.isPaid ? 'Cancel Payment' : 'Close'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Registration Form
              <>
                {/* Event Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-blue-900">Event Details</h4>
                      <p className="text-sm text-blue-700">
                        {new Date(event.date).toLocaleDateString()} • {event.location || 'Online'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-900">
                        {event.isPaid ? `$${event.price}` : 'FREE'}
                      </div>
                      <div className="text-sm text-blue-700">
                        {event.isPaid ? 'Payment required' : 'No payment required'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {event.formFields.map((field) => (
                      <div key={field._id}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                          <span className="ml-2 text-xs text-gray-500 capitalize">({field.type})</span>
                        </label>
                        
                        {renderField(field)}
                        
                        {errors[field._id] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errors[field._id]}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Payment Info */}
                    {event.isPaid && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-blue-900">Payment Amount</span>
                          <span className="text-2xl font-bold text-blue-900">${event.price}</span>
                        </div>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p>• Secure payment via Chapa</p>
                          <p>• Transaction fee may apply</p>
                          <p>• Payment confirmation may take a few moments</p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-lg transition-all flex items-center justify-center ${
                          submitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : event.isPaid
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                        }`}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : event.isPaid ? (
                          `Proceed to Payment - $${event.price}`
                        ) : (
                          'Complete Registration'
                        )}
                      </button>
                      
                      <p className="text-xs text-gray-500 text-center mt-4">
                        By registering, you agree to our Terms of Service and Privacy Policy
                      </p>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          {!success && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-2">🔒</span>
                  Your information is secure
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <span className="mr-2">🔄</span>
                  Instant confirmation
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}