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
      el.scrollLeft += 0.6;
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
        if (rect.top <= 200 && rect.bottom >= 200) current = id;
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

  const scrollingProjects = [...projects, ...projects];

  return (
    <div className="scroll-smooth">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-4 bg-bg backdrop-blur border-b border-white/5">
        <div className="font-bold text-2xl text-primary">Aman Sheoran</div>
        <div className="flex gap-8 text-lg">
          {[
            { id: "hero", label: "Home" },
            { id: "about", label: "About" },
            { id: "projects", label: "Projects" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition ${
                activeSection === item.id
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ================= HERO (RESTORED FULLY) ================= */}
      <section
        id="hero"
        className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 pt-32 max-w-7xl mx-auto"
      >
        <div>
          <h1 className="text-5xl font-bold mb-6">
            Engineer | Drone Architect | AI Enthusiast Leader
          </h1>
          <p className="text-lg text-muted mb-8">
            Hi, I’m Aman Sheoran, a B Tech student at IIT Delhi, driven to merge
            aerospace systems with AI and real-world problem-solving. I lead
            drones to fly, both in labs and in competitions.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-blue-500 text-white"
            >
              Explore My Projects
            </a>
            <a
              href="/Aman_Sheoran_CV.pdf"
              className="px-6 py-3 rounded-lg border border-blue-400 text-blue-400"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/profile_image.png"
            alt="Aman Sheoran"
            className="rounded-2xl object-cover w-full max-w-md"
            draggable={false}
          />
        </div>
      </section>

      {/* ================= ABOUT (FULL TEXT RESTORED) ================= */}
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

        <div className="max-w-4xl text-center text-muted leading-relaxed space-y-6">
          <p>
            I’m an engineer passionate about creating intelligent, resilient,
            and autonomous systems. My research interests span{" "}
            <b>robotics, computer vision, control systems, and embedded AI</b>.
            Through my work at IIT Delhi and internships at{" "}
            <b>BotLab Dynamics</b> and research labs, I’ve developed advanced
            algorithms in swarm robotics, SLAM, and autonomous navigation.
          </p>

          <p>
            As <b>President of the Aeromodelling Club</b>, I’ve led a 40+ member
            team, initiated MOUs with aviation startups, organized national
            workshops, and represented IIT Delhi at TechInter IIT. I also serve
            as <b>Captain of the Girnar Hockey Team</b>, balancing academics,
            research, and leadership.
          </p>

          <p>
            My goal is to contribute to next-gen aerial robotics — combining{" "}
            <b>AI, autonomy, and systems design</b> to solve real-world challenges.
          </p>
        </div>

        <div
          ref={aboutImageRef}
          className="w-full overflow-hidden whitespace-nowrap py-4 select-none"
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

      {/* ================= PROJECTS  ================= */}
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
