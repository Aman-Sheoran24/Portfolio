"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const aboutImageRef = useRef(null);
  const projectsScrollRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");

  /* ================= AUTO-SCROLL ABOUT IMAGES ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!aboutImageRef.current) return;
      aboutImageRef.current.scrollLeft += 1;
      if (
        aboutImageRef.current.scrollLeft >=
        aboutImageRef.current.scrollWidth / 2
      ) {
        aboutImageRef.current.scrollLeft = 0;
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  /* ================= AUTO-SCROLL PROJECTS ================= */
  useEffect(() => {
    const el = projectsScrollRef.current;
    if (!el) return;

    let animationId;

    const scroll = () => {
      el.scrollLeft += 0.6; // 🔧 speed control
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  /* ================= SCROLL SPY ================= */
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects"];
      let current = "hero";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= PROJECT DATA ================= */
  const projects = [
    {
      title: "NIDAR – UAV for Disaster Relief",
      org: "IIT Delhi Research",
      year: "2025",
      description:
        "Autonomous UAVs for post-disaster search using LoRa mesh networking and Jetson-based real-time vision.",
      tech: "Jetson, ROS, YOLOv7, DeepLabv3+, LoRa",
    },
    {
      title: "Dead Reckoning for GPS-Denied Drones",
      org: "BotLab Dynamics",
      year: "2025",
      description:
        "Dead Reckoning in ArduPilot using IMU + barometer with swarm coordination.",
      tech: "C++, Lua, ArduPilot, PX4, Swarm",
    },
    {
      title: "Thermal–Visual SLAM",
      org: "IIT Delhi",
      year: "2024–25",
      description:
        "Multi-spectral SLAM using ORB-SLAM3 and DROID-SLAM on RGB + thermal data.",
      tech: "ROS, OpenCV, PyTorch, SLAM",
    },
    {
      title: "Automated Medical Imaging Server",
      org: "AIIMS × IIT Delhi",
      year: "2024",
      description:
        "Jetson-based PACS automation pipeline for secure DICOM transfer.",
      tech: "Python, MySQL, Jetson, DICOM",
    },
  ];

  // duplicate for seamless loop
  const scrollingProjects = [...projects, ...projects];

  return (
    <div className="scroll-smooth">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-4 bg-bg backdrop-blur border-b border-white/5">
        <div className="font-bold text-2xl text-primary">Aman Sheoran</div>
        <div className="flex gap-8 text-lg">
          {["hero", "about", "projects"].map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`capitalize transition ${
                activeSection === sec
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              {sec}
            </a>
          ))}
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-8 pt-32 max-w-7xl mx-auto"
      >
        <div>
          <h1 className="text-5xl font-bold mb-6">
            Engineer · Drone Architect · AI Researcher
          </h1>
          <p className="text-lg text-muted mb-8">
            Building intelligent aerial robotic systems for real-world deployment.
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="min-h-screen px-8 py-32 flex flex-col items-center gap-16 bg-card"
      >
        <motion.h2
          whileHover={{ scale: 1.08 }}
          className="text-4xl font-bold cursor-pointer"
        >
          About Me
        </motion.h2>

        <div
          ref={aboutImageRef}
          className="w-full overflow-x-auto whitespace-nowrap py-4 select-none"
        >
          <div className="inline-flex gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <img
                key={i}
                src={`/photo${(i % 4) + 1}.png`}
                alt="Experience"
                className="w-72 h-48 rounded-xl object-cover"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS (ENDLESS SCROLL) ================= */}
      <section id="projects" className="py-24 overflow-hidden">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold inline-block px-10 py-4 rounded-full bg-gradient-to-r from-primary to-secondary">
            Featured Projects
          </h2>
        </div>

        <div
          ref={projectsScrollRef}
          className="flex gap-8 overflow-x-hidden px-6"
        >
          {scrollingProjects.map((project, index) => (
            <div
              key={index}
              className="project-card p-8 min-w-[340px] max-w-[340px] relative shrink-0"
            >
              <span className="absolute top-6 right-6 text-4xl font-bold opacity-10">
                {String((index % projects.length) + 1).padStart(2, "0")}
              </span>

              <h3 className="text-lg font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-primary mb-3">
                {project.org} • {project.year}
              </p>

              <p className="text-sm text-muted mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.split(", ").map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
