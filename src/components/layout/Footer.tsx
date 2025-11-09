'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-blue-900 text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold">E</span>
              </div>
              <span className="text-lg font-bold">Evasue Ethiopia</span>
            </div>
            <p className="text-blue-200 text-sm">
              Following Christ together on Ethiopian campuses
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/campuses" className="hover:text-white">Campuses</Link></li>
              <li><Link href="/events" className="hover:text-white">Events</Link></li>
              <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2 text-blue-200">
              <li><Link href="/join" className="hover:text-white">Join Us</Link></li>
              <li><Link href="/volunteer" className="hover:text-white">Volunteer</Link></li>
              <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="text-blue-200 text-sm space-y-2">
              <p>Addis Ababa, Ethiopia</p>
              <p>Email: info@evasue.net</p>
              <p>WhatsApp: +251 XXX XXX XXX</p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300 text-sm">
          <p>&copy; {currentYear} Evasue in Ethiopia Christian Student Fellowship. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};