"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Lock,
  Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

interface Seminar {
  _id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  instructor: string;
  capacity: number;
  currentRegistrations: number;
  price?: number;
}

interface Props {
  seminar: Seminar;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SeminarRegistrationModal({ seminar, onClose, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.email.trim()) {
      toast.error('Please fill in all required fields', {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email address', {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/seminaregistration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seminarId: seminar._id,
          ...formData,
          registrationDate: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      await res.json();
      
      toast.success('Registration successful!', {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        style: {
          background: '#D1FADF',
          color: '#039855',
          border: '1px solid #A6F4C5',
          padding: '16px',
          borderRadius: '12px',
        },
        duration: 3000,
      });

      onSuccess?.();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.', {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        style: {
          background: '#FEF3F2',
          color: '#D92D20',
          border: '1px solid #FDA29B',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const availableSeats = seminar.capacity - seminar.currentRegistrations;
  const isSoldOut = availableSeats <= 0;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Modal Card */}
            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-blue-500 rounded">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-blue-700">Register Now</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{seminar.title}</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Seminar Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(seminar.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span>{seminar.location}</span>
                  </div>
                </div>
              </div>

              {/* Sold Out Warning */}
              {isSoldOut && (
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 border-b border-red-200">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium text-red-800">This seminar is sold out</div>
                      <div className="text-sm text-red-700">Contact us for waitlist options</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        required
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Seats Info */}
                  {!isSoldOut && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Available Seats</span>
                        <span className="font-medium text-gray-900">{availableSeats}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                          style={{ width: `${(seminar.currentRegistrations / seminar.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Security Note */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span>Your information is secure and will not be shared</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || isSoldOut}
                    className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : isSoldOut ? (
                      "Sold Out"
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}