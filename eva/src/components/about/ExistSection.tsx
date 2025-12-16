"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Lightbulb, Users, HandHeart, Sparkles, Target, Cross, Globe, Heart, ArrowRight, Star } from "lucide-react";

export default function ExistSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax and scale effects
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const purposes = [
    {
      title: "God's Purpose is our Core Purpose",
      icon: Lightbulb,
      description: "We exist to advance the Kingdom of God by reaching and equipping students to influence their universities, the nation, and the world. 'He set forth in Christ at the fullness of time to unite all things in Him.'",
      extendedDescription: "Our mission flows from God's eternal purpose to reconcile all things to Himself through Christ. We are instruments of His Kingdom, partnering with divine plans to transform campuses into centers of spiritual awakening and societal transformation.",
      color: "sky",
      gradient: "from-sky-500 via-sky-400 to-sky-600",
      lightGradient: "from-sky-500/10 to-sky-600/20",
      stats: { value: "Eternal", label: "Foundation" },
    },
    {
      title: "Domain of our Core Purpose: 'Students'",
      icon: Users,
      description: "Changing students means changing the world. We believe the time students spend in college lays the foundation for the next 40 years of their lives.",
      extendedDescription: "Students represent the future leaders, innovators, and influencers of society. By impacting them during their formative years, we're shaping the trajectory of nations and generations to come.",
      color: "emerald",
      gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
      lightGradient: "from-emerald-500/10 to-emerald-600/20",
      stats: { value: "Future", label: "Leaders" },
    },
    {
      title: "Main Task of our Core Purpose: 'Serving'",
      icon: HandHeart,
      description: "We serve with humility and love, following Christ's example—looking not to self-interest, but to the interest of others.",
      extendedDescription: "Service is not merely an activity but our identity. We embody Christ's servant leadership, pouring ourselves out for others as living sacrifices, reflecting God's love in practical, tangible ways.",
      color: "purple",
      gradient: "from-purple-500 via-purple-400 to-purple-600",
      lightGradient: "from-purple-500/10 to-purple-600/20",
      stats: { value: "Selfless", label: "Service" },
    },
    {
      title: "Expression of our Core Purpose: 'Transformed Society'",
      icon: Sparkles,
      description: "Our purpose is expressed through evangelism, discipleship, and leadership development—building a culture that reflects Kingdom values.",
      extendedDescription: "The ultimate measure of our impact is societal transformation. We're not just creating programs but cultivating environments where God's Kingdom manifests through changed lives, communities, and systems.",
      color: "amber",
      gradient: "from-amber-500 via-amber-400 to-amber-600",
      lightGradient: "from-amber-500/10 to-amber-600/20",
      stats: { value: "Kingdom", label: "Impact" },
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
      },
      emerald: {
        text: "text-emerald-600",
        hover: "text-emerald-700",
        bg: "bg-emerald-500",
        light: "bg-emerald-500/10",
        border: "border-emerald-500/20",
      },
      purple: {
        text: "text-purple-600",
        hover: "text-purple-700",
        bg: "bg-purple-500",
        light: "bg-purple-500/10",
        border: "border-purple-500/20",
      },
      amber: {
        text: "text-amber-600",
        hover: "text-amber-700",
        bg: "bg-amber-500",
        light: "bg-amber-500/10",
        border: "border-amber-500/20",
      },
    };
    return classes[color as keyof typeof classes][type as keyof (typeof classes)[keyof typeof classes]];
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-emerald-50/30 py-24 md:py-32"
    >
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

        {/* Floating crosses */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute text-sky-400/20"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + i * 15}%`,
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
            <Cross className="w-10 h-10" />
          </motion.div>
        ))}

        {/* Geometric shapes */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm"
            style={{
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
              left: `${5 + i * 16}%`,
              top: `${10 + i * 12}%`,
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
          style={{ y: headerY }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
                    Our Divine Mandate
                  </span>
                  <Target className="w-3 h-3 text-red-500" />
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
              Why We
            </span>
            {" "}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Exist
            </span>
          </motion.h2>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-sky-700/80 max-w-2xl mx-auto leading-relaxed"
          >
            The heartbeat of EvaSUE — our God-given purpose, domain, task, and expression that fuels our mission.
          </motion.p>

          {/* Decorative Line with Animation */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "140px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-1 bg-gradient-to-r from-sky-400 to-red-500 rounded-full mx-auto mt-8"
          />
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {purposes.map((purpose, index) => {
            const Icon = purpose.icon;
            const colorClasses = getColorClass(purpose.color, "text");
            const hoverColorClasses = getColorClass(purpose.color, "hover");
            const bgColorClasses = getColorClass(purpose.color, "bg");
            const lightColorClasses = getColorClass(purpose.color, "light");
            const borderColorClasses = getColorClass(purpose.color, "border");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                {/* Main Card */}
                <motion.div
                  style={{ scale: cardScale }}
                  animate={{
                    y: hoveredCard === index ? -15 : 0,
                    scale: hoveredCard === index ? 1.05 : 1,
                    rotateY: hoveredCard === index ? 5 : 0,
                    rotateX: hoveredCard === index ? -3 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative h-full bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl overflow-hidden group cursor-pointer"
                  style={{
                    boxShadow: "0 10px 40px rgba(14, 165, 233, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${purpose.lightGradient} opacity-0 group-hover:opacity-100`}
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
                  <div className="relative p-6 md:p-8">
                    {/* Header with Icon and Stats */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
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
                          <div className={`relative w-16 h-16 rounded-xl ${lightColorClasses} border ${borderColorClasses} flex items-center justify-center shadow-lg`}>
                            <Icon className={`w-8 h-8 ${colorClasses}`} />
                          </div>

                          {/* Corner Accents */}
                          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-current opacity-30" style={{ color: bgColorClasses }} />
                          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-current opacity-30" style={{ color: bgColorClasses }} />
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-current opacity-30" style={{ color: bgColorClasses }} />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-current opacity-30" style={{ color: bgColorClasses }} />
                        </motion.div>
                        
                        {/* Stats Badge */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="flex flex-col items-center"
                        >
                          <div className={`text-2xl font-bold ${colorClasses}`}>{purpose.stats.value}</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">{purpose.stats.label}</div>
                        </motion.div>
                      </div>
                      
                      {/* Card Number */}
                      <div className="text-6xl font-bold text-gray-100">0{index + 1}</div>
                    </div>

                    {/* Title */}
                    <motion.h3
                      animate={{
                        x: hoveredCard === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`text-xl md:text-2xl font-bold ${colorClasses} mb-4`}
                    >
                      {purpose.title}
                    </motion.h3>

                    {/* Short Description */}
                    <motion.p
                      animate={{
                        height: hoveredCard === index ? "auto" : "4.2rem",
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-600 leading-relaxed mb-6 overflow-hidden"
                    >
                      {purpose.description}
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
                            {purpose.extendedDescription}
                          </p>
                          <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <span>Learn more about this pillar</span>
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
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
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

                {/* Connecting Lines (Desktop Only) */}
                {index < purposes.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}