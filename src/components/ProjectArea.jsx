"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, OrbitControls, Stars, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import Image from "next/image";

// Icons (using react-icons)
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaLaravel,
  FaLayerGroup,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiFlutter,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiFigma,
  SiTailwindcss,
  SiRender,
  SiNetlify,
} from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import { TbBrandThreejs, TbBrandFramerMotion } from "react-icons/tb";
import { RiJavascriptFill } from "react-icons/ri";

// Skill data organized by category
const skillCategories = [
  {
    title: "Technical Skills",
    skills: [
      {
        name: "JavaScript",
        icon: <RiJavascriptFill />,
        level: 98,
        color: "#F7DF1E",
      },
      { name: "React", icon: <FaReact />, level: 95, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, level: 90, color: "#000000" },
      {
        name: "TypeScript",
        icon: <SiTypescript />,
        level: 88,
        color: "#3178C6",
      },
      { name: "Node.js", icon: <FaNodeJs />, level: 95, color: "#68A063" },
      {
        name: "MERN",
        icon: <FaLayerGroup />,
        level: 95,
        color: "#049EF4",
      },
      {
        name: "Laravel",
        icon: <FaLaravel />,
        level: 85,
        color: "#FF2D20",
      },
      {
        name: "Flutter",
        icon: <SiFlutter />,
        level: 80,
        color: "#02569B",
      },
      {
        name: "TailwindCSS",
        icon: <SiTailwindcss />,
        level: 90,
        color: "#38BDF8",
      },
      ,
    ],
  },
  {
    title: "Software Skills",
    skills: [
      { name: "Git", icon: <FaGitAlt />, level: 90, color: "#F05032" },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql />,
        level: 85,
        color: "#336791",
      },
      { name: "MongoDB", icon: <SiMongodb />, level: 90, color: "#47A248" },
      { name: "Firebase", icon: <SiFirebase />, level: 91, color: "#FFCA28" },

      {
        name: "Render",
        icon: <SiRender />,
        level: 80,
        color: "#46E3B7",
      },
      {
        name: "Netlify",
        icon: <SiNetlify />,
        level: 85,
        color: "#00C7B7",
      },
    ],
  },
  {
    title: "Creative Skills",
    skills: [
      {
        name: "UI/UX Design",
        icon: <DiPhotoshop />,
        level: 67,
        color: "#31A8FF",
      },

      { name: "Python", icon: <FaPython />, level: 85, color: "#3776AB" },

      {
        name: "Figma",
        icon: <SiFigma />,
        level: 85,
        color: "#F24E1E",
      },
    ],
  },
];

// Progress bar component
const ProgressBar = ({ level, color }) => {
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="h-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

// Skill Card Component
const SkillCard = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30 hover:border-blue-400/30 transition-all duration-300 h-full"
    >
      <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
        {category.title}
      </h3>
      <div className="space-y-5">
        {category.skills.map((skill, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-3">
                {skill.icon ?
                  <div className="text-xl" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                : <div className="w-5 h-5 flex items-center justify-center">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                }
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
              <span className="text-gray-400 text-sm">{skill.level}%</span>
            </div>
            <ProgressBar level={skill.level} color={skill.color} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Deterministic skill positions for 3D orbs
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
    { name: "JavaScript", color: "#F7DF1E", level: 98 },
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

const projects = [
  {
    title: "3D Portfolio",
    description:
      "An immersive 3D portfolio with interactive elements and smooth animations built with Three.js and React.",
    tags: ["Three.js", "Nextjs", "Framer Motion"],
  },
];

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

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
      }}
      className="relative min-h-screen bg-gray-900/30 backdrop-blur-md text-white overflow-hidden ml-5"
    >
      {/* 3D Background */}
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
            My <span className="text-cyan-300">Skills</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} />
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
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
            Featured <span className="text-cyan-300">Projects</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
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

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
