"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  const tools = [
    { name: "🧩 Universal Data Formatter", path: "/convert" },
    { name: "📁 File Tools (Upload & Export)", path: "/file-tools" },
    { name: "✍️ Text Utilities Toolkit", path: "/text-tools" },
    { name: "💻 Developer Tools Suite", path: "/dev-tools" },
    { name: "🧾 JSON Formatter", path: "/json-formatter" },
    { name: "📊 CSV Cleaner", path: "/csv-cleaner" },
    { name: "📝 Word Counter", path: "/word-counter" },
  ];

  // Theme toggle logic
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left: Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Format Pilot Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            Format Pilot
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Home Link */}
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
          >
            Home
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 dark:text-gray-200 font-medium hover:text-indigo-600 transition flex items-center"
            >
              Tools ▾
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md mt-2 w-64 right-0 overflow-hidden"
                >
                  {tools.map((tool) => (
                    <Link
                      key={tool.path}
                      href={tool.path}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition"
                      onClick={() => setOpen(false)}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/about"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-indigo-600 border border-indigo-600 rounded-md px-4 py-1 hover:bg-indigo-600 hover:text-white transition"
          >
            Contact
          </Link>

          
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner"
          >
            <div className="flex flex-col p-4 space-y-3">
              {/* Home (Mobile) */}
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-indigo-600 border border-indigo-600 rounded-md px-4 py-1 hover:bg-indigo-600 hover:text-white transition text-center"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>

              {/* Theme toggle (mobile) */}
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                className="flex justify-center gap-2 items-center p-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}{" "}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
