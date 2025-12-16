// app/event/thank-you/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get('status');
    const transactionRef = searchParams.get('transaction_ref');
    
    console.log('Thank You Page - Status:', status);
    console.log('Thank You Page - Transaction Ref:', transactionRef);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your payment was successful. Check your email for confirmation.
        </p>
        <button
          onClick={() => window.location.href = '/events'}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Browse More Events
        </button>
      </div>
    </div>
  );
}