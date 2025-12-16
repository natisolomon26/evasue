'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

type MotionProps = Pick<HTMLMotionProps<'button'>, 'whileHover' | 'whileTap' | 'transition'>;
type MotionLinkProps = Pick<HTMLMotionProps<'a'>, 'whileHover' | 'whileTap' | 'transition'>;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  href,
  type = 'button'
}) => {
  // Base classes (flat, rectangular)
  const baseClasses = "font-semibold transition-all duration-200 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Variant-specific classes for flat style
  const variantsMap = {
    primary: "bg-brand-primary-600 text-white focus:ring-brand-primary-500",
    secondary: "bg-brand-accent-600 text-white focus:ring-brand-accent-500",
    outline: "bg-transparent text-brand-primary-600 border border-brand-primary-600 focus:ring-brand-primary-500",
    ghost: "bg-transparent text-brand-neutral-700 focus:ring-brand-neutral-500"
  };

  // Size-specific classes
  const sizesMap = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const classes = `${baseClasses} ${variantsMap[variant]} ${sizesMap[size]} ${className}`;

  // Unique click animation (rotate and scale)
  const animationProps: MotionProps | MotionLinkProps = {
    whileHover: { scale: 1.02 }, // Slight scale on hover
    whileTap: { 
      scale: 0.95,      // Scale down when pressed
      rotate: 5         // Rotate slightly when pressed
    },
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 17,
      rotate: { // Specific transition for rotate
        type: "tween",
        duration: 0.2
      }
    }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...animationProps}
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
      {...animationProps}
    >
      {children}
    </motion.button>
  );
};