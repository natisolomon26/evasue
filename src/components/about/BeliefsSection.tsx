"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Cross, Globe, Shield, Star, Heart, Target, Zap, Users, BookOpen, Eye } from "lucide-react";

const beliefs = [
  {
    text: "We believe in the Triune God—God the Father, God the Son, and God the Holy Spirit—one God in three persons.",
    icon: Cross,
    color: "from-sky-500 to-sky-600",
    theme: "sky"
  },
  {
    text: "We believe God is the final authority over all creation, salvation of mankind, and the coming final judgment.",
    icon: Globe,
    color: "from-emerald-500 to-emerald-600",
    theme: "emerald"
  },
  {
    text: "We believe Scripture is God-breathed and written through the divine leading of the Holy Spirit. It gives the final authority pertaining to all Christian faith and life matters.",
    icon: Cross,
    color: "from-amber-500 to-amber-600",
    theme: "amber"
  },
  {
    text: "We believe, since Adam, all humankind has sinned and therefore falls under God's judgment.",
    icon: Shield,
    color: "from-red-500 to-red-600",
    theme: "red"
  },
  {
    text: "We believe salvation from sin is only obtained through faith in Jesus Christ, who atoned for our sin through His substitutionary death on the cross.",
    icon: Heart,
    color: "from-purple-500 to-purple-600",
    theme: "purple"
  },
  {
    text: "We believe in the resurrection and bodily ascension of Jesus Christ, who is now at the right hand of God the Father.",
    icon: Star,
    color: "from-pink-500 to-pink-600",
    theme: "pink"
  },
  {
    text: "We believe in the Church of Christ, His body, in which true believers are members.",
    icon: Users,
    color: "from-indigo-500 to-indigo-600",
    theme: "indigo"
  },
  {
    text: "We believe it is the Holy Spirit who convicts, leads to repentance, and regenerates sinners into a new life. He also empowers believers to carry out God's mission.",
    icon: Zap,
    color: "from-cyan-500 to-cyan-600",
    theme: "cyan"
  },
  {
    text: "We believe that righteousness is obtained through the grace that comes only from faith in Jesus Christ.",
    icon: Target,
    color: "from-green-500 to-green-600",
    theme: "green"
  },
  {
    text: "We believe the Holy Spirit dwells in believers' lives and effects the work of salvation.",
    icon: BookOpen,
    color: "from-orange-500 to-orange-600",
    theme: "orange"
  },
  {
    text: "We believe in the resurrection of the dead, the judgment of the world, and the existence of eternal life.",
    icon: Eye,
    color: "from-violet-500 to-violet-600",
    theme: "violet"
  },
  {
    text: "We believe in the bodily, second coming of Jesus Christ.",
    icon: Cross,
    color: "from-rose-500 to-rose-600",
    theme: "rose"
  }
];

