import React, { useState } from "react";
import { X } from "lucide-react";

// Import assets directly
import boys from "../assets/boys.jpg";
import instruments from "../assets/instruments.jpg";
import boys2 from "../assets/boys2.jpg";
import livePerformances from "../assets/live-Performances.mp4";
import liveVideo from "../assets/live-video.mp4";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      type: "photo",
      emoji: "🎭",
      title: "Historic Fort Outing",
      category: "team",
      description: "Memorable group outing at the fort",
      src: boys,
    },
    {
      id: 2,
      type: "photo",
      emoji: "🎸",
      title: "Traditional Instruments",
      category: "Instruments",
      description: "Beautifully decorated musical instruments",
      src: instruments,
    },
    {
      id: 3,
      type: "photo",
      emoji: "👥",
      title: "Group Performance",
      category: "team",
      description: "Team photo during live event",
      src: boys2,
    },
    {
      id: 4,
      type: "video",
      emoji: "🎬",
      title: "Live Performance Video",
      category: "performance",
      description: "Electrifying live performance highlights",
      src: livePerformances,
    },
    {
      id: 6,
      type: "video",
      emoji: "📹",
      title: "Event Highlights",
      category: "performance",
      description: "Best moments captured",
      src: liveVideo,
    },
  ];

  const categories = ["all", "performance", "Instruments", "team"];
  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden px-6 sm:px-10 lg:px-20 py-24 bg-gradient-to-br from-sky-50 via-white to-indigo-50"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.2),transparent_70%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.2),transparent_70%)] opacity-70"></div>

      <div className="relative">
        {/* Section Title */}
        <h3 className="text-center font-extrabold text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-700 mb-4 tracking-tight font-['Cinzel']">
          Experience Our Energy
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full mx-auto mb-12"></div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === category
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white/60 text-slate-700 border-2 border-slate-200 hover:bg-white hover:border-sky-300"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-white/60 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/40 overflow-hidden transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Image / Video Container (renders img or video if src provided, otherwise emoji) */}
              <div className="w-full h-64 bg-gradient-to-br from-sky-200 via-indigo-100 to-sky-300 flex items-center justify-center relative overflow-hidden">
                {item.type === "photo" && item.src ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : item.type === "video" && item.src ? (
                  <video
                    src={item.src}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-8xl group-hover:scale-125 transition-transform duration-500">
                    {item.emoji}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="font-bold text-base text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors font-['Cinzel']">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600">{item.description}</p>
                <div className="mt-3 inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-[10px] font-semibold">
                  {item.type === "photo" ? "📷 Photo" : "🎬 Video"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="w-full h-[60vh] bg-gradient-to-br from-sky-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                {selectedImage.type === "photo" && selectedImage.src ? (
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                ) : selectedImage.type === "video" && selectedImage.src ? (
                  <video
                    src={selectedImage.src}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-9xl">{selectedImage.emoji}</span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2 font-['Cinzel']">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                {selectedImage.description}
              </p>
              <div className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-xs font-semibold">
                {selectedImage.type === "photo" ? "📷 Photo" : "🎬 Video"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
