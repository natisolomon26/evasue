"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Users, Sparkles, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (data.password.length >= 8) strength += 25;
    if (/[A-Z]/.test(data.password)) strength += 25;
    if (/[0-9]/.test(data.password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(data.password)) strength += 25;
    setPasswordStrength(strength);
  }, [data.password]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Fetch current user info
      const userRes = await fetch("/api/auth/me");
      const userJson = await userRes.json();

      const role = userJson.user?.role;

      // Redirect based on role
      if (role === "superadmin" || role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const getStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            y: [-50, 50, -50],
            x: [-30, 30, -30],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-sky-400/10 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            y: [50, -50, 50],
            x: [30, -30, 30],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-emerald-400/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, particle.id % 2 === 0 ? 10 : -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: particle.id * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main Signup Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30"
        style={{
          boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
          {/* Left Side - Signup Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/10 to-sky-500/10 rounded-full border border-sky-200"
                >
                  <Shield className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-semibold text-sky-700 uppercase tracking-wider">
                    Join Our Community
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-sky-600"
                >
                  Start Your{" "}
                  <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                    Journey
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 text-lg"
                >
                  Create your account and become part of the EvaSUE family
                </motion.p>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Signup Form */}
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      required
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Password Input with Strength Meter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {data.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-600">
                          Password strength
                        </span>
                        <span className={`text-xs font-bold ${getStrengthColor().replace('bg-', 'text-')}`}>
                          {getStrengthLabel()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${getStrengthColor()}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      
                      {/* Password Requirements */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {[
                          { label: "8+ characters", met: data.password.length >= 8 },
                          { label: "Uppercase letter", met: /[A-Z]/.test(data.password) },
                          { label: "Number", met: /[0-9]/.test(data.password) },
                          { label: "Special character", met: /[^A-Za-z0-9]/.test(data.password) },
                        ].map((req, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center gap-2"
                          >
                            {req.met ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-gray-300" />
                            )}
                            <span className={`text-xs ${req.met ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                              {req.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    I am signing up as:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "staff", label: "Staff Member", color: "bg-sky-100 text-sky-700 border-sky-200" },
                      { value: "student", label: "Student", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setData({ ...data, role: option.value })}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          data.role === option.value 
                            ? `${option.color} ring-2 ring-offset-2 ring-current/30` 
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-sm font-medium">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="/terms" className="text-sky-600 hover:text-sky-700 font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-sky-600 hover:text-sky-700 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Signup Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative w-full group overflow-hidden bg-gradient-to-r from-sky-600 to-sky-700 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-sky-700 to-sky-800"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "0%" : "-100%" }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Button content */}
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <motion.div
                          animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-sky-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="px-4 text-sm text-gray-500 bg-white">Or sign up with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Social Signup */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="p-3 border border-gray-200 rounded-xl hover:border-sky-300 hover:bg-sky-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                  </button>
                  <button
                    type="button"
                    className="p-3 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#34A853" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V9h2c1.1 0 2-.9 2-2v-.36c2.93 1.19 5 4.06 5 7.36 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Google</span>
                  </button>
                </div>
              </motion.form>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-6 border-t border-gray-100"
              >
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-bold text-sky-600 hover:text-sky-500 transition-colors group inline-flex items-center gap-1"
                  >
                    <span>Sign in here</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Welcome Panel */}
          <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_50%,transparent_52%)] bg-[size:20px_20px]" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-12 text-white">
              <div className="space-y-8">
                {/* Logo/Brand */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">EvaSUE</h2>
                    <p className="text-sm text-sky-300">Ethiopian Students' Union</p>
                  </div>
                </div>

                {/* Welcome Message */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Welcome!</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold">
                    Join a Community of{" "}
                    <span className="text-sky-300">Faith & Impact</span>
                  </h3>
                  
                  <p className="text-emerald-100 leading-relaxed">
                    Create your account to access exclusive resources, connect with 
                    fellow believers, and participate in campus transformation initiatives.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-4">
                  {[
                    { icon: "🎓", text: "Access student resources & materials" },
                    { icon: "👥", text: "Join campus fellowship groups" },
                    { icon: "📱", text: "Personalized spiritual growth tracking" },
                    { icon: "🎯", text: "Participate in events & conferences" },
                    { icon: "🤝", text: "Connect with mentors & leaders" },
                    { icon: "🌍", text: "Be part of a national movement" },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <span>{benefit.icon}</span>
                      </div>
                      <span className="text-emerald-100">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats/Footer */}
              <div className="pt-8 border-t border-white/20">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "150+", label: "Active Campuses" },
                    { value: "50+", label: "Years Serving" },
                    { value: "Growing", label: "Community" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-amber-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated Corner Accents */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/30 rounded-br-lg" />

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + i * 15}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} EvaSUE. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}