export default function BeliefsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const getThemeClasses = (theme: string) => {
    const classes = {
      sky: {
        bg: "bg-sky-50",
        text: "text-sky-700",
        border: "border-sky-200",
        hover: "hover:bg-sky-100",
        icon: "text-sky-600",
        gradient: "from-sky-500 to-sky-600"
      },
      emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        hover: "hover:bg-emerald-100",
        icon: "text-emerald-600",
        gradient: "from-emerald-500 to-emerald-600"
      },
      amber: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        hover: "hover:bg-amber-100",
        icon: "text-amber-600",
        gradient: "from-amber-500 to-amber-600"
      },
      red: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        hover: "hover:bg-red-100",
        icon: "text-red-600",
        gradient: "from-red-500 to-red-600"
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        hover: "hover:bg-purple-100",
        icon: "text-purple-600",
        gradient: "from-purple-500 to-purple-600"
      },
      pink: {
        bg: "bg-pink-50",
        text: "text-pink-700",
        border: "border-pink-200",
        hover: "hover:bg-pink-100",
        icon: "text-pink-600",
        gradient: "from-pink-500 to-pink-600"
      },
      indigo: {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        hover: "hover:bg-indigo-100",
        icon: "text-indigo-600",
        gradient: "from-indigo-500 to-indigo-600"
      },
      cyan: {
        bg: "bg-cyan-50",
        text: "text-cyan-700",
        border: "border-cyan-200",
        hover: "hover:bg-cyan-100",
        icon: "text-cyan-600",
        gradient: "from-cyan-500 to-cyan-600"
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        hover: "hover:bg-green-100",
        icon: "text-green-600",
        gradient: "from-green-500 to-green-600"
      },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        hover: "hover:bg-orange-100",
        icon: "text-orange-600",
        gradient: "from-orange-500 to-orange-600"
      },
      violet: {
        bg: "bg-violet-50",
        text: "text-violet-700",
        border: "border-violet-200",
        hover: "hover:bg-violet-100",
        icon: "text-violet-600",
        gradient: "from-violet-500 to-violet-600"
      },
      rose: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        hover: "hover:bg-rose-100",
        icon: "text-rose-600",
        gradient: "from-rose-500 to-rose-600"
      }
    };
    return classes[theme as keyof typeof classes];
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-24 md:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-sky-400/5 via-transparent to-transparent rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-emerald-400/5 via-transparent to-transparent rounded-full blur-3xl"
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
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute text-sky-400/20"
            style={{
              left: `${5 + i * 18}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Cross className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          style={{ scale: headerScale }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full blur-lg opacity-30 animate-pulse" />
              <div className="relative px-6 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-white/50">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">
                    Our Faith Foundation
                  </span>
                  <Cross className="w-3 h-3 text-emerald-500" />
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
              Core
            </span>
            {" "}
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Beliefs
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
            The foundational truths that shape our faith, guide our ministry, 
            and unite our community in Christ.
          </motion.p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring" }}
              className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
            />
          </div>
        </motion.div>

        {/* Enhanced Beliefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beliefs.map((belief, index) => {
            const Icon = belief.icon;
            const themeClasses = getThemeClasses(belief.theme);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  animate={{
                    y: hoveredCard === index ? -10 : 0,
                    scale: hoveredCard === index ? 1.03 : 1,
                    rotateY: hoveredCard === index ? 5 : 0,
                    rotateX: hoveredCard === index ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`relative h-full rounded-2xl border-2 ${themeClasses.border} ${themeClasses.bg} ${themeClasses.hover} backdrop-blur-sm overflow-hidden group cursor-pointer`}
                  style={{
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${belief.color} opacity-0 group-hover:opacity-5`}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Floating Particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[1, 2, 3].map((particle) => (
                      <motion.div
                        key={particle}
                        className={`absolute w-1 h-1 rounded-full ${themeClasses.icon}`}
                        style={{
                          left: `${20 + particle * 20}%`,
                          top: `${30 + particle * 15}%`,
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
                  <div className="relative p-6">
                    {/* Header with Icon and Number */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            rotateY: hoveredCard === index ? 360 : 0,
                            scale: hoveredCard === index ? 1.2 : 1,
                          }}
                          transition={{ duration: 0.6 }}
                          className="relative"
                        >
                          <div className={`w-12 h-12 rounded-xl ${themeClasses.bg} border ${themeClasses.border} flex items-center justify-center shadow-lg`}>
                            <Icon className={`w-6 h-6 ${themeClasses.icon}`} />
                          </div>
                          
                          {/* Corner Accents */}
                          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-current opacity-30" style={{ color: themeClasses.icon }} />
                          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-current opacity-30" style={{ color: themeClasses.icon }} />
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-current opacity-30" style={{ color: themeClasses.icon }} />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-current opacity-30" style={{ color: themeClasses.icon }} />
                        </motion.div>
                        
                        {/* Card Number */}
                        <div className="text-5xl font-bold text-gray-200">
                          0{index + 1}
                        </div>
                      </div>
                      
                      {/* Interactive Indicator */}
                      <motion.div
                        animate={{ 
                          scale: hoveredCard === index ? 1.5 : 1,
                          rotate: hoveredCard === index ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100"
                        style={{ color: themeClasses.icon }}
                      />
                    </div>

                    {/* Belief Text */}
                    <motion.p
                      animate={{
                        x: hoveredCard === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`${themeClasses.text} leading-relaxed text-sm md:text-base`}
                    >
                      {belief.text}
                    </motion.p>

                    {/* Bottom Border with Animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.8 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${belief.color}`}
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
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}