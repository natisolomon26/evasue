// app/event/thank-you/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'completed' | 'failed' | 'pending'>('loading');
  const [details, setDetails] = useState({
    transactionRef: '',
    registrationId: '',
    amount: ''
  });

  useEffect(() => {
    // Get URL parameters
    const statusParam = searchParams.get('status');
    const transactionRef = searchParams.get('transaction_ref');
    const registrationId = searchParams.get('registration_id');
    const amount = searchParams.get('amount');

    console.log('Payment Status Parameters:', {
      statusParam,
      transactionRef,
      registrationId,
      amount
    });

    // Set status
    if (statusParam === 'completed' || statusParam === 'success') {
      setStatus('completed');
    } else if (statusParam === 'failed') {
      setStatus('failed');
    } else if (statusParam === 'pending') {
      setStatus('pending');
    } else {
      setStatus('loading');
    }

    // Set details
    setDetails({
      transactionRef: transactionRef || '',
      registrationId: registrationId || '',
      amount: amount || ''
    });

  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          title: 'Payment Successful! 🎉',
          message: 'Thank you for your payment. Your registration is now complete.',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          buttonText: 'Browse More Events',
          buttonAction: () => window.location.href = '/events'
        };
      case 'failed':
        return {
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          title: 'Payment Failed',
          message: 'There was an issue processing your payment. Please try again.',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          buttonText: 'Try Again',
          buttonAction: () => window.history.back()
        };
      case 'pending':
        return {
          icon: <Clock className="h-16 w-16 text-yellow-500" />,
          title: 'Payment Processing',
          message: 'Your payment is being processed. This may take a few moments.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          buttonText: 'Check Status',
          buttonAction: () => window.location.reload()
        };
      default:
        return {
          icon: <Clock className="h-16 w-16 text-blue-500" />,
          title: 'Loading...',
          message: 'Please wait while we process your payment status.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          buttonText: 'Refresh',
          buttonAction: () => window.location.reload()
        };
    }
  };

  const content = renderContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className={`rounded-2xl shadow-xl overflow-hidden border ${content.bgColor} border-opacity-30`}>
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              {content.icon}
            </div>
            
            <h1 className={`text-2xl font-bold mb-4 ${content.color}`}>
              {content.title}
            </h1>
            
            <p className="text-gray-600 mb-6">
              {content.message}
            </p>

            {/* Transaction Details */}
            {(details.transactionRef || details.registrationId || details.amount) && (
              <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">Transaction Details</h3>
                <div className="space-y-2 text-sm">
                  {details.transactionRef && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <code className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {details.transactionRef.substring(0, 20)}...
                      </code>
                    </div>
                  )}
                  {details.registrationId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration ID:</span>
                      <span className="font-medium">{details.registrationId.substring(0, 8)}...</span>
                    </div>
                  )}
                  {details.amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600">
                        ${parseFloat(details.amount).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={content.buttonAction}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                  status === 'completed' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    : status === 'failed'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                }`}
              >
                {content.buttonText}
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition"
              >
                Return to Home
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact support@example.com
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <span>🔒 Secure Payment</span>
            <span>•</span>
            <span>✅ Verified by Chapa</span>
          </div>
        </div>
      </div>
    </div>
  );
}