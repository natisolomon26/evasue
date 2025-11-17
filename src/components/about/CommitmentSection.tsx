"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Modern, sleek icons from lucide-react (updated for minimalism)
import { Cross, BookOpen, Globe2, Shield } from "lucide-react";

export default function CommitmentSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const items = [
    {
      title: "Evangelism",
      icon: <Cross className="w-10 h-10" />,
      description:
        "Reaching campus students with the gospel, the saving message of Jesus Christ.",
      color: "from-sky-500 to-sky-600",
      iconColor: "text-sky-600",
      hoverColor: "text-sky-700",
    },
    {
      title: "Discipleship",
      icon: <BookOpen className="w-10 h-10" />,
      description:
        "Helping Christian students grow into Christ-likeness through the Word.",
      color: "from-emerald-500 to-emerald-600",
      iconColor: "text-emerald-600",
      hoverColor: "text-emerald-700",
    },
    {
      title: "Mission",
      icon: <Globe2 className="w-10 h-10" />,
      description:
        "Equipping students to join the global mission of the Church.",
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-600",
      hoverColor: "text-purple-700",
    },
    {
      title: "Leadership",
      icon: <Shield className="w-10 h-10" />,
      description:
        "Training students to lead with Biblical values in church and society.",
      color: "from-amber-500 to-amber-600",
      iconColor: "text-amber-600",
      hoverColor: "text-amber-700",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-20 h-20 bg-sky-400/10 rounded-full blur-2xl"
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
        className="absolute bottom-1/4 right-10 w-28 h-28 bg-emerald-400/10 rounded-full blur-2xl"
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

      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/50 mb-6 mx-auto">
              <span className="h-2 w-2 bg-sky-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Our Pillars
              </span>
            </div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight"
            >
              Our <span className="text-sky-600">Commitments</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              The four foundational pillars that shape our ministry, mission, and identity.
            </motion.p>
          </motion.div>
        </div>

        {/* 4 Cards in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative p-8 bg-white/80 backdrop-blur-sm border border-slate-200/40 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center hover:scale-[1.02]"
            >
              {/* Animated gradient background behind icon */}
              <div className={`absolute -top-4 -left-4 w-20 h-20 rounded-full ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
              
              {/* Icon container with hover glow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-slate-200/50"
              >
                <div className={`p-3 rounded-lg ${item.iconColor} group-hover:${item.hoverColor} transition-colors duration-300 shadow-sm`}>
                  {item.icon}
                </div>
                
                {/* Inner glow on hover */}
                <div className={`absolute inset-1 rounded-lg ${item.color} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`}></div>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`text-xl font-semibold text-slate-800 group-hover:${item.hoverColor} transition-colors duration-300`}
              >
                {item.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-slate-600 mt-4 leading-relaxed text-sm md:text-base"
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}