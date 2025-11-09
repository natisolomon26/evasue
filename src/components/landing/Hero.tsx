'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

// Define the type for our floating element data
type FloatingElementData = {
  id: number;
  width: number;
  height: number;
  top: number;
  left: number;
  floatDirection: number; // 1 for right/even, -1 for left/odd
  duration: number; // Animation duration
  shape: 'circle' | 'hexagon' | 'triangle' | 'smallCircle' | 'bigCircle'; // New shape property
};

// Function to generate random values (this will be called only once via useRef)
const generateRandomElementData = (count: number): FloatingElementData[] => {
  return Array.from({ length: count }, (_, i) => {
    const width = Math.random() * 30 + 20; // Random size between 20-50px
    const height = Math.random() * 30 + 20; // Random size between 20-50px
    const top = Math.random() * 100; // Random vertical position (percentage)
    const left = Math.random() * 100; // Random horizontal position (percentage)
    const floatDirection = Math.random() > 0.5 ? 1 : -1; // Determine float direction
    const duration = Math.random() * 6 + 4; // Random duration between 4-10s
    // Randomly select a shape
    const shapes: FloatingElementData['shape'][] = ['circle', 'hexagon', 'triangle', 'smallCircle', 'bigCircle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    return {
      id: i,
      width,
      height,
      top,
      left,
      floatDirection,
      duration,
      shape, // Include the shape in the data
    };
  });
};

// Define the words for the typewriter effect
const rotatingWords = ['Service', 'Leadership', 'Community', 'Faith'];

export const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // Initial typing speed

  // Use a ref to store the generated floating element data, generated only once
  const floatingElementsDataRef = useRef<FloatingElementData[] | null>(null);
  if (floatingElementsDataRef.current === null) {
    floatingElementsDataRef.current = generateRandomElementData(6);
  }
  const floatingElementsData = floatingElementsDataRef.current;

  // Typewriter effect logic
  useEffect(() => {
    const word = rotatingWords[currentWordIndex];
    const fullWord = `into Lives of ${word}`;

    if (isDeleting) {
      // Deleting phase
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1));
          setTypingSpeed(75); // Faster when deleting
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setTypingSpeed(250); // Slight pause before typing next word
      }
    } else {
      // Typing phase
      if (currentText.length < fullWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(prev => fullWord.substring(0, prev.length + 1));
          setTypingSpeed(150); // Standard typing speed
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait a bit then start deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(250); // Slight pause before deleting
        }, 2000); // Pause for 2 seconds on the full word
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  // Function to render the shape based on the 'shape' property
  const renderShape = (data: FloatingElementData) => {
    const baseStyle = {
      width: `${data.width}px`,
      height: `${data.height}px`,
      top: `${data.top}%`,
      left: `${data.left}%`,
    };

    // Apply backdrop blur and a subtle background for visibility against the image
    const commonStyle = {
      ...baseStyle,
      background: 'rgba(11, 197, 221, 0.445)', // Semi-transparent white background
      backdropFilter: 'blur(4px)', // Apply backdrop blur
      WebkitBackdropFilter: 'blur(4px)', // For Safari
      border: '1px solid rgba(0, 159, 252, 0.404)', // Subtle border
    };

    switch (data.shape) {
      case 'circle':
        // Use borderRadius for a circle
        const circleStyle = { ...commonStyle, borderRadius: '50%' };
        return (
          <motion.div
            key={data.id}
            className="absolute"
            style={circleStyle}
            animate={{
              y: [0, -30, 0],
              x: [0, data.floatDirection * 20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360], // Add rotation for visual interest
            }}
            transition={{
              duration: data.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: data.id * 0.5,
            }}
          />
        );
      case 'smallCircle':
        // Override size for small circle and use borderRadius
        const smallCircleStyle = { ...commonStyle, width: '15px', height: '15px', borderRadius: '50%' };
        return (
          <motion.div
            key={data.id}
            className="absolute"
            style={smallCircleStyle}
            animate={{
              y: [0, -30, 0],
              x: [0, data.floatDirection * 20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: data.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: data.id * 0.5,
            }}
          />
        );
      case 'bigCircle':
        // Override size for big circle and use borderRadius
        const bigCircleStyle = { ...commonStyle, width: '45px', height: '45px', borderRadius: '50%' };
        return (
          <motion.div
            key={data.id}
            className="absolute"
            style={bigCircleStyle}
            animate={{
              y: [0, -30, 0],
              x: [0, data.floatDirection * 20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: data.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: data.id * 0.5,
            }}
          />
        );
      case 'hexagon':
        // Use clip-path for hexagon, no borderRadius
        const hexagonStyle = { ...commonStyle, borderRadius: '0', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };
        return (
          <motion.div
            key={data.id}
            className="absolute"
            style={hexagonStyle}
            animate={{
              y: [0, -30, 0],
              x: [0, data.floatDirection * 20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: data.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: data.id * 0.5,
            }}
          />
        );
      case 'triangle':
        // Use clip-path for triangle, no borderRadius
        const triangleStyle = { ...commonStyle, borderRadius: '0', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' };
        return (
          <motion.div
            key={data.id}
            className="absolute"
            style={triangleStyle}
            animate={{
              y: [0, -30, 0],
              x: [0, data.floatDirection * 20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: data.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: data.id * 0.5,
            }}
          />
        );
      default:
        // Fallback to circle if shape is unknown
        const defaultStyle = { ...commonStyle, borderRadius: '50%' };
        return (
          <motion.div
            key={data.id}
            className="absolute"
            style={defaultStyle}
            animate={{
              y: [0, -30, 0],
              x: [0, data.floatDirection * 20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: data.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: data.id * 0.5,
            }}
          />
        );
    }
  };


  // Generate the floating elements using the pre-calculated data from the ref
  const floatingElements = useMemo(() => {
    return floatingElementsData.map(renderShape);
  }, [floatingElementsData]); // Re-render floating elements only if the data changes (which it won't)

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Real Ethiopian Campus Life */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/bg-5.jpg")', // Replace with your real photo
        }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-800/70 to-transparent"></div>
      </div>

      {/* Enhanced Floating Abstract Elements (now uses pre-calculated data from ref) */}
      {floatingElements}

      <Container className="relative z-10 text-white max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-8 text-center lg:text-left lg:space-y-6">
          
          {/* Tagline – Inspired by Campus Outreach */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block bg-yellow-400 text-blue-900 text-sm font-bold px-4 py-2 rounded-full"
          >
            🇪🇹 Ethiopian Students • Faith • Leadership • Service
          </motion.div>

          {/* Main Headline – Mission-Focused with Typewriter */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Helping Ethiopian Students Follow Christ
            <br />
            <span className="text-yellow-400">
              {/* Display the base text "into Lives of " */}
              into Lives of{' '}
              {/* Display the rotating part */}
              <span className="inline-block min-w-[120px] text-left"> {/* Adjust min-width as needed */}
                {currentText.replace('into Lives of ', '')}
              </span>
              {/* Optional Cursor */}
              <span className="ml-1 inline-block w-0.5 h-8 bg-yellow-400 align-middle animate-pulse"></span>
            </span>
          </motion.h1>

          {/* Subtitle – Emotional & Relational (Like CO) */}
          <motion.p 
            className="text-lg md:text-xl text-blue-100 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Navigating university life can feel lonely. You don’t have to walk this path alone. 
            Join a movement of students growing in faith, building Christ-centered community, 
            and making a lasting impact across Ethiopia.
          </motion.p>

          {/* Primary CTA – Action-Oriented */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              variant="secondary" 
              size="lg" 
              href="/connect"
              className="shadow-lg hover:shadow-xl"
            >
              Let’s Connect
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              href="/about"
              className="border-2 border-white/50 hover:bg-white/10 backdrop-blur-sm"
            >
              Who We Are
            </Button>
          </motion.div>

          {/* Trust Badge – Global Reach (Like CO) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-center justify-center lg:justify-start space-x-2 text-blue-200 text-sm mt-4"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Active on 12+ campuses in Ethiopia</span>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator – Gentle Guide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <svg 
          className="w-6 h-6 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
};