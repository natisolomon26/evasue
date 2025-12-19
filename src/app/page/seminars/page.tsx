'use client';
import Link from 'next/link';

export default function SeminarsOverview() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Seminars</h1>
        <p className="text-lg text-gray-700 mb-8">
          Expand your knowledge with expert-led seminars and workshops.
        </p>

        <Link
          href="/page/seminars/list"
          target="_blank" // open in new tab
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register Seminars
        </Link>
      </div>
    </div>
  );
}
