// app/components/landing/Campuses.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { campusLogos, LOGOS_PER_ROW, splitLogosIntoRows, cycleRowContent, type CampusLogo } from './CampuseLogosData';

// Split the logos into rows
const initialRows = splitLogosIntoRows(campusLogos, LOGOS_PER_ROW);
const initialRow1 = initialRows[0] || [];
const initialRow2 = initialRows[1] || [];
const initialRow3 = initialRows[2] || [];

export const Campuses: React.FC = () => {
  // State variables are now arrays of CampusLogo objects, not arrays of arrays
  const [row1, setRow1] = useState<CampusLogo[]>(initialRow1);
  const [row2, setRow2] = useState<CampusLogo[]>(initialRow2);
  const [row3, setRow3] = useState<CampusLogo[]>(initialRow3);

  // Effect for Row 1: Slide Right every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setRow1(prev => cycleRowContent(prev)); // cycleRowContent returns CampusLogo[], which matches the state type
    }, 1000); // 1 second

    return () => clearInterval(interval);
  }, []);

  // Effect for Row 2: Slide Left every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRow2(prev => {
        if (prev.length === 0) return prev;
        // To slide left, we move the *last* item to the front
        return [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)];
      });
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Effect for Row 3: Slide Right every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setRow3(prev => cycleRowContent(prev)); // cycleRowContent returns CampusLogo[], which matches the state type
    }, 1000); // 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="py-20 bg-blue-50">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-yellow-500">Nationwide Reach</span>
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Present on over <strong>150 universities and colleges</strong> across Ethiopia.
        </motion.p>

        {/* Statistics Card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 inline-block mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-4xl font-bold text-blue-900">150<span className="text-yellow-500">+</span></div>
          <div className="text-sm text-gray-700">Universities & Colleges</div>
        </motion.div>
      </div>

      {/* Sliding Logo Rows Container */}
      <div className="max-w-6xl mx-auto">
        {/* Grid Title */}
        <div className="text-center mb-6">
          <p className="text-gray-600 italic">
            Partnering with institutions across the nation
          </p>
        </div>

        {/* Sliding Rows */}
        <motion.div
          className="relative overflow-hidden rounded-xl bg-white shadow-md p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Row 1: Slide Right every 1s */}
          <motion.div
            className="flex space-x-8 mb-6 overflow-hidden" // Add overflow-hidden to contain logos
            key={`row-1-${row1.map(l => l.id).join('-')}`} // Key to trigger remount/animate on change
          >
            {row1.map((logo) => ( // 'logo' is now correctly typed as CampusLogo
              <motion.div
                key={logo.id} // Use logo.id directly for the key
                className="flex-shrink-0 flex flex-col items-center" // flex-shrink-0 prevents logos from shrinking
                initial={{ x: '100vw' }} // Start off-screen to the right
                animate={{ x: '-100%' }} // Move fully off-screen to the left (creating a loop effect)
                transition={{ duration: 1, ease: "linear" }} // Match the interval time
              >
                {/* Logo Image */}
                <img
                  src={logo.path} // Access path correctly
                  alt={logo.name} // Access name correctly
                  className="w-16 h-16 object-contain rounded-full shadow-sm bg-white p-1" // Adjust size, add bg/padding if needed
                />
                {/* Optional: University Name */}
                {/* <p className="mt-2 text-xs text-gray-700 text-center truncate w-full px-1">{logo.name}</p> */}
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2: Slide Left every 2s */}
          <motion.div
            className="flex space-x-8 mb-6 overflow-hidden" // Add overflow-hidden to contain logos
            key={`row-2-${row2.map(l => l.id).join('-')}`} // Key to trigger remount/animate on change
          >
            {row2.map((logo) => ( // 'logo' is now correctly typed as CampusLogo
              <motion.div
                key={logo.id} // Use logo.id directly for the key
                className="flex-shrink-0 flex flex-col items-center"
                initial={{ x: '-100vw' }} // Start off-screen to the left
                animate={{ x: '100%' }} // Move fully off-screen to the right (creating a loop effect)
                transition={{ duration: 2, ease: "linear" }} // Match the interval time
              >
                {/* Logo Image */}
                <img
                  src={logo.path} // Access path correctly
                  alt={logo.name} // Access name correctly
                  className="w-16 h-16 object-contain rounded-full shadow-sm bg-white p-1" // Adjust size, add bg/padding if needed
                />
                {/* Optional: University Name */}
                {/* <p className="mt-2 text-xs text-gray-700 text-center truncate w-full px-1">{logo.name}</p> */}
              </motion.div>
            ))}
          </motion.div>

          {/* Row 3: Slide Right every 1s */}
          <motion.div
            className="flex space-x-8 overflow-hidden" // Add overflow-hidden to contain logos
            key={`row-3-${row3.map(l => l.id).join('-')}`} // Key to trigger remount/animate on change
          >
            {row3.map((logo) => ( // 'logo' is now correctly typed as CampusLogo
              <motion.div
                key={logo.id} // Use logo.id directly for the key
                className="flex-shrink-0 flex flex-col items-center"
                initial={{ x: '100vw' }} // Start off-screen to the right
                animate={{ x: '-100%' }} // Move fully off-screen to the left (creating a loop effect)
                transition={{ duration: 1, ease: "linear" }} // Match the interval time
              >
                {/* Logo Image */}
                <img
                  src={logo.path} // Access path correctly
                  alt={logo.name} // Access name correctly
                  className="w-16 h-16 object-contain rounded-full shadow-sm bg-white p-1" // Adjust size, add bg/padding if needed
                />
                {/* Optional: University Name */}
                {/* <p className="mt-2 text-xs text-gray-700 text-center truncate w-full px-1">{logo.name}</p> */}
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Supporting Text */}
      <motion.div
        className="text-center mt-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-gray-700 italic">
          Join the movement. Impact the world.
        </p>
      </motion.div>
    </Container>
  );
};