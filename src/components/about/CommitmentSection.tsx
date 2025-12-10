"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Cross, BookOpen, Globe2, Shield, ArrowRight, Sparkles } from "lucide-react";

export default function CommitmentSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  // Parallax and scale effects
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const commitments = [
    {
      title: "Evangelism",
      icon: Cross,
      description: "Reaching campus students with the gospel, the saving message of Jesus Christ.",
      extendedDescription: "We actively share the good news of Jesus Christ on campuses, inviting students into a transformative relationship with God through intentional outreach, personal testimonies, and campus-wide evangelistic events.",
      color: "sky",
      gradient: "from-sky-500 via-sky-400 to-sky-600",
      lightColor: "from-sky-500/20 to-sky-600/20",
      stats: { value: "500+", label: "Outreach Events" },
    },
    {
      title: "Discipleship",
      icon: BookOpen,
      description: "Helping Christian students grow into Christ-likeness through the Word.",
      extendedDescription: "Through small group Bible studies, mentorship programs, and spiritual formation workshops, we nurture students to develop deep roots in faith and mature into committed followers of Christ.",
      color: "emerald",
      gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
      lightColor: "from-emerald-500/20 to-emerald-600/20",
      stats: { value: "100+", label: "Bible Studies" },
    },
    {
      title: "Mission",
      icon: Globe2,
      description: "Equipping students to join the global mission of the Church.",
      extendedDescription: "We prepare students for global impact through mission training, cross-cultural experiences, and partnerships with international ministries, empowering them to be Christ's witnesses to the ends of the earth.",
      color: "purple",
      gradient: "from-purple-500 via-purple-400 to-purple-600",
      lightColor: "from-purple-500/20 to-purple-600/20",
      stats: { value: "25+", label: "Nations Reached" },
    },
    {
      title: "Leadership",
      icon: Shield,
      description: "Training students to lead with Biblical values in church and society.",
      extendedDescription: "Developing servant leaders through leadership training, character development programs, and practical ministry opportunities that prepare students to influence their spheres with godly wisdom and integrity.",
      color: "amber",
      gradient: "from-amber-500 via-amber-400 to-amber-600",
      lightColor: "from-amber-500/20 to-amber-600/20",
      stats: { value: "300+", label: "Leaders Trained" },
    },
  ];

  const getColorClass = (color: string, type: string) => {
    const classes = {
      sky: {
        text: "text-sky-600",
        hover: "text-sky-700",
        bg: "bg-sky-500",
        light: "bg-sky-500/10",
        border: "border-sky-500/20",
      },
      emerald: {
        text: "text-emerald-600",
        hover: "text-emerald-700",
        bg: "bg-emerald-500",
        light: "bg-emerald-500/10",
        border: "border-emerald-500/20",
      },
      purple: {
        text: "text-purple-600",
        hover: "text-purple-700",
        bg: "bg-purple-500",
        light: "bg-purple-500/10",
        border: "border-purple-500/20",
      },
      amber: {
        text: "text-amber-600",
        hover: "text-amber-700",
        bg: "bg-amber-500",
        light: "bg-amber-500/10",
        border: "border-amber-500/20",
      },
    };
    return classes[color as keyof typeof classes][type as keyof (typeof classes)[keyof typeof classes]];
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-24 md:py-32"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-sky-400/5 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            y: [-50, 50, -50],
            x: [-30, 30, -30],
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
            y: [50, -50, 50],
            x: [30, -30, 30],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating geometric shapes */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm"
            style={{
              width: `${40 + i * 15}px`,
              height: `${40 + i * 15}px`,
              left: `${5 + i * 18}%`,
              top: `${15 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 25 : -25, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          style={{ y: headerY }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-red-500 rounded-full blur-lg opacity-30 animate-pulse" />
              <div className="relative px-6 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-white/50">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">
                    Our Foundational Pillars
                  </span>
                  <Sparkles className="w-3 h-3 text-red-500" />
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
              Our Core
            </span>
            {" "}
            <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Commitments
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
            Four foundational pillars that shape our ministry, transform campuses, 
            and empower the next generation of Christian leaders.
          </motion.p>

          {/* Decorative Line with Animation */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-1 bg-gradient-to-r from-sky-400 to-red-500 rounded-full mx-auto mt-8"
          />
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = getColorClass(item.color, "text");
            const hoverColorClasses = getColorClass(item.color, "hover");
            const bgColorClasses = getColorClass(item.color, "bg");
            const lightColorClasses = getColorClass(item.color, "light");
            const borderColorClasses = getColorClass(item.color, "border");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                {/* Main Card */}
                <motion.div
                  style={{ scale: cardScale }}
                  animate={{
                    y: hoveredIndex === index ? -15 : 0,
                    scale: hoveredIndex === index ? 1.05 : 1,
                    rotateY: hoveredIndex === index ? 5 : 0,
                    rotateX: hoveredIndex === index ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative h-full bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl overflow-hidden group cursor-pointer"
                  style={{
                    boxShadow: "0 10px 40px rgba(14, 165, 233, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.lightColor} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Floating Particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[1, 2, 3, 4].map((particle) => (
                      <motion.div
                        key={particle}
                        className="absolute w-1 h-1 rounded-full bg-current"
                        style={{
                          left: `${20 + particle * 15}%`,
                          top: `${30 + particle * 10}%`,
                          color: bgColorClasses,
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
                  <div className="relative p-6 md:p-8">
                    {/* Icon with 3D Effect */}
                    <motion.div
                      animate={{
                        rotateY: hoveredIndex === index ? 360 : 0,
                        scale: hoveredIndex === index ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative w-20 h-20 mx-auto mb-6"
                    >
                      {/* Icon Background Glow */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl ${bgColorClasses} opacity-0 group-hover:opacity-20 blur-xl`}
                        animate={{ scale: hoveredIndex === index ? 1.5 : 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Icon Container */}
                      <div className={`relative w-full h-full rounded-2xl ${lightColorClasses} border ${borderColorClasses} flex items-center justify-center shadow-lg`}>
                        <Icon className={`w-10 h-10 ${colorClasses}`} />
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-current rounded-tl-lg opacity-30" style={{ color: bgColorClasses }} />
                      <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-current rounded-tr-lg opacity-30" style={{ color: bgColorClasses }} />
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-current rounded-bl-lg opacity-30" style={{ color: bgColorClasses }} />
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-current rounded-br-lg opacity-30" style={{ color: bgColorClasses }} />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      animate={{
                        x: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`text-xl md:text-2xl font-bold text-center mb-4 ${colorClasses}`}
                    >
                      {item.title}
                    </motion.h3>

                    {/* Short Description */}
                    <motion.p
                      animate={{
                        height: hoveredIndex === index ? "auto" : "3.6rem",
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-600 text-center mb-6 overflow-hidden"
                    >
                      {item.description}
                    </motion.p>

                    {/* Stats Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mx-auto bg-gradient-to-r from-white to-gray-50 border border-gray-200"
                    >
                      <div className={`w-2 h-2 rounded-full ${bgColorClasses}`} />
                      <span className="text-xs font-semibold text-gray-700">
                        {item.stats.value} {item.stats.label}
                      </span>
                    </motion.div>

                    {/* Hover Content */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="mt-6 pt-6 border-t border-gray-100"
                        >
                          <p className="text-sm text-gray-500 mb-4">
                            {item.extendedDescription}
                          </p>
                          <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <span>Learn more</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Progress Indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    >
                      <motion.div
                        className={`h-full ${bgColorClasses}`}
                        animate={{
                          x: hoveredIndex === index ? ["0%", "100%", "0%"] : "0%",
                        }}
                        transition={{
                          duration: 2,
                          repeat: hoveredIndex === index ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Connecting Lines (Desktop Only) */}
                {index < commitments.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}