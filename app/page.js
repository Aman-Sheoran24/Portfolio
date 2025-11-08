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

  {/* Cleaned-up image carousel */}
  <div
    ref={aboutImageRef}
    className="w-full overflow-x-auto whitespace-nowrap py-4 scrollbar-none select-none"
  >
    <div className="inline-flex gap-6">
      {Array.from({ length: 2 }).map((_, repeatIndex) =>
        [
          { src: "/photo1.png", alt: "Drone Meeting" },
          { src: "/photo2.png", alt: "Drone Workshop" },
          { src: "/photo3.png", alt: "Drone Team" },
          { src: "/photo4.png", alt: "Drone Design" },
        ].map((img, i) => (
          <img
            key={`${repeatIndex}-${i}`}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            draggable="false"
            className="w-72 h-48 rounded-xl object-cover inline-block hover:scale-105 transition-transform duration-300"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ))
      )}
    </div>
  </div>
</section>
