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
      I am a passionate engineer from IIT Delhi, blending my skills in machine learning, robotics,
      and aerospace engineering to develop cutting-edge autonomous systems. My leadership experience
      in AeroClub, Hockey Team, and Alumni Association reflects my dedication to both technical growth
      and team-building.
    </p>
    <p className="text-gray-300 mb-6">
      My vision is to solve real-world challenges by fusing robotics, AI, and computer vision with
      hands-on engineering to create intelligent systems capable of operating in dynamic environments.
    </p>
  </div>

  {/* 🔹 Clean, stable image carousel */}
  <div
    ref={aboutImageRef}
    className="w-full overflow-x-auto whitespace-nowrap py-4 scrollbar-none"
  >
    <div className="inline-flex gap-6">
      {[
        { src: "/photo1.jpg", alt: "Aman 1" },
        { src: "/photo2.png", alt: "Aman 2" },
        { src: "/photo3.png", alt: "Aman 3" },
        { src: "/photo4.png", alt: "Aman 4" },
        // repeated once more for smooth looping
        { src: "/photo1.jpg", alt: "Aman 1" },
        { src: "/photo2.png", alt: "Aman 2" },
        { src: "/photo3.png", alt: "Aman 3" },
        { src: "/photo4.png", alt: "Aman 4" },
      ].map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt}
          onError={(e) => (e.target.style.display = "none")} // hide broken images
          className="w-72 h-48 rounded-xl object-cover inline-block hover:scale-105 transition-transform duration-300"
        />
      ))}
    </div>
  </div>
</section>
