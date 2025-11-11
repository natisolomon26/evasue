"use client"; // <-- Add this at the top

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-800/50 to-sky-500/30"></div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-3xl">
        {/* Badge */}
        <motion.a
          href="https://www.urbana.org/"
          target="_blank"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-block"
        >
          <div className="flex items-center justify-center gap-3 bg-sky-100 text-sky-800 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition">
            <div className="font-semibold">Urbana 25</div>
            <div className="flex items-center gap-1">
              <span>Register today to join us Dec. 28-31</span>
              <span className="material-icons">arrow_forward</span>
            </div>
          </div>
          
        </motion.a>

        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white leading-[1.35]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Longing for{" "}
          <em className="italic text-red-600 font-serif drop-shadow-lg">Revival</em>
          <br />
          on Every Campus
        </motion.h1>

        {/* Caption */}
        <motion.p
          className="text-lg md:text-xl text-white/90 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          InterVarsity is a campus community that helps students and faculty follow
          Jesus with their whole lives, for the rest of their lives.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link
            href="/chapters"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition transform hover:-translate-y-1"
          >
            Join a community
          </Link>
          <Link
            href="/about-us"
            className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-full font-semibold transition"
          >
            Learn about us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
