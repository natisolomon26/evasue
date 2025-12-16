"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Target, Sparkles } from "lucide-react";
import Image from "next/image";

export default function BuildSkill() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Parallax effect for image
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-16 right-20 w-32 h-32 bg-sky-200/20 rounded-full blur-2xl"
        animate={{
          y: [-15, 15, -15],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-16 left-16 w-40 h-40 bg-indigo-200/15 rounded-full blur-2xl"
        animate={{
          y: [15, -15, 15],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Floating heart pulses (symbolizing spiritual growth) */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-6 h-6 bg-pink-300/20 rounded-full blur-md"
        animate={{
          y: [-10, 10, -10],
          scale: [1, 1.5, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-orange-300/20 rounded-full blur-sm"
        animate={{
          y: [10, -10, 10],
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* IMAGE BLOCK — Enhanced with depth and motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            style={{ y: imageY }}
            className="rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 group"
          >
            <Image 
              src="/images/about2.JPG" 
              alt="Students growing in faith and leadership"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay with subtle gradient and text */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 shadow-lg">
              <span className="text-xs font-medium text-slate-700">Growth in Action</span>
            </div>
          </motion.div>
        </motion.div>

        {/* CONTENT BLOCK — Premium Glass Card Design */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          {/* Animated gradient background */}
          <div className="absolute -inset-1 bg-gradient-to-br from-sky-500/5 to-blue-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

          {/* Main content card */}
          <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-white/40 relative z-10">
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
              Build Skills Through <span className="text-sky-600">Growth</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              We challenge leaders to grow through Scripture, disciplined reflection, and courageous service — building wisdom, vision, and resilience for lifelong ministry and eternal impact.
            </p>

            {/* ICON POINTS — Enhanced with hover and depth */}
            <div className="space-y-6">
              {[
                {
                  icon: <BookOpen className="w-6 h-6" />,
                  title: "Deepen Understanding",
                  desc: "Engage in Scripture-centered learning — not just reading, but studying, meditating, and applying God’s Word to life and leadership.",
                  color: "bg-sky-100 text-sky-700"
                },
                {
                  icon: <Target className="w-6 h-6" />,
                  title: "Shape Character",
                  desc: "Develop integrity, humility, and discernment through guided reflection, mentorship, and accountability in community.",
                  color: "bg-emerald-100 text-emerald-700"
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Step Into Service",
                  desc: "Grow in confidence by leading real ministry initiatives — from small groups to campus outreach — with prayer and purpose.",
                  color: "bg-purple-100 text-purple-700"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group flex gap-5 p-5 rounded-2xl border border-slate-200/50 hover:border-sky-300/50 hover:shadow-lg transition-all duration-300 cursor-pointer ${item.color}`}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 pt-6 border-t border-slate-200/30"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                Join Our Growth Journey
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}