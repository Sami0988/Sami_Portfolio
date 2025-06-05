"use client";
import { Suspense, useState, useEffect } from "react";
import { Loader } from "@react-three/drei";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

const SkillCard = ({ skill, color, isActive }) => {
  return (
    <motion.div
      className={`relative p-6 rounded-xl overflow-hidden border-2 ${
        isActive ? "border-blue-400 shadow-lg" : "border-gray-700"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        y: 0,
        background:
          isActive ?
            `linear-gradient(135deg, ${color}20, #1e293b)`
          : `linear-gradient(135deg, #1e293b, #0f172a)`,
        transform: isActive ? "scale(1.02)" : "scale(1)",
        boxShadow:
          isActive ? `0 0 15px ${color}80` : "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center mb-3">
        <div
          className="w-4 h-4 rounded-full mr-3 shadow-md"
          style={{ backgroundColor: color }}
        />
        <h3 className="text-lg font-semibold text-white">{skill}</h3>
      </div>
      <p className="text-gray-300 text-sm">{getSkillDescription(skill)}</p>
      {isActive && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-20"
          style={{ backgroundColor: color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
};

const getSkillDescription = (skill) => {
  const descriptions = {
    React:
      "Built 20+ production apps with React hooks, context, and advanced state management.",
    NextJS:
      "Expert in SSR, SSG, and ISR for SEO-friendly, high-performance applications.",
    Laravel: "Developed robust web applications with Laravel MVC architecture.",
    MERN: "Full-stack applications with MongoDB, Express, React, and Node.js",
    Flutter:
      "Built beautiful, natively compiled applications for mobile and web.",
    Firebase:
      "Integrated realtime databases, authentication, and cloud functions.",
    Node: "Designed scalable backend services with Express and GraphQL.",
    MongoDB: "Designed NoSQL database architectures for flexible data models.",
    PostgreSQL:
      "Implemented complex relational database schemas with optimal queries.",
    Cisco: "Network configuration and management with Cisco technologies.",
  };
  return (
    descriptions[skill] ||
    "Proficient in this technology with production experience."
  );
};

const EducationContent = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-blue-300 flex items-center">
      <span className="mr-2">🎓</span> Dire Dawa University
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-400/30">
        <h4 className="text-lg font-semibold text-white mb-2">
          BSc in Computer Science
        </h4>
        <p className="text-gray-300">2020 - 2024</p>
        <p className="text-gray-400 mt-2">
          Graduated with honors, specializing in software engineering and
          network systems
        </p>
      </div>
      <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-400/30">
        <h4 className="text-lg font-semibold text-white mb-2">Key Courses</h4>
        <ul className="text-gray-300 space-y-1">
          <li>• Advanced Programming</li>
          <li>• Database Systems</li>
          <li>• Computer Networks</li>
          <li>• Artificial Intelligence</li>
          <li>• Software Engineering</li>
        </ul>
      </div>
    </div>
    <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-400/30">
      <h4 className="text-lg font-semibold text-white mb-2">
        University Projects
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {[
          {
            title: "School Management System",
            description: "Automated school tracking with Role base access",
            tech: "Java, MySQL ,Scenebuilder",
          },
          {
            title: "Network Simulation",
            description: "Cisco packet tracer implementations",
            tech: "Cisco IOS",
          },
          {
            title: "E-Commerce Platform",
            description: "Online store with payment integration",
            tech: "HTML,CSS, JavaScript",
          },
          {
            title: "Ethio-Djibouti Ticket Booking App",
            description: "Online store with payment integration",
            tech: "Flutter, JavaScript, Firebase, php",
          },
        ].map((project, i) => (
          <motion.div
            key={i}
            className="bg-gray-700/50 p-4 rounded-lg border border-gray-600"
            whileHover={{ y: -5 }}
          >
            <h5 className="font-medium text-blue-200">{project.title}</h5>
            <p className="text-sm text-gray-400">{project.description}</p>
            <p className="text-xs text-gray-500 mt-2">{project.tech}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const SkillsContent = ({
  skills,
  activeTab,
  setActiveTab,
  hoveredSkill,
  setHoveredSkill,
}) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-blue-300 flex items-center">
      <span className="mr-2">💻</span> Technical Skills
    </h3>
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.keys(skills).map((tab) => (
        <motion.button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-all ${
            activeTab === tab ?
              "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.replace(/([A-Z])/g, " $1").trim()}
        </motion.button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills[activeTab].map((skill) => (
        <div
          key={skill.name}
          onMouseEnter={() => setHoveredSkill(skill.name)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <SkillCard
            skill={skill.name}
            color={skill.color}
            isActive={hoveredSkill === skill.name}
          />
        </div>
      ))}
    </div>
  </div>
);

const contentSections = [
  {
    id: "skills",
    title: "Technical Skills",
    icon: "💻",
    component: SkillsContent,
  },
  {
    id: "education",
    title: "Education",
    icon: "🎓",
    component: EducationContent,
  },
  // Add more sections as needed
];

const ThreeSceneContent = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeTab, setActiveTab] = useState("web");
  const [currentSection, setCurrentSection] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills = {
    web: [
      { name: "React", color: "#61dafb" },
      { name: "NextJS", color: "#000000" },
      { name: "Laravel", color: "#3178c6" },
      { name: "MERN", color: "#049ef4" },
    ],
    mobile: [
      { name: "Flutter", color: "#02569b" },
      { name: "Firebase", color: "#f05138" },
    ],
    backend: [
      { name: "Node", color: "#68a063" },
      { name: "MongoDB", color: "#47a248" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Firebase", color: "#ffca28" },
    ],
    databaseAdmin: [
      { name: "MongoDB", color: "#47a248" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Firebase", color: "#ffca28" },
      { name: "sql", color: "#47a248" },
    ],
    network: [{ name: "Cisco", color: "#1ba0d7" }],
    frameworks: [
      { name: "TailwindCSS", color: "#38bdf8" },
      { name: "DaisyUI", color: "#a855f7" },
      { name: "Bootstrap", color: "#7952b3" },

      { name: "Material UI", color: "#007fff" },
    ],
  };

  const nextSection = () => {
    setCurrentSection((prev) =>
      prev === contentSections.length - 1 ? 0 : prev + 1
    );
  };

  const prevSection = () => {
    setCurrentSection((prev) =>
      prev === 0 ? contentSections.length - 1 : prev - 1
    );
  };

  const CurrentComponent = contentSections[currentSection].component;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-40"></div>

        {/* Floating tech icons */}
        {["React", "NextJS", "Flutter", "Node", "MongoDB"].map((tech, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {tech === "React" && <span>⚛️</span>}
            {tech === "NextJS" && <span>🅱️</span>}
            {tech === "Flutter" && <span>📱</span>}
            {tech === "Node" && <span>🟢</span>}
            {tech === "MongoDB" && <span>🍃</span>}
          </motion.div>
        ))}

        {/* Floating particles */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/20"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 40 - 10, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <motion.button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/90 border border-gray-600 shadow-lg text-white"
        onClick={prevSection}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiChevronLeft size={24} />
      </motion.button>

      <motion.button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/90 border border-gray-600 shadow-lg text-white"
        onClick={nextSection}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiChevronRight size={24} />
      </motion.button>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col gap-12">
          {/* Main content card */}
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: currentSection === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentSection === 0 ? 20 : -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-gray-900/70 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-500 relative overflow-hidden min-h-[600px]"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>

            <div className="relative z-10">
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <motion.div
                    className="w-40 h-40 rounded-full border-2 border-blue-400 overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                      {!hasError ?
                        <Image
                          src="/icons/man.jpg"
                          alt="Profile"
                          width={160}
                          height={160}
                          className="rounded-full object-cover"
                          onError={() => setHasError(true)}
                        />
                      : <>👨‍💻</>}
                    </div>
                  </motion.div>
                  <div>
                    <motion.h1 className="text-4xl md:text-5xl font-bold mb-2">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-200 animate-text-shine">
                        Samuel Zelalem
                      </span>
                    </motion.h1>
                    <motion.h2 className="text-xl md:text-2xl text-blue-300 flex items-center">
                      <span className="animate-pulse">✨</span>
                      <span className="ml-2">
                        Full Stack Web & Mobile Developer
                      </span>
                    </motion.h2>
                  </div>
                </motion.div>

                <motion.p
                  className="text-gray-300 mb-8 text-lg leading-relaxed opacity-90 hover:opacity-100 transition-opacity duration-300 max-w-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Passionate full-stack developer skilled in building responsive
                  web and mobile applications using modern technologies like
                  React and Flutter, with a growing expertise in crafting
                  immersive and cool web for your buisness.
                </motion.p>
              </div>

              {/* Current content section */}
              {currentSection === 0 ?
                <SkillsContent
                  skills={skills}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  hoveredSkill={hoveredSkill}
                  setHoveredSkill={setHoveredSkill}
                />
              : <EducationContent />}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading indicator */}
      <Loader
        containerStyles={{ backgroundColor: "rgba(5, 8, 22, 0.8)" }}
        innerStyles={{ backgroundColor: "#3b82f6" }}
        barStyles={{ backgroundColor: "#3b82f6" }}
        dataStyles={{ color: "#ffffff" }}
      />
    </div>
  );
};

export default function ThreeScene() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              className="mt-4 text-blue-400 text-lg"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Crafting your digital experience...
            </motion.p>
          </motion.div>
        </div>
      }
    >
      <ThreeSceneContent />
    </Suspense>
  );
}
