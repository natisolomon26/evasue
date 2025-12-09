// components/SubscribeCTA.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SubscribeCTA() {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState<string[]>(["newsletter"]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, categories }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Subscribed successfully! 🎉" });
        setEmail("");
        setCategories(["newsletter"]);
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 md:py-20 overflow-hidden text-white">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-800 backdrop-blur-[2px]" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-10 md:gap-16">
        {/* Left: Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-shrink-0 flex justify-center md:justify-start"
        >
          <Image
            src="/EvaSUELogo.png"
            alt="EvaSUE Logo"
            width={150}
            height={150}
            className="object-contain drop-shadow-2xl brightness-125 contrast-125"
          />
        </motion.div>

        {/* Right: Text + Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-5 max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Stay Updated with <span className="text-red-400">EvaSUE</span>
          </h2>

          <p className="text-white text-lg leading-relaxed text-justify">
            Subscribe to our newsletter, promotions, and events to stay connected with our community.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-center gap-3 mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full md:flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </form>

          {/* Category Selection */}
          <div className="flex flex-wrap gap-2 mt-3">
            {["newsletter", "event", "promotion"].map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  categories.includes(cat)
                    ? "bg-white text-blue-600"
                    : "bg-white/30 text-white hover:bg-white/50"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Feedback Message */}
          {message && (
            <p
              className={`mt-2 text-center ${
                message.type === "success" ? "text-green-200" : "text-red-200"
              }`}
            >
              {message.text}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
