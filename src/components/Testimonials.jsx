import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Add auto-rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const testimonials = [
    {
      id: 1,
      name: "Priya & Rohan",
      event: "Wedding Celebration",
      emoji: "💍",
      text: "Jay Hanuman Beats made our wedding absolutely unforgettable! The energy, the performance, the connection with our guests – everything was perfect. They brought our vision to life with such passion and professionalism.",
      rating: 5,
      image: "🎭",
    },
    {
      id: 2,
      name: "Amit Sharma",
      event: "Corporate Event",
      emoji: "🏢",
      text: "We hired them for our company's annual celebration and they were phenomenal. Professional, adaptable, and incredibly talented. Our employees are still talking about their performance!",
      rating: 5,
      image: "🎸",
    },
    {
      id: 3,
      name: "Neha Patel",
      event: "Festival Celebration",
      emoji: "🎉",
      text: "The soul and energy they brought to our Diwali festival was incredible. They understood the cultural essence and performed with such authenticity. Highly recommended for any cultural event!",
      rating: 5,
      image: "👥",
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      event: "Birthday Bash",
      emoji: "🎂",
      text: "Outstanding performance at my son's 21st birthday! They kept everyone on the dance floor the entire night. Their interaction with the crowd was amazing. Definitely booking them again!",
      rating: 5,
      image: "🎉",
    },
    {
      id: 5,
      name: "Sneha & Vikram",
      event: "Sangeet Ceremony",
      emoji: "💫",
      text: "For our Sangeet, they brought the perfect blend of tradition and modern energy. The guests were dancing throughout the night. They understood our family's vibe perfectly!",
      rating: 5,
      image: "🎵",
    },
  ];

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent mb-4 tracking-tight">
            What Our Clients Say
          </h3>
          <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full w-28 mx-auto"></div>
          <p className="text-slate-600 text-lg mt-4">
            Join 200+ satisfied clients who've made their events unforgettable
          </p>
        </div>

        {/* Main Testimonial Card with Navigation */}
        <div className="relative mb-12 group">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 p-2 md:p-3 rounded-full bg-white/80 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 p-2 md:p-3 rounded-full bg-white/80 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-12 relative overflow-hidden animate-fade-in">
            {/* Background accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-200/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Quote Icon */}
              <Quote size={48} className="text-amber-400 mb-4 opacity-50" />

              {/* Client Info */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{current.emoji}</span>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-800">
                        {current.name}
                      </h4>
                      <p className="text-sm text-slate-600">{current.event}</p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-lg text-slate-700 mb-8 leading-relaxed italic">
                "{current.text}"
              </p>

              {/* Large Image Emoji */}
              <div className="text-8xl opacity-10 absolute -bottom-8 -right-8">
                {current.image}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-16 md:gap-8">
          {[
            { number: "200+", label: "Happy Clients" },
            { number: "500+", label: "Events Performed" },
            { number: "10K+", label: "Guests Entertained" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-100 hover:bg-white transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-sm md:text-base text-slate-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
