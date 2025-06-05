"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, OrbitControls, Stars, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

// Deterministic skill positions based on index
const getSkillPosition = (index, total) => {
  const radius = 5;
  const angle = (index / total) * Math.PI * 2;
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * 0.5,
    Math.sin(angle) * radius,
  ];
};

const SkillOrb = ({
  skill,
  position,
  color,
  hoveredSkill,
  setHoveredSkill,
}) => {
  const ref = useRef();
  const isHovered = hoveredSkill === skill;

  useFrame((state) => {
    if (!ref.current) return;

    const baseY = position[1];
    const hoverOffset = isHovered ? 1 : 0;
    const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;

    ref.current.rotation.y += isHovered ? 0.02 : 0.005;
    ref.current.position.y = baseY + pulse + hoverOffset;
    ref.current.scale.x =
      ref.current.scale.y =
      ref.current.scale.z =
        THREE.MathUtils.lerp(ref.current.scale.x, isHovered ? 1.2 : 1, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group
        ref={ref}
        position={position}
        onPointerOver={() => setHoveredSkill(skill)}
        onPointerOut={() => setHoveredSkill(null)}
      >
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isHovered ? 0.8 : 0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.95}
          />
        </mesh>
        <Text
          position={[0, 0, 0.6]}
          fontSize={isHovered ? 0.35 : 0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
          outlineOpacity={0.8}
        >
          {skill}
        </Text>
        {isHovered && (
          <Sparkles
            position={[0, 0, 0]}
            count={20}
            scale={1.5}
            size={3}
            speed={0.2}
            color={color}
          />
        )}
      </group>
    </Float>
  );
};

const FloatingSkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const skills = [
    { name: "React", color: "#61DAFB", level: 95 },
    { name: "Next.js", color: "#000000", level: 90 },
    { name: "Three.js", color: "#049EF4", level: 85 },
    { name: "Node.js", color: "#68A063", level: 88 },
    { name: "TypeScript", color: "#3178C6", level: 92 },
    { name: "React Native", color: "#61DAFB", level: 85 },
    { name: "Flutter", color: "#02569B", level: 80 },
    { name: "AWS", color: "#FF9900", level: 83 },
  ];

  return (
    <>
      {skills.map((skill, i) => (
        <SkillOrb
          key={skill.name}
          skill={skill.name}
          position={getSkillPosition(i, skills.length)}
          color={skill.color}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
        />
      ))}
    </>
  );
};

const ProjectCard = ({ title, description, tags, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        hover: { duration: 0.3 },
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-gradient-to-br from-gray-800/20 to-gray-900/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/30 shadow-2xl overflow-hidden relative group h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 h-full flex flex-col">
        <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
          {title}
        </h3>
        <p className="text-gray-300 mb-5 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-gray-800/50 text-sm rounded-full border border-gray-700/50 backdrop-blur-sm"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full filter blur-xl group-hover:blur-2xl transition-all duration-500" />
      <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-500/10 rounded-full filter blur-lg group-hover:blur-xl transition-all duration-700" />
    </motion.div>
  );
};

const SkillCategory = ({ name, skills, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800/20 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 hover:border-blue-400/30 transition-all duration-300"
    >
      <h4 className="text-lg font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
        {name}
      </h4>
      <p className="text-gray-300 text-sm leading-relaxed">{skills}</p>
    </motion.div>
  );
};

// Deterministic particle positions
const Particle = ({ index }) => {
  const x = 50 + (index % 10) * 10;
  const y = 10 + Math.floor(index / 10) * 10;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: 10 + (index % 3),
        repeat: Infinity,
        ease: "linear",
        delay: index * 0.2,
      }}
      className="absolute w-1 h-1 bg-blue-400 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${1 + (index % 3)}px`,
        height: `${1 + (index % 3)}px`,
      }}
    />
  );
};

export default function ProjectArea() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const projects = [
    {
      title: "3D Portfolio",
      description:
        "An immersive 3D portfolio with interactive elements and smooth animations built with Three.js and React.",
      tags: ["Three.js", "React", "Framer Motion", "GSAP"],
    },
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with Stripe payment integration, inventory management, and analytics dashboard.",
      tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Mobile Fitness App",
      description:
        "Cross-platform fitness tracking application with AI-powered workout recommendations and progress analytics.",
      tags: ["React Native", "Firebase", "TensorFlow.js", "Expo"],
    },
    {
      title: "AR Product Viewer",
      description:
        "Augmented reality product visualization for e-commerce websites with WebXR and Three.js.",
      tags: ["Three.js", "AR.js", "WebXR", "Blender"],
    },
    {
      title: "Real-time Dashboard",
      description:
        "Data visualization dashboard with real-time updates using WebSockets and custom D3.js charts.",
      tags: ["D3.js", "WebSockets", "Node.js", "PostgreSQL"],
    },
    {
      title: "AI Content Generator",
      description:
        "AI-powered content generation tool with GPT-3.5 integration and custom fine-tuning.",
      tags: ["OpenAI", "Next.js", "Node.js", "Tailwind CSS"],
    },
  ];

  const skillCategories = [
    { name: "Frontend", skills: "React, Next.js, Three.js, GSAP, Tailwind" },
    { name: "Backend", skills: "Node.js, Express, Django, Flask, GraphQL" },
    { name: "Mobile", skills: "React Native, Flutter, Expo, SwiftUI" },
    { name: "DevOps", skills: "AWS, Docker, Kubernetes, CI/CD Pipelines" },
    { name: "Databases", skills: "MongoDB, PostgreSQL, Firebase, Redis" },
    { name: "Design", skills: "Figma, Framer Motion, Adobe Suite, Blender" },
    { name: "AI/ML", skills: "TensorFlow, OpenAI API, LLMs, Computer Vision" },
    { name: "Web3", skills: "Ethereum, Solidity, Smart Contracts, Web3.js" },
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
      }}
      className="relative min-h-screen bg-gray-900 text-white overflow-hidden ml-5"
    >
      {/* 3D Background - Client-side only */}
      <div className="absolute inset-0 h-screen w-full pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <Suspense fallback={null}>
            <Stars
              radius={150}
              depth={70}
              count={3000}
              factor={6}
              saturation={0}
              fade
              speed={0.5}
            />
            <FloatingSkills />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 3}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">
            My <span className="text-cyan-300">Skills</span> &{" "}
            <span className="text-purple-300">Projects</span>
          </h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Cutting-edge solutions built with modern technologies and innovative
            design
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Technical <span className="text-cyan-300">Expertise</span>
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={category.name}
                {...category}
                delay={index * 0.1 + 0.3}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Ready to build something amazing?
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Deterministic floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
