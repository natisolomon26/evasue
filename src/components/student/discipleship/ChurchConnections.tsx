"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Church, HeartHandshake, Users } from "lucide-react";

export default function ChurchConnections() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-100 overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute -top-32 left-10 w-72 h-72 bg-amber-300/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/20 blur-3xl rounded-full" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 drop-shadow-sm">
            Local Church Connections
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto mt-4 leading-relaxed">
            We strengthen the spiritual journey of students by connecting them 
            deeply to their local churches — both during their campus years 
            and long after graduation.
          </p>
        </motion.div>

        {/* Cards Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Church Engagement",
              desc: "We encourage students to be rooted in worship, fellowship, and service within their home churches.",
              icon: <Church className="w-10 h-10 text-amber-500" />,
              img: "/images/bg4.JPG",
            },
            {
              title: "Mentorship & Care",
              desc: "Students receive pastoral guidance, accountability, and spiritual nurture from church leaders.",
              icon: (
                <HeartHandshake className="w-10 h-10 text-red-500" />
              ),
              img: "/images/bg3.JPG",
            },
            {
              title: "Community Life",
              desc: "We help students build strong relationships with believers who walk alongside them in faith.",
              icon: <Users className="w-10 h-10 text-blue-600" />,
              img: "/images/bg2.JPG",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-xl group"
            >
              {/* Background */}
              <div className="absolute inset-0">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-800/90 to-sky-900/40 backdrop-blur-sm" />

              {/* Content */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 p-8"
              >
                <div className="bg-white/60 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center shadow-md border border-white/30">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mt-6 drop-shadow-sm">
                  {item.title}
                </h3>
                <p className="text-white mt-3 leading-relaxed">
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
