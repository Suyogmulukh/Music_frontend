import React, { useState, useEffect } from "react";
import { Heart, MapPin, Mail, Phone } from "lucide-react";
import logo from "../assets/logo.jpg";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const footerLinks = [
    {
      title: "Navigation",
      links: ["Home", "About", "Gallery", "Calendar", "Contact"],
    },
    {
      title: "Services",
      links: [
        "Weddings",
        "Festivals",
        "Birthdays",
        "Custom Events",
      ],
    },
    {
      title: "Quick Links",
      links: [
        "Privacy Policy",
        "Terms & Conditions",
        "Booking Policy",
        "FAQs",
        "Gallery",
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden">
      {/* Decorative gradient glow orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-4xl flex items-center justify-center text-2xl  overflow-hidden ">
                <img src={logo} alt="" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Jay Human Beast
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Bringing rhythm, culture, and celebration to life across
              Maharashtra. Your event deserves the perfect performance.
            </p>
            <div className="flex gap-2">
              {["🎸", "🎵", "🎤"].map((emoji, i) => (
                <span
                  key={i}
                  className="text-2xl hover:scale-125 transition-transform"
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h4 className="text-lg font-bold text-sky-400 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-slate-400 hover:text-sky-400 transition-colors group flex items-center gap-2"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-12"></div>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              icon: Phone,
              title: "Call Us",
              value: "+91 8767763500",
            },
            {
              icon: MapPin,
              title: "Location",
              value: "Dapoli, Maharashtra",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/20 flex items-center justify-center group-hover:from-sky-500/30 group-hover:to-indigo-500/30 transition-all">
                <item.icon size={20} className="text-sky-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>
                <p className="text-slate-300 font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left text-slate-400 text-sm">
            <p className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span>&copy; {year}</span>
              <span className="text-sky-400">•</span>
              <span>Jay Human Beast</span>
              <span className="text-sky-400">•</span>
              <span>Dapoli, Maharashtra</span>
            </p>
            <p className="text-xs text-slate-500">All rights reserved.</p>
          </div>

          {/* Made with Love */}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm group">
            Crafted with
            <Heart
              size={16}
              className="text-red-500 group-hover:animate-pulse"
            />
            for celebrations
          </div>

          {/* Scroll to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-400 rounded-lg hover:from-sky-500/40 hover:to-indigo-500/40 transition-all border border-sky-500/20 hover:border-sky-500/40 text-sm font-semibold"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-sky-400 rounded-full animate-pulse opacity-20"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-20"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-sky-400 rounded-full animate-pulse opacity-20"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </footer>
  );
};

export default Footer;
