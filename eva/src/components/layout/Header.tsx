"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 30);
      setHidden(currentY > lastScrollY && currentY > 100);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "Home", link: "/" },
    {
      label: "About",
      subMenu: [
        { label: "What we believe", link: "/page/about/believe" },
        { label: "Who we are", link: "/page/about/who-we-are" },
        { label: "Leadership", link: "/page/about/leadership" },
        { label: "General Secretary", link: "/page/about/general-secretary" },
        { label: "History", link: "/about/history" },
      ],
    },
    {
      label: "Student Ministry",
      subMenu: [
        { label: "Discipleship", link: "/page/student/discipleship" },
        { label: "Leadership Dev't", link: "/page/student/leadership" },
        { label: "Evangelism and Mission", link: "/student/evangelism" },
      ],
    },
    {
      label: "Department",
      subMenu: [
        { label: "Staff Cares & Development", link: "/staff" },
        { label: "Evangelism and Mission", link: "/student/evangelism" },
        { label: "Media Team", link: "/student/evangelism" },
      ],
    },
    {
      label: "Resource",
      subMenu: [
        { label: "Training", link: "/page/material" },
        { label: "Events", link: "/page/events" },
        { label: "Videos", link: "/page/videos" }
      ],
    },
    { label: "Contact", link: "/contact" },
    { label: "Login", link: "/login" },
  ];

  // Framer Motion variants for dropdown
  const dropdownVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -15,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        mass: 0.8,
        duration: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      filter: "blur(5px)",
      transition: { duration: 0.15 }
    },
  };

  // Framer Motion variants for mobile menu
  const mobileMenuVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.98,
      transition: { duration: 0.2 }
    },
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Background with glass morphism effect */}
      
      
      {/* Animated gradient border bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"
        animate={{
          scaleX: scrolled ? [0, 1, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: scrolled ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles in header background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/80 rounded-full"
            style={{
              left: `${10 + i * 25}%`,
              top: "50%",
            }}
            animate={{
              y: [0, -5, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          
        </motion.div>

        {/* Desktop Navigation and Give button */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* Enhanced Navigation bar */}
          <motion.div 
            className="flex items-center rounded-3xl border border-white/40 bg-white backdrop-blur-sm px-3 py-1.5 gap-2 lg:gap-3 shadow-sm shadow-black/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  setHoveredItem(item.label);
                  setOpenDropdown(item.label);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  setOpenDropdown(null);
                }}
              >
                {/* Hover indicator line */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  initial={false}
                  animate={{
                    width: hoveredItem === item.label ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.2 }}
                />

                {item.subMenu ? (
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className="relative px-3 py-2 text-xs sm:text-sm lg:text-sm font-semibold text-sky-800 rounded-lg hover:text-sky-700 whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.svg 
                      className="w-3 h-3 text-sky-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                    
                    {/* Subtle background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-sky-50/50 to-red-50/50 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredItem === item.label ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.link!}
                    className="relative px-3 py-2 text-xs sm:text-sm lg:text-sm font-semibold text-sky-800 rounded-lg hover:text-sky-700 whitespace-nowrap transition-all duration-200 block"
                  >
                    {item.label}
                    {/* Subtle background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-sky-50/50 to-red-50/50 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredItem === item.label ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                )}

                {/* Enhanced Dropdown */}
                <AnimatePresence>
                  {item.subMenu && openDropdown === item.label && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute top-full left-0 mt-3 w-60 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl shadow-sky-100/50 z-50 overflow-hidden"
                      style={{ 
                        boxShadow: "0 20px 60px rgba(14, 165, 233, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      {/* Dropdown header */}
                      <div className="px-5 py-3 border-b border-sky-50">
                        <span className="text-sm font-semibold text-sky-700">{item.label}</span>
                      </div>
                      
                      {/* Dropdown items */}
                      <div className="py-2">
                        {item.subMenu.map((sub, subIndex) => (
                          <motion.div
                            key={sub.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              href={sub.link}
                              className="relative block px-5 py-3 text-sm font-medium text-sky-800 hover:text-sky-700 transition-colors duration-200 group/sub"
                              onMouseEnter={() => setHoveredItem(item.label)}
                            >
                              {/* Hover background */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-sky-50 to-transparent opacity-0 group-hover/sub:opacity-100"
                                initial={false}
                                transition={{ duration: 0.2 }}
                              />
                              
                              {/* Icon */}
                              <motion.div
                                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/sub:opacity-100"
                                initial={false}
                                animate={{ x: hoveredItem === item.label ? 0 : -5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <svg className="w-3 h-3 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </motion.div>
                              
                              <span className="relative z-10 pl-4 group-hover/sub:pl-6 transition-all duration-200">
                                {sub.label}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Dropdown footer */}
                      <div className="px-5 py-3 border-t border-sky-50 bg-gradient-to-r from-sky-50/50 to-transparent">
                        <span className="text-xs text-sky-600">Explore more →</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Enhanced Give button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/give">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white px-6 py-3 text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                style={{
                  boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-sm font-bold tracking-wide">Give</span>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-transparent blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                
                {/* Border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400 to-transparent rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Enhanced Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-sm text-sky-800 hover:bg-sky-50 transition-colors duration-200"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
            
            {/* Notification dot for mobile */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden fixed top-16 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-sky-200/50 z-50 py-6 px-4 border border-white/30"
              style={{
                boxShadow: "0 20px 60px rgba(14, 165, 233, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8)",
              }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.subMenu ? (
                      <details className="group">
                        <summary className="px-4 py-3.5 text-base font-semibold text-sky-800 rounded-xl hover:bg-gradient-to-r hover:from-sky-50/50 hover:to-red-50/50 hover:text-sky-700 list-none cursor-pointer flex justify-between items-center bg-white/50">
                          {item.label}
                          <motion.span
                            animate={{ rotate: 0 }}
                            className="group-open:rotate-180 transition-transform duration-200"
                          >
                            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.span>
                        </summary>
                        <div className="mt-2 space-y-1 pl-4 pr-2">
                          {item.subMenu.map((sub, subIndex) => (
                            <motion.div
                              key={sub.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.03 }}
                            >
                              <Link
                                href={sub.link}
                                className="block px-4 py-2.5 text-sm font-medium text-sky-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-colors duration-200 flex items-center gap-2"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <svg className="w-3 h-3 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                {sub.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.link!}
                        className="block px-4 py-3.5 text-base font-semibold text-sky-800 rounded-xl hover:bg-gradient-to-r hover:from-sky-50/50 hover:to-red-50/50 hover:text-sky-700 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                {/* Mobile Give Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 mt-4 border-t border-sky-100"
                >
                  <Link href="/give" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white px-6 py-4 text-base font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      {/* Animated gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          backgroundSize: "200% 200%",
                        }}
                      />
                      
                      <span className="relative z-10 flex items-center gap-2">
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </motion.svg>
                        Give Now
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}