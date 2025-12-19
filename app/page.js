"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const aboutImageRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");

  /* ================= AUTO-SCROLL ABOUT IMAGES ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      if (aboutImageRef.current) {
        aboutImageRef.current.scrollBy({ left: 2, behavior: "auto" });
        if (
          aboutImageRef.current.scrollLeft >=
          aboutImageRef.current.scrollWidth / 2
        ) {
          aboutImageRef.current.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
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
        "Autonomous UAVs for post-disaster search with LoRa mesh communication and real-time YOLOv7 + DeepLabV3 vision on Jetson, achieving over 60% efficiency improvement.",
      tech: "Jetson, ROS, YOLOv7, DeepLabv3+, LoRa, MAVLink",
    },
    {
      title: "Dead Reckoning for GPS-Denied Drones",
      org: "BotLab Dynamics",
      year: "2025",
      description:
        "Implemented Dead Reckoning in ArduPilot (Lua/C++) using IMU and barometer for GPS-denied flight, with swarm coordination and mesh networking.",
      tech: "C++, Lua, ArduPilot, PX4, ROS2, UAV Swarm",
    },
    {
      title: "Thermal–Visual SLAM System",
      org: "IIT Delhi × Prof. Chetan Arora",
      year: "2024–25",
      description:
        "Multi-spectral SLAM using ORB-SLAM3 and DROID-SLAM on RGB + thermal imagery for autonomous drone and robotic navigation.",
      tech: "ROS, PyTorch, OpenCV, ORB-SLAM3, DROID-SLAM",
    },
    {
      title: "Automated Medical Imaging Server",
      org: "AIIMS × IIT Delhi",
      year: "2024",
      description:
        "Jetson-based PACS automation pipeline for encrypted DICOM transfer, anonymization, and indexing for AI-driven healthcare workflows.",
      tech: "Python, MySQL, Pydicom, Jetson, Flask",
    },
    {
      title: "Airline Disruption Recovery Optimization",
      org: "B.Tech Project (Indigo Airlines)",
      year: "2025",
      description:
        "Large-scale airline recovery modeling using temporal networks and discrete optimization targeting 3–5% crew cost reduction.",
      tech: "Python, OR-Tools, Dynamic Programming, FLPO",
    },
  ];

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
            I’m Aman Sheoran, an IIT Delhi engineer building intelligent,
            resilient aerial robotic systems at the intersection of autonomy,
            AI, and real-world deployment.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white"
            >
              View Projects
            </a>
            <a
              href="/Aman_Sheoran_CV.pdf"
              className="px-6 py-3 rounded-lg border border-primary text-primary"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/profile_image.png"
            alt="Aman Sheoran"
            className="rounded-2xl w-full max-w-md object-cover"
            draggable={false}
          />
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

        <div className="max-w-4xl text-center text-muted leading-relaxed">
          <p className="mb-6">
            I design autonomous systems across robotics, perception, control,
            and embedded AI. My work spans swarm UAVs, SLAM, and GPS-denied
            navigation in research and industry settings.
          </p>
          <p>
            As President of the Aeromodelling Club and a competitive athlete, I
            balance leadership, engineering depth, and execution under pressure.
          </p>
        </div>

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
                className="w-72 h-48 rounded-xl object-cover hover:scale-105 transition"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold inline-block px-10 py-4 rounded-full bg-gradient-to-r from-primary to-secondary">
            Featured Projects
          </h2>
          <p className="mt-4 text-muted">
            Autonomous systems, AI platforms, and real-world deployments
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={index} className="project-card p-8 relative">
              <span className="absolute top-6 right-6 text-5xl font-bold opacity-10">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-neon">
                🚀
              </div>

              <h3 className="text-xl font-semibold mb-1">
                {project.title}
              </h3>

              <p className="text-sm text-primary mb-3">
                {project.org} • {project.year}
              </p>

              <p className="text-sm text-muted mb-6">
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
