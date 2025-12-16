"use client";

import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";

interface CoreValue {
  title: string;
  description: string;
  image: string;
  overlayColor: string;
  icon: string;
  accentColor: string;
}

export default function CoreValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const coreValues: CoreValue[] = [
    {
      title: "Centrality of God's Word",
      description: "We affirm Scripture as the revelation of God's person and will, culminating in Jesus Christ. The Bible is our foundation for life, transformation, and ministry.",
      image: "/images/bg1.jpg",
      overlayColor: "from-sky-900/95 via-sky-800/80 to-sky-700/60",
      icon: "📖",
      accentColor: "text-sky-400",
    },
    {
      title: "Student Focused",
      description: "EvaSUE exists for students. Our mission is to serve and equip them to advance God's Kingdom in their campuses, communities, and future careers.",
      image: "/images/bg2.JPG",
      overlayColor: "from-emerald-900/95 via-emerald-800/80 to-emerald-700/60",
      icon: "🎓",
      accentColor: "text-emerald-400",
    },
    {
      title: "Unity in Diversity",
      description: "We believe Christ unites us across denomination, ethnicity, language, and economy. In Him, we are one body, celebrating our diversity in unity.",
      image: "/images/bg3.JPG",
      overlayColor: "from-red-900/95 via-red-800/80 to-red-700/60",
      icon: "🤝",
      accentColor: "text-red-400",
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-20 md:py-28"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-sky-400/5 via-transparent to-transparent rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-red-400/5 via-transparent to-transparent rounded-full blur-3xl"
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

        {/* Floating geometric shapes */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
            style={{
              width: `${30 + i * 10}px`,
              height: `${30 + i * 10}px`,
              left: `${5 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-red-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative px-6 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-white/50 shadow-sm">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">
                    Foundational Pillars
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main heading with gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-600 bg-clip-text text-transparent">
              Our Core
            </span>
            {" "}
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Values
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-sky-700/80 max-w-2xl mx-auto leading-relaxed"
          >
            Guiding principles that shape our community, ministry, and mission
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-1 bg-gradient-to-r from-sky-500  to-red-600 rounded-full mx-auto mt-6"
          />
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {coreValues.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              className="relative"
              onMouseEnter={() => {
                setHoveredCard(index);
                setActiveCard(index);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
                setActiveCard(null);
              }}
            >
              {/* Main Card Container */}
              <motion.div
                style={{ scale: cardScale }}
                animate={{
                  y: hoveredCard === index ? -10 : 0,
                  scale: hoveredCard === index ? 1.03 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer"
              >
                {/* Background Image with Parallax */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </motion.div>
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.overlayColor}`} />
                  
                  {/* Animated Light Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: hoveredCard === index ? "100%" : "-100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                  {/* Top Section - Icon and Number */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      animate={{ 
                        scale: hoveredCard === index ? 1.2 : 1,
                        rotate: hoveredCard === index ? 360 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center ${card.accentColor}`}
                    >
                      <span className="text-3xl">{card.icon}</span>
                    </motion.div>
                    
                    {/* Card Number */}
                    <div className="text-5xl md:text-6xl font-bold text-white/10">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Middle Section - Content */}
                  <div className="space-y-4">
                    <motion.h3
                      animate={{ 
                        x: hoveredCard === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl md:text-3xl font-bold text-white leading-tight"
                    >
                      {card.title}
                    </motion.h3>
                    
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredCard === index ? 1 : 0,
                        height: hoveredCard === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/90 leading-relaxed text-sm md:text-base">
                        {card.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Bottom Section - Interactive Element */}
                  <motion.div
                    animate={{ 
                      opacity: hoveredCard === index ? 1 : 0.5,
                      scale: hoveredCard === index ? 1 : 0.95,
                    }}
                    className="flex items-center justify-between pt-4 border-t border-white/20"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white/80">Learn more</span>
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        animate={{ x: hoveredCard === index ? [0, 5, 0] : 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </motion.svg>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="w-8 h-0.5 bg-white/30 overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: hoveredCard === index ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Border Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${card.accentColor.replace('text-', 'border-')}/30`} />
                
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
      
      </div>
    </section>
  );
}