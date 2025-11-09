'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';

export const Mission: React.FC = () => {
  return (
    <Container className="py-20">
      <div className="text-center max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-brand-sky-800 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-brand-red-500">Mission</span>
        </motion.h2>
        
        <motion.div
          className="bg-brand-sky-50 rounded-lg p-8 border border-brand-sky-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            Evasue in Ethiopia Christian Student Fellowship is a movement of university students 
            seeking to know Christ, grow in faith, and share the Gospel across Ethiopias campuses. 
            We are part of the global body of Christ, rooted in Scripture and empowered by the Holy Spirit.
          </p>
        </motion.div>
      </div>
    </Container>
  );
};