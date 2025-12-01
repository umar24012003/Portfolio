"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StunningNavbar() {
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleCall = () => {
    window.open("tel:+923147865460");
  };

  const handleEmail = () => {
    window.open("mailto:umarnadeem24@icloud.com");
  };

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Experience", link: "#Experience" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-purple-500/20 shadow-[0_0_25px_rgba(167,139,250,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-[0_0_10px_#a855f7] cursor-pointer">
            <a href="#home">
              <span className="text-purple-500">My</span>Portfolio
            </a>
          </h1>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-6 lg:gap-10 text-lg">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="text-purple-200 hover:text-white transition relative group cursor-pointer"
              >
                <a href={item.link}>{item.name}</a>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all"></span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={() => setShowPopup(true)}
            className="hidden md:inline-block px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-[0_0_15px_#7c3aed] hover:shadow-[0_0_25px_#a78bfa] transition text-sm sm:text-base"
          >
            Hire Me
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-purple-400 focus:outline-none"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <span className="text-2xl">&#x2715;</span> // ✕ close
            ) : (
              <span className="text-2xl">&#9776;</span> // ☰ menu
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-purple-500/20">
            <ul className="flex flex-col gap-4 py-4 px-6 text-white text-lg">
              {navItems.map((item) => (
                <li key={item.name} onClick={() => setMobileMenu(false)}>
                  <a href={item.link} className="block py-2">
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setShowPopup(true);
                    setMobileMenu(false);
                  }}
                  className="w-full px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-[0_0_15px_#7c3aed] hover:shadow-[0_0_25px_#a78bfa] transition"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0f0a1f] border border-purple-500/20 p-6 sm:p-8 rounded-2xl shadow-[0_0_50px_#a855f7] text-center max-w-sm sm:max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Let’s Work Together 🚀
              </h2>

              <p className="text-purple-200 mb-6">
                You can contact me anytime using the options below.
              </p>

              {/* CALL + EMAIL BUTTONS */}
              <div className="flex flex-col gap-4 items-center">
                <motion.button
                  type="button"
                  onClick={handleCall}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px #a855f7" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_20px_#7c3aed] transition text-sm sm:text-base"
                >
                  📞 Call Me: +92 314 7865460
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleEmail}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px #a855f7" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white shadow-[0_0_20px_#7c3aed] transition text-sm sm:text-base"
                >
                  📧 Email: umarnadeem24@icloud.com
                </motion.button>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowPopup(false)}
                whileHover={{ scale: 1.05, color: "#fff" }}
                className="mt-6 px-4 py-2 text-purple-300 hover:text-purple-100 transition text-sm sm:text-base"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
