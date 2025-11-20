"use client";

import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE – FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create an Account
          </h1>
          <p className="text-gray-600 mb-8">
            Join us and start your journey today.
          </p>

          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Create a password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Confirm your password"
              />
            </div>

            {/* Submit button */}
            <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all">
              Sign Up
            </button>
          </form>

          {/* EXTRA LINKS */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – IMAGE */}
      <div className="hidden md:block relative w-1/2">
        <Image
          src="/images/bg1.jpg"
          alt="Signup Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-800/70 to-sky-900"></div>

        {/* Text Overlay */}
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold drop-shadow-lg">Join the Community</h2>
          <p className="mt-2 text-lg max-w-sm drop-shadow">
            Start your discipleship journey and grow spiritually with us.
          </p>
        </div>
      </div>
    </div>
  );
}
