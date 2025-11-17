"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CoreValue {
  title: string;
  description: string;
  image: string;
  overlayColor: string; // e.g., "from-sky-900/90 via-sky-800/70 to-sky-700/50"
}

export default function CoreValuesSection() {
  const coreValues: CoreValue[] = [
    {
      title: "We believe in the centrality of the Word of God",
      description:
        "We affirm Scripture as the revelation of God’s person and will, culminating in Jesus Christ. The Bible is our foundation for life and transformation.",
      image: "/images/bg1.jpg",
      overlayColor: "from-sky-900/90 via-sky-800/70 to-sky-700/50",
    },
    {
      title: "We are student focused",
      description:
        "EvaSUE exists for students. Our mission is to serve them so they can advance God’s Kingdom in their campuses and beyond.",
      image: "/images/bg2.JPG",
      overlayColor: "from-green-900/90 via-green-800/70 to-green-700/50",
    },
    {
      title: "Our fellowship transcends differences",
      description:
        "We believe Christ unites us across denomination, ethnicity, language, and economy. In Him, we are one body.",
      image: "/images/bg3.JPG",
      overlayColor: "from-red-900/90 via-red-800/70 to-red-700/50",
    },
  ];

  return (
    <section className="py-20 bg-gray-100 overflow-hidden relative">
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-24 h-24 bg-sky-400/10 rounded-full blur-2xl"
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
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-red-400/10 rounded-full blur-2xl"
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
        {/* Section Header */}
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
                Our Values
              </span>
            </div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight"
            >
              Our Core Values
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-slate-600 mt-4 max-w-3xl mx-auto text-lg leading-relaxed"
            >
              Guiding principles that define who we are and how we serve.
            </motion.p>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Background Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Instant overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"></div>
              
              {/* Content overlay — appears instantly on hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut" 
                }}
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.overlayColor} z-20 flex flex-col justify-center items-center text-center p-6`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {card.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md">
                  {card.description}
                </p>
              </motion.div>

              {/* Always-visible subtle badge (optional) */}
              <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium opacity-80">
                {card.title.split(' ').slice(0, 2).join(' ')}...
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}