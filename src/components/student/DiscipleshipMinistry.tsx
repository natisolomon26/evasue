"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Users, GraduationCap, Church, Shield, 
  Target, ArrowRight, Sparkles, Heart, Cross, Star 
} from "lucide-react";

export default function DiscipleshipMinistry() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const strategies = [
    {
      title: "Bible Study",
      description: "Knowing and obeying the Scriptures is core to discipleship. We support the spiritual growth of students by helping them develop a love for the Word of God through group Bible studies.",
      extendedDescription: "Our Bible study programs go beyond surface-level reading to deep theological engagement. We equip students to interpret, apply, and live out God's Word in their daily lives, fostering a transformative relationship with Scripture.",
      icon: BookOpen,
      color: "sky",
      gradient: "from-sky-500 via-sky-400 to-sky-600",
      stats: { value: "150+", label: "Study Groups" }
    },
    {
      title: "Small Group",
      description: "Since community is essential for spiritual development, we encourage small group ministry among students — promoting Mission, Fellowship, Prayer and Nurturing.",
      extendedDescription: "Intimate settings where authentic relationships form. Our small groups create safe spaces for vulnerability, accountability, and spiritual growth through shared experiences and mutual support.",
      icon: Users,
      color: "emerald",
      gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
      stats: { value: "200+", label: "Groups Active" }
    },
    {
      title: "Trainings",
      description: "We prepare students for campus life and life after university by offering trainings on key spiritual, academic, and life topics.",
      extendedDescription: "Comprehensive training modules covering spiritual disciplines, leadership skills, and practical life skills. Our workshops and seminars prepare students to navigate both campus life and future careers with wisdom and faith.",
      icon: GraduationCap,
      color: "amber",
      gradient: "from-amber-500 via-amber-400 to-amber-600",
      stats: { value: "50+", label: "Modules" }
    },
    {
      title: "Local Church Connections",
      description: "We help students stay strongly connected with their local churches before and after graduation.",
      extendedDescription: "Building bridges between campus ministry and local congregations. We facilitate meaningful connections that ensure students remain rooted in church communities throughout their academic journey and beyond.",
      icon: Church,
      color: "purple",
      gradient: "from-purple-500 via-purple-400 to-purple-600",
      stats: { value: "75+", label: "Churches Partnered" }
    },
    {
      title: "Leadership Development",
      description: "We develop leadership skills through reading, discussions, mentorship, and exposure to ministry opportunities.",
      extendedDescription: "Nurturing servant leaders who lead with Christ-like character. Our leadership development program combines mentorship, practical ministry experience, and character formation to raise the next generation of Christian leaders.",
      icon: Shield,
      color: "red",
      gradient: "from-red-500 via-red-400 to-red-600",
      stats: { value: "300+", label: "Leaders Developed" }
    },
    {
      title: "Mentorship Program",
      description: "Pairing students with experienced mentors for guidance, encouragement, and spiritual direction throughout their academic journey.",
      extendedDescription: "One-on-one relationships that provide personalized spiritual guidance, career advice, and life coaching. Our mentorship program connects students with seasoned believers who invest in their holistic development.",
      icon: Target,
      color: "indigo",
      gradient: "from-indigo-500 via-indigo-400 to-indigo-600",
      stats: { value: "120+", label: "Mentor Pairs" }
    },
  ];

  const getColorClass = (color: string, type: string) => {
    const classes = {
      sky: {
        text: "text-sky-600",
        hover: "text-sky-700",
        bg: "bg-sky-500",
        light: "bg-sky-500/10",
        border: "border-sky-500/20",
        gradient: "from-sky-500/20 to-sky-600/10"
      },
      emerald: {
        text: "text-emerald-600",
        hover: "text-emerald-700",
        bg: "bg-emerald-500",
        light: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        gradient: "from-emerald-500/20 to-emerald-600/10"
      },
      amber: {
        text: "text-amber-600",
        hover: "text-amber-700",
        bg: "bg-amber-500",
        light: "bg-amber-500/10",
        border: "border-amber-500/20",
        gradient: "from-amber-500/20 to-amber-600/10"
      },
      purple: {
        text: "text-purple-600",
        hover: "text-purple-700",
        bg: "bg-purple-500",
        light: "bg-purple-500/10",
        border: "border-purple-500/20",
        gradient: "from-purple-500/20 to-purple-600/10"
      },
      red: {
        text: "text-red-600",
        hover: "text-red-700",
        bg: "bg-red-500",
        light: "bg-red-500/10",
        border: "border-red-500/20",
        gradient: "from-red-500/20 to-red-600/10"
      },
      indigo: {
        text: "text-indigo-600",
        hover: "text-indigo-700",
        bg: "bg-indigo-500",
        light: "bg-indigo-500/10",
        border: "border-indigo-500/20",
        gradient: "from-indigo-500/20 to-indigo-600/10"
      },
    };
    return classes[color as keyof typeof classes][type as keyof (typeof classes)[keyof typeof classes]];
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white py-24 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-sky-400/10 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            y: [-60, 60, -60],
            x: [-40, 40, -40],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-emerald-400/10 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            y: [60, -60, 60],
            x: [40, -40, 40],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating icons */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute text-orange-600/70"
            style={{
              left: `${5 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BookOpen className="w-10 h-10" />
          </motion.div>
        ))}

        {/* Geometric shapes */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm"
            style={{
              width: `${30 + i * 10}px`,
              height: `${30 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-red-600 rounded-full blur-lg opacity-30 animate-pulse" />
              <div className="relative px-6 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-white/50">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">
                    Disciple-Making Strategies
                  </span>
                  <Sparkles className="w-3 h-3 text-red-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Heading with Gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent">
              Discipleship
            </span>
            {" "}
            <span className="bg-gradient-to-r from-red-500  to-red-600 bg-clip-text text-transparent">
              Strategies
            </span>
          </motion.h2>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-sky-700/80 max-w-3xl mx-auto leading-relaxed"
          >
            We are committed to raising deeply rooted followers of Christ through
            intentional, Spirit-led discipleship that transforms lives and campuses.
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-1 bg-gradient-to-r from-sky-500 to-red-600 rounded-full mx-auto mt-8"
          />
        </motion.div>

        {/* Enhanced Strategies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            const colorClasses = getColorClass(strategy.color, "text");
            const hoverColorClasses = getColorClass(strategy.color, "hover");
            const bgColorClasses = getColorClass(strategy.color, "bg");
            const lightColorClasses = getColorClass(strategy.color, "light");
            const borderColorClasses = getColorClass(strategy.color, "border");
            const gradientClasses = getColorClass(strategy.color, "gradient");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                {/* Main Card */}
                <motion.div
                  animate={{
                    y: hoveredCard === index ? -10 : 0,
                    scale: hoveredCard === index ? 1.03 : 1,
                    rotateY: hoveredCard === index ? 3 : 0,
                    rotateX: hoveredCard === index ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative h-full bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl overflow-hidden group cursor-pointer"
                  style={{
                    boxShadow: "0 10px 40px rgba(14, 165, 233, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientClasses} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Floating Particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[1, 2, 3].map((particle) => (
                      <motion.div
                        key={particle}
                        className="absolute w-1 h-1 rounded-full bg-current"
                        style={{
                          left: `${20 + particle * 15}%`,
                          top: `${30 + particle * 10}%`,
                          color: bgColorClasses,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 2 + particle,
                          repeat: Infinity,
                          delay: particle * 0.3,
                        }}
                      />
                    ))}
                  </div>

                  {/* Card Content */}
                  <div className="relative p-6 md:p-7">
                    {/* Icon and Header */}
                    <div className="flex items-start justify-between mb-5">
                      <motion.div
                        animate={{
                          rotateY: hoveredCard === index ? 360 : 0,
                          scale: hoveredCard === index ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                      >
                        {/* Icon Background Glow */}
                        <motion.div
                          className={`absolute inset-0 rounded-xl ${bgColorClasses} opacity-0 group-hover:opacity-20 blur-xl`}
                          animate={{ scale: hoveredCard === index ? 1.5 : 1 }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        {/* Icon Container */}
                        <div className={`relative w-14 h-14 rounded-xl ${lightColorClasses} border ${borderColorClasses} flex items-center justify-center shadow-lg`}>
                          <Icon className={`w-7 h-7 ${colorClasses}`} />
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-current opacity-30" style={{ color: bgColorClasses }} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-current opacity-30" style={{ color: bgColorClasses }} />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-current opacity-30" style={{ color: bgColorClasses }} />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-current opacity-30" style={{ color: bgColorClasses }} />
                      </motion.div>
                      
                      {/* Stats Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-right"
                      >
                        <div className={`text-2xl font-bold ${colorClasses}`}>{strategy.stats.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{strategy.stats.label}</div>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <motion.h3
                      animate={{
                        x: hoveredCard === index ? 3 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`text-xl font-bold ${colorClasses} mb-4`}
                    >
                      {strategy.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      animate={{
                        height: hoveredCard === index ? "auto" : "4.8rem",
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-600 leading-relaxed mb-6 overflow-hidden"
                    >
                      {strategy.description}
                    </motion.p>

                    {/* Extended Description on Hover */}
                    <AnimatePresence>
                      {hoveredCard === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-gray-100"
                        >
                          <p className="text-sm text-gray-500 mb-4">
                            {strategy.extendedDescription}
                          </p>
                          <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <span>Explore this strategy</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Progress Indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.8 }}
                    >
                      <motion.div
                        className={`h-full ${bgColorClasses}`}
                        animate={{
                          x: hoveredCard === index ? ["0%", "100%", "0%"] : "0%",
                        }}
                        transition={{
                          duration: 2,
                          repeat: hoveredCard === index ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Card Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-white flex items-center justify-center text-xs font-bold shadow-lg"
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}