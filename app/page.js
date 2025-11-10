"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const projectsRef = useRef(null);
  const aboutImageRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (projectsRef.current) {
        projectsRef.current.scrollLeft += 1;
        if (
          projectsRef.current.scrollLeft >=
          projectsRef.current.scrollWidth / 2
        ) {
          projectsRef.current.scrollLeft = 0;
        }
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects"];
      let current = "hero";
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "NIDAR – UAV for Disaster Relief",
      org: "IIT Delhi Research",
      year: "2025",
      description:
        "Developed UAVs for post-disaster search and rescue with LoRa mesh communication, real-time YOLOv7 + DeepLabV3 vision on Jetson platform. Achieved over 60% efficiency gain in field tests.",
      tech: "Jetson, ROS, YOLOv7, DeepLabv3+, LoRa, MAVLink",
    },
    {
      title: "Dead Reckoning for GPS-Denied Drones",
      org: "BotLab Dynamics",
      year: "2025",
      description:
        "Implemented Dead Reckoning in ArduPilot (Lua/C++) for GPS-denied flight using barometer and IMU. Built swarm architecture and mesh networking for multi-UAV coordination.",
      tech: "C++, Lua, ArduPilot, PX4, ROS2, UAV Swarm Systems",
    },
    {
      title: "Thermal–Visual SLAM System",
      org: "IIT Delhi × Prof. Chetan Arora",
      year: "2024–25",
      description:
        "Advanced SLAM using ORB-SLAM3 and DROID-SLAM for multi-spectral perception with thermal and RGB fusion, enabling autonomous drone and robotic navigation.",
      tech: "ROS, PyTorch, OpenCV, DROID-SLAM, ORB-SLAM3",
    },
    {
      title: "Automated Medical Imaging Server",
      org: "AIIMS × IIT Delhi",
      year: "2024",
      description:
        "Deployed Jetson-based PACS server automation pipeline for DICOM data transfer with encryption, indexing, and anonymization for medical AI applications.",
      tech: "Python, MySQL, Pydicom, Jetson, Flask",
    },
    {
      title: "Operation Recovery Optimization – Indigo Airlines",
      org: "B.Tech Project (IIT Delhi)",
      year: "2025",
      description:
        "Modeling large-scale airline disruption recovery using stage-wise Temporal Networks and discrete optimization, targeting 3–5% cost reduction in crew scheduling.",
      tech: "Python, OR-Tools, Dynamic Programming, FLPO",
    },
  ];

  return (
    <div className="bg-[#0f1b2a] text-white font-sans scroll-smooth snap-y snap-mandatory overflow-y-scroll h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0f1b2a] z-50 flex justify-between items-center px-10 py-4 shadow-md">
        <div className="font-bold text-2xl text-blue-400">Aman Sheoran</div>
        <div className="flex gap-8 text-lg">
          <a
            href="#hero"
            className={`${
              activeSection === "hero"
                ? "text-blue-400"
                : "hover:text-blue-400"
            } transition`}
          >
            Home
          </a>
          <a
            href="#about"
            className={`${
              activeSection === "about"
                ? "text-blue-400"
                : "hover:text-blue-400"
            } transition`}
          >
            About
          </a>
          <a
            href="#projects"
            className={`${
              activeSection === "projects"
                ? "text-blue-400"
                : "hover:text-blue-400"
            } transition`}
          >
            Projects
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 py-32 max-w-7xl mx-auto"
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
            <button className="bg-blue-500 px-6 py-3 rounded-lg text-white">
              Explore My Projects
            </button>
            <button className="border border-blue-400 text-blue-400 px-6 py-3 rounded-lg">
              Download CV
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/profile_image.png"
            alt="Aman Sheoran"
            className="rounded-2xl object-cover w-full max-w-md"
            draggable="false"
          />
        </div>
      </section>


      {/* About Section */}
      <section
        id="about"
        className="min-h-screen snap-start bg-[#111f30] px-8 py-32 flex flex-col items-center justify-center gap-16"
      >
        <motion.h2
          className="text-4xl font-bold cursor-pointer hover:text-blue-400 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          About Me
        </motion.h2>
        <div className="max-w-4xl text-center text-gray-300 leading-relaxed">
          <p className="mb-6">
            I’m an engineer passionate about creating intelligent, resilient, and
            autonomous systems. My research interests span{" "}
            <b>robotics, computer vision, control systems, and embedded AI</b>.
            Through my work at IIT Delhi and internships at <b>BotLab Dynamics</b> 
            and research labs, I’ve developed advanced algorithms in swarm robotics,
            SLAM, and autonomous navigation.
          </p>
          <p className="mb-6">
            As <b>President of the Aeromodelling Club</b>, I’ve led a 40+ member team, 
            initiated MOUs with aviation startups, organized national workshops,
            and represented IIT Delhi at TechInter IIT. I also serve as 
            <b> Captain of the Girnar Hockey Team</b>, balancing academics, research, and leadership.
          </p>
          <p>
            My goal is to contribute to next-gen aerial robotics — combining
            <b> AI, autonomy, and systems design</b> to solve real-world challenges.
          </p>
        </div>

        <div
          ref={aboutImageRef}
          className="w-full overflow-x-auto whitespace-nowrap py-4 scrollbar-none select-none"
        >
          <div className="inline-flex gap-6">
            {[
              { src: "/photo1.png", alt: "Drone Operations" },
              { src: "/photo2.png", alt: "Research Lab" },
              { src: "/photo3.png", alt: "Flight Testing" },
              { src: "/photo4.png", alt: "Team at IITD" },
              { src: "/photo1.png", alt: "Drone Operations" },
              { src: "/photo2.png", alt: "Research Lab" },
              { src: "/photo3.png", alt: "Flight Testing" },
              { src: "/photo4.png", alt: "Team at IITD" },
              { src: "/photo1.png", alt: "Drone Operations" },
              { src: "/photo2.png", alt: "Research Lab" },
              { src: "/photo3.png", alt: "Flight Testing" },
              { src: "/photo4.png", alt: "Team at IITD" },
              ].map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                draggable="false"
                className="w-72 h-48 rounded-xl object-cover inline-block hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen snap-start px-8 py-32 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Highlighted Projects</h2>
        <div
          ref={projectsRef}
          className="w-full overflow-x-auto whitespace-nowrap py-4 scrollbar-none"
        >
          <div className="inline-flex gap-6">
            {projects.map((project, index) => (
              <HoverProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HoverProjectCard({ title, org, year, description, tech }) {
  return (
    <div className="bg-[#1e2c3c] p-8 rounded-xl shadow-lg transition-all w-[400px] h-[300px] inline-block group hover:scale-105 duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-400 bg-opacity-20 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-xl z-20" />
      <h3 className="text-2xl font-semibold text-white mb-3 relative z-30">
        {title}
      </h3>
      <p className="text-blue-400 mb-1 relative z-30">
        {org} • {year}
      </p>
      <div className="absolute inset-0 bg-[#1e2c3c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-xl z-40">
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        <p className="text-sm text-blue-400">Tech: {tech}</p>
      </div>
    </div>
  );
}
