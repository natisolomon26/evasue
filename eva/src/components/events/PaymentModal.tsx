// components/PaymentModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { Event } from '@/types';
import { X, Loader2, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string;
  event: Event;
  onPaymentComplete: () => void;
}

export default function PaymentModal({ isOpen, onClose, checkoutUrl, event, onPaymentComplete }: PaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [countdown, setCountdown] = useState(5);

  // Handle countdown and auto-redirect
  useEffect(() => {
    if (isOpen && checkoutUrl && paymentStatus === 'pending') {
      const timer = setTimeout(() => {
        // Redirect to Chapa checkout
        window.open(checkoutUrl, '_blank');
        setPaymentStatus('processing');
      }, 2000); // 2 second delay for user to see instructions

      return () => clearTimeout(timer);
    }
  }, [isOpen, checkoutUrl, paymentStatus]);

  // Countdown for auto-redirect
  useEffect(() => {
    if (paymentStatus === 'pending' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, countdown]);

  const handleManualRedirect = () => {
    window.open(checkoutUrl, '_blank');
    setPaymentStatus('processing');
  };

  const handlePaymentComplete = () => {
    setPaymentStatus('completed');
    setTimeout(() => {
      onPaymentComplete();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Complete Payment</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {paymentStatus === 'pending' && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">💰</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    Redirecting to Secure Payment
                  </h4>
                  <p className="text-gray-600 mb-4">
                    You'll be redirected to Chapa's secure payment page in {countdown} seconds
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h5 className="font-semibold text-blue-900 mb-2">Payment Summary</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Event:</span>
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-lg text-blue-900">${event.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="font-medium">ETB</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleManualRedirect}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium flex items-center justify-center"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Open Payment Page Now
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  Chapa is a secure payment processor. Your payment information is encrypted and safe.
                </p>
              </div>
            )}

            {paymentStatus === 'processing' && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <Loader2 className="h-16 w-16 text-blue-500 animate-spin mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    Payment Processing
                  </h4>
                  <p className="text-gray-600">
                    Please complete the payment on the Chapa page that opened.
                    <br />
                    Do not close this window.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => window.open(checkoutUrl, '_blank')}
                    className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Reopen Payment Page
                  </button>

                  <button
                    onClick={handlePaymentComplete}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                  >
                    I've Completed the Payment
                  </button>
                </div>
              </div>
            )}

            {paymentStatus === 'completed' && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    Payment Successful!
                  </h4>
                  <p className="text-gray-600">
                    Thank you for your payment. You will be redirected shortly.
                  </p>
                </div>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    Payment Failed
                  </h4>
                  <p className="text-gray-600 mb-4">
                    There was an issue with your payment. Please try again.
                  </p>
                </div>

                <button
                  onClick={handleManualRedirect}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
                >
                  Try Payment Again
                </button>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h5 className="font-semibold text-gray-700 mb-2">Payment Instructions:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You will be redirected to Chapa's secure payment page</li>
                <li>• Complete your payment using your preferred method</li>
                <li>• Return to this window after payment completion</li>
                <li>• Click "I've Completed the Payment" to proceed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}