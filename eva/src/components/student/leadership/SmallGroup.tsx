"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function SmallGroup() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Floating elements state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      text: "Equipping student leaders for Christ-centered influence",
      color: "bg-gradient-to-r from-blue-600 to-cyan-500",
      icon: "👑",
      delay: 0.1,
    },
    {
      text: "Teaching how to lead small groups with care and purpose",
      color: "bg-gradient-to-r from-emerald-600 to-green-500",
      icon: "🤝",
      delay: 0.2,
    },
    {
      text: "Building a culture of discipleship and fellowship",
      color: "bg-gradient-to-r from-amber-600 to-yellow-500",
      icon: "🌱",
      delay: 0.3,
    },
  ];

  // Floating particles
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-sky-50/50 overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Floating decorative elements with enhanced animation */}
      <AnimatePresence>
        {mounted && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-600/80 to-cyan-500/80 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.2, 1],
                y: [-30, 30, -30],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-green-400/50 to-emerald-500/50 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.3, 1],
                y: [30, -30, 30],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-sky-200/30 to-blue-200/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* IMAGE SECTION - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.2,
              type: "spring",
              stiffness: 100 
            }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ scale: imageScale }}
            className="relative w-full h-[350px] sm:h-[400px] md:h-[480px] lg:h-[520px] perspective-1000"
          >
            {/* Main Image Container with 3D effect */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 transform-gpu">
              {/* Image with depth */}
              <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/small.JPG"
                  alt="Small Group Ministry"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-800/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 mix-blend-overlay" />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-white/30"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(14, 165, 233, 0.3)",
                    "0 0 40px rgba(14, 165, 233, 0.5)",
                    "0 0 20px rgba(14, 165, 233, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Floating card effect - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.8,
                type: "spring",
                stiffness: 200 
              }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="absolute -bottom-6 left-6 right-6 md:left-8 md:right-8 bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-3xl"
                >
                  ✨
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                    Intimate Fellowship
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    Where hearts are transformed and faith is deepened through authentic community
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CONTENT SECTION - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.4,
              type: "spring",
              stiffness: 100 
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6,
                  type: "spring" 
                }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm rounded-full border border-sky-200/50 shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300"
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="h-2.5 w-2.5 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                />
                <span className="text-sm font-bold text-sky-700 uppercase tracking-wider">
                  Ministry Focus
                </span>
              </motion.div>

              <motion.div
                style={{ y: textParallaxY }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.7,
                    type: "spring",
                    stiffness: 200 
                  }}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-sky-900 mb-8 leading-tight"
                >
                  Small Group <br />
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-orange-600"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 100%",
                    }}
                  >
                    Training
                  </motion.span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.9,
                    type: "spring" 
                  }}
                  className="text-gray-700 text-lg md:text-xl leading-relaxed mb-10"
                >
                  We train leaders to launch and shepherd <span className="font-semibold text-sky-800">life-giving spaces</span> for discipleship, prayer, accountability, and authentic fellowship among students. These intimate communities cultivate spiritual growth and strengthen campus ministry impact.
                </motion.p>
              </motion.div>
            </div>

            {/* Enhanced Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.1 + index * 0.15,
                    type: "spring",
                    stiffness: 200 
                  }}
                  whileHover={{ 
                    x: 10,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="group"
                >
                  <div className="flex items-start gap-5 p-5 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-sky-200/80 hover:bg-white/70 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.3 + index * 0.15,
                        type: "spring",
                        stiffness: 200 
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        transition: { duration: 0.3 }
                      }}
                      className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center text-white text-xl shadow-lg`}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 1.5 + index * 0.15 
                        }}
                        className="text-gray-800 font-semibold text-lg group-hover:text-sky-900 transition-colors duration-300"
                      >
                        {feature.text}
                      </motion.p>
                    </div>
                    
                    {/* Animated indicator */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.7 + index * 0.15 }}
                      className="text-sky-500 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      →
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 1.8,
                type: "spring" 
              }}
              whileHover={{ scale: 1.05 }}
              className="pt-4"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-sky-600 to-cyan-500 text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Explore Our Training
                  <motion.svg
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                
                {/* Button hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                {/* Button shine effect */}
                <motion.div
                  className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  animate={{ x: ["0%", "300%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeInOut",
                  }}
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}