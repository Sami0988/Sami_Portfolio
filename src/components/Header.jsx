"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Lab", path: "/lab" }, // For experimental projects
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="container mx-auto px-6 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand - Single initial approach */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-300 hover:text-blue-200 transition-all duration-300"
          >
            S.
          </Link>

          {/* Desktop Navigation - Minimal with subtle indicators */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  pathname === item.path ?
                    "text-blue-300"
                  : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-300 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button - Modern X animation */}
          <button className="md:hidden group p-2">
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-1/2 left-0 w-full h-px bg-white/90 transform transition-all duration-300 ${
                  false /* change this based on mobile menu state */ ?
                    "rotate-45 translate-y-0"
                  : "-translate-y-1.5"
                }`}
              ></span>
              <span
                className={`absolute top-1/2 left-0 w-full h-px bg-white/90 transition-all duration-300 ${
                  false /* change this based on mobile menu state */ ?
                    "opacity-0"
                  : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute top-1/2 left-0 w-full h-px bg-white/90 transform transition-all duration-300 ${
                  false /* change this based on mobile menu state */ ?
                    "-rotate-45 translate-y-0"
                  : "translate-y-1.5"
                }`}
              ></span>
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
}
