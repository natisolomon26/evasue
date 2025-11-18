"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function SmallGroup() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const features = [
    {
      text: "Equipping student leaders for Christ-centered influence",
      color: "bg-blue-600",
    },
    {
      text: "Teaching how to lead small groups with care and purpose",
      color: "bg-emerald-600",
    },
    {
      text: "Building a culture of discipleship and fellowship",
      color: "bg-amber-600",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-600/90 rounded-full blur-2xl"
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
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-red-400/60 rounded-full blur-2xl"
        animate={{
          y: [20, -20, 20],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative w-full h-[350px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Image with depth */}
            <Image
              src="/images/bg1.jpg"
              alt="Small Group Ministry"
              fill
              className="object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 via-sky-800/40 to-transparent" />

            {/* Floating card effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute bottom-8 left-8 right-8 bg-sky-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
            >
              <h3 className="text-lg font-bold text-white mb-2">Intimate Fellowship</h3>
              <p className="text-white text-sm">
                Where hearts are transformed and faith is deepened
              </p>
            </motion.div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sky-200/50 mb-4"
              >
                <span className="h-2 w-2 bg-sky-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                  Ministry Focus
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="text-3xl md:text-4xl font-bold text-sky-900 mb-6 leading-tight"
              >
                Small Group Ministry <span className="text-red-700">Training</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="text-gray-700 text-lg leading-relaxed mb-8"
              >
                We train leaders to launch and shepherd small groups — life-giving spaces
                for discipleship, prayer, accountability, and authentic fellowship among students.
                These intimate communities cultivate spiritual growth and strengthen campus ministry impact.
              </motion.p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                    className={`w-4 h-4 rounded-full ${feature.color} mt-3.5 flex-shrink-0`}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                      className="w-full h-full rounded-full bg-white/30"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-1"
                  >
                    <p className="text-gray-800 font-medium group-hover:text-sky-900 transition-colors duration-300">
                      {feature.text}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Start a Small Group
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}