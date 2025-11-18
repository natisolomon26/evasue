"use client";
import { motion } from "framer-motion";
import { BookOpen, Target, Sparkles } from "lucide-react";
import Image from "next/image";

export default function BuildSkill() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      
      {/* floating shapes */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-sky-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-300/20 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* IMAGE BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-3xl shadow-xl overflow-hidden border border-slate-200"
          >
            <Image 
  src="/images/bg4.JPG" 
  alt="background"
  width={1920}
  height={1080}
  className="w-full h-full object-cover"
/>

          </motion.div>
        </motion.div>

        {/* CONTENT BLOCK */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-6 leading-tight">
            Build Skills Through Growth
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            We challenge leaders to grow through reading, discussion, 
            and taking on new responsibilities — building wisdom, vision, 
            and resilience for lifelong ministry and service.
          </p>

          {/* ICON POINTS */}
          <div className="space-y-5">
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-sky-100 text-sky-600">
                <BookOpen size={22} />
              </div>
              <p className="text-slate-700 text-base">
                Deepen understanding through curated Scripture-centered learning.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <Target size={22} />
              </div>
              <p className="text-slate-700 text-base">
                Shape character through guided reflection and practiced leadership.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <Sparkles size={22} />
              </div>
              <p className="text-slate-700 text-base">
                Grow in confidence by taking on meaningful campus ministry roles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
