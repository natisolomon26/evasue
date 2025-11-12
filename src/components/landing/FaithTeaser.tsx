"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FaithTeaser() {
  return (
    <section className="relative flex flex-col gap-8 px-6 py-12 md:py-20 bg-gradient-to-br from-sky-50 to-white overflow-hidden">
      {/* Decorative floating elements — only on desktop */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-sky-300/20 rounded-full blur-2xl hidden lg:block"
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
        className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-red-400/20 rounded-full blur-2xl hidden lg:block"
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

      {/* IMAGE FIRST ON MOBILE/TABLET, RIGHT ON DESKTOP */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] lg:w-[50%] lg:max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Floating image effect */}
        <motion.div
          animate={{ y: ["0%", "-20%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 15,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src="https://s7d2.scene7.com/is/content/cru/cru-scrolling-images-v3-compressed?ts=1744682859469&dpr=off"
            alt="Faith and community"
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>
        
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent pointer-events-none"></div>
      </motion.div>

      {/* CONTENT BELOW ON MOBILE/TABLET, LEFT ON DESKTOP */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="lg:flex-1 lg:max-w-md text-center md:text-left space-y-6 z-10 relative lg:mr-auto lg:ml-0"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-sky-200 shadow-sm mb-4 mx-auto md:mx-0"
        >
          <span className="h-1.5 w-1.5 bg-sky-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Transform Your Life
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-sky-900 leading-tight"
        >
          Experience the Power of <span className="text-red-600">Community</span> and Guidance
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0"
        >
          Imagine a place where your questions are welcomed, your doubts embraced,
          and your journey celebrated. At EvaSUE, you'll find the resources, connections,
          and support to enrich your faith experience — deepening your relationship
          with God and transforming your life.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full md:w-auto"
        >
          <a
            href="/us/en/connect.html"
            className="group relative inline-flex items-center justify-center w-full md:w-auto px-7 py-3.5 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Find EvaSUE Near Me
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-sky-700 to-sky-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}