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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastScrollY && currentY > 100);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
  {
    label: "About",
    subMenu: [
      { label: "What we believe", link: "/page/about/believe" },
      { label: "Who we are", link: "/about/who-we-are" },
      { label: "Leadership", link: "/about/leadership" },
      { label: "General Secretary", link: "/about/general-secretary" },
      { label: "History", link: "/about/history" },
    ],
  },
  {
    label: "Student Ministry",
    subMenu: [
      { label: "Discipleship", link: "/student/discipleship" },
      { label: "Leadership Dev't", link: "/student/leadership" },
      { label: "Evangelism and Mission", link: "/student/evangelism" },
    ],
  },
  { label: "Events", link: "/events" },
  { label: "Contact", link: "/contact" },
];


  // Framer Motion variants for dropdown - properly typed
  const dropdownVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.3 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.15 }
    },
  };

  // Framer Motion variants for mobile menu - properly typed
  const mobileMenuVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20 
    },
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-2.5">
        {/* Logo */}
        <Link href="/" className="block w-[80px] xs:w-[100px] md:w-[120px] lg:w-[150px]">
          <Image
            src="/EvaSUELogo.png"
            alt="Logo"
            width={207}
            height={60}
            priority
            className="h-auto w-full"
          />
        </Link>

        {/* Desktop Navigation and Give button - moved to right */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Navigation bar with dropdowns - only takes needed space */}
          <div className="flex items-center rounded-full border border-sky-100 bg-white/90 backdrop-blur-sm px-4 py-1 gap-2 lg:gap-3">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.subMenu ? (
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className="px-3 py-1.5 text-xs sm:text-sm lg:text-base font-medium text-sky-800 rounded-full hover:bg-sky-50 hover:text-sky-700 whitespace-nowrap transition-all duration-200 flex items-center gap-1"
                  >
                    {item.label}
                    <svg 
                      className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.link!}
                    className="px-3 py-1.5 text-xs sm:text-sm lg:text-base font-medium text-sky-800 rounded-full hover:bg-sky-50 hover:text-sky-700 whitespace-nowrap transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Animated Dropdown */}
                <AnimatePresence>
                  {item.subMenu && openDropdown === item.label && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute top-full left-0 mt-2 w-52 bg-white border border-sky-100 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="py-2">
                        {item.subMenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.link}
                            className="block px-4 py-2 text-sm font-medium text-sky-800 hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Give button */}
          <Link href="/give">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Give
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-sky-800 hover:bg-sky-50 transition-colors duration-200"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl z-40 py-6 px-4"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.subMenu ? (
                    <details className="group">
                      <summary className="px-4 py-3 text-base font-medium text-sky-800 rounded-lg hover:bg-sky-50 hover:text-sky-700 list-none cursor-pointer flex justify-between items-center bg-sky-50/50">
                        {item.label}
                        <span className="group-open:rotate-180 transition-transform duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="mt-2 space-y-1 pl-4 pr-2">
                        {item.subMenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.link}
                            className="block px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.link!}
                      className="block px-4 py-3 text-base font-medium text-sky-800 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 mt-4 border-t border-sky-100">
                <Link href="/give" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 text-base font-semibold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      Give Now
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}