"use client";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

// Flying Birds Component - Improved with better bird shapes
const Birds = ({ count = 5 }) => {
  const birdsRef = useRef([]);
  const [birdPositions, setBirdPositions] = useState([]);

  useEffect(() => {
    setBirdPositions(
      Array.from({ length: count }).map(() => [
        Math.random() * 10 - 15,
        Math.random() * 6 - 3,
        -10,
      ])
    );
    birdsRef.current = [];
  }, [count]);

  useFrame((state) => {
    birdsRef.current.forEach((bird, index) => {
      if (bird) {
        const speed = 0.05 + Math.sin(index) * 0.02;
        const altitude = Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.8;

        bird.position.x += speed;
        bird.position.y = altitude;
        bird.rotation.z = Math.sin(state.clock.elapsedTime * 5 + index) * 0.2;

        if (bird.position.x > 15) {
          bird.position.set(
            -15 - Math.random() * 5,
            Math.random() * 6 - 3,
            -10
          );
        }
      }
    });
  });

  return (
    <>
      {birdPositions.map((pos, i) => (
        <group key={i} ref={(el) => (birdsRef.current[i] = el)} position={pos}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[0.15, 0.3, 3]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
        </group>
      ))}
    </>
  );
};

// Water Flow Background Component
const WaterFlow = () => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth left-to-right flowing movement with easing
      groupRef.current.position.x =
        -3 + Math.sin(state.clock.elapsedTime * 0.2) * 4;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[3.5, 64, 64]} position={[0, 0, -15]}>
        <MeshDistortMaterial
          color="#4a8fe7"
          emissive="#2e5a9c"
          distort={0.7}
          speed={1.8}
          roughness={0.15}
          metalness={0.25}
          transparent
          opacity={0.35}
        />
      </Sphere>
    </group>
  );
};

export default function OverlayUI() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setIsVisible(true);
    return () => clearInterval(timer);
  }, []);

  const projects = [
    {
      title: "Ticket Booking App",
      description: "A mobile app to book tickets easily and manage schedules.",
      image: "/icons/proj3.png",
      technologies: ["Flutter", "Firebase", "Node.js", "Redux"],
      accentColor: "#06b6d4", // cyan-500
    },
    {
      title: "Store Management System",
      description: "Manage inventory, sales, and customers with ease.",
      image: "/icons/proj2.png",
      technologies: ["React", "MongoDB", "Express", "Node.js"],
      accentColor: "#8b5cf6", // violet-500
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive personal website built with React.",
      image: "/icons/proj5.png",
      technologies: ["Next.js", "Tailwind CSS", "Three.js", "Framer Motion"],
      accentColor: "#ec4899", // pink-500
    },
    {
      title: "Admin Dashboaed controller",
      description: "Full-featured online shopping experience.",
      image: "/icons/proj4.png",
      technologies: ["React", "RESTfull", "SQL"],
      accentColor: "#f97316", // orange-500
    },
    {
      title: "Zoo Finder",
      description: "Real-time Animal Zoo visualization.",
      image: "/icons/proj1.png",
      technologies: ["Javascript", "HTML", "CSS"],
      accentColor: "#22d3ee", // cyan-400
    },
    {
      title: "Pharmacy Management App",
      description: "Collaborative task management solution.",
      image: "/icons/proj6.png",
      technologies: ["MERN", "Mongoose", "Tailwind CSS"],
      accentColor: "#10b981", // emerald-500
    },
  ];

  // Format time with AM/PM
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Nature Background Image - Kept as you love it */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* 3D Canvas with Water and Birds - Kept as you love it */}
      <div className="fixed inset-0 z-1">
        <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.4} />
          <WaterFlow />
          <Birds count={7} />
        </Canvas>
      </div>

      {/* Enhanced Watercolor Overlay with gradient */}
      <div className="absolute inset-0 z-2 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/15 backdrop-blur-[1px]"></div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Enhanced Header with time and better styling */}
        <header
          className={`pt-12 px-8 pb-8 flex justify-between items-center transition-all duration-1000 ${
            isVisible ?
              "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
          }`}
        >
          <div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-white drop-shadow-2xl">
              Project Showcase
            </h1>
            <p className="text-cyan-100/90 mt-2 font-light">
              Interactive portfolio of my latest work
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-2xl font-mono font-medium text-cyan-100">
              {formattedTime}
            </div>
            <div className="text-sm text-cyan-100/80">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </header>

        {/* Project Cards Section - Enhanced with hover effects */}
        <section
          className={`px-8 py-8 flex-1 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="relative z-10 px-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                Featured Projects
              </span>
            </span>
            <span className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: `${300 + index * 100}ms`,
                  border: `1px solid ${project.accentColor}40`,
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${project.accentColor}20 0%, transparent 70%)`,
                  }}
                />

                {/* Project image with parallax effect */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Project content */}
                <div className="p-6 relative">
                  <div className="flex justify-between items-start mb-3">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: project.accentColor }}
                    >
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-cyan-100/90 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full backdrop-blur-sm"
                        style={{
                          backgroundColor: `${project.accentColor}20`,
                          border: `1px solid ${project.accentColor}30`,
                          color: project.accentColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Animated button */}
                  <button
                    className="w-full py-2 rounded-lg font-medium transition-all duration-300 overflow-hidden relative group"
                    style={{
                      backgroundColor: `${project.accentColor}30`,
                      border: `1px solid ${project.accentColor}50`,
                    }}
                  >
                    <span className="relative z-10">View Project Details</span>
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        transform: "translateX(-100%)",
                        animation: "shine 2s infinite",
                      }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Footer with subtle animation */}
        <footer
          className={`py-12 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-md mx-auto">
            <p className="text-cyan-200/90 mb-6 text-lg">
              Like what you see? Let's build something amazing together!
            </p>
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105">
              Contact Me
            </button>
          </div>

          {/* Floating arrow with animation */}
          <div className="mt-16 animate-float">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cyan-300 mx-auto"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </footer>
      </div>
    </div>
  );
}
