'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function SeminarsOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-sky-800 via-sky-900 to-sky-800 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Banner Content */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Seminars & Workshops
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Expand your knowledge, network with industry experts, and stay ahead in your career. Browse our upcoming seminars and register easily.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            {/* Open in New Tab */}
            <Link
              href="/page/seminars/list"
              target="_blank"
              className="px-8 py-4 bg-white text-sky-800 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
            >
              Browse All Seminars
              <ChevronRight size={20} />
            </Link>

            <Link
              href="#upcoming"
              className="px-8 py-4 bg-transparent border-2 border-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* Optional: Upcoming Seminars Section */}
      <section id="upcoming" className="max-w-7xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-sky-800 mb-8 text-center">
          Upcoming Seminars
        </h2>
        <p className="text-center text-sky-900/80 max-w-2xl mx-auto">
          Check out the latest seminars coming up soon. Click "Browse All Seminars" to see the full list and register.
        </p>
      </section>
    </div>
  );
}
