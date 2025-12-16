'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, Facebook, Youtube, Instagram, 
  Twitter, Linkedin, Heart, ArrowUpRight, Cross, Globe, 
  Users, Shield, Sparkles, Send, ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#', color: 'text-blue-500 hover:text-blue-500' },
    { icon: Instagram, label: 'Instagram', href: '#', color: 'text-pink-500 hover:text-pink-500' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'text-sky-500 hover:text-sky-500' },
    { icon: Youtube, label: 'YouTube', href: '#', color: 'text-red-500 hover:text-red-600' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'text-blue-600 hover:text-blue-600' },
  ];

  return (
    <motion.footer 
      className="relative bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950 text-gray-200 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-yellow-500/50 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.1)_100%)] bg-[size:60px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_95%,rgba(255,255,255,0.1)_100%)] bg-[size:60px]" />
        </div>

        {/* Floating crosses */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            style={{
              left: `${5 + i * 18}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Cross className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange60 rounded-full blur-lg opacity-50" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-white to-white/60 rounded-2xl flex items-center justify-center shadow-xl">
                  <Cross className="w-7 h-7 text-sky-900" />
                </div>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  EvaSUE Ethiopia
                </h3>
                <p className="text-sm text-slate-400 mt-1">Christian Student Fellowship</p>
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed">
              Following Christ together on Ethiopian campuses — transforming students, 
              impacting nations for eternity.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-sky-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about", icon: Users },
                { label: "Our Beliefs", href: "/beliefs", icon: Shield },
                { label: "Campuses", href: "/campuses", icon: Globe },
                { label: "Resources", href: "/resources", icon: Sparkles },
                { label: "Events", href: "/events", icon: Heart },
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <motion.li
                    key={link.href}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={link.href} 
                      className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors duration-300 group"
                    >
                      <motion.div
                        animate={{ 
                          rotate: hoveredLink === link.label ? 360 : 0,
                          scale: hoveredLink === link.label ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      <span className="flex-1">{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Get Involved Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-emerald-400" />
              Get Involved
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Join Our Community", href: "/join", color: "text-emerald-400" },
                { label: "Volunteer Opportunities", href: "/volunteer", color: "text-amber-400" },
                { label: "Make a Donation", href: "/donate", color: "text-pink-400" },
                { label: "Prayer Support", href: "/pray", color: "text-purple-400" },
                { label: "Partnership", href: "/partnership", color: "text-cyan-400" },
              ].map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href} 
                    className={`flex items-center gap-2 text-slate-400 hover:${link.color} transition-colors duration-300 group`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <span className="flex-1">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-amber-400" />
              Stay Updated
            </h4>
            <p className="text-slate-400 text-sm">
              Subscribe to our newsletter for updates, events, and spiritual insights.
            </p>
            
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-emerald-300 font-medium">
                      Thank you for subscribing!
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubscribe}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all duration-300 placeholder-slate-500"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Subscribe
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Contact Info Bar */}
      

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-center md:text-left"
            >
              <p className="text-slate-500 text-sm">
                &copy; {currentYear} EvaSUE in Ethiopia Christian Student Fellowship.
              </p>
              <p className="text-slate-600 text-xs mt-1">
                Transforming campuses, impacting eternity.
              </p>
            </motion.div>

            {/* Additional Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "FAQs", href: "/faq" },
                { label: "Sitemap", href: "/sitemap" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-500 hover:text-sky-400 text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>

            {/* Prayer Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            >
              <Link
                href="/pray"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/20 to-white/20 border border-white/10 text-white/70 hover:text-purple-200 hover:border-red-400/30 transition-all duration-300"
              >
                <Cross className="w-4 h-4 group-hover:animate-pulse" />
                <span className="text-sm font-medium">Pray With Us</span>
              </Link>
            </motion.div>
          </div>

          {/* Signature */}
          
        </div>
      </div>

      {/* Back to Top Button */}
      
    </motion.footer>
  );
};