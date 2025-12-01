// components/events/PaymentModal.tsx - UPDATED
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle2,
  X,
  Loader2
} from "lucide-react";
import SuccessModal from "./SuccessModal";

interface PaymentData {
  eventId: string;
  eventTitle: string;
  amount: number;
  userData: {
    name: string;
    email: string;
    phone: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

interface EventType {
  _id: string;
  title: string;
  price?: number;
  date: string;
  location: string;
}

interface PaymentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  paymentData: PaymentData;
  event: EventType;
  onSuccess: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'telebirr' | 'cbe' | 'mobile' | 'bank' | '';

export default function PaymentModal({ 
  open, 
  setOpen, 
  paymentData, 
  event, 
  onSuccess, 
  onCancel 
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('');
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const paymentMethods = [
    {
      id: 'telebirr',
      name: 'Telebirr',
      icon: Smartphone,
      description: 'Pay with Telebirr mobile money',
      color: 'bg-green-500'
    },
    {
      id: 'cbe',
      name: 'CBE Birr',
      icon: CreditCard,
      description: 'Pay with CBE Birr',
      color: 'bg-blue-500'
    },
    {
      id: 'mobile',
      name: 'Mobile Banking',
      icon: Smartphone,
      description: 'Pay with other mobile banking',
      color: 'bg-purple-500'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Pay via bank transfer',
      color: 'bg-gray-500'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setProcessing(true);
    setStep('processing');

    try {
      // Simulate API call to payment gateway
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock transaction ID
      const mockTransactionId = 'txn_' + Math.random().toString(36).substr(2, 9);
      setTransactionId(mockTransactionId);
      
      setStep('success');
      
      // Show success modal after a brief delay
      setTimeout(() => {
        setOpen(false);
        setShowSuccessModal(true);
        onSuccess();
      }, 1500);
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
      setStep('select');
      setProcessing(false);
    }
  };

  const handleDownloadReceipt = async () => {
    try {
      // Download receipt PDF
      const response = await fetch(`/api/events/${event._id}/receipt`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${event.title}-${transactionId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download receipt:', error);
      alert('Failed to download receipt. Please try again.');
    }
  };

  const handleViewEvent = () => {
    window.location.href = `/events/${event._id}`;
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

  if (!open) return null;

  return (
    <>
      {/* Payment Modal */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Complete Your Registration</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {event.title}
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={processing}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Amount Display */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ETB {paymentData.amount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            {step === 'select' && (
              <>
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedMethod === method.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-semibold text-gray-900">{method.name}</p>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 ${
                              selectedMethod === method.id
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-gray-300'
                            }`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={!selectedMethod || processing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ETB ${paymentData.amount}`
                  )}
                </button>
              </>
            )}

            {/* Processing State */}
            {step === 'processing' && (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Processing Payment</h3>
                <p className="text-gray-600">Please wait while we process your payment...</p>
              </div>
            )}

            {/* Success State */}
            {step === 'success' && (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600">
                  Your registration for <strong>{event.title}</strong> is now complete.
                </p>
              </div>
            )}

            {/* User Info Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">Registration Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
               
                {/* Show additional form fields */}
                {Object.entries(paymentData.userData)
                  .filter(([key]) => !['name', 'email', 'phone'].includes(key.toLowerCase()))
                  .map(([key, value]) => (
                    <p key={key}>
                      <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {String(value)}
                    </p>
                  ))
                }
              </div>
            </div>

            {/* Cancel Button */}
            {step === 'select' && (
              <button
                onClick={handleCancel}
                className="w-full mt-4 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel Payment
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        event={{
          _id: event._id,
          title: event.title,
          date: event.date,
          location: event.location,
          price: paymentData.amount
        }}
        userData={paymentData.userData}
        transactionId={transactionId}
        onDownloadReceipt={handleDownloadReceipt}
        onViewEvent={handleViewEvent}
      />
    </>
  );
}