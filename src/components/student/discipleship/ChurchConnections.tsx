"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Church, HeartHandshake, Users } from "lucide-react";

export default function ChurchConnections() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Parallax effect for background elements
  const shapesY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const connectionItems = [
    {
      title: "Church Engagement",
      desc: "We encourage students to be rooted in worship, fellowship, and service within their home churches — not as visitors, but as vital members of God’s family.",
      icon: <Church className="w-10 h-10 text-amber-500" />,
      img: "/images/bg4.JPG",
      color: "from-amber-600 to-amber-700/40",
      accent: "text-yellow-500"
    },
    {
      title: "Mentorship & Care",
      desc: "Students receive pastoral guidance, accountability, and spiritual nurture from church leaders who walk with them through doubt, triumph, and calling.",
      icon: <HeartHandshake className="w-10 h-10 text-red-600" />,
      img: "/images/bg3.JPG",
      color: "from-red-600 to-red-700/40",
      accent: "text-red-500"
    },
    {
      title: "Community Life",
      desc: "We help students build strong, lifelong relationships with believers who pray for them, celebrate with them, and stand beside them in faith — beyond graduation.",
      icon: <Users className="w-10 h-10 text-white" />,
      img: "/images/bg2.JPG",
      color: "from-blue-600/30 to-blue-700/40",
      accent: "text-blue-200"
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
    >
      {/* Floating Ambient Lights — Animated */}
      <motion.div 
        className="absolute -top-32 left-10 w-72 h-72 bg-purple-900/30 rounded-full blur-3xl"
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
        className="absolute bottom-0 right-0 w-80 h-80 bg-green-600/50 rounded-full blur-3xl"
        animate={{
          y: [15, -15, 15],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Floating spiritual particles */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-600 rounded-full"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-green-600 rounded-full"
        animate={{
          y: [8, -8, 8],
          opacity: [0.2, 0.7, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300/90 rounded-full"
        animate={{
          y: [-5, 5, -5],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full shadow-lg mb-8"
          >
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Kingdom Connection
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-bold text-slate-900 drop-shadow-lg leading-tight"
          >
            Local <span className="text-sky-600">Church Connections</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-slate-600 text-lg max-w-4xl mx-auto mt-6 leading-relaxed"
          >
            We strengthen the spiritual journey of students by connecting them deeply to their local churches — both during their campus years and long after graduation, because the church is not a stepping stone… it’s the destination.
          </motion.p>
        </motion.div>

        {/* Cards Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {connectionItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay Gradient — reveals on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/90 via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content Overlay — slides up on hover */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0"
              >
                {/* Icon Container */}
                <div className="bg-sky-900/70 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border border-sky-900/10 mb-5">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold text-white drop-shadow-lg mb-3 ${item.accent}`}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/90 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>

                {/* Decorative underline */}
                <div className="mt-6 w-16 h-px bg-gradient-to-r from-amber-400 to-transparent opacity-50"></div>
              </motion.div>

              {/* Floating Badge — always visible */}
              <div className="absolute top-4 left-4 bg-red-700 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-100 border border-white/30">
                Church Connection
              </div>

              {/* Glowing Border on Hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-white/30 shadow-lg"></div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
}