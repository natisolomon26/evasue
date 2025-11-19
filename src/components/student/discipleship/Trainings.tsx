"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Trainings() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Parallax effect for background shapes
  const shapesY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const trainingItems = [
    {
      title: "Spiritual Growth",
      desc: "Deepen your walk with Christ through prayer, Scripture meditation, and personal devotion — cultivating a heart that beats for God.",
      color: "from-sky-500/30 to-sky-600/40",
      img: "/images/bg1.jpg",
      icon: "🙏"
    },
    {
      title: "Academic Integrity",
      desc: "Excel with excellence as an act of worship — developing discipline, focus, and godly habits that honor Christ in your studies.",
      color: "from-emerald-500/30 to-emerald-600/40",
      img: "/images/bg2.JPG",
      icon: "📚"
    },
    {
      title: "Life & Leadership Skills",
      desc: "Lead with wisdom and serve with humility — mastering communication, teamwork, and practical leadership for eternal impact.",
      color: "from-purple-500/30 to-purple-600/40",
      img: "/images/bg3.JPG",
      icon: "✨"
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden"
    >
      {/* Animated Background Shapes */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: shapesY }}
      >
        <motion.div 
          className="absolute -top-20 left-10 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl"
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
          className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            y: [15, -15, 15],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Decorative floating particles */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-sky-300/40 rounded-full"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-emerald-300/40 rounded-full"
        animate={{
          y: [8, -8, 8],
          opacity: [0.2, 0.7, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg mb-8"
          >
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-sky-200 uppercase tracking-wider">
              Equipping for Impact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight mb-6"
          >
            Transformative <span className="text-sky-400">Trainings</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-gray-300 text-lg max-w-4xl mx-auto text-center mt-6 leading-relaxed"
          >
            We prepare students for campus life and eternal impact through holistic
            trainings that shape character, ignite purpose, and equip for service —
            because your influence begins today.
          </motion.p>
        </motion.div>

        {/* Main content */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl h-96"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-700 via-sky-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-200 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              </div>

              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-white">Training</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-purple-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              View All Trainings
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-sky-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}