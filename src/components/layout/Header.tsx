'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component

// Helper component for dropdown menus
const DropdownMenu = ({ 
  title, 
  items 
}: { 
  title: string; 
  items: { name: string; href: string }[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-gray-700 hover:text-brand-sky-600 font-medium transition-colors duration-200 px-3 py-1.5 flex items-center focus:outline-none rounded-md hover:bg-gray-50">
        {title}
        <svg className="w-4 h-4 ml-1 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="py-1">
              {items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-sky-50 hover:text-brand-sky-700 transition-colors duration-150 rounded-md mx-1.5 first:mt-1 last:mb-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation data
  const aboutUsItems = [
    { name: 'What We Believe', href: '/about/believe' },
    { name: 'Who We Are', href: '/about/who-we-are' },
    { name: 'Leadership', href: '/about/leadership' },
    { name: 'General Secretary', href: '/about/general-secretary' },
    { name: 'History', href: '/about/history' },
  ];

  const studentMinistryItems = [
    { name: 'Discipleship', href: '/ministry/discipleship' },
    { name: 'Evangelism Development', href: '/ministry/evangelism' },
    { name: 'Leadership Development', href: '/ministry/leadership' },
  ];

  const joinUsItems = [
    { name: 'Join as a Student', href: '/join/student' },
    { name: 'Serve as a Staff', href: '/join/staff' },
    { name: 'Partner with Us', href: '/join/partner' },
    { name: 'Donate', href: '/donate' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3">
            {/* Image Logo */}
            <div className="relative w-20 h-10"> {/* Container for the image */}
              <Image
                src="/EvaSUELogo.png" // Update this path to your actual logo file
                alt="Evasue Ethiopia Logo"
                fill // This makes the image fill the container
                style={{ objectFit: 'cover' }} // Ensures the image covers the area nicely
                sizes="(max-width: 768px) 50px, (max-width: 1200px) 50px, 40px" // Optional: helps with responsive loading
              />
            </div>
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <DropdownMenu title="About Us" items={aboutUsItems} />
            <DropdownMenu title="Student Ministry" items={studentMinistryItems} />
            <DropdownMenu title="Join Us" items={joinUsItems} />
            
            {/* Contact Link */}
            <Link
              href="/contact"
              className="flex items-center px-3 py-1.5 text-gray-700 hover:text-brand-sky-600 font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button - Desktop Only */}
          <div className="hidden md:block">
            <Link href="/join">
              <button className="bg-brand-red-500 text-white px-5 py-2 rounded-full hover:bg-brand-red-600 transition-colors duration-200 font-medium text-sm">
                Get Involved
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">

                {/* About Us - Accordion-style */}
                <details className="group">
                  <summary className="flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer list-none">
                    <span>About Us</span>
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <ul className="mt-2 ml-4 space-y-1">
                    {aboutUsItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-sky-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>

                {/* Student Ministry */}
                <details className="group">
                  <summary className="flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer list-none">
                    <span>Student Ministry</span>
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <ul className="mt-2 ml-4 space-y-1">
                    {studentMinistryItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-sky-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>

                {/* Join Us */}
                <details className="group">
                  <summary className="flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer list-none">
                    <span>Join Us</span>
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <ul className="mt-2 ml-4 space-y-1">
                    {joinUsItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-brand-sky-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>

                {/* Contact Link */}
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                {/* Mobile CTA */}
                <div className="px-3 py-2">
                  <Link href="/join">
                    <button
                      className="w-full bg-brand-red-500 text-white py-2 rounded-full hover:bg-brand-red-600 transition-colors duration-200 font-medium text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Involved
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};