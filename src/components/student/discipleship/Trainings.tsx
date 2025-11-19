"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Trainings() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Soft Background Light Effect */}
      <div className="absolute -top-20 left-10 w-72 h-72 bg-sky-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
            Trainings
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center mt-4 leading-relaxed">
            We prepare students for campus life and beyond through impactful
            trainings on spiritual formation, academic excellence, and practical
            life skills.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Training Topic Cards */}
          {[
            {
              title: "Spiritual Growth",
              desc: "Grow deeply in prayer, Scripture, and personal devotion.",
              color: "from-sky-400/20 to-sky-600/40",
              img: "/images/bg1.jpg",
            },
            {
              title: "Academic Integrity",
              desc: "Develop discipline, focus, and godly academic habits.",
              color: "from-emerald-400/20 to-emerald-600/40",
              img: "/images/bg2.JPG",
            },
            {
              title: "Life & Leadership Skills",
              desc: "Learn communication, teamwork, and practical leadership.",
              color: "from-purple-400/20 to-purple-600/40",
              img: "/images/bg3.JPG",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="relative group rounded-3xl overflow-hidden shadow-xl"
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

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-95 transition-all duration-700`}
              />

              {/* Glass Content Box */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-20 p-8 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-gray-200 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
