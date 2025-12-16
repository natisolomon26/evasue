"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Location() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse parallax values for the map section
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 30 });
  const springY = useSpring(y, { stiffness: 150, damping: 30 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPos = mouseX / width - 0.5;
    const yPos = mouseY / height - 0.5;
    
    x.set(xPos);
    y.set(yPos);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Stats data for interactive display
  const stats = [
    { number: "150+", label: "Campuses", color: "text-red-500" },
    { number: "50,000+", label: "Students", color: "text-sky-500" },
    { number: "50+", label: "Regions", color: "text-orange-500" },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 px-4 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 -z-10" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px)] bg-[size:40px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px]"></div>
      </div>

      {/* Floating elements with enhanced animations */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-sky-400/10 to-red-400/10 rounded-full blur-3xl hidden md:block"
        animate={{
          y: [-30, 30, -30],
          x: [-20, 20, -20],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-red-400/10 to-yellow-400/10 rounded-full blur-3xl hidden md:block"
        animate={{
          y: [30, -30, 30],
          x: [20, -20, 20],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Glowing dots pattern */}
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-sky-400 rounded-full animate-pulse hidden md:block">
        <div className="absolute inset-0 bg-sky-400 rounded-full animate-ping"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-1000 hidden md:block">
        <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/10 to-red-500/10 rounded-full border border-sky-200 mb-4">
            <span className="h-2 w-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-sky-900 uppercase tracking-wider">
              Our Global Reach
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-4">
            Spreading Hope Across{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Borders
            </span>
          </h2>
          <p className="text-lg text-sky-700/80 max-w-2xl mx-auto">
            Empowering students to become transformative leaders in their communities
          </p>
        </motion.div>

        {/* Main content container */}
        <div className="relative flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Left: Interactive map section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm bg-white/5">
              {/* Main image with parallax effect */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative h-[400px] md:h-[500px] w-full"
              >
                <Image
                  src="/images/location2.jpg"
                  alt="Global Impact Map"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-300/20 via-transparent to-transparent" />
                
                {/* Interactive map pins with tooltips */}
                <div className="absolute inset-0">
                  {/* Addis Ababa */}
                  <motion.div
                    className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative group">
                      <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer">
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                          <span className="text-xs font-semibold text-sky-900">Addis Ababa</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Regional hubs */}
                  {[
                    { top: "20%", left: "30%", color: "bg-sky-500", city: "Bahir Dar" },
                    { top: "60%", left: "40%", color: "bg-yellow-500", city: "Hawassa" },
                    { top: "40%", left: "70%", color: "bg-emerald-500", city: "Dire Dawa" },
                    { top: "70%", left: "60%", color: "bg-purple-500", city: "Mekelle" },
                  ].map((pin, index) => (
                    <motion.div
                      key={pin.city}
                      className="absolute"
                      style={{ top: pin.top, left: pin.left }}
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      <div className="relative group">
                        <div className={`w-3 h-3 ${pin.color} rounded-full border-2 border-white shadow-lg cursor-pointer`}>
                          <div className="absolute inset-0 bg-current rounded-full animate-ping opacity-20"></div>
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                            <span className="text-xs font-semibold text-sky-900">{pin.city}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Pulse effect rings */}
                <motion.div 
                  className="absolute top-1/3 left-1/2 w-8 h-8 border-2 border-red-400/30 rounded-full"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className="absolute top-1/3 left-1/2 w-12 h-12 border-2 border-red-400/20 rounded-full"
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                />
              </motion.div>
              
              {/* Stats bar at bottom of map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-800/80 via-sky-900/90 to-transparent p-6"
              >
                <div className="flex justify-between">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/90 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <div className="bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border border-sky-700/30">
              <div className="space-y-6 md:space-y-8">
                {/* Content with staggered animations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Transforming{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">
                      Campuses
                    </span>
                    , Empowering{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                      Generations
                    </span>
                  </h3>
                  
                  <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-sky-500 rounded-full"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="space-y-4"
                >
                  <p className="text-sky-100/90 leading-relaxed text-justify">
                    At EvaSUE, we are more than an organization — we are a movement. 
                    With a presence in over 50 campuses across Ethiopia, we are nurturing 
                    the next generation of Christian leaders who will transform their 
                    communities through faith, service, and excellence.
                  </p>
                  
                  
                </motion.div>

                {/* Enhanced CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="pt-4"
                >
                  <Link
                    href="/locations"
                    className="group relative inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Background shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                    
                    {/* Button content */}
                    <span className="relative z-10 flex items-center gap-3">
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                      Discover Our Network
                    </span>
                    
                    {/* Glow effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    
                    {/* Corner accent */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </Link>
                  
                  {/* Secondary link */}
                  <div className="text-center mt-4">
                    <Link
                      href="/impact"
                      className="inline-flex items-center gap-2 text-sm text-sky-300/80 hover:text-white transition-colors duration-300 group"
                    >
                      <span>View our impact stories</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}