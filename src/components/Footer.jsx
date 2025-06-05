// Footer.jsx
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaFileDownload,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black/50 backdrop-blur-md border-t border-cyan-200/20 pt-12 pb-8 px-8 ml-4">
      {/* Watercolor effect at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cyan-200 flex items-center">
              <span className="w-3 h-3 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              Sami Portfolio
            </h3>
            <p className="text-cyan-100/80 text-sm">
              Creative developer specializing in modern web experiences.
              Combining aesthetics with functionality to build immersive digital
              solutions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com"
                className="text-cyan-200 hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-cyan-200 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-cyan-200 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cyan-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-cyan-100/80 hover:text-white transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-cyan-100/80 hover:text-white transition-colors text-sm"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-cyan-100/80 hover:text-white transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-cyan-100/80 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cyan-200">
              Get In Touch
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-cyan-100/80">
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:hello@sami.dev"
                  className="hover:text-white transition-colors"
                >
                  hello@sami.dev
                </a>
              </div>
              <p className="text-cyan-100/80">Based in San Francisco, CA</p>
              <button className="flex items-center mt-4 px-4 py-2 bg-cyan-600/70 hover:bg-cyan-500 rounded-lg transition-all duration-300 text-sm">
                <FaFileDownload className="mr-2" />
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and bottom row */}
        <div className="border-t border-cyan-200/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cyan-200/60 text-xs mb-4 md:mb-0">
            © {currentYear} Sami Portfolio. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-cyan-200/60 hover:text-white text-xs transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-cyan-200/60 hover:text-white text-xs transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-cyan-200/60 hover:text-white text-xs transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <svg width="60" height="60" viewBox="0 0 100 100">
          <path
            d="M20,50 Q50,20 80,50 Q50,80 20,50"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="1"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
