"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const aboutTrackRef = useRef(null);
  const projectsTrackRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");

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

  /* ================= ENDLESS MARQUEE (GENERIC) ================= */
  const useMarquee = (ref, speed = 0.3) => {
    useEffect(() => {
      const track = ref.current;
      if (!track) return;

      let x = 0;
      let raf;

      const animate = () => {
        x -= speed;
        if (Math.abs(x) >= track.scrollWidth / 2) {
          x = 0;
        }
        track.style.transform = `translateX(${x}px)`;
        raf = requestAnimationFrame(animate);
      };

      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, [ref, speed]);
  };

  useMarquee(aboutTrackRef, 0.35);
  useMarquee(projectsTrackRef, 0.45);

  /* ================= PROJECT DATA ================= */
  const projects = [
    {
      title: "NIDAR – UAV for Disaster Relief",
      org: "IIT Delhi Research",
      year: "2025",
      description:
        "Autonomous UAVs with LoRa mesh networking and Jetson-powered real-time vision.",
      tech: ["Jetson", "ROS", "YOLOv7", "LoRa"],
    },
    {
      title: "Dead Reckoning for GPS-Denied Drones",
      org: "BotLab Dynamics",
      year: "2025",
      description:
        "IMU + barometer based navigation with swarm coordination.",
      tech: ["ArduPilot", "Lua", "PX4", "Swarm"],
    },
    {
      title: "Thermal–Visual SLAM",
      org: "IIT Delhi",
      year: "2024–25",
      description:
        "RGB + thermal SLAM using ORB-SLAM3 and DROID-SLAM.",
      tech: ["SLAM", "ROS", "OpenCV"],
    },
    {
      title: "Automated Medical Imaging Server",
      org: "AIIMS × IIT Delhi",
      year: "2024",
      description:
        "Secure Jetson-based PACS automation pipeline.",
      tech: ["Python", "Jetson", "DICOM"],
    },
  ];

  const loopedProjects = [...projects, ...projects];

  return (
    <div className="scroll-smooth overflow-x-hidden">

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
        className="min-h-screen grid md:grid-cols-2 items-center px-8 pt-32 max-w-7xl mx-auto"
      >
        <h1 className="text-5xl font-bold">
          Engineer · Drone Architect · AI Researcher
        </h1>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-32 px-6 bg-card overflow-hidden"
      >
        <motion.h2
          whileHover={{ scale: 1.05 }}
          className="text-4xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>

        <p className="max-w-4xl mx-auto text-center text-muted mb-16">
          I design autonomous systems across robotics, perception, control, and
          embedded AI, spanning swarm UAVs, SLAM, and GPS-denied navigation.
        </p>

        {/* IMAGE MARQUEE */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={aboutTrackRef}
            className="flex gap-6 w-max"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <img
                key={i}
                src={`/photo${(i % 4) + 1}.png`}
                className="w-72 h-48 rounded-xl object-cover shrink-0"
                draggable={false}
                alt=""
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section
        id="projects"
        className="py-32 overflow-hidden"
      >
        <h2 className="text-4xl font-semibold text-center mb-16">
          Featured Projects
        </h2>

        {/* PROJECT MARQUEE */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={projectsTrackRef}
            className="flex gap-8 w-max px-6"
          >
            {loopedProjects.map((project, i) => (
              <div
                key={i}
                className="project-card p-8 w-[340px] shrink-0"
              >
                <h3 className="text-lg font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-primary mb-3">
                  {project.org} • {project.year}
                </p>
                <p className="text-sm text-muted mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
