"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Enhanced parallax effects
  const leftImageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Interactive state
  const [activeSection, setActiveSection] = useState<'students' | 'mission'>('students');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  // Text animations with more dynamic variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 * i,
        ease: [0.215, 0.610, 0.355, 1]
      }
    })
  };

  // Timeline data for the mission section
  const missionTimeline = [
    { step: 1, title: "Follow Christ", description: "Renewing minds and imitating His life", color: "bg-sky-500" },
    { step: 2, title: "Grow in Faith", description: "Deepening relationship through discipleship", color: "bg-emerald-500" },
    { step: 3, title: "Serve Others", description: "Demonstrating love through action", color: "bg-purple-500" },
    { step: 4, title: "Share Gospel", description: "Witnessing in word and deed", color: "bg-red-500" },
  ];

  // Stats for students section
  const studentStats = [
    { value: "1000+", label: "Active Students", color: "text-sky-500" },
    { value: "50+", label: "Campuses", color: "text-emerald-500" },
    { value: "25+", label: "Years Legacy", color: "text-red-500" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full overflow-hidden bg-gradient-to-b from-sky-50 via-white to-gray-50 relative"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)`
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(14,165,233,0.1)_100%)] bg-[size:60px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_95%,rgba(239,68,68,0.1)_100%)] bg-[size:60px]"></div>
        </div>

        {/* Floating animated elements */}
        <motion.div 
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-sky-400/10 to-transparent rounded-full blur-3xl"
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-tr from-red-400/10 to-transparent rounded-full blur-3xl"
          animate={{
            y: [40, -40, 40],
            x: [20, -20, 20],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Interactive navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {['students', 'mission'].map((section) => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section as 'students' | 'mission');
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative group"
          >
            <motion.div
              animate={{
                scale: activeSection === section ? 1.2 : 1,
                backgroundColor: activeSection === section ? 
                  section === 'students' ? '#0ea5e9' : '#ef4444' : 
                  'rgba(100, 116, 139, 0.3)'
              }}
              className="w-3 h-3 rounded-full transition-all duration-300"
            />
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {section === 'students' ? 'Students & Graduates' : 'Our Mission'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main content container */}
      <motion.div
        ref={containerRef}
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="relative z-10 max-w-7xl mx-auto px-4 py-20"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-red-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/50">
                <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">
                  Who We Are • What We Believe
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent">
              Building Faith,
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Shaping Futures
            </span>
          </motion.h1>
          
          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            A movement of students and graduates following Jesus Christ, 
            growing in faith, and serving as witnesses in Ethiopia and beyond.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* LEFT SIDE - Students & Graduates */}
          <motion.div
            id="students"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white to-sky-50 border border-white/50 backdrop-blur-sm">
              {/* Animated background pattern */}
              {/* Background Pattern */}
<div className="absolute inset-0 pointer-events-none">
  <div
    className="w-full h-full opacity-10 bg-repeat"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: "60px 60px",
    }}
  ></div>
