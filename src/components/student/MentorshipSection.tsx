"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HandHeart, Users2, Sparkles, HeartHandshake } from "lucide-react";

export default function MentorshipSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const shapeY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-tr from-slate-50 via-white to-sky-50 overflow-hidden"
    >
      {/* Background Parallax Shapes */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: shapeY }}>
        <motion.div 
          className="absolute top-10 md:top-16 left-6 md:left-12 w-24 h-24 md:w-40 md:h-40 bg-sky-200/30 rounded-full blur-3xl"
          animate={{ y: [-10, 10, -10], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 md:bottom-24 right-10 md:right-24 w-32 h-32 md:w-56 md:h-56 bg-indigo-200/25 rounded-full blur-3xl"
          animate={{ y: [15, -15, 15], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating Hearts */}
      <motion.div 
        className="absolute top-1/3 left-1/3 w-4 h-4 md:w-8 md:h-8 bg-pink-300/30 rounded-full blur-lg"
        animate={{ y: [-15, 15, -15], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-3 h-3 md:w-6 md:h-6 bg-red-300/30 rounded-full blur-lg"
        animate={{ y: [10, -10, 10], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* CONTENT GRID */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* LEFT ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center order-1 md:order-none"
        >
          <div className="relative group scale-90 sm:scale-100">
            <div className="w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-sky-100 to-blue-200 rounded-3xl shadow-2xl rotate-6 transition-transform duration-500 group-hover:rotate-12" />
            
            <div className="absolute inset-3 md:inset-4 w-52 h-52 md:w-64 md:h-64 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 -rotate-6 flex items-center justify-center shadow-xl transition-all duration-500">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <HeartHandshake className="w-16 h-16 md:w-24 md:h-24 text-sky-800 opacity-90 drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-[8px] md:text-xs font-bold text-white">
                  1:1
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-2xl p-6 md:p-10 rounded-3xl shadow-2xl border border-white/40 relative"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/90 rounded-full border border-sky-200/50 shadow-sm mb-4 md:mb-6">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
            <span className="text-[10px] md:text-xs font-semibold text-sky-700 uppercase tracking-wider">
              Mentorship Ministry
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-bold text-sky-900 mb-4">
            Encourage <span className="text-blue-600">Mentorship</span> —  
            <span className="block md:inline">Where Souls Are Shaped</span>
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            We cultivate intentional relationships — connecting emerging leaders
            with mature believers who provide guidance, encouragement, accountability,
            and spiritual wisdom as students grow in their walk with Christ.
          </p>

          {/* Benefits */}
          <div className="space-y-5 md:space-y-6">
            {[
              {
                icon: <Users2 className="w-6 h-6 md:w-7 md:h-7 text-sky-700" />,
                title: "One-on-One Mentorship",
                desc: "Personal discipleship that builds character and spiritual maturity."
              },
              {
                icon: <HandHeart className="w-6 h-6 md:w-7 md:h-7 text-blue-700" />,
                title: "Group Mentoring",
                desc: "Life-giving community where students grow together in wisdom."
              },
              {
                icon: <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-indigo-700" />,
                title: "Spiritual Accountability",
                desc: "Walking in truth with consistent encouragement and prayer."
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 md:gap-5 p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100/50 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center shadow-md">
                  {item.icon}
                </div>
                
                <div>
                  <h4 className="text-lg md:text-xl font-semibold text-sky-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
