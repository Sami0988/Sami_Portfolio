// Footer.jsx
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaFileDownload,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black/70 backdrop-blur-lg border-t ml-4 border-cyan-400/30 pt-16  pb-10 px-6 sm:px-8">
      {/* Watercolor effect at top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center">
              <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></span>
              Sami Portfolio
            </h3>
            <p className="text-cyan-100/90 text-sm leading-relaxed">
              Full-stack developer specializing in modern web applications and
              immersive digital experiences. Passionate about creating elegant
              solutions to complex problems through clean code and thoughtful
              design.
            </p>
            <div className="flex space-x-5 pt-3">
              <a
                href="https://github.com/samiadil"
                aria-label="GitHub"
                className="text-cyan-300 hover:text-white transition-colors hover:scale-110 transform duration-300"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://linkedin.com/in/samiadil"
                aria-label="LinkedIn"
                className="text-cyan-300 hover:text-white transition-colors hover:scale-110 transform duration-300"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://twitter.com/samiadil"
                aria-label="Twitter"
                className="text-cyan-300 hover:text-white transition-colors hover:scale-110 transform duration-300"
              >
                <FaTwitter size={22} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-cyan-300">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start text-cyan-100/90">
                <FaEnvelope className="mt-1 mr-3 flex-shrink-0 text-cyan-300/90" />
                <a
                  href="mailto:hello@sami.dev"
                  className="hover:text-white transition-colors hover:underline"
                >
                  samuasami84@gmail.com
                </a>
              </div>
              <div className="flex items-start text-cyan-100/90">
                <FaEnvelope className="mt-1 mr-3 flex-shrink-0 text-cyan-300/90" />
                <a
                  href="mailto:hello@sami.dev"
                  className="hover:text-white transition-colors hover:underline"
                >
                  zsami9017@gmail.com
                </a>
              </div>
              <div className="flex items-start text-cyan-100/90">
                <FaPhone className="mt-1 mr-3 flex-shrink-0 text-cyan-300/90" />
                <a
                  href="tel:+14155550123"
                  className="hover:text-white transition-colors hover:underline"
                >
                  +2519 3058 4110
                </a>
              </div>
              <div className="flex items-start text-cyan-100/90">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0 text-cyan-300/90" />
                <span>
                  Adiss Abeba
                  <br />
                  Ethiiopia
                </span>
              </div>
            </div>
          </div>

          {/* Availability & Resume */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-cyan-300">Availability</h3>
            <div className="flex items-center text-cyan-100/90 text-sm">
              <FaCalendarAlt className="mr-3 text-cyan-300/90" />
              <span>
                Currently <span className="text-green-400">available</span> for
                <br />
                freelance work and collaborations
              </span>
            </div>

            <div className="pt-2">
              <button className="flex items-center justify-center w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-cyan-600/80 to-teal-600/80 hover:from-cyan-500 hover:to-teal-500 rounded-lg transition-all duration-300 text-sm font-medium group">
                <FaFileDownload className="mr-2 transition-transform group-hover:translate-y-0.5" />
                Download Resume (PDF)
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and bottom row */}
        <div className="border-t border-cyan-400/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cyan-300/70 text-sm mb-4 md:mb-0">
            © {currentYear} Sami portfolio. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-cyan-300/70 hover:text-white text-sm transition-colors hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-cyan-300/70 hover:text-white text-sm transition-colors hover:underline"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="text-cyan-300/70 hover:text-white text-sm transition-colors hover:underline"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-6 right-6 opacity-20 hover:opacity-30 transition-opacity">
        <svg width="70" height="70" viewBox="0 0 100 100">
          <path
            d="M20,50 Q50,20 80,50 Q50,80 20,50"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
