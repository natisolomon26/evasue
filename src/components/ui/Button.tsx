'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  href,
  type = 'button'
}) => {
  const baseClasses = "font-semibold transition-all duration-300 inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white";

  const variants = {
    primary: "bg-brand-sky-600 text-white hover:bg-brand-sky-700 active:bg-brand-sky-800 focus:ring-brand-sky-500 shadow-sm hover:shadow-md",
    secondary: "bg-brand-red-800 text-white hover:bg-brand-red-700 active:bg-brand-red-800 focus:ring-brand-red-500 shadow-sm hover:shadow-md",
    outline: "bg-transparent text-brand-sky-600 border-2 border-brand-sky-600 hover:bg-brand-sky-50 hover:border-brand-sky-700 active:bg-brand-sky-100 focus:ring-brand-sky-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs", // Made significantly smaller
    md: "px-5 py-2.5 text-sm", // Slightly smaller base size
    lg: "px-7 py-3 text-base"  // Slightly smaller large size
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03, y: -1 }} // Slight lift on hover
        whileTap={{ scale: 0.98, y: 0 }}    // Slight press down when tapped
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -1 }} // Slight lift on hover
      whileTap={{ scale: 0.98, y: 0 }}    // Slight press down when tapped
      whileFocus={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  );
};