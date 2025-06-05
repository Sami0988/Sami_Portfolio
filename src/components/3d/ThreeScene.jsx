"use client";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Stars,
  Text,
  Float,
  Loader,
} from "@react-three/drei";

const LaptopModel = () => {
  const laptopRef = useRef();

  useFrame((state) => {
    if (!laptopRef.current) return;
    laptopRef.current.rotation.y += 0.002;
    laptopRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

      <group position={[0, 0.5, -0.8]} rotation={[-0.5, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.8, 1.7, 0.1]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.7, 1.6]} />
          <meshStandardMaterial
            color="#0078d7"
            emissive="#0078d7"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      <mesh position={[0, -0.35, 0.2]} rotation={[0.1, 0, 0]}>
        <planeGeometry args={[2.8, 1.4]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
};

const TechIcon = ({ position, skill, color }) => {
  const ref = useRef();

  const getShape = (techName) => {
    switch (techName) {
      case "React":
        return <circleGeometry args={[0.4, 32]} />;
      case "NextJS":
        return <boxGeometry args={[0.8, 0.8, 0.1]} />;
      case "TypeScript":
        return <torusGeometry args={[0.35, 0.1, 16, 32]} />;
      case "Node":
        return <dodecahedronGeometry args={[0.4]} />;
      case "ThreeJS":
        return <coneGeometry args={[0.4, 0.8, 4]} />;
      case "React Native":
        return <circleGeometry args={[0.4, 6]} />;
      case "Flutter":
        return <octahedronGeometry args={[0.4]} />;
      case "Swift":
        return <tetrahedronGeometry args={[0.5]} />;
      case "MongoDB":
        return <sphereGeometry args={[0.4, 32, 32]} />;
      case "PostgreSQL":
        return <cylinderGeometry args={[0.4, 0.4, 0.1, 6]} />;
      case "Firebase":
        return <coneGeometry args={[0.4, 0.6, 3]} />;
      case "Docker":
        return <boxGeometry args={[0.8, 0.5, 0.1]} />;
      case "AWS":
        return <torusKnotGeometry args={[0.3, 0.1, 100, 16]} />;
      case "Kubernetes":
        return <icosahedronGeometry args={[0.4]} />;
      default:
        return <boxGeometry args={[0.8, 0.8, 0.1]} />;
    }
  };

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.005;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={ref} position={position}>
        <mesh>
          {getShape(skill)}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>
      </group>
    </Float>
  );
};

const ThreeSceneContent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills = [
    { name: "React", color: "#61dafb" },
    { name: "NextJS", color: "#000000" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Node", color: "#68a063" },
    { name: "ThreeJS", color: "#049ef4" },
    { name: "React Native", color: "#61dafb" },
    { name: "Flutter", color: "#02569b" },
    { name: "Swift", color: "#f05138" },
    { name: "MongoDB", color: "#47a248" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "Firebase", color: "#ffca28" },
    { name: "Docker", color: "#2496ed" },
    { name: "AWS", color: "#ff9900" },
    { name: "Kubernetes", color: "#326ce5" },
  ];

  const radius = 8;
  const skillPositions = skills.map((skill, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    return {
      ...skill,
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * 0.5,
        Math.sin(angle) * radius,
      ],
    };
  });

  return (
    <div className="relative h-screen w-full flex bg-gradient-to-br from-gray-900 to-blue-900/30">
      {/* Left content (40% width) */}
      <div className="w-full md:w-2/5 p-4 md:p-8 flex flex-col justify-center z-10">
        <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border-l-[6px] border-blue-400 shadow-2xl shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-500 hover:border-blue-300">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-200 animate-text-shine">
              Samuel Zelalem
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-blue-300 mb-6 flex items-center">
            <span className="animate-pulse">✨</span>
            <span className="ml-2">Full Stack & Mobile Developer</span>
          </h2>

          <p className="text-gray-300 mb-8 text-lg leading-relaxed opacity-90 hover:opacity-100 transition-opacity duration-300">
            Expert in building high-performance web and mobile applications with
            modern technologies and immersive 3D web experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900/40 hover:bg-gray-900/60 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-blue-400 font-semibold mb-3 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Web Technologies
              </h3>
              <ul className="space-y-3">
                {["React/Next.js", "Three.js/WebGL", "Node.js"].map((tech) => (
                  <li key={tech} className="flex items-center group">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-all"></span>
                    <span className="text-white group-hover:text-blue-100 transition-all">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900/40 hover:bg-gray-900/60 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-blue-400 font-semibold mb-3 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Mobile & More
              </h3>
              <ul className="space-y-3">
                {["React Native", "Database Systems", "Cloud & DevOps"].map(
                  (tech) => (
                    <li key={tech} className="flex items-center group">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-all"></span>
                      <span className="text-white group-hover:text-blue-100 transition-all">
                        {tech}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white font-medium transition-all duration-300 overflow-hidden group flex-1">
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
            <button className="relative px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg text-white font-medium transition-all duration-300 overflow-hidden group flex-1">
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Right content (60% width) - 3D Canvas */}
      <div className="hidden md:block w-3/5 h-full relative">
        {mounted && (
          <Canvas
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            shadows
            camera={{ position: [0, 5, 15], fov: 50 }}
            gl={{ antialias: true }}
          >
            <color attach="background" args={["#050816"]} />
            <ambientLight intensity={0.3} color="#3b82f6" />
            <directionalLight
              position={[10, 10, 10]}
              intensity={1.5}
              castShadow
            />
            <pointLight position={[0, 5, 5]} intensity={0.5} color="#3b82f6" />
            <Suspense fallback={null}>
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                fade
                speed={1}
              />
              <LaptopModel />
              {skillPositions.map(({ name, color, position }) => (
                <TechIcon
                  key={name}
                  skill={name}
                  color={color}
                  position={position}
                />
              ))}
              <Environment preset="city" />
            </Suspense>
            <OrbitControls
              enableZoom={true}
              minDistance={10}
              maxDistance={25}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        )}
      </div>

      {/* Loading indicator */}
      <Loader />
    </div>
  );
};

export default function ThreeScene() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-gray-900">
          Loading...
        </div>
      }
    >
      <ThreeSceneContent />
    </Suspense>
  );
}
