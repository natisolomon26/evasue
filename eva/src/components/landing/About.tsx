"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Subtle parallax effects
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white to-sky-50/30"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-400/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-1/4 left-5 md:left-10">
        <motion.div
          className="w-3 h-3 bg-sky-400/40 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      
      <div className="absolute bottom-1/4 right-5 md:right-10">
        <motion.div
          className="w-3 h-3 bg-red-400/40 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-20">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 rounded-full">
              <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">
                About EvaSUE
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            <span className="text-sky-700">Transforming</span>{" "}
            <span className="text-red-600">Lives</span> Through{" "}
            <span className="text-sky-700">Faith</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            A community of students and graduates following Christ, 
            growing together, and serving as witnesses in Ethiopia.
          </motion.p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Card - Students */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <motion.div
                  style={{ y: leftY }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/about.png"
                    alt="EvaSUE Students Community"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sky-500 rounded-full" />
                      <span className="text-sm font-semibold text-sky-700">Students</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Students & <span className="text-red-600">Graduates</span>
                </h3>
                
                <div className="space-y-4 mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-semibold text-sky-700">Students</span> in EvaSUE are evangelical believers 
                    in educational institutions—passionate disciples growing in faith, leadership, and mission.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="font-semibold text-sky-700">Graduates</span> continue their fellowship as Associates, 
                    actively engaging in ministries and mentoring the next generation.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { value: "50,000+", label: "Students", color: "text-sky-600" },
                    { value: "150+", label: "Campuses", color: "text-red-600" },
                    { value: "50+", label: "Years", color: "text-sky-600" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/page/about/who-we-are"
                  className="group inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold"
                >
                  <span>Learn more about our community</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Card - Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-full bg-gradient-to-br from-sky-900 to-sky-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <motion.div
                  style={{ y: rightY }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/bg-5.jpg"
                    alt="Following and Witnessing Jesus Christ"
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-white">Our Mission</span>
                    </div>
                  </div>
                </div>
                
                {/* Cross Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-4xl text-white/30"
                  >
                    ✝
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Follow & <span className="text-red-300">Witness</span> Christ
                </h3>
                
                <div className="space-y-4 mb-6">
                  <p className="text-sky-100 leading-relaxed">
                    Jesus Christ is our Savior and Lord—transforming our lives to reflect His image. 
                    Following Him means renewing our minds and living for His purpose.
                  </p>
                  <p className="text-sky-100 leading-relaxed">
                    A true encounter with Jesus leads to witness—sharing the gospel in word and action, 
                    showing love, and serving others through the Holy Spirit.
                  </p>
                </div>

                {/* Mission Steps */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: "🙏", text: "Follow Christ" },
                    { icon: "📖", text: "Grow in Faith" },
                    { icon: "🤝", text: "Serve Others" },
                    { icon: "📣", text: "Share Gospel" }
                  ].map((step, index) => (
                    <motion.div
                      key={step.text}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                    >
                      <span className="text-xl">{step.icon}</span>
                      <span className="text-sm text-white font-medium">{step.text}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/page/about/believe"
                  className="group inline-flex items-center gap-2 text-white hover:text-sky-100 font-semibold"
                >
                  <span>Explore our faith journey</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        
      </div>
    </section>
  );
}