"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SmallGroup() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/bg1.jpg"
            alt="Small Group Ministry"
            fill
            className="object-cover"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Small Group Ministry Training
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            We train leaders to launch and shepherd small groups — life-giving spaces
            for discipleship, prayer, accountability, and authentic fellowship among students.
            These small communities cultivate spiritual growth and strengthen campus ministry impact.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2" />
              <p className="text-gray-700">Equipping student leaders for Christ-centered influence</p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600 mt-2" />
              <p className="text-gray-700">Teaching how to lead small groups with care and purpose</p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 mt-2" />
              <p className="text-gray-700">Building a culture of discipleship and fellowship</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
