// components/ThankYouContent.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';

type PaymentStatus = 'completed' | 'failed' | 'pending' | 'error';

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [message, setMessage] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const statusParam = searchParams.get('status');
    const transactionRefParam = searchParams.get('transaction_ref') || searchParams.get('trx_ref');
    const registrationIdParam = searchParams.get('registration_id');
    const amountParam = searchParams.get('amount');

    // Set status
    if (statusParam === 'completed' || statusParam === 'success') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('completed');
      setMessage('Thank you! Your payment was successful and registration is complete.');
    } else if (statusParam === 'failed' || statusParam === 'cancelled') {
      setStatus('failed');
      setMessage('Payment was not completed. Please try again.');
    } else if (statusParam === 'pending') {
      setStatus('pending');
      setMessage('Your payment is being processed. This may take a few moments.');
    } else {
      setStatus('error');
      setMessage('Payment status unknown. Please contact support.');
    }

    // Set additional data
    if (transactionRefParam) setTransactionRef(transactionRefParam);
    if (registrationIdParam) setRegistrationId(registrationIdParam);
    if (amountParam) setAmount(amountParam);

    // Simulate loading to ensure all params are processed
    setTimeout(() => setLoading(false), 500);

  }, [searchParams]);

  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Payment Successful! 🎉',
          buttonColor: 'bg-green-600 hover:bg-green-700',
        };
      case 'failed':
        return {
          icon: XCircle,
          iconColor: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Payment Failed',
          buttonColor: 'bg-red-600 hover:bg-red-700',
        };
      case 'pending':
        return {
          icon: Clock,
          iconColor: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: 'Payment Processing',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
        };
      default:
        return {
          icon: XCircle,
          iconColor: 'text-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          title: 'Payment Status Unknown',
          buttonColor: 'bg-gray-600 hover:bg-gray-700',
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const Icon = statusConfig.icon;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Main Card */}
        <div className={`rounded-2xl shadow-xl overflow-hidden border ${statusConfig.borderColor} ${statusConfig.bgColor}`}>
          {/* Header */}
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${statusConfig.bgColor}`}>
                <Icon className={`h-20 w-20 ${statusConfig.iconColor}`} />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {statusConfig.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
              {message}
            </p>
          </div>

          {/* Transaction Details */}
          {(transactionRef || registrationId || amount) && (
            <div className="bg-white border-t border-gray-200 p-6">
              <h3 className="font-semibold text-gray-700 mb-4">Transaction Details</h3>
              
              <div className="space-y-3">
                {transactionRef && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Transaction Reference</span>
                    <div className="flex items-center">
                      <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {transactionRef.substring(0, 20)}...
                      </code>
                      <button
                        onClick={() => navigator.clipboard.writeText(transactionRef)}
                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
                
                {registrationId && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Registration ID</span>
                    <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {registrationId}
                    </code>
                  </div>
                )}
                
                {amount && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${parseFloat(amount).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-white border-t border-gray-200 p-6">
            <h3 className="font-semibold text-gray-700 mb-4">
              {status === 'completed' ? 'What happens next?' : 'Next Steps'}
            </h3>
            
            <div className="space-y-3 mb-6">
              {status === 'completed' && (
                <>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Your registration has been confirmed</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">You will receive a confirmation email shortly</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Check your email for event details and tickets</span>
                  </div>
                </>
              )}
              
              {status === 'failed' && (
                <>
                  <div className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Your payment was not processed successfully</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">No funds were deducted from your account</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">You can try the payment again</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {status === 'completed' && (
                <>
                  <button
                    onClick={() => router.push('/events')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium flex items-center justify-center"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Browse More Events
                  </button>
                  
                  <button
                    onClick={() => router.push('/dashboard/tickets')}
                    className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition font-medium"
                  >
                    View My Tickets
                  </button>
                </>
              )}
              
              {status === 'failed' && (
                <button
                  onClick={() => router.back()}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition font-medium"
                >
                  Try Payment Again
                </button>
              )}
              
              <button
                onClick={() => router.push('/')}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Return to Home
              </button>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-gray-50 border-t border-gray-200 p-6 text-center">
            <p className="text-gray-600 mb-2">
              Need help? Contact our support team
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="mailto:support@example.com"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                ✉️ support@example.com
              </a>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <a
                href="tel:+251911234567"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                📞 +251 91 123 4567
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Transaction ID: {transactionRef || 'N/A'}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Secure Payment
            </span>
            <span>•</span>
            <span className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Encrypted Transaction
            </span>
            <span>•</span>
            <span className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Verified by Chapa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}