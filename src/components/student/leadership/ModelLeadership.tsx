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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const timelineItems = [
    {
      title: "Serving Beside Students",
      description:
        "Staff workers demonstrate leadership through service, walking alongside students in day-to-day ministry. showing that true leadership is found in humble service.",
      icon: <Footprints className="w-7 h-7 text-white/80" />,
      color: "from-green-500 to-green-600",
      position: "right" as const,
    },
    {
      title: "Guiding With Wisdom",
      description:
        "Leaders model how to prayerfully navigate challenges, decisions, and ministry opportunities with biblical wisdom. leading with both heart and mind.",
      icon: <Compass className="w-7 h-7 text-white/90" />,
      color: "from-red-500 to-red-600",
      position: "left" as const,
    },
    {
      title: "Teaching Servant Leadership",
      description:
        "Students observe true leadership in action service, humility, integrity, and Christlike compassion. learning that leadership is about lifting others.",
      icon: <Flame className="w-7 h-7 text-white/80" />,
      color: "from-yellow-500 to-yellow-600",
      position: "right" as const,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-sky-50 overflow-hidden"
    >
      {/* Floating Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-yellow-100/80 rounded-full blur-3xl"
          animate={{ y: [-10, 10, -10], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-20 w-56 h-56 bg-orange-400/30 rounded-full blur-2xl"
          animate={{ y: [15, -15, 15], scale: [1, 1.1, 1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Extra floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-12 h-12 bg-sky-600/40 rounded-full blur-xl"
        animate={{ y: [-15, 15, -15], scale: [1, 1.1, 1] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-green-400/50 rounded-full blur-xl"
        animate={{ y: [10, -10, 10], scale: [1, 1.05, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-sky-200/50 rounded-full text-sky-800 shadow-lg"
          >
            <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Leadership in Service
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-sky-900 mt-6 leading-tight"
          >
            Model Leadership in{" "}
            <span className="text-blue-600">Service</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-gray-700 max-w-3xl mx-auto mt-6 text-lg leading-relaxed text-left"
          >
            Our Campus Staff Workers walk alongside student leaders,
            modeling Christ-like service and leadership in real campus
            ministry contexts demonstrating that true leadership is found
            in humble service to others.
          </motion.p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400/40 via-blue-500/50 to-sky-400/40 rounded-full shadow-lg" />

          {/* Items */}
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: item.position === "right" ? 50 : -50,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
              viewport={{ once: true }}
              className={`relative mb-24 flex flex-col md:flex-row ${
                item.position === "right"
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              } items-center gap-8`}
            >
              {/* Card */}
              <div className="w-full md:w-5/12 text-center md:text-left">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-7 border border-slate-200/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 -z-10`}
                  ></div>

                  <h4 className="text-xl font-bold text-sky-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-left">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Center Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                className="md:absolute md:left-1/2 md:-translate-x-1/2 w-16 h-16 bg-white shadow-2xl border border-slate-200 rounded-full flex items-center justify-center z-10"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {item.icon}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Meet Our Staff
            </span>

            <span className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
