"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  useTexture,
  RoundedBox,
} from "@react-three/drei";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiUser,
  FiMessageSquare,
  FiInstagram,
  FiPhone,
  FiSend,
  FiX,
} from "react-icons/fi";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

// Modern Smartphone with Enhanced Animation
function SmartphoneWithMessage(props) {
  const meshRef = useRef();
  const [messageSent, setMessageSent] = useState(false);
  const [activeApp, setActiveApp] = useState(null);

  // Load texture for screen
  const screenTexture = useTexture({
    map: "/icons/screen-texture.jpg", // Replace with your texture path
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth floating animation
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;

    // Message animation timing
    if (state.clock.getElapsedTime() % 10 < 0.1) {
      setMessageSent(!messageSent);
    }
  });

  // App icon colors
  const appColors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#ef4444", // red
    "#f59e0b", // yellow
    "#8b5cf6", // purple
  ];

  return (
    <group ref={meshRef} {...props}>
      {/* Phone body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.4, 0.15]} />
        <meshStandardMaterial
          color="#f3f4f6"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Screen bezel */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1.15, 2.35, 0.02]} />
        <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.1} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[1.1, 2.3]} />
        <meshStandardMaterial
          color="#1e40af"
          {...screenTexture}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Screen content */}
      <group position={[0, 0, 0.1]}>
        {/* Message bubbles */}
        <motion.group
          animate={{
            y: messageSent ? 0.3 : -0.3,
            opacity: messageSent ? [0, 1] : [1, 0],
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <RoundedBox
            position={[0.3, 0.2, 0]}
            args={[0.7, 0.4, 0.01]}
            radius={0.05}
            smoothness={4}
            scale={[0.7, 0.4, 0.01]}
          >
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#3b82f6"
              emissiveIntensity={0.3}
            />
          </RoundedBox>

          <RoundedBox
            position={[-0.3, -0.2, 0]}
            args={[0.7, 0.4, 0.01]}
            radius={0.05}
            smoothness={4}
            scale={[0.7, 0.4, 0.01]}
          >
            <meshStandardMaterial
              color="#e5e7eb"
              emissive="#e5e7eb"
              emissiveIntensity={0.1}
            />
          </RoundedBox>
        </motion.group>

        {/* App icons */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((xPos, i) => (
          <RoundedBox
            key={i}
            position={[xPos, 0.8, 0]}
            args={[0.2, 0.2, 0.01]}
            radius={0.03}
            smoothness={4}
            scale={activeApp === i ? [0.25, 0.25, 0.01] : [0.2, 0.2, 0.01]}
            onClick={() => setActiveApp(activeApp === i ? null : i)}
            onPointerOver={() => setActiveApp(i)}
            onPointerOut={() => activeApp === i && setActiveApp(null)}
          >
            <meshStandardMaterial
              color={appColors[i]}
              emissive={appColors[i]}
              emissiveIntensity={activeApp === i ? 0.5 : 0.1}
            />
          </RoundedBox>
        ))}
      </group>

      {/* Camera notch */}
      <mesh position={[0, 1.1, 0.075]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

const ContactPage3D = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSocial, setActiveSocial] = useState(null);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset form after animation
    setTimeout(() => {
      setIsSubmitted(false);
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 4000);
  };

  // Social media links with proper icons and colors
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub size={18} />,
      url: "https://github.com",
      color: "from-gray-800 to-gray-900",
      hoverColor: "hover:from-gray-700 hover:to-gray-800",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin size={18} />,
      url: "https://linkedin.com",
      color: "from-blue-600 to-blue-800",
      hoverColor: "hover:from-blue-500 hover:to-blue-700",
    },
    {
      name: "Instagram",
      icon: <FiInstagram size={18} />,
      url: "https://instagram.com",
      color: "from-pink-600 to-purple-600",
      hoverColor: "hover:from-pink-500 hover:to-purple-500",
    },
    {
      name: "Telegram",
      icon: <FaTelegram size={18} />,
      url: "https://telegram.org",
      color: "from-blue-400 to-blue-600",
      hoverColor: "hover:from-blue-300 hover:to-blue-500",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={18} />,
      url: "https://whatsapp.com",
      color: "from-green-500 to-green-700",
      hoverColor: "hover:from-green-400 hover:to-green-600",
    },
    {
      name: "Email",
      icon: <FiMail size={18} />,
      url: "mailto:example@example.com",
      color: "from-red-500 to-red-700",
      hoverColor: "hover:from-red-400 hover:to-red-600",
    },
  ];
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generateDots = Array.from({ length: 20 }, () => ({
      initialX: Math.random() * 100 - 50,
      initialY: Math.random() * 100 - 50,
      scale: Math.random() * 0.5 + 0.5,
      animateX: Math.random() * 100 - 50,
      animateY: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setDots(generateDots);
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden bg-transparent">
      {/* Watercolor effect background */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/watercolor.png')] opacity-20"></div>

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: dot.initialX,
              y: dot.initialY,
              scale: dot.scale,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              x: dot.animateX,
              y: dot.animateY,
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: dot.delay,
            }}
            className="absolute w-1 h-1 bg-blue-200 rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-6xl mx-auto p-8 md:p-12"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Let's Connect
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced 3D Canvas with Stars */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl relative border-2 border-white/20"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <spotLight
                position={[0, 10, 5]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <Stars
                radius={50}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
              />
              <SmartphoneWithMessage position={[0, 0, 0]} />
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={2}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 3}
              />
            </Canvas>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl border border-white/30 shadow-xl relative overflow-hidden"
          >
            {/* Glowing effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

            {isSubmitted ?
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center py-12 relative z-10"
              >
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                  className="text-6xl mb-6 text-blue-600"
                >
                  <RiSendPlaneFill className="inline-block" />
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Message Sent!
                </motion.h2>
                <p className="text-blue-600/80 mb-6">
                  I'll get back to you soon.
                </p>
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white/30 border border-white/40 rounded-lg hover:bg-white/40 transition flex items-center justify-center gap-2 mx-auto text-blue-800"
                >
                  <FiX className="inline-block" />
                  Close
                </motion.button>
              </motion.div>
            : <>
                <motion.h2
                  className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Send Me a Message
                </motion.h2>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center mb-2">
                      <FiUser className="mr-2 text-blue-600" />
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-blue-800"
                      >
                        Your Name
                      </label>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition placeholder-blue-800/60 text-blue-900"
                      placeholder="Enter your name"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <div className="flex items-center mb-2">
                      <FiMail className="mr-2 text-blue-600" />
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-blue-800"
                      >
                        Email Address
                      </label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition placeholder-blue-800/60 text-blue-900"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="flex items-center mb-2">
                      <FiMessageSquare className="mr-2 text-blue-600" />
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-blue-800"
                      >
                        Your Message
                      </label>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition placeholder-blue-800/60 text-blue-900"
                      placeholder="What would you like to say?"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 group"
                    >
                      <motion.span
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      >
                        <FiSend className="group-hover:rotate-12 transition-transform" />
                      </motion.span>
                      Send Message
                    </motion.button>
                  </motion.div>
                </form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <h3 className="text-lg font-semibold mb-4 text-center text-blue-700">
                    Or Connect With Me
                  </h3>
                  <div className="flex justify-center flex-wrap gap-2">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          y: -3,
                          scale: 1.1,
                          boxShadow: `0 3px 8px rgba(0, 0, 0, 0.15)`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setActiveSocial(index)}
                        onHoverEnd={() => setActiveSocial(null)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.8 + index * 0.1 }}
                        className={`bg-gradient-to-br ${social.color} ${social.hoverColor} p-2 rounded-lg shadow-sm transition-all flex items-center justify-center w-10 h-10 relative`}
                        aria-label={social.name}
                      >
                        <motion.div
                          animate={{
                            scale: activeSocial === index ? 1.2 : 1,
                            rotate:
                              activeSocial === index ? [0, 10, -10, 0] : 0,
                          }}
                          transition={{ duration: 0.4 }}
                          className="text-lg"
                        >
                          {social.icon}
                        </motion.div>

                        {activeSocial === index && (
                          <motion.div
                            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-xs text-gray-800 px-1.5 py-0.5 rounded whitespace-nowrap"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            {social.name}
                          </motion.div>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </>
            }
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage3D;
