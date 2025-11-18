'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-slate-900 text-gray-200 border-t border-slate-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Row: Logo + Socials + Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-start md:items-center lg:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
                EvaSUE Ethiopia
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Following Christ together on Ethiopian campuses — transforming students, impacting nations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Campuses", href: "/campuses" },
                { label: "Events", href: "/events" },
                { label: "Resources", href: "/resources" },
              ].map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 4, color: "#60A5FA" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Get Involved</h4>
            <ul className="space-y-2">
              {[
                { label: "Join Us", href: "/join" },
                { label: "Volunteer", href: "/volunteer" },
                { label: "Donate", href: "/donate" },
                { label: "Pray for Us", href: "/pray" },
              ].map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 4, color: "#FBBF24" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Contact</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@evasue.net</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+251 XXX XXX XXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Social Icons */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-sm"
          >
            &copy; {currentYear} EvaSUE in Ethiopia Christian Student Fellowship. All rights reserved.
          </motion.p>

          <div className="flex gap-4">
            {[ 'Telegram', 'Instagram', 'YouTube'].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-slate-500 hover:text-sky-400 transition-colors duration-200"
                aria-label={social}
              >
                <span className="text-xs font-bold uppercase tracking-wider">{social[0]}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Floating decorative element */}
        <motion.div 
          className="absolute -bottom-4 -left-4 w-20 h-20 bg-sky-500/5 rounded-full blur-2xl hidden md:block"
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.footer>
  );
};