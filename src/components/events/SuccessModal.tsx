// components/events/SuccessModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Download, 
  Calendar, 
  MapPin, 
  User,
  Mail,
  Phone,
  X
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  phone: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    _id: string;
    title: string;
    date: string;
    location: string;
    price: number;
  };
  userData: UserData;
  transactionId?: string;
  onDownloadReceipt: () => void;
  onViewEvent?: () => void;
}

export default function SuccessModal({
  isOpen,
  onClose,
  event,
  userData,
  transactionId,
  onDownloadReceipt,
  onViewEvent
}: SuccessModalProps) {

  const handleDownloadReceipt = async () => {
    try {
      await onDownloadReceipt();
    } catch (error) {
      console.error('Failed to download receipt:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get additional form fields (excluding basic fields)
  const getAdditionalFields = () => {
    const basicFields = ['name', 'email', 'phone', 'fullName', 'Full Name', 'Email', 'Phone'];
    return Object.entries(userData)
      .filter(([key, value]) => 
        !basicFields.includes(key.toLowerCase()) && 
        value && 
        typeof value === 'string'
      )
      .map(([key, value]) => ({
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        value: value as string
      }));
  };

  const additionalFields = getAdditionalFields();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Registration Complete! 🎉</h2>
                    <p className="text-green-100 text-lg">
                      You're successfully registered for the event
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Success Animation */}
                <div className="flex items-center justify-center mb-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                    <div className="relative bg-white/20 rounded-full p-4">
                      <CheckCircle2 className="w-16 h-16 text-white animate-scale-in" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {/* Event Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Event Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Event</p>
                      <p className="font-semibold text-gray-900">{event.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-semibold text-gray-900">{formatDate(event.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {event.location || 'Online Event'}
                      </p>
                    </div>
                    {event.price > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Amount Paid</p>
                        <p className="font-semibold text-green-600 text-lg">
                          ETB {event.price.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Attendee Information */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Your Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <User className="w-4 h-4 text-gray-500" />
                        {userData.name || userData.fullName || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {userData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {userData.phone}
                      </p>
                    </div>
                    {transactionId && (
                      <div>
                        <p className="text-sm text-gray-600">Transaction ID</p>
                        <p className="font-mono text-sm font-semibold text-gray-900 bg-white px-2 py-1 rounded">
                          {transactionId.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Form Fields */}
              {additionalFields.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {additionalFields.map((field, index) => (
                      <div key={index}>
                        <p className="text-sm text-gray-600">{field.label}</p>
                        <p className="font-semibold text-gray-900">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>Save your receipt</strong> - You'll need it for event entry
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>Check your email</strong> - We've sent a confirmation to {userData.email}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      <strong>Arrive early</strong> - Please come 30 minutes before the event starts
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadReceipt}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Receipt
                </button>
                
                {onViewEvent && (
                  <button
                    onClick={onViewEvent}
                    className="flex-1 border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-green-50 flex items-center justify-center gap-3"
                  >
                    <Calendar className="w-5 h-5" />
                    View Event Details
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 font-medium py-4 px-6 rounded-xl transition-all duration-300 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}