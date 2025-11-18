"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpenCheck, Users, Sparkles } from "lucide-react";

export default function StudentLeadership() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-sky-50 to-blue-100/40">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white shadow-sm border border-sky-200 text-sky-700 inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Leadership Formation
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mt-6">
            Train <span className="text-blue-600">Student Leaders</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
            We equip student leaders through biblical leadership foundations, 
            character development, and practical ministry skills for effective service on campus.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left Card — Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl border border-white/40 p-10"
          >
            <h3 className="text-2xl font-semibold text-sky-900 mb-6 flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-blue-600" />
              Our Leadership Commitment
            </h3>

            <p className="text-gray-700 leading-relaxed text-lg">
              We intentionally grow student leaders who influence their campuses 
              with integrity, wisdom, and servant-hearted leadership—grounded in 
              Scripture and empowered by the Holy Spirit.
            </p>
          </motion.div>

          {/* Right Card — Bullet Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Item 1 */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-7 border border-sky-100 flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                <BookOpenCheck className="text-blue-700 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-sky-900">
                  Biblical Leadership Foundations
                </h4>
                <p className="text-gray-600">
                  Leadership grounded in Scripture, Christlikeness, and God’s mission.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-7 border border-blue-100 flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-sky-600/10 flex items-center justify-center">
                <Users className="text-sky-700 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-sky-900">
                  Character & Spiritual Formation
                </h4>
                <p className="text-gray-600">
                  We cultivate humility, integrity, and a lifestyle of prayer & service.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-7 border border-blue-100 flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center">
                <Sparkles className="text-green-700 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-sky-900">
                  Practical Ministry Skills
                </h4>
                <p className="text-gray-600">
                  Teaching students how to lead small groups, pray, disciple peers, 
                  plan ministries, and serve on campus.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
