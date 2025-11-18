"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpenCheck, Users, Sparkles } from "lucide-react";

export default function StudentLeadership() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const features = [
    {
      title: "Biblical Leadership Foundations",
      description: "Leadership grounded in Scripture, Christlikeness, and God’s mission.",
      icon: <BookOpenCheck className="text-blue-700 w-6 h-6" />,
      color: "bg-blue-600/10 text-blue-700",
      gradient: "from-blue-500/10 to-blue-600/20",
    },
    {
      title: "Character & Spiritual Formation",
      description: "We cultivate humility, integrity, and a lifestyle of prayer & service.",
      icon: <Users className="text-sky-700 w-6 h-6" />,
      color: "bg-sky-600/10 text-sky-700",
      gradient: "from-sky-500/10 to-sky-600/20",
    },
    {
      title: "Practical Ministry Skills",
      description: "Teaching students how to lead small groups, pray, disciple peers, plan ministries, and serve on campus.",
      icon: <Sparkles className="text-green-700 w-6 h-6" />,
      color: "bg-green-600/10 text-green-700",
      gradient: "from-green-500/10 to-green-600/20",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-white via-sky-50 to-blue-100/40 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl"
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
        className="absolute bottom-1/4 right-10 w-28 h-28 bg-green-400/10 rounded-full blur-2xl"
        animate={{
          y: [20, -20, 20],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm border border-sky-200/50 shadow-lg text-sky-800"
          >
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span className="font-semibold">Leadership Formation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-sky-900 mt-6 leading-tight"
          >
            Train <span className="text-blue-600">Student Leaders</span> Who Transform Campuses
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-700 text-lg max-w-3xl mx-auto mt-6 leading-relaxed"
          >
            We equip student leaders through biblical foundations, Christlike character, and practical ministry skills — empowering them to influence their campuses with wisdom, integrity, and the power of the Holy Spirit.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Card — Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-sky-100/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            
            {/* Main card */}
            <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/40 p-10 relative z-10 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-sky-900">
                  Our Leadership Commitment
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                We intentionally grow student leaders who influence their campuses with integrity, wisdom, and servant-hearted leadership—grounded in Scripture and empowered by the Holy Spirit.
              </p>

              <motion.div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Join Our Leadership Program</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Card — Bullet Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-lg`}></div>
                
                {/* Main card */}
                <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-7 border border-sky-100/50 flex gap-5 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-sky-900 group-hover:text-blue-700 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}