"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Users, HandHeart, Sparkles } from "lucide-react";

export default function ExistSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Create parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const items = [
    {
      title: "God’s Purpose is our Core Purpose",
      icon: Lightbulb,
      description:
        "We exist to advance the Kingdom of God by reaching and equipping students to influence their universities, the nation, and the world. “He set forth in Christ at the fullness of time to unite all things in Him.”",
      gradient: "from-sky-500/10 to-sky-600/20",
      iconColor: "text-sky-500",
      hoverColor: "text-sky-600"
    },
    {
      title: "Domain of our Core Purpose is: ‘Students’!",
      icon: Users,
      description:
        "Changing students means changing the world. We believe the time students spend in college lays the foundation for the next 40 years of their lives.",
      gradient: "from-emerald-500/10 to-emerald-600/20",
      iconColor: "text-emerald-500",
      hoverColor: "text-emerald-600"
    },
    {
      title: "Main Task of our Core Purpose is: ‘Serving’!",
      icon: HandHeart,
      description:
        "We serve with humility and love, following Christ’s example—looking not to self-interest, but to the interest of others.",
      gradient: "from-purple-500/10 to-purple-600/20",
      iconColor: "text-purple-500",
      hoverColor: "text-purple-600"
    },
    {
      title: "Expression of our Core Purpose is: ‘A Transformed Society’!",
      icon: Sparkles,
      description:
        "Our purpose is expressed through evangelism, discipleship, and leadership development—building a culture that reflects Kingdom values.",
      gradient: "from-amber-500/10 to-amber-600/20",
      iconColor: "text-amber-500",
      hoverColor: "text-amber-600"
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white via-sky-50/30 to-slate-100 overflow-hidden relative"
    >
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-sky-400/10 rounded-full blur-2xl"
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
        className="absolute bottom-20 right-10 w-28 h-28 bg-emerald-400/10 rounded-full blur-2xl"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-sky-200 mb-6">
              <span className="h-2 w-2 bg-sky-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                Our Purpose
              </span>
            </div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight"
            >
              Why <span className="text-sky-600">We Exist</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              The heartbeat of EvaSUE — our God-given purpose, domain, task, and expression.
            </motion.p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/50 
                          shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Animated gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10`}></div>
                
                {/* Floating icon */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-6"
                >
                  <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-lg ${item.iconColor}`}>
                    <IconComponent className={`w-8 h-8 ${item.iconColor}`} />
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm`}></div>
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`text-2xl font-bold text-slate-800 group-hover:${item.hoverColor} transition-all duration-300 leading-tight`}
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-slate-600 mt-4 leading-relaxed text-justify"
                >
                  {item.description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}