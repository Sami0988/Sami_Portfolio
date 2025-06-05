"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-sm shadow-blue-900/10">
      <div className="container mx-auto px-6 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand - More subtle elegance */}
          <Link
            href="/"
            className="group text-2xl font-bold text-white hover:text-blue-200 transition-all duration-300"
          >
            <span className="text-blue-300 group-hover:text-blue-200 transition-all duration-300">
              Sami
            </span>
            <span className="opacity-90 group-hover:opacity-100 transition-all duration-300">
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation - Ultra minimal */}
          <div className="hidden md:flex space-x-5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  pathname === item.path ?
                    "text-blue-300"
                  : "text-white/90 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.path && (
                  <span className="absolute inset-0 bg-white/5 rounded-md"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button - Clean lines */}
          <button className="md:hidden flex flex-col space-y-1.5 group">
            <span
              className={`w-6 h-px bg-white/90 transition-all duration-300 ${"group-focus:rotate-45 group-focus:translate-y-1.5"}`}
            ></span>
            <span
              className={`w-6 h-px bg-white/90 transition-all duration-300 ${"group-focus:opacity-0"}`}
            ></span>
            <span
              className={`w-6 h-px bg-white/90 transition-all duration-300 ${"group-focus:-rotate-45 group-focus:-translate-y-1.5"}`}
            ></span>
          </button>
        </nav>
      </div>
    </header>
  );
}
