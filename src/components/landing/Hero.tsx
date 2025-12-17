"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
  // Smooth mouse position tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950">
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main image with parallax */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
          }}
          className="absolute inset-0"
        >
          <Image
            src="/images/bg-5.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
            quality={90}
          />
        </motion.div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-sky-800/70 to-sky-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-transparent to-transparent" />
        
        {/* Enhanced floating animated elements */}
        <div className="absolute inset-0">
          {/* Large floating orbs */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-2xl ${
                i % 3 === 0 
                  ? 'bg-gradient-to-br from-red-500/15 to-transparent' 
                  : i % 2 === 0
                  ? 'bg-gradient-to-br from-sky-400/15 to-transparent'
                  : 'bg-gradient-to-br from-white/10 to-transparent'
              }`}
              style={{
                width: `${80 + i * 30}px`,
                height: `${80 + i * 30}px`,
                left: `${5 + i * 20}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, i % 2 === 0 ? 25 : -25, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Small floating dots */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-2 h-2 rounded-full bg-white/30"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
          
          {/* Wavy lines background */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
            <defs>
              <path
                id="wave"
                d="M 0,500 Q 250,400 500,500 T 1000,500"
                stroke="white"
                fill="transparent"
                strokeWidth="2"
              />
            </defs>
            <use href="#wave" x="0" y="0" />
            <use href="#wave" x="0" y="100" />
            <use href="#wave" x="0" y="200" />
          </svg>
        </div>

        {/* Particle effects */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-[1px] h-[1px] bg-white/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        
        {/* Animated gradient lights */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/5 to-sky-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-sky-500/5 to-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-10 md:space-y-12 pt-16">
          
          {/* Spacer to move content down a bit */}
          <div className="h-8 md:h-12" />
          
          {/* Animated Badge - Moved down */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
              <motion.div
                className="w-2 h-2 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-white tracking-wider">
                ADVANCING KINGDOM OF GOD
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                  <motion.span
                    className="bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Longing for
                  </motion.span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                  <motion.span
                    className="text-red-500"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Revival
                  </motion.span>
                  <span className="text-white">on</span>
                  <motion.span
                    className="text-red-500"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                  >
                    Every
                  </motion.span>
                  <motion.span
                    className="text-white"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    Campus
                  </motion.span>
                </div>
              </div>
            </motion.h1>

            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ delay: 1.1, duration: 1 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed px-4"
          >
            Empowering students to follow Jesus with their whole lives, 
            for the rest of their lives.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            {/* Primary Button */}
            <Link
              href="/chapters"
              className="group relative"
            >
              <motion.div
                className="relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background shine on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <span className="text-sm sm:text-base">Join Community</span>
                </div>
                
                {/* Hover shine effect */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            </Link>

            {/* Secondary Button */}
            <Link
              href="/about-us"
              className="group relative"
            >
              <motion.div
                className="relative px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-sm sm:text-base">Learn More</span>
                </div>
                
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats - Clean and Modern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="grid grid-cols-3 gap-6 sm:gap-8 pt-8"
          >
            {[
              { value: "150+", label: "Campuses", color: "text-white" },
              { value: "50,000+", label: "Students", color: "text-white" },
              { value: "50+", label: "Years", color: "text-white" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
                className="text-center"
              >
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced floating elements that move with mouse */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Interactive floating elements that react to mouse */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`interactive-${i}`}
            className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-red-400/20 to-transparent border border-red-400/30"
            style={{
              left: `${20 + i * 25}%`,
              top: `${15 + i * 20}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* More floating shapes */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-6 h-6 rounded-lg bg-gradient-to-br from-sky-400/20 to-transparent border border-sky-400/30 rotate-45"
            style={{
              right: `${15 + i * 20}%`,
              bottom: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, 30, 0],
              rotate: [45, 405, 45],
            }}
            transition={{
              duration: 7 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
}