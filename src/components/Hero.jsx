import React from "react";
import { Play, ChevronDown } from "lucide-react";
import backgroundImage from "../assets/Background.png";

const Hero = ({ onVideoClick, onInquiryClick }) => {
  const scrollToCalendar = () => {
    const element = document.getElementById("calendar");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-6 sm:px-10 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-4xl mx-auto z-10 py-20">
        {/* Main Heading - adjusted for contrast */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-sky-200 to-white bg-clip-text text-transparent tracking-tight mb-6 animate-fade-up">
          The Soul of Your Celebration
        </h2>

        {/* Subheading - adjusted background for better readability */}
        <p className="text-lg sm:text-xl text-white leading-relaxed mb-8 backdrop-blur-sm bg-black/30 rounded-2xl p-8 shadow-sm border border-white/20 animate-fade-up transition-all hover:shadow-lg">
          Based in <span className="font-semibold text-sky-300">Dapoli</span>,
          <span className="font-bold text-sky-200"> Jay Hanuman Beats </span>
          brings electrifying performances to weddings, festivals, and cultural
          events across Maharashtra. We don't just play music –
          <span className="font-semibold text-sky-300">
            {" "}
            we create unforgettable moments.
          </span>
        </p>

        {/* Trust Badge - adjusted color */}
        <div className="text-yellow-300 font-semibold text-lg mb-8 animate-pulse">
          ✨ Trusted by 200+ Happy Clients ✨
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:mb-32 sm:mt-24">
          <button
            onClick={onVideoClick}
            className="px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group "
          >
            <Play
              size={20}
              className="group-hover:scale-110 transition-transform"
            />{" "}
            Watch Performance
          </button>
          <button
            onClick={scrollToCalendar}
            className="px-8 py-4 border-2 border-amber-500 text-amber-600 font-bold rounded-full hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Make an Inquiry <ChevronDown size={20} />
          </button>
        </div>
      </div>

      {/* Move Scroll Indicator to bottom of viewport */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-sky-600">
        <ChevronDown size={32} className="mx-auto" />
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out;
        }

        @media (max-width: 640px) {
          #hero .flex-col {
            margin-top: 11rem;  /* 44 units in rem */
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
