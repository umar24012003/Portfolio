"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { FormEvent } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openResume, setOpenResume] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(data.message || "Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert(data.message || "Failed to send message.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  /* --------------------------------------------------------------------
        TYPEWRITER ANIMATION
  -------------------------------------------------------------------- */
  const roles = [
    "Front End Developer",
    "React Enthusiast",
    "Next.js Developer",
    "Backend Developer",
    "Full Stack Web-Developer",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const speed = isDeleting ? 100 : 250;

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => {
        if (!isDeleting) {
          const next = currentRole.slice(0, prev.length + 1);
          if (next === currentRole) setIsDeleting(true);
          return next;
        } else {
          const next = prev.slice(0, prev.length - 1);
          if (next === "") {
            setIsDeleting(false);
            setCurrentRoleIndex((i) => (i + 1) % roles.length);
          }
          return next;
        }
      });
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roles, currentRoleIndex]);

  /* --------------------------------------------------------------------
        MOTION VARIANTS
  -------------------------------------------------------------------- */
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const textVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const imageVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.5, type: "spring" } },
    hover: { scale: 1.05 },
  };

  const gradientAnimation = {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  };

  /* --------------------------------------------------------------------
        RETURN UI
  -------------------------------------------------------------------- */
  return (
    <>
      {/* ==================================================================
            HERO SECTION
        ================================================================== */}
      <div
        id="home"
        className="min-h-screen bg-gradient-to-br from-black via-[#1a0a3b] to-black flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 gap-10"
      >
        {/* LEFT TEXT CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center md:text-left z-20"
        >
          <motion.h3
            className="text-purple-400 text-lg mb-2 font-medium tracking-wide"
            variants={textVariants}
          >
            Hi, It's me
          </motion.h3>

          <motion.h1
            className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight"
            variants={textVariants}
          >
            Umar <span className="text-purple-400">Nadeem</span>
          </motion.h1>

          <motion.h2
            className="text-white text-2xl md:text-3xl font-semibold mb-6"
            variants={textVariants}
          >
            I'm a{" "}
            <span className="text-purple-400">
              {displayedText}
              <span className="blinking-cursor">|</span>
            </span>
          </motion.h2>

          {/* SOCIAL ICONS */}
          <motion.div className="flex justify-center md:justify-start gap-10 mb-8" variants={textVariants}>
            {[
              { href: "https://www.instagram.com/umar_n24", src: "/instagram.png" },
              { href: "https://github.com/umar24012003", src: "/github.png" },
              { href: "http://linkedin.com/in/umar-nadeem-118181398", src: "/linkedin.png" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-900/30 hover:bg-purple-500/30 transition"
              >
                <img src={social.src} className="w-10 h-10" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE WITH GLOW */}
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl z-20"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at center, #7b3fe4, #c084fc, #6b21a8, #1e0a3b)",
              backgroundSize: "400% 400%",
              filter: "blur(50px)",
            }}
            animate={{
            backgroundPositionX: ["0%", "100%", "0%"],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
             }}
          />

          <div className="relative w-full h-full z-10">
            <Image
              src="/mypicture.jpg"
              alt="Profile"
              width={320}
              height={320}
              className="object-cover w-full h-full rounded-full border-[3px] border-purple-600/30"
            />
          </div>
        </motion.div>
      </div>

      {/* blinking cursor animation */}
      <style jsx>{`
        .blinking-cursor {
          width: 1px;
          background: #c084fc;
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0;
          }
        }
      `}</style>

      {/* ==================================================================
       ABOUT SECTION
================================================================== */}
      <motion.section
        id="about"
        className="w-full px-6 md:px-20 py-16 bg-gradient-to-br from-black via-[#0d001a] to-black text-white"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-12 flex ml-0 gap-3 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-white">About</span>
          <span className="text-purple-500">Me</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-20">
          {/* ABOUT IMAGE */}
          <motion.div
            className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_0_30px_#5b21b6]"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image src="/mypicture.jpg" width={500} height={500} className="object-cover w-full h-full" alt="Profile Image" />
          </motion.div>

          {/* ABOUT TEXT */}
          <motion.div
            className="md:w-1/2 flex flex-col gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              I'm <span className="text-purple-400">Umar Nadeem</span>
            </h2>

            <p className="text-lg text-gray-300 font-medium">Full Stack Developer</p>

            <p className="text-gray-300 leading-relaxed text-lg">
              I’m a Full Stack Developer from Gujrat, Pakistan. Currently pursuing a Computer Science degree. I love creating smooth, clean, and modern digital experiences.
            </p>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg mt-3">
              <p>
                <span className="font-semibold text-purple-400">Age:</span> 22
              </p>
              <p>
                <span className="font-semibold text-purple-400">Email:</span> umarnadeem24@icloud.com
              </p>
              <p>
                <span className="font-semibold text-purple-400">Phone:</span> +92 3147865460
              </p>
              <p>
                <span className="font-semibold text-purple-400">Place:</span> Gujrat, Pakistan
              </p>
            </div>

            <button
              onClick={() => setOpenResume(true)}
              className="mt-6 bg-purple-600 px-8 py-3 w-fit rounded-lg text-lg font-semibold shadow-[0_0_20px_#7c3aed] hover:bg-purple-700 transition-all"
            >
              Resume →
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================================================================
       SKILLS SECTION
================================================================== */}
      <motion.section
        className="w-full px-6 md:px-20 py-20 bg-gradient-to-br from-black via-[#0d001a] to-black text-white"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-16 text-center flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white">My</span>
          <span className="text-purple-500">Skills</span>
        </motion.h1>

        <div id="skills" className="relative w-full flex justify-center items-center">
          <motion.div
            className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[
              { name: "HTML", icon: "html.png", angle: 0 },
              { name: "CSS", icon: "css.png", angle: 30 },
              { name: "JavaScript", icon: "jst.png", angle: 60 },
              { name: "React", icon: "react.png", angle: 90 },
              { name: "Next.js", icon: "nextjs.jpg", angle: 120 },
              { name: "Tailwind", icon: "tailwindcss.png", angle: 150 },
              { name: "Node.js", icon: "nodejs.png", angle: 180 },
              { name: "MongoDB", icon: "mongodb.png", angle: 210 },
              { name: "NoSQL", icon: "nosql.png", angle: 240 },
              { name: "Git", icon: "github.png", angle: 270 },
              { name: "MUI", icon: "mui.png", angle: 300 },
              { name: "TypeScript", icon: "typescript.png", angle: 330 },
            ].map((skill, i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-20 flex flex-col items-center justify-center rounded-xl bg-[#1a0033]/70 shadow-[0_0_25px_#7c3aed] hover:shadow-[0_0_40px_#a78bfa] border border-purple-700/40 backdrop-blur-md cursor-pointer"
                style={{
                  transform: `rotate(${skill.angle}deg) translate(160px) rotate(-${skill.angle}deg)`,
                }}
                whileHover={{ scale: 1.2 }}
              >
                <img src={skill.icon} className="w-10 h-10 mb-1" />
                <p className="text-sm text-purple-300">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ==================================================================
       EXPERIENCE SECTION
================================================================== */}
      <motion.section
        id="Experience"
        className="w-full px-6 md:px-20 py-20 bg-gradient-to-b from-black via-[#0d001a] to-black text-white"
      >
        {/* TITLE */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-16 text-center flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-white">My</span>
          <span className="text-purple-500">Experience</span>
        </motion.h1>

        <div className="relative w-full max-w-4xl mx-auto">
          {/* CENTER LINE */}
          <div className="absolute left-1/2 top-0 h-full w-[4px] bg-purple-600 shadow-[0_0_25px_#7c3aed] transform -translate-x-1/2"></div>

          {/* TIMELINE ITEMS */}
          <div className="space-y-20">
            {[
              {
                title: "React Developer at Technoo Denmark",
                date: "17July2024-20Sep2024",
                desc: "Create The Company Website,Using React Different States to Manage there different Functionalities",
                side: "right",
              },
              {
                title: "Front-End Developer at Twinspider",
                date: "2022 – 2025",
                desc: "Built dynamic components, custom hooks, and optimized full front-end architectures.",
                side: "left",
              },
              {
                title: "Full Stack Developer At Abcdmedia",
                date: "2025 – Present",
                desc: "Working with MERN stack, building APIs, dashboards, auth systems & production-grade web apps.",
                side: "right",
              },
              {
                title: "Final Year Project",
                date: "2025 – Present",
                desc: "Designing business application where entrepreneur and investors collaborate and also raise funding campaigns for various causes.",
                side: "left",
              },
            ].map((exp, i) => (
              <motion.div
                key={i}
                className={`relative w-full flex justify-start ${exp.side === "right" ? "md:justify-end" : ""}`}
                initial={{ opacity: 0, x: exp.side === "right" ? 80 : -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="w-full md:w-[45%] bg-[#150024]/60 border border-purple-700/40 rounded-xl p-6 shadow-[0_0_25px_#7c3aed] backdrop-blur-lg">
                  <h2 className="text-2xl font-bold text-purple-400">{exp.title}</h2>
                  <p className="text-gray-300 text-sm mt-1">{exp.date}</p>
                  <p className="mt-3 text-gray-300 leading-relaxed">{exp.desc}</p>
                </div>
                <span className="absolute left-1/2 top-6 w-5 h-5 bg-purple-500 rounded-full transform -translate-x-1/2 shadow-[0_0_15px_#a78bfa]"></span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ==================================================================
       CONTACT SECTION
================================================================== */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a001f] to-black px-6">
        <motion.form
          className="w-full max-w-lg p-10 bg-gradient-to-br from-[#1a002b] via-[#2a003f] to-black rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.5)] border border-purple-800/50 backdrop-blur-lg"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center text-purple-400 mb-8">
            Contact <span className="text-white">Me</span>
          </h2>

          {/* NAME */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="text-purple-300 text-lg font-medium">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full mt-2 p-4 bg-black/60 border border-purple-700/50 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
              required
            />
          </motion.div>

          {/* EMAIL */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="text-purple-300 text-lg font-medium">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-4 bg-black/60 border border-purple-700/50 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
              required
            />
          </motion.div>

          {/* MESSAGE */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="text-purple-300 text-lg font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Write your message..."
              className="w-full mt-2 p-4 bg-black/60 border border-purple-700/50 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300"
              required
            ></textarea>
          </motion.div>

          {/* BUTTON */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #a855f7" }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 text-xl rounded-xl bg-gradient-to-r from-purple-800 via-purple-700 to-purple-500 text-white font-bold shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300"
          >
            Send Message
          </motion.button>
        </motion.form>
      </section>

      {/* RESUME MODAL */}
      {openResume && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999]">
          <div className="bg-[#1a0a33] p-4 rounded-xl shadow-xl w-[90%] md:w-[60%] h-[80%] relative border border-purple-600/40">
            <button
              onClick={() => setOpenResume(false)}
              className="absolute top-3 right-3 text-white text-2xl hover:text-purple-400"
            >
              ✖
            </button>
            <iframe src="/mycv.pdf" className="w-full h-full rounded-lg"></iframe>
          </div>
        </div>
      )}
    </>
  );
}