</div>


              {/* Main image with enhanced parallax */}
              <div className="relative h-64 md:h-96 overflow-hidden rounded-t-3xl">
                <motion.div 
                  style={{ 
                    y: leftImageY,
                    scale: 1.1 
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/about.png"
                    alt="EvaSUE Students Community"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                
                {/* Gradient overlay with animation */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/20 to-sky-900/40"
                  animate={{
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Floating student icons */}
                <div className="absolute inset-0">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
                      style={{
                        top: `${20 + i * 20}%`,
                        left: `${20 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360, 0]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    >
                      <span className="text-xl">🎓</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Interactive badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full mb-6 cursor-pointer"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                  <span className="font-semibold text-sm tracking-wider">STUDENTS & GRADUATES</span>
                </motion.div>

                {/* Animated heading */}
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
                    Nurturing
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    Future Leaders
                  </span>
                </motion.h2>

                {/* Interactive stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {studentStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center group cursor-pointer"
                      whileHover={{ y: -5 }}
                    >
                      <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                      <div className="h-0.5 w-0 group-hover:w-full bg-current transition-all duration-500 mt-2"></div>
                    </motion.div>
                  ))}
                </div>

                {/* Description with staggered animation */}
                <div className="space-y-4 mb-8">
                  {[
                    "Students in EvaSUE are evangelical believers in secondary and tertiary educational institutions—both private and public. They are passionate disciples growing in faith, leadership, and mission across campuses.",
                    "Graduates are former student members who continue their fellowship beyond university life. They serve as Associates of EvaSUE, actively engaging in ministries and mentoring the next generation."
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={index + 2}
                      className="text-gray-600 leading-relaxed"
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>

                {/* Enhanced CTA */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/page/about/who-we-are"
                    className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-3">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        👥
                      </motion.div>
                      Meet Our Community
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Follow & Witness Jesus Christ */}
          <motion.div
            id="mission"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 border border-white/10 backdrop-blur-sm">
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-transparent to-sky-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

              {/* Main image with enhanced parallax */}
              <div className="relative h-64 md:h-96 overflow-hidden rounded-t-3xl">
                <motion.div 
                  style={{ 
                    y: rightImageY,
                    scale: 1.1 
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/bg-5.jpg"
                    alt="Following and Witnessing Jesus Christ"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                
                {/* Dynamic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-900/60 via-sky-900/40 to-transparent" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-sky-900 via-transparent to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />

                {/* Floating cross animation */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-sky-500/20 rounded-full blur-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl text-white/80">✝️</span>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Interactive badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-red-500/20 to-sky-500/20 backdrop-blur-sm rounded-full mb-6 border border-white/20 cursor-pointer"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-red-400 rounded-full"
                  />
                  <span className="font-semibold text-sm text-white/90 tracking-wider">OUR MISSION</span>
                </motion.div>

                {/* Animated heading */}
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-6 text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                    Follow &
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent">
                    Witness Christ
                  </span>
                </motion.h2>

                {/* Interactive timeline */}
                <div className="relative mb-8">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-red-500 to-transparent"></div>
                  <div className="space-y-6 pl-6">
                    {missionTimeline.map((item, index) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative group cursor-pointer"
                        whileHover={{ x: 10 }}
                      >
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full border-2 border-white bg-sky-900"></div>
                        <div className={`absolute -left-10 top-0 w-2 h-2 ${item.color} rounded-full animate-ping`}></div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-sky-200/80">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Description with staggered animation */}
                <div className="space-y-4 mb-8">
                  {[
                    "Jesus Christ is our Savior and Lord — saving us from sin and transforming our lives to reflect His image. Following Him means renewing our minds, imitating His life, and living for His purpose.",
                    "A true encounter with Jesus leads to witness — sharing the gospel in word and action, showing love, serving others, and caring for creation through the power of the Holy Spirit."
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={index + 2}
                      className="text-sky-100/90 leading-relaxed"
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>

                {/* Enhanced CTA */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/page/about/believe"
                    className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        ✨
                      </motion.div>
                      Explore Our Faith Journey
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom connecting element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
            <span className="text-sm text-gray-500 font-medium">One Vision • One Mission</span>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative animated wave */}
      <div className="relative mt-20 overflow-hidden">
        <motion.svg
          className="w-full h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,60 C150,30 300,90 450,60 C600,30 750,90 900,60 C1050,30 1200,90 1200,90 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            fillOpacity="0.1"
            animate={{
              d: [
                "M0,60 C150,30 300,90 450,60 C600,30 750,90 900,60 C1050,30 1200,90 1200,90 L1200,120 L0,120 Z",
                "M0,60 C150,90 300,30 450,60 C600,90 750,30 900,60 C1050,90 1200,30 1200,30 L1200,120 L0,120 Z",
                "M0,60 C150,30 300,90 450,60 C600,30 750,90 900,60 C1050,30 1200,90 1200,90 L1200,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </div>
    </section>
  );
}