"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const projectsRef = useRef(null);
  const aboutImageRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");

  // Smooth auto-scroll for About section images
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

  // Smooth auto-scroll for Projects carousel
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

  // Active navigation section tracking
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
      title: "Thermal SLAM Drone",
      org: "IITD Research",
      year: "2024",
      description:
        "Designed algorithms to handle motor failure and lighting variation for autonomous navigation.",
      tech: "Python, ROS, PyTorch, OpenCV, C++",
    },
    {
      title: "Fail-Safe Quadcopter",
      org: "ideaForge",
      year: "2024",
      description:
        "Built automated GPS-based recovery system and stabilized quadcopters under failure conditions.",
      tech: "ROS2, PX4, UAV Hardware",
    },
    {
      title: "Autonomous Landing Pad Detection",
      org: "AeroClub Project",
      year: "2024",
      description:
        "Implemented computer vision-based precision landing system with thermal + RGB fusion for moving platforms.",
      tech: "OpenCV, TensorFlow, ROS, Jetson Nano",
    },
    {
      title: "Drone Fleet Coordination System",
      org: "IITD Lab Simulation",
      year: "2024",
      description:
        "Built decentralized multi-drone path planning algorithms for coordinated area surveillance missions.",
      tech: "Python, ROS2, PX4, Swarm AI",
    },
  ];

  // 🔹 FIXED: image list with unique keys for repeated images
  const imageFiles = [
    { src: "/photo1.jpg", alt: "Aman 1" },
    { src: "/photo2.png", alt: "Aman 2" },
    { src: "/photo3.png", alt: "Aman 3" },
    { src: "/photo4.png", alt: "Aman 4" },
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
        <div className="max-w-4xl text-center">
          <p className="text-gray-300 mb-6">
            I am a passionate engineer from IIT Delhi, blending my skills in
            machine learning, robotics, and aerospace engineering to develop
            cut
