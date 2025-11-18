"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Location() {
  return (
    <section className="relative w-full overflow-hidden py-12 px-4">
      {/* Decorative floating elements — hidden on mobile */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-20 h-20 bg-sky-400/20 rounded-full blur-2xl hidden md:block"
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-red-400/20 rounded-full blur-2xl hidden md:block"
        animate={{
          y: [20, -20, 20],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mobile-only decorative dots */}
      <div className="md:hidden flex justify-center gap-4 mb-6">
        <div className="w-4 h-4 bg-sky-400/30 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-red-400/30 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col md:flex-row w-full max-w-7xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
        {/* Left: Background image with gradient overlay */}
        <div className="relative w-full h-[350px] md:h-auto md:w-1/2">
          <Image
            src="/images/location2.jpg"
            alt="Global Map"
            fill
            className="object-cover"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-100/40 via-sky-200/20 to-transparent" />
          
          {/* Animated map pins */}
          <motion.div 
            className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full shadow-lg hidden md:block"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute top-2/3 left-2/3 w-3 h-3 bg-sky-400 rounded-full shadow-lg hidden md:block"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg hidden md:block"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 1.8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />
        </div>

        {/* Right: Content with gradient background */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white flex items-center"
        >
          <div className="p-6 md:p-10 lg:p-12 space-y-6 max-w-lg mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4"
            >
              <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                Global Presence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl md:text-3xl font-bold leading-tight"
            >
              Our <span className="text-red-400">Impact</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm md:text-base leading-relaxed text-sky-100 text-justify"
            >
              At EvaSUE, we are committed to spreading the gospel across campuses and
              communities. From universities to local fellowship groups, we empower
              students and graduates to live out their faith, lead with purpose, and
              serve with compassion — impacting Ethiopia and beyond.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                href="/locations"
                className="group relative inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Explore Our Locations
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}