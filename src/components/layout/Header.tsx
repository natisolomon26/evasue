"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
        "What we believe",
        "Who we are",
        "Leadership",
        "General Secretary",
        "History",
      ],
    },
    {
      label: "Student Ministry",
      subMenu: ["Discipleship", "Leadership Dev't", "Evangelism and Mission"],
    },
    { label: "Events", link: "/events" },
    { label: "Contact", link: "/contact" },
  ];

  // Framer Motion variants for dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Framer Motion variants for mobile menu
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "bg-white/95 shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-2">
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
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {/* Navigation bar with dropdowns - only takes needed space */}
          <div className="flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 gap-1 lg:gap-2">
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
                    className="px-2 py-1 text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.link!}
                    className="px-2 py-1 text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap transition-colors duration-200"
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
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-48 sm:w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                    >
                      {item.subMenu.map((sub) => (
                        <Link
                          key={sub}
                          href="#"
                          className="block px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          {sub}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Give button */}
          <Link href="/give">
            <button className="bg-red-600 text-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs lg:text-sm font-medium rounded-full hover:bg-red-700 whitespace-nowrap transition-colors duration-200">
              Give
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-md text-gray-700 hover:bg-gray-100"
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
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-40 py-4 px-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.subMenu ? (
                    <details className="group">
                      <summary className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 list-none cursor-pointer flex justify-between items-center">
                        {item.label}
                        <span className="group-open:rotate-180 transition-transform">
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="ml-4 mt-1 space-y-1">
                        {item.subMenu.map((sub) => (
                          <Link
                            key={sub}
                            href="#"
                            className="block px-3 py-1.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.link!}
                      className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-2">
                <Link href="/give" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Give
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}