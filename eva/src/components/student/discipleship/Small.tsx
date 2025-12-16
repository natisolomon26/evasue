"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Heart, Target, Cross, Sparkles } from "lucide-react";

export default function Small() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden group">
      
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <Image
          src="/images/bg3.JPG"
          alt="Small Group Ministry"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-900/80 to-sky-900/90"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-sky-900 via-transparent to-sky-900/30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/20 to-sky-900"></div>

      {/* Enhanced Horizontal Floating Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated horizontal lines moving across */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`line-h-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              width: `${200 + i * 50}px`,
              top: `${15 + i * 15}%`,
              left: `${-100}%`,
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Horizontal floating rectangles */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={`rect-h-${i}`}
            className="absolute border border-white/20 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{
              width: `${150 + i * 30}px`,
              height: `${8}px`,
              top: `${20 + i * 12}%`,
              left: `${-100}%`,
            }}
            animate={{
              x: ["-100%", "150%"],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Horizontal bars moving in opposite direction */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`bar-h-${i}`}
            className="absolute h-[2px] bg-gradient-to-r from-sky-400/30 via-sky-300/20 to-sky-400/30"
            style={{
              width: `${300}px`,
              bottom: `${20 + i * 15}%`,
              right: `${-100}%`,
            }}
            animate={{
              x: ["100%", "-150%"],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1,
            }}
          />
        ))}

        {/* Horizontal scan lines */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={`scan-h-${i}`}
            className="absolute h-[0.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              width: `${400}px`,
              top: `${10 + i * 13}%`,
              left: `${-100}%`,
            }}
            animate={{
              x: ["-100%", "250%"],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Geometric floating lines with icons */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={`icon-line-${i}`}
            className="absolute flex items-center gap-4"
            style={{
              top: `${25 + i * 12}%`,
              left: `${-50}%`,
            }}
            animate={{
              x: ["-50%", "150%"],
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
          >
            <div className="text-white/30">
              {i % 4 === 1 && <Users className="w-4 h-4" />}
              {i % 4 === 2 && <Heart className="w-4 h-4" />}
              {i % 4 === 3 && <Target className="w-4 h-4" />}
              {i % 4 === 0 && <Cross className="w-4 h-4" />}
            </div>
            <div className="h-px w-32 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
          </motion.div>
        ))}

        {/* Horizontal particle trails */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.div
            key={`trail-h-${i}`}
            className="absolute"
            style={{
              top: `${30 + i * 6}%`,
              left: `${-10}%`,
            }}
            animate={{
              x: ["-10%", "110%"],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-1 h-1 bg-white/20 rounded-full"
                  animate={{
                    scale: [0.5, 1, 0.5],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: dot * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Horizontal connection lines */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`connect-h-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent"
            style={{
              width: `${80}px`,
              top: `${40 + i * 8}%`,
              left: `${5 + i * 10}%`,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Vertical floating elements for depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical lines for contrast */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={`line-v-${i}`}
            className="absolute w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{
              left: `${10 + i * 20}%`,
              top: `${-10}%`,
            }}
            animate={{
              y: ["-100%", "150%"],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl text-center px-4 sm:px-6"
      >
        {/* Enhanced Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full mb-8 shadow-xl group/badge"
        >
          <motion.div
            className="w-2 h-2 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-semibold text-sky-100 uppercase tracking-wider">
            The Heartbeat of Ministry
          </span>
          <Sparkles className="w-4 h-4 text-emerald-300 opacity-0 group-hover/badge:opacity-100 transition-opacity" />
        </motion.div>

        {/* Enhanced Main Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Text shadow/glow effect */}
          <div className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white/10 blur-xl">
            Small · Group
          </div>
          
          <h2 className="relative text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-wide mb-6">
            <span className="inline-block bg-gradient-to-r from-white via-sky-100 to-white bg-clip-text text-transparent">
              Small
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mx-3 md:mx-4 text-sky-300 font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            >
              ·
            </motion.span>
            <span className="inline-block bg-gradient-to-r from-sky-100 via-white to-sky-100 bg-clip-text text-transparent">
              Group
            </span>
          </h2>

          {/* Horizontal line under heading */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mt-4"
          />
        </motion.div>

        {/* Enhanced Subheading with Interactive Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto mt-8"
        >
          <p className="mb-6">
            Since community is essential for spiritual development, we encourage small group ministry among students — promoting
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { text: "Mission", color: "text-sky-400", icon: Target },
              { text: "Fellowship", color: "text-emerald-400", icon: Users },
              { text: "Prayer", color: "text-amber-400", icon: Heart },
              { text: "Nurturing", color: "text-pink-400", icon: Sparkles },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`group/keyword flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 ${item.color}`}
                >
                  <motion.div
                    animate={{ rotateY: 0 }}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="font-semibold text-sm">{item.text}</span>
                  <motion.div
                    className="h-0.5 w-0 group-hover/keyword:w-12 bg-current transition-all duration-500"
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center items-center gap-6 mt-12"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-sky-400/50" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-2 h-2 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
          />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-sky-400/50" />
        </motion.div>
      </motion.div>

      {/* Floating community silhouette */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80 h-32 opacity-15">
        <svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Connected dots representing community */}
          <path d="M30,100 Q80,60 130,100 Q180,60 230,100 Q280,60 330,100" 
                fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="5,5" />
          
          {/* Community circles */}
          {[
            { cx: 30, cy: 100, color: "#60A5FA" },
            { cx: 130, cy: 100, color: "#10B981" },
            { cx: 230, cy: 100, color: "#F59E0B" },
            { cx: 330, cy: 100, color: "#EC4899" },
          ].map((circle, index) => (
            <motion.circle
              key={index}
              cx={circle.cx}
              cy={circle.cy}
              r="4"
              fill={circle.color}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}