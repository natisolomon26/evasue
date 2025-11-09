'use client';

import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';

// Define the type for our floating element data
type FloatingElementData = {
  id: number;
  size: number;
  top: number; // Percentage as a number (e.g., 50 for 50%)
  left: number; // Percentage as a number (e.g., 50 for 50%)
  duration: number; // Animation duration
  delay: number; // Animation delay
  opacity: number; // Opacity value
  floatDirection: number; // 1 for right/even, -1 for left/odd
};

// Function to generate random values (this will be called only once via useRef)
const generateRandomElementData = (count: number): FloatingElementData[] => {
  return Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 30 + 20; // Random size between 20-50px
    const top = Math.random() * 100; // Random vertical position (percentage)
    const left = Math.random() * 100; // Random horizontal position (percentage)
    const duration = Math.random() * 10 + 10; // Random duration between 10-20s
    const delay = Math.random() * 5; // Random delay
    const opacity = Math.random() * 0.3 + 0.1; // Random opacity between 0.1-0.4
    const floatDirection = Math.random() > 0.5 ? 1 : -1; // Determine float direction

    return {
      id: i,
      size,
      top,
      left,
      duration,
      delay,
      opacity,
      floatDirection,
    };
  });
};

export const Values: React.FC = () => {
  // Use a ref to store the generated floating element data, generated only once
  const floatingElementsDataRef = useRef<FloatingElementData[] | null>(null);
  if (floatingElementsDataRef.current === null) {
    floatingElementsDataRef.current = generateRandomElementData(8); // Generate data for 8 elements
  }
  const floatingElementsData = floatingElementsDataRef.current;

  const values = [
    {
      id: 1,
      title: "The Centrality of the Word of God",
      description:
        "We affirm Scripture as the revelation of God’s person and will, culminating in Jesus Christ. The Bible is our foundation for life and transformation.",
      icon: "📖",
    },
    {
      id: 2,
      title: "We are student focused",
      description:
        "EvaSUE exists for students. Our mission is to serve them so they can advance God’s Kingdom in their campuses and beyond.",
      icon: "🎓",
    },
    {
      id: 3,
      title: "Our fellowship transcends differences",
      description:
        "We believe Christ unites us across denomination, ethnicity, language, and economy. In Him, we are one body.",
      icon: "🌍",
    },
  ];

  // Generate the floating elements using the pre-calculated data from the ref
  const floatingElements = useMemo(() => {
    return floatingElementsData.map((data) => (
      <motion.div
        key={data.id}
        className="absolute rounded-full bg-gradient-to-br from-brand-sky-900/70 to-brand-sky-400/90 border border-brand-sky-300/80" // Light gradient, subtle border
        style={{
          width: `${data.size}px`,
          height: `${data.size}px`,
          top: `${data.top}%`,
          left: `${data.left}%`,
          opacity: data.opacity,
        }}
        animate={{
          y: [0, -30, 0], // Float up and down
          x: [0, data.floatDirection * 20, 0], // Float slightly left or right based on pre-calculated direction
          rotate: [0, 180, 360], // Slow rotation
        }}
        transition={{
          duration: data.duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: data.delay,
        }}
      />
    ));
  }, [floatingElementsData]); // Re-render floating elements only if the data changes (which it won't)

  return (
    <section className="bg-sky-800 py-20 relative overflow-hidden"> {/* Added relative and overflow-hidden for bg elements */}

      {/* Animated Background Elements (using pre-calculated data from ref) */}
      {floatingElements}

      {/* Main Content */}
      <Container className="relative z-10"> {/* Ensure content is above bg elements */}
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-neutral-800 mb-4">
            Our <span className="text-brand-primary-600">Core Values</span>
          </h2>
          <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
            Guided by Scripture, shaped by community, and driven by mission.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              className="backdrop-brightness-10 bg-blend-saturation rounded-xl p-8 shadow-sm border border-sky-700 hover:shadow-md transition-shadow duration-300 text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
            >
              {/* Icon */}
              <div className="text-4xl mb-5">{value.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-brand-primary-800 mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};