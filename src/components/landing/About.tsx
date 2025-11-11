"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function AboutPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Parallax effects
  const leftImageY = useTransform(scrollYProgress, [0, 0.5, 1], ["-10%", "0%", "10%"]);
  const rightImageY = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "0%", "-10%"]);

  // Text animations
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full overflow-hidden bg-gray-50 px-4 py-8 md:py-16"
    >
      {/* Floating decorative elements - only on desktop */}
      <motion.div 
        className="absolute top-1/4 left-8 w-16 h-16 bg-sky-400/20 rounded-full blur-2xl hidden md:block"
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-8 w-24 h-24 bg-red-500/20 rounded-full blur-2xl hidden md:block"
        animate={{
          y: [20, -20, 20],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="flex flex-col md:flex-row gap-8 md:gap-0">
        {/* LEFT SIDE - Students & Graduates */}
        <div className="relative flex-1 bg-sky-50 overflow-hidden min-h-[400px] md:min-h-[600px]">
          <motion.div 
            style={{ y: leftImageY }}
            className="absolute inset-0"
          >
            <Image
              src="/images/about.png"
              alt="EvaSUE Students"
              fill
              className="object-cover opacity-70"
              priority
            />
          </motion.div>
          
          {/* Light gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/80 to-white/10"></div>
          
          <div className="relative z-10 flex flex-col justify-center h-full px-6 py-12 md:px-12 md:py-16">
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-center md:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-100 rounded-full border border-sky-200 mx-auto md:mx-0 mb-5">
                <span className="h-1.5 w-1.5 bg-sky-500 rounded-full animate-pulse"></span>
                <span className="text-xs md:text-sm font-medium text-sky-700">Campus Ministry</span>
              </div>
              
              {/* Heading */}
              <motion.h2
                className="text-2xl md:text-4xl font-bold mb-4 text-sky-800 leading-tight"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Students & <span className="text-sky-600">Graduates</span>
              </motion.h2>
              
              {/* Body text */}
              <p className="text-sky-700 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
                <span className="font-semibold text-sky-800">Students</span> in EvaSUE are evangelical believers in secondary and tertiary educational institutions—both private and public. They are passionate disciples growing in faith, leadership, and mission across campuses.
              </p>
              
              <p className="text-sky-700 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                <span className="font-semibold text-sky-800">Graduates</span> are former student members who continue their fellowship beyond university life. They serve as <em className="italic text-sky-600">Associates of EvaSUE</em>, actively engaging in ministries and mentoring the next generation to follow Christ in every area of life.
              </p>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-left"
            >
              <Link
                href="/students"
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full md:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Explore Our Students
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sky-700 to-sky-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - Follow & Witness Jesus Christ */}
        <div className="relative flex-1 overflow-hidden min-h-[400px] md:min-h-[600px]">
          <motion.div 
            style={{ y: rightImageY }}
            className="absolute inset-0"
          >
            <Image
              src="/images/bg-5.jpg"
              alt="Follow and Witness Jesus"
              fill
              className="object-cover opacity-90"
              priority
            />
          </motion.div>
          
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-900/60 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col justify-center h-full px-6 py-12 md:px-12 md:py-16">
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-center md:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 mx-auto md:mx-0 mb-5">
                <span className="h-1.5 w-1.5 bg-red-400 rounded-full animate-pulse"></span>
                <span className="text-xs md:text-sm font-medium text-white/90">Core Mission</span>
              </div>
              
              {/* Heading */}
              <motion.h2
                className="text-2xl md:text-4xl font-bold mb-4 text-white leading-tight"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Follow & <span className="text-red-300">Witness</span> Jesus Christ
              </motion.h2>
              
              {/* Body text */}
              <p className="text-sky-100 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
                Jesus Christ is our Savior and Lord — saving us from sin and transforming our lives to reflect His image. Following Him means renewing our minds, imitating His life, and living for His purpose.
              </p>
              
              <p className="text-sky-100 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                A true encounter with Jesus leads to witness — sharing the gospel in word and action, showing love, serving others, and caring for creation through the power of the Holy Spirit.
              </p>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-left"
            >
              <Link
                href="/faith"
                className="group relative inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full md:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v8h10V6H4zm1 2h8v4H5V8z" clipRule="evenodd" />
                  </svg>
                  Explore Our Faith
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile-only decorative elements */}
      <div className="md:hidden flex justify-center mt-8">
        <div className="w-12 h-12 bg-sky-400/20 rounded-full blur-lg animate-pulse"></div>
        <div className="w-12 h-12 bg-red-500/20 rounded-full blur-lg animate-pulse delay-700 ml-4"></div>
      </div>

      {/* Decorative wave pattern at bottom - scaled for mobile */}
      <div className="relative mt-12 md:mt-20">
        <svg className="w-full h-10 md:h-12 text-sky-100" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 C200,30 400,70 600,50 C800,30 1000,70 1200,50 L1200,100 L0,100 Z" 
            className="fill-current"
          />
        </svg>
      </div>
    </section>
  );
}