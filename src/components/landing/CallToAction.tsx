"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center text-center">
      {/* --- Background Video --- */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://www.campusoutreach.org/wp-content/uploads/campusoutreach-sitewide-footer-CTA-2-reel-EDIT.mp4"
          type="video/mp4"
        />
      </video>

      {/* --- Dark Overlay for Text Readability --- */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* --- Content Wrapper --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 text-white px-6 max-w-3xl"
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          Be a Part of Something Bigger Than Yourself
        </h2>

        <Link
          href="/give"
          className="inline-block border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-950 transition-all text-lg font-semibold"
        >
          LEAVE A LEGACY
        </Link>
      </motion.div>
    </section>
  );
}
