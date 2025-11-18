"use client";

import { motion } from "framer-motion";
import { HandHeart, Users2, Sparkles, HeartHandshake } from "lucide-react";

export default function MentorshipSection() {
  return (
    <section className="relative py-24 bg-gradient-to-tr from-blue-50 via-white to-sky-100 overflow-hidden">

      {/* Background floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-sky-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        
        {/* Left Side Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center justify-center"
        >
          <div className="relative">
            <div className="w-72 h-72 bg-gradient-to-br from-sky-200 to-blue-300 rounded-3xl shadow-2xl rotate-6" />
            <div className="absolute inset-0 w-72 h-72 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/40 -rotate-6 flex items-center justify-center">
              <HeartHandshake className="w-28 h-28 text-sky-700 opacity-90" />
            </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-2xl p-10 rounded-3xl shadow-xl border border-white/50"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-sky-200 text-sky-700 bg-white rounded-full shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Mentorship Ministry
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            Encourage <span className="text-blue-600">Mentorship</span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            We promote one-on-one and group mentorship — connecting emerging 
            leaders with mature believers who provide guidance, encouragement, 
            accountability, and spiritual support as students grow in their walk 
            with Christ.
          </p>

          {/* Mentorship Benefits */}
          <div className="mt-10 space-y-5">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-200/50 flex items-center justify-center shadow-sm">
                <Users2 className="w-7 h-7 text-sky-700" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-sky-900">One-on-One Mentorship</h4>
                <p className="text-gray-600">Personal discipleship that builds character and spiritual maturity.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-200/50 flex items-center justify-center shadow-sm">
                <HandHeart className="w-7 h-7 text-blue-700" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-sky-900">Group Mentoring</h4>
                <p className="text-gray-600">Creating communities where students grow together in wisdom and accountability.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-200/50 flex items-center justify-center shadow-sm">
                <Sparkles className="w-7 h-7 text-indigo-700" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-sky-900">Spiritual Accountability</h4>
                <p className="text-gray-600">Helping students grow consistently through truth, love, and encouragement.</p>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
