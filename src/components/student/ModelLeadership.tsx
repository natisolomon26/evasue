"use client";

import { motion } from "framer-motion";
import { Flame, Compass, Footprints, Star } from "lucide-react";

export default function ModelLeadership() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50 to-sky-100 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-20 w-56 h-56 bg-blue-300/30 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-white shadow-sm border border-sky-200 rounded-full text-sky-700">
            <Star className="w-4 h-4 text-yellow-500" />
            Leadership in Service
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mt-5">
            Model Leadership in Service
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Our Campus Staff Workers walk alongside student leaders, modeling 
            Christ-like service and leadership in real campus ministry contexts.
          </p>
        </motion.div>

        {/* Vertical Timeline Section */}
        <div className="relative max-w-3xl mx-auto">

          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-300 via-blue-400 to-sky-300 rounded-full" />

          {/* ITEM 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative mb-20 flex items-center gap-8"
          >
            <div className="w-1/2 text-right">
              <h4 className="text-xl font-bold text-sky-900">Serving Beside Students</h4>
              <p className="text-gray-600 mt-2">
                Staff workers demonstrate leadership through service, walking 
                alongside students in day-to-day ministry.
              </p>
            </div>

            {/* Icon at center line */}
            <div className="absolute left-1/2 -translate-x-1/2 bg-white shadow-lg border border-sky-200 w-14 h-14 rounded-full flex items-center justify-center">
              <Footprints className="w-7 h-7 text-sky-700" />
            </div>
          </motion.div>

          {/* ITEM 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative mb-20 flex items-center gap-8"
          >
            {/* Icon */}
            <div className="absolute left-1/2 -translate-x-1/2 bg-white shadow-lg border border-blue-200 w-14 h-14 rounded-full flex items-center justify-center">
              <Compass className="w-7 h-7 text-blue-700" />
            </div>

            <div className="w-1/2 ml-auto">
              <h4 className="text-xl font-bold text-sky-900">Guiding With Wisdom</h4>
              <p className="text-gray-600 mt-2">
                Leaders model how to prayerfully navigate challenges, decisions, 
                and ministry opportunities with biblical wisdom.
              </p>
            </div>
          </motion.div>

          {/* ITEM 3 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative mb-20 flex items-center gap-8"
          >
            <div className="w-1/2 text-right">
              <h4 className="text-xl font-bold text-sky-900">Teaching Servant Leadership</h4>
              <p className="text-gray-600 mt-2">
                Students observe true leadership in action — service, humility, 
                integrity, and Christlike compassion.
              </p>
            </div>

            {/* Icon */}
            <div className="absolute left-1/2 -translate-x-1/2 bg-white shadow-lg border border-sky-200 w-14 h-14 rounded-full flex items-center justify-center">
              <Flame className="w-7 h-7 text-orange-600" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
