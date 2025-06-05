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
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&h=400&q=60",
    },
    {
      title: "Store Management System",
      description: "Manage inventory, sales, and customers with ease.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&h=400&q=60",
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive personal website built with React.",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydGZvbGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&h=400&q=60",
    },
    {
      title: "Ticket Booking App",
      description: "A mobile app to book tickets easily and manage schedules.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&h=400&q=60",
    },
    {
      title: "Store Management System",
      description: "Manage inventory, sales, and customers with ease.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&h=400&q=60",
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive personal website built with React.",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydGZvbGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&h=400&q=60",
    },
  ];

  // Using a specific high-quality nature image
  const backgroundImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Nature Background Image - Now using specific reliable image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* 3D Canvas with Water and Birds */}
      <div className="fixed inset-0 z-1">
        <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.4} />
          <WaterFlow />
          <Birds count={7} />
        </Canvas>
      </div>

      {/* Watercolor Overlay */}
      <div className="absolute inset-0 z-2 bg-[#4a8fe7]/15 backdrop-blur-[2px]"></div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header
          className={`pt-16 px-8 pb-12 flex justify-between items-center transition-all duration-1000 ${
            isVisible ?
              "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
          }`}
        >
          <h1 className="text-4xl font-bold drop-shadow-lg">
            <span className="text-cyan-200 animate-pulse">Sami</span> Portfolio
          </h1>
          <div className="text-cyan-100 text-lg font-mono bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
            {currentTime.toLocaleTimeString()}
          </div>
        </header>

        {/* Project Cards Section */}
        <section
          className={`px-8 py-12 flex-1 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-semibold text-cyan-100 mb-12 text-center">
            My <span className="text-white font-bold">Projects</span>
          </h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bg-white/15 border border-cyan-200/30 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:shadow-cyan-200/30 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-cyan-200">{project.description}</p>
                  <button className="mt-4 px-4 py-2 bg-cyan-600/70 hover:bg-cyan-500 rounded-lg transition-colors duration-300 text-sm">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Message */}
        <div
          className={`pb-20 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-cyan-200 text-xl animate-bounce">
            ↓ Explore more below ↓
          </p>
        </div>

        {/* Watermark */}
        <div className="pb-8 pr-8 text-right">
          <p className="text-cyan-200/80 text-sm inline-block bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
            © {new Date().getFullYear()} Professional Portfolio
          </p>
        </div>
      </div>
    </div>
  );
}
