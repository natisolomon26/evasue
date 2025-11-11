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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "bg-white/95 shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-2">
        {/* Logo */}
        <Link href="/" className="block w-[100px] md:w-[150px]">
          <Image
            src="/EvaSUELogo.png"
            alt="Logo"
            width={207}
            height={60}
            priority
            className="h-auto w-full"
          />
        </Link>

        {/* Input box with nav links inside */}
        <div className="flex-1 max-w-xl mx-2 md:mx-3 flex items-center gap-2 relative">
          <div className="flex-1 flex items-center rounded-full border border-gray-300 bg-white px-10 py-1 gap-2">
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
                    className="px-4 py-1 text-gray-700 text-sm md:text-base rounded-full hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.link!}
                    className="px-3 py-1 text-gray-700 text-sm md:text-base rounded-full hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap"
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
                      className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    >
                      {item.subMenu.map((sub) => (
                        <Link
                          key={sub}
                          href="#"
                          className="block px-4 py-2 text-gray-700 text-sm hover:bg-blue-50 hover:text-blue-600"
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
            <button className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 whitespace-nowrap">
              Give
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
