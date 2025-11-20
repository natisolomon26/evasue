"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left Form */}
      <div className="flex flex-col justify-center px-10 md:px-20">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Login to continue your journey ✨</p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between text-sm">
            <Link href="#" className="text-blue-600 hover:underline">Forgot password?</Link>
            <Link href="/signup" className="text-blue-600 hover:underline">Create an account</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right Image */}
      <div className="relative hidden md:block">
        <Image
          src="/images/small.JPG"
          alt="Login Background"
          fill
          className="object-cover"
        />

        {/* Color Overlay */}
        <div 
          
          className="absolute inset-0 bg-gradient-to-b from-sky-800/70 to-sky-900"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-10 left-10 text-white max-w-sm"
        >
          <h2 className="text-3xl font-bold">Grow in Faith & Purpose</h2>
          <p className="mt-2 text-lg text-white/90">
            Join a community that guides you spiritually and academically.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
