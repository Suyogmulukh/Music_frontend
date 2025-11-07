import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Login from "./Login";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCalendar = (e) => {
    e.preventDefault();
    const calendarSection = document.getElementById("calendar");
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 backdrop-blur-sm
        ${
          scrolled
            ? " bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-lg shadow-black/[0.03]"
            : "bg-gradient-to-r from-indigo-400 to-cyan-400"
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Updated Logo */}
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <img
                src="/logo.jpg" // Updated path
                alt="Logo"
                className="absolute inset-0 w-full h-full object-cover rounded-4xl transform group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold font-eagle bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent uppercase tracking-wider transform group-hover:scale-105 transition-transform duration-300 ">
                Jay Hanuman Beats
              </h1>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-12">
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#" onClick={handleLogin} className="nav-link">
                Login
              </a>
            </nav>

            <a
              href="#calendar"
              onClick={scrollToCalendar}
              className="px-6 py-2.5 text-sm font-bold text-white rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 uppercase tracking-wider flex items-center gap-2"
            >
              Check Availability
              <span className="transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-amber-50 transition-all duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 animate-in slide-in-from-top duration-300 bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-blue-900/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
            <a
              href="#about"
              className="block text-xs font-semibold font-modern text-white hover:text-amber-500 transition-colors py-2 uppercase tracking-wider"
            >
              About
            </a>
            <a
              href="#"
              onClick={handleLogin}
              className="block text-xs font-semibold font-modern text-white hover:text-amber-500 transition-colors py-2 uppercase tracking-wider"
            >
              Login
            </a>
            <a
              href="#calendar"
              onClick={scrollToCalendar}
              className="block px-5 py-2 text-xs font-bold font-modern text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-center hover:from-amber-600 hover:to-amber-700 transition-all duration-300 uppercase tracking-wider"
            >
              Check Availability
            </a>
          </nav>
        )}
      </div>

      {/* Enhanced Bottom Border */}
      <div className="h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 opacity-30"></div>

      {/* Style section */}
      <style>{`
        .nav-link {
          text-transform: uppercase;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: white;
          transition: all 0.3s;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(to right, #f59e0b, #d97706);
          transition: width 0.3s;
        }
        .nav-link:hover {
          color: #f59e0b;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>

      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </header>
  );
};

export default Header;
