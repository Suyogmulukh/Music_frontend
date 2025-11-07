import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Youtube } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 8767763500",
      subtext: "Mon - Sun, 10 AM - 8 PM",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Dapoli, Maharashtra",
      subtext: "Based in coastal Dapoli",
      color: "from-rose-500 to-rose-600",
    },
  ];

  const socialLinks = [
    { icon: Instagram, url: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, url: "https://youtube.com", label: "YouTube" },
    { icon: MessageCircle, url: "https://whatsapp.com", label: "WhatsApp" },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white overflow-hidden">
      {/* Decorative gradient glow orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent tracking-tight">
            Get In Touch
          </h3>
          <div className="h-1 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full w-28 mx-auto mb-4"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Ready to book your event? Let's create something amazing together!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={32} className="text-white" />
              </div>

              {/* Content */}
              <h4 className="text-2xl font-bold mb-2 group-hover:text-sky-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-xl font-semibold text-sky-300 mb-2">{item.value}</p>
              <p className="text-slate-400 text-sm">{item.subtext}</p>
            </div>
          ))}
        </div>

        {/* Quick Links & Hours */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Quick Links */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h4 className="text-2xl font-bold mb-6 text-sky-400">Quick Links</h4>
            <div className="space-y-3">
              {["Home", "Gallery", "Calendar", "Services", "Contact"].map((link, i) => (
                <a
                  key={i}
                  href={`#${link.toLowerCase()}`}
                  className="block text-slate-300 hover:text-sky-400 transition-colors group"
                >
                  <span className="group-hover:translate-x-2 inline-block transition-transform">→</span> {link}
                </a>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h4 className="text-2xl font-bold mb-6 text-sky-400 flex items-center gap-2">
              <Clock size={24} /> Business Hours
            </h4>
            <div className="space-y-3">
              {[
                { day: "Monday - Friday", time: "10 AM - 8 PM" },
                { day: "Saturday", time: "9 AM - 10 PM" },
                { day: "Sunday", time: "10 AM - 8 PM" },
                { day: "Special Events", time: "24/7 Available" },
              ].map((hour, i) => (
                <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-300">{hour.day}</span>
                  <span className="text-sky-400 font-semibold">{hour.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center">
          <h4 className="text-xl font-bold mb-6 text-sky-400">Follow Us On Social Media</h4>
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white hover:shadow-2xl hover:shadow-sky-500/50 transform hover:scale-110 transition-all duration-300 group"
                title={social.label}
              >
                <social.icon size={24} className="group-hover:rotate-12 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Event?</h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Don't wait! Check our calendar and send us an inquiry today. Let's make your celebration unforgettable!
            </p>
            <a
              href="#calendar"
              className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              View Calendar & Book Now
            </a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918767763500"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 z-40 animate-bounce group"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
      </a>
    </section>
  );
};

export default Contact;