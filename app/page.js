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

  /* ================= GENERIC MARQUEE ================= */
  const useMarquee = (ref, speed = 0.3) => {
    useEffect(() => {
      const track = ref.current;
      if (!track) return;

      let x = 0;
      let raf;

      const animate = () => {
        x -= speed;
        if (Math.abs(x) >= track.scrollWidth / 2) x = 0;
        track.style.transform = `translateX(${x}px)`;
        raf = requestAnimationFrame(animate);
      };

      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, [ref, speed]);
  };

  /* About images: slower */
  useMarquee(aboutTrackRef, 0.35);
  /* Projects: slightly faster */
  useMarquee(projectsTrackRef, 0.45);

  /* ================= PROJECT DATA ================= */
  const projects = [
    {
      title: "NIDAR – UAV for Disaster Relief",
      org: "IIT Delhi Research",
      year: "2025",
      description:
        "Autonomous UAVs for post-disaster search using LoRa mesh networking and Jetson-powered real-time vision.",
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
    <div className="bg-[#0f1b2a] text-white font-sans scroll-smooth overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-4 bg-[#0f1b2a] shadow-md">
        <div className="font-bold text-2xl text-blue-400">Aman Sheoran</div>
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
                  ? "text-blue-400"
                  : "hover:text-blue-400"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ================= HERO (RESTORED) ================= */}
      <section
        id="hero"
        className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 py-32 max-w-7xl mx-auto"
      >
        <div>
          <h1 className="text-5xl font-bold mb-6">
            Engineer | Drone Architect | AI Enthusiast Leader
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Hi, I’m Aman Sheoran, a B Tech student at IIT Delhi, driven to merge
            aerospace systems with AI and real-world problem-solving. I lead
            drones to fly, both in labs and in competitions.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="bg-blue-500 px-6 py-3 rounded-lg text-white"
            >
              Explore My Projects
            </a>
            <a
              href="/Aman_Sheoran_CV.pdf"
              className="border border-blue-400 text-blue-400 px-6 py-3 rounded-lg"
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

      {/* ================= ABOUT (RESTORED + NO SCROLLBAR) ================= */}
      <section
        id="about"
        className="min-h-screen bg-[#111f30] px-8 py-32 flex flex-col items-center gap-16 overflow-hidden"
      >
        <motion.h2
          className="text-4xl font-bold cursor-pointer hover:text-blue-400 transition"
          whileHover={{ scale: 1.08 }}
        >
          About Me
        </motion.h2>

        <div className="max-w-4xl text-center text-gray-300 leading-relaxed">
          <p className="mb-6">
            I design autonomous systems across robotics, perception, control,
            and embedded AI. My work spans swarm UAVs, SLAM, and GPS-denied
            navigation in research and industry settings.
          </p>
          <p>
            As President of the Aeromodelling Club and a competitive athlete,
            I balance leadership, engineering depth, and execution under pressure.
          </p>
        </div>

        {/* IMAGE MARQUEE */}
        <div className="w-full overflow-hidden">
          <div
            ref={aboutTrackRef}
            className="flex gap-6 w-max"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <img
                key={i}
                src={`/photo${(i % 4) + 1}.png`}
                alt=""
                className="w-72 h-48 rounded-xl object-cover shrink-0"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS (ENDLESS SCROLL) ================= */}
      <section
        id="projects"
        className="py-32 overflow-hidden"
      >
        <h2 className="text-4xl font-semibold text-center mb-16">
          Featured Projects
        </h2>

        <div className="w-full overflow-hidden">
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
                <p className="text-sm text-blue-400 mb-3">
                  {project.org} • {project.year}
                </p>
                <p className="text-sm text-gray-300 mb-4">
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
