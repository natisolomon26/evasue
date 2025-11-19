"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

export default function BibleStudy() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-sky-50">
      
      {/* Background Floating Lights */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-sky-300/20 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-12 w-52 h-52 bg-indigo-300/20 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" mb-20 text-justify"
        >Bible Study

Knowing and obeying the Scriptures is core to discipleship. We support the spiritual growth of students by helping them develop a love for the Word of God through group Bible studies.
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 
            bg-white/70 backdrop-blur-md border border-sky-200/60 
            rounded-full text-sky-800 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Discipleship Ministry
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-sky-900 mt-6"
          >
            Bible Study for{" "}
            <span className="text-blue-600">Spiritual Growth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-700 max-w-3xl mx-auto mt-6 text-lg leading-relaxed text-justify"
          >
            Knowing and obeying the Scriptures is core to discipleship.
            We support students by helping them develop a deep love for the Word of God 
            through interactive, spirit-filled, community-centered Bible studies.
          </motion.p>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-4xl bg-white/80 backdrop-blur-xl 
          rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500" />

          {/* Glow behind icon */}
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 
            bg-blue-300/25 rounded-full blur-3xl"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Content */}
          <div className="relative px-10 py-14 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br 
              from-blue-500 to-sky-600 flex items-center justify-center shadow-xl">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-sky-900 mb-4">
              Bible Study
            </h3>

            <p className="text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto text-left">
              Through small-group discussions, inductive study methods, 
              and Spirit-led conversations, students learn how to interpret, 
              meditate on, and apply the Scriptures to life and ministry.
            </p>

            {/* Scripture highlight */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 p-6 bg-sky-50 border border-sky-200 rounded-2xl 
              shadow-inner"
            >
              <p className="text-sky-800 font-semibold text-lg italic leading-relaxed">
                “Your word is a lamp to my feet and a light to my path.”  
              </p>
              <p className="text-sky-600 mt-2 font-medium">— Psalm 119:105</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom glowing shape */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 
          bg-blue-200/20 rounded-full blur-3xl"
          animate={{ y: [0, -15, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
