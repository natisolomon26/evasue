import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <motion.div 
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};