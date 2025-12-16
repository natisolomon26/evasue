"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Flame, Compass, Footprints, Star } from "lucide-react";

export default function ModelLeadership() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const timelineItems = [
    {
      title: "Serving Beside Students",
      description: "Demonstrating leadership through humble service alongside students.",
      icon: <Footprints className="w-5 h-5 text-white" />,
      color: "from-green-500 to-emerald-600",
      delay: 0.1,
    },
    {
      title: "Guiding With Wisdom",
      description: "Modeling prayerful navigation with biblical wisdom in decisions.",
      icon: <Compass className="w-5 h-5 text-white" />,
      color: "from-red-500 to-rose-600",
      delay: 0.2,
    },
    {
      title: "Teaching Servant Leadership",
      description: "Showing leadership through service, integrity, and Christlike compassion.",
      icon: <Flame className="w-5 h-5 text-white" />,
      color: "from-amber-500 to-orange-600",
      delay: 0.3,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50/50 overflow-hidden"
    >
      {/* Simplified floating elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 bg-amber-200/20 rounded-full blur-xl"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-full text-sky-800 shadow-sm mb-4"
          >
            <Star className="w-3 h-3 text-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Leadership Model
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-4">
            Model <span className="text-blue-600">Leadership</span> in Service
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Staff workers demonstrate Christ-like service alongside students, showing that true leadership is found in humble service.
          </p>
        </motion.div>

        {/* Horizontal Timeline - Compact Layout */}
        <div className="relative">
          {/* Horizontal Line (Mobile) */}
          <div className="block md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300/50 to-sky-300/50 ml-3.5" />
          
          {/* Items in Vertical Stack on Mobile, Horizontal on Desktop */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                {/* Mobile: Timeline Indicator */}
                <div className="md:hidden flex items-start mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: item.delay + 0.2 }}
                    className="relative z-10 w-8 h-8 bg-white border-2 border-sky-200 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}
                    >
                      {item.icon}
                    </div>
                  </motion.div>
                  
                  {/* Desktop: Icon on top */}
                  <div className="hidden md:block mb-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: item.delay }}
                      className="w-12 h-12 mx-auto bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg"
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ 
                    y: -4,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-5 border border-slate-100 hover:shadow-xl hover:border-sky-100 transition-all duration-300 h-full"
                >
                  <h3 className="font-bold text-sky-900 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Horizontal Line (Desktop) */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-sky-200/50 to-transparent -translate-y-1/2 -z-10" />
          
          {/* Connecting Dots (Desktop) */}
          <div className="hidden md:flex justify-between absolute left-0 right-0 top-1/2 -translate-y-1/2 -z-10 px-8">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: dot * 0.1 + 0.5 }}
                className="w-2 h-2 bg-sky-400 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Compact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Meet Our Staff
              <motion.svg
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
            
            {/* Button hover effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
              initial={false}
            />
          </motion.button>
          
          <p className="text-gray-500 text-xs mt-3">
            Learn from experienced campus ministry leaders
          </p>
        </motion.div>
      </div>
    </section>
  );
}