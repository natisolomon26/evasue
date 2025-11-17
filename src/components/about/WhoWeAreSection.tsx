"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhoWeAreSection() {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Decorative floating elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-24 h-24 bg-sky-400/20 rounded-full blur-3xl"
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
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-red-400/20 rounded-full blur-3xl"
        animate={{
          y: [20, -20, 20],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="flex flex-col lg:flex-row h-auto lg:h-[650px]">
        {/* LEFT SIDE — Who We Are */}
        <div className="lg:w-1/2 h-[400px] lg:h-full relative flex items-center">
          {/* Background Image */}
          <Image
            src="/images/about.png"
            alt="Abstract background"
            fill
            className="object-cover"
          />

          {/* Sky gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200/60 to-sky-200/80" />

          {/* LEFT CONTENT */}
          <div className="relative z-10 p-8 md:p-10 text-sky-700 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sky-200 mb-6">
                <span className="h-2 w-2 bg-sky-600 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                  Our Identity
                </span>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-3xl md:text-4xl font-bold mb-6 text-sky-800"
              >
                Who <span className="text-red-600">We Are</span>
              </motion.h2>

              <div className="space-y-4">
                {[
                  "We are a Fellowship of Students and Graduates who are dedicated to Follow and Witness Jesus Christ as Lord and Savior. We have fellowship with each other since we have “fellowship with the Father and His Son Jesus Christ”, both individually and communally.",
                  "Our individual fellowship with Christ, which has begun with our faith in Jesus Christ as our Lord and Savior, has made us part and parcel of the universal, time-transcending Christ-community, bound to the Triune God in communion.",
                  "The universal fellowship is demonstrated through the local as well as time bounded fellowships. In this regard, our fellowship is established by a historic reality of our individual involvement in schools and colleges as evangelical students.",
                  "EvaSUE had its beginning in 1963 as a small group of students who were dedicated to Bible study, prayer, fellowship with each other, sharing their faith with their friends, and worshiping God at Addis Ababa University. Currently, it comprises students’ and graduates’ fellowships in Ethiopia and abroad."
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-sky-900 leading-relaxed text-justify"
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE — Students & Graduates */}
        <div className="lg:w-1/2 px-8 py-12 md:px-12 md:py-16 bg-gradient-to-br from-sky-900 via-sky-800 to-sky-700 text-white flex items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 max-w-xl text-white/90 leading-relaxed"
          >
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3"
              >
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                Students
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                “Students” in EvaSUE refers to evangelical students in Secondary
                Education Institutes (High Schools) and Tertiary Education
                Institutes (Colleges and Universities), whether private or
                government-owned.
              </motion.p>
            </div>

            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3"
              >
                <span className="w-3 h-3 bg-sky-400 rounded-full"></span>
                Graduates
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                “Graduates” in EvaSUE refers to former university students who were
                part of students’ fellowships during their studies. This fellowship 
                continues beyond graduation and throughout their lifetime.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                The fellowship is also open to graduates who came to Christ after 
                completing their education. Graduates actively involved in ministry 
                are considered Associates of EvaSUE.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}