"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 md:py-20 overflow-hidden text-white">
      {/* --- Background Video --- */}
    

      {/* --- Overlay Gradient --- */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-sky-700 to-sky-900 backdrop-blur-[2px]" />

      {/* --- Content Wrapper --- */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-10 md:gap-16">
        {/* --- Left: Logo --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-shrink-0 flex justify-center md:justify-start"
        >
          <Image
            src="/EvaSUELogo.png"
            alt="EvaSUE Logo"
            width={150}
            height={150}
            className="object-contain drop-shadow-2xl brightness-125 contrast-125"
          />
        </motion.div>

        {/* --- Right: Text + Button --- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-5 max-w-xl"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Walk in <span className="text-red-400">Faith</span> and{" "}
            <span className="text-red-400">Community</span>
          </h2>

          {/* Description */}
          <p className="text-white text-lg leading-relaxed text-justify">
            Join us as we inspire and equip students to follow Christ with
            purpose, live in authentic community, and transform campuses through
            radical love.
          </p>

          {/* CTA Button */}
          <Link
            href="/about"
            className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-3 mt-2 bg-gradient-to-r from-red-600 to-red-600 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-sky-400/0 to-sky-500/20 opacity-0 group-hover:opacity-100 rounded-full blur-xl transition-opacity duration-500"></span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center gap-2">
              Give
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
