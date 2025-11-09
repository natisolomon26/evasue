'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Real Ethiopian Campus Life */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/bg-5.jpg")', // Replace with your real photo
        }}
      >
        {/* Gradient Overlay - Deep Blue to Transparency */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-800/80 to-transparent"></div>
      </div>

      {/* Floating Abstract Elements (Subtle Pro Detail) */}
      <motion.div 
        className="hidden lg:block absolute top-1/4 left-10 w-32 h-32 border border-white/10 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

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

          {/* Main Headline – Mission-Focused */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Helping Ethiopian Students Follow Christ
            <br />
            <span className="text-yellow-400">into Lives of Service and Leadership</span>
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