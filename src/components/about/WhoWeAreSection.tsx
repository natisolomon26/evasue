"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function WhoWeAreSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const rightScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);
  
  // Stats data
  const stats = [
    { value: "1963", label: "Founded", icon: "📅", color: "text-red-400" },
    { value: "50+", label: "Years Legacy", icon: "🏛️", color: "text-sky-400" },
    { value: "150+", label: "Campuses", icon: "🎓", color: "text-emerald-400" },
    { value: "50,000+", label: "Students", icon: "👥", color: "text-amber-400" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(14,165,233,0.1)_100%)] bg-[size:60px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_95%,rgba(239,68,68,0.1)_100%)] bg-[size:60px]" />
        </div>

        {/* Floating geometric shapes */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className={`absolute rounded-lg ${
              i % 3 === 0 
                ? 'bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20' 
                : i % 2 === 0
                ? 'bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20'
                : 'bg-white/5 border border-white/10'
            } backdrop-blur-sm`}
            style={{
              width: `${40 + i * 15}px`,
              height: `${40 + i * 15}px`,
              left: `${5 + i * 15}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/10 to-red-500/10 rounded-full border border-sky-200 mb-4">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">
                Our Story • Our People
              </span>
            </div>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-4"
          >
            <span className="bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
              Who We Are
            </span>
            {" "}
            <span className="text-red-600">&</span>
            {" "}
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              What We Do
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-sky-700/80 max-w-2xl mx-auto"
          >
            A fellowship of students and graduates following Christ, 
            growing together, and transforming campuses across Ethiopia.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* LEFT SIDE — Who We Are */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white to-sky-50 border border-white/50">
              {/* Image Container */}
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <motion.div
                  style={{ y: leftY }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/bg1.jpg"
                    alt="EvaSUE Community Gathering"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 via-transparent to-transparent" />
                
                {/* Floating overlay pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3)_0%,transparent_50%)]" />
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-sky-900">
                        Our <span className="text-red-600">Identity</span>
                      </h3>
                      <div className="h-1 w-12 bg-gradient-to-r from-sky-500 to-red-500 rounded-full mt-2" />
                    </div>
                    
                    {/* Interactive badge */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-sky-500/10 to-red-500/10 rounded-full border border-sky-200 cursor-pointer"
                    >
                      <span className="text-xs font-semibold text-sky-700">Learn More</span>
                    </motion.div>
                  </motion.div>

                  {/* Paragraphs with hover effects */}
                  <div className="space-y-4">
                    {[
                      "We are a Fellowship of Students and Graduates who are dedicated to Follow and Witness Jesus Christ as Lord and Savior. We have fellowship with each other since we have fellowship with the Father and His Son Jesus Christ.",
                      "Our individual fellowship with Christ, which began with our faith in Jesus, has made us part of the universal, time-transcending Christ-community, bound to the Triune God in communion.",
                      "EvaSUE began in 1963 as a small group of dedicated students at Addis Ababa University. Today, it comprises students' and graduates' fellowships across Ethiopia and beyond.",
                    ].map((text, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="group/para"
                      >
                        <p className="text-sky-800 leading-relaxed text-justify bg-gradient-to-r from-transparent to-transparent group-hover/para:from-sky-50/50 transition-all duration-300 p-3 rounded-lg">
                          {text}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive timeline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="pt-4 border-t border-sky-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-sky-700">Since 1963</div>
                        <div className="text-xs text-sky-600">Transforming campuses</div>
                      </div>
                      <Link
                        href="/about/history"
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        <span>Explore History</span>
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </motion.svg>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE — Students & Graduates */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <motion.div
              style={{ scale: rightScale }}
              className="relative h-full overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 border border-sky-700/30"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_50%,transparent_52%)] bg-[size:20px_20px]" />
              </div>

              {/* Content */}
              <div className="relative p-6 md:p-8 h-full">
                <div className="space-y-8">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <motion.div
                        className="w-2 h-2 bg-red-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-semibold text-white tracking-wider">
                        OUR COMMUNITY
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      Students &{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-400">
                        Graduates
                      </span>
                    </h3>
                  </motion.div>

                  {/* Interactive Cards */}
                  <div className="space-y-6">
                    {/* Students Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="group/student bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg flex items-center justify-center"
                          animate={{ rotate: [0, 5, 0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <span className="text-2xl">🎓</span>
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <h4 className="text-lg font-bold text-white">Students</h4>
                          </div>
                          <p className="text-sky-100 leading-relaxed">
                            Evangelical students in Secondary and Tertiary Education Institutes 
                            (High Schools, Colleges, and Universities), both private and government-owned.
                          </p>
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <div className="text-xs text-sky-200/70 font-medium">
                              Active in campus fellowships, discipleship, and evangelism
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Graduates Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="group/graduate bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-br from-sky-500/20 to-sky-600/10 rounded-lg flex items-center justify-center"
                          animate={{ rotate: [0, -5, 0, 5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        >
                          <span className="text-2xl">👨‍🎓</span>
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                            <h4 className="text-lg font-bold text-white">Graduates</h4>
                          </div>
                          <p className="text-sky-100 leading-relaxed">
                            Former university students who were part of campus fellowships, 
                            continuing their faith journey beyond graduation throughout their lifetime.
                          </p>
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <div className="text-xs text-sky-200/70 font-medium">
                              Serves as Associates of EvaSUE, mentoring next generation
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="pt-6 border-t border-white/10"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="text-center group/stat"
                          whileHover={{ y: -5 }}
                        >
                          <div className="text-2xl mb-1">{stat.icon}</div>
                          <div className={`text-xl font-bold ${stat.color} mb-1`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/70 uppercase tracking-wider">
                            {stat.label}
                          </div>
                          <div className="h-0.5 w-0 group-hover/stat:w-full bg-current transition-all duration-500 mt-2" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="pt-4"
                  >
                    <Link
                      href="/join"
                      className="group/cta inline-flex items-center gap-3 text-white hover:text-sky-100 font-semibold"
                    >
                      <span>Become part of our community</span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </motion.svg>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="hidden lg:block h-px w-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent mt-12"
        />
      </div>
    </section>
  );
}