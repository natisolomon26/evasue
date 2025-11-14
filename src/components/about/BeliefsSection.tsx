"use client";

import { motion } from "framer-motion";

const beliefs = [
  "We believe in the Triune God—God the Father, God the Son, and God the Holy Spirit—one God in three persons.",
  "We believe God is the final authority over all creation, salvation of mankind, and the coming final judgment.",
  "We believe Scripture is God-breathed and written through the divine leading of the Holy Spirit. It gives the final authority pertaining to all Christian faith and life matters.",
  "We believe, since Adam, all humankind has sinned and therefore falls under God’s judgment.",
  "We believe salvation from sin is only obtained through faith in Jesus Christ, who atoned for our sin through His substitutionary death on the cross.",
  "We believe in the resurrection and bodily ascension of Jesus Christ, who is now at the right hand of God the Father.",
  "We believe in the Church of Christ, His body, in which true believers are members.",
  "We believe it is the Holy Spirit who convicts, leads to repentance, and regenerates sinners into a new life. He also empowers believers to carry out God’s mission.",
  "We believe that righteousness is obtained through the grace that comes only from faith in Jesus Christ.",
  "We believe the Holy Spirit dwells in believers' lives and effects the work of salvation.",
  "We believe in the resurrection of the dead, the judgment of the world, and the existence of eternal life.",
  "We believe in the bodily, second coming of Jesus Christ."
];

export default function BeliefsSection() {
  return (
    <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16 max-w-7xl">
      {/* Section Title (Centered on Mobile) */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-sky-900 text-center mb-12 md:mb-16"
      >
        Our Core Beliefs
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {beliefs.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.08,
              ease: "easeOut"
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative p-5 md:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg
                       hover:shadow-xl transition-all duration-500 border-l-4
                       border-sky-500 group hover:scale-[1.02] hover:shadow-sky-200/60 overflow-hidden"
          >
            {/* Animated background element — only on tablet+ */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-400/10 to-transparent rounded-full -translate-y-12 translate-x-12 hidden md:block"></div>
            
            <div className="relative z-10 flex items-start gap-3 md:gap-4">
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.08 + 0.2,
                  type: "spring",
                  stiffness: 300
                }}
                className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-sky-600 to-sky-700 
                         text-white rounded-full flex items-center justify-center text-sm md:text-base 
                         font-bold shadow-lg mt-0.5"
              >
                {index + 1}
              </motion.span>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
                className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300 flex-1 text-sm md:text-base"
              >
                {text}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}