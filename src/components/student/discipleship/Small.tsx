"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Small() {
  return (
    <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg3.JPG"
          alt="Small Group Ministry"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
      </div>

      {/* Animated Gradient Overlay — layered depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/95 via-sky-900/85 to-sky-900/90"></div>
      
      {/* Floating spiritual particles */}
      <motion.div 
        className="absolute top-1/4 left-10 w-2 h-2 bg-sky-300/40 rounded-full animate-pulse"
        animate={{
          y: [-20, 20, -20],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-green-300/40 rounded-full animate-pulse"
        animate={{
          y: [15, -15, 15],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-300/40 rounded-full animate-pulse"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-red-300/40 rounded-full animate-pulse"
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-4xl text-center px-6"
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 shadow-lg"
        >
          <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-sky-100 uppercase tracking-wider">
            The Heartbeat of Ministry
          </span>
        </motion.div>

        {/* Main Heading — Animated Letter-by-Letter */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide drop-shadow-2xl mb-6"
        >
          <span className="inline-block">Small</span>
          <span className="inline-block mx-2 text-sky-300 font-serif text-5xl md:text-6xl lg:text-7xl">·</span>
          <span className="inline-block">Group</span>
        </motion.h2>

        {/* Subheading — Animated with color-coded keywords */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto"
        >
          Since community is essential for spiritual development, we encourage small group ministry among students — promoting&nbsp;
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block font-semibold cursor-default hover:scale-105 transition-transform duration-300"
            style={{ color: "#60A5FA" }}
          >
            Mission
          </motion.span>
          &nbsp;,
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block font-semibold cursor-default hover:scale-105 transition-transform duration-300"
            style={{ color: "#10B981" }}
          >
            Fellowship
          </motion.span>
          &nbsp;,
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-block font-semibold cursor-default hover:scale-105 transition-transform duration-300"
            style={{ color: "#F59E0B" }}
          >
            Prayer
          </motion.span>
          &nbsp;and&nbsp;
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="inline-block font-semibold cursor-default hover:scale-105 transition-transform duration-300"
            style={{ color: "#EF4444" }}
          >
            Nurturing
          </motion.span>
          .
        </motion.p>

        {/* Decorative underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.9 }}
          className="h-px bg-gradient-to-r from-sky-400/50 via-sky-300/40 to-sky-400/50 mx-auto mt-12 w-32"
        />
      </motion.div>

      {/* Floating silhouette of students in background */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-32 opacity-10">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M20,80 Q50,60 80,80 Q110,60 140,80 Q170,60 200,80" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="20" cy="80" r="3" fill="white" />
          <circle cx="80" cy="80" r="3" fill="white" />
          <circle cx="140" cy="80" r="3" fill="white" />
          <circle cx="200" cy="80" r="3" fill="white" />
        </svg>
      </div>
    </section>
  );
}