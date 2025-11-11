"use client"; // <-- Add this at the top

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Word animation component
const AnimatedWord = ({ word, delay }: { word: string; delay: number }) => (
  <motion.span
    className="inline-block"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: [0.2, 0.8, 0.2, 1]
    }}
  >
    {word}
  </motion.span>
);

// Letter animation component
const AnimatedText = ({ text, delay }: { text: string; delay: number }) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: delay + (index * 0.05),
            ease: [0.2, 0.8, 0.2, 1]
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 lg:px-20 py-16 overflow-hidden">
      {/* Background Image + Gradient */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg-5.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t bg-black/60 to-black/90"></div>
      </div>

      {/* Floating elements for extra visual interest */}
      <motion.div 
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-red-500/20 blur-xl"
        animate={{ 
          y: [-10, 10, -10],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-blue-500/20 blur-xl"
        animate={{ 
          y: [10, -10, 10],
          scale: [1, 1.15, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-white">Campus Revival Movement</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.2] tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-center gap-2">
              {['Longing', 'for'].map((word, index) => (
                <AnimatedWord key={word} word={word} delay={0.6 + index * 0.1} />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <AnimatedText text="Revival" delay={0.8} />
              <span className="text-red-500">on</span>
              <span className="text-red-500">Every</span>
              <AnimatedText text="Campus" delay={1.2} />
            </div>
          </div>
        </motion.h1>

        {/* Caption */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Evasue Ethiopia is a campus community that helps students and faculty follow
          Jesus with their whole lives, for the rest of their lives.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <Link
            href="/chapters"
            className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
          >
            
              Join a community
          </Link>
          <Link
            href="/about-us"
            className="group relative overflow-hidden border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900 hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Learn about us
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        
      </div>
    </section>
  );
}