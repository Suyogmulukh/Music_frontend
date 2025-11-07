import React, { useState } from "react";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Calendar from "../components/Calendar";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InquiryModal from "../components/InquiryModal";
// import VideoModal from "../components/VideoModel";
import { Home } from "lucide-react";

function home() {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowInquiryModal(true);
  };

  const handleInquiryClick = () => {
    setSelectedDate(null);
    setShowInquiryModal(true);
  };

  const handleVideoClick = () => {
    setShowVideoModal(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="flex flex-col min-h-screen">
        {/* Components */}
        <div className="flex-grow">
          <Header />
          <Hero
            onVideoClick={handleVideoClick}
            onInquiryClick={handleInquiryClick}
          />
          <div id="main-content" className="scroll-smooth">
            <Calendar onDateSelect={handleDateSelect} />
            <Gallery />
            <Testimonials />
            <Contact />
          </div>
        </div>
        <Footer />
      </div>

      {/* Modals with improved positioning */}
      {showVideoModal && (
        <VideoModal
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          title="Live Performance - Jay Human Beast"
        />
      )}

      {showInquiryModal && (
        <InquiryModal
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
          date={selectedDate}
        />
      )}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Poppins', 'Inter', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Cinzel', serif;
        }

        body {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          animation: gradient-shift 8s ease infinite;
        }

        /* Smooth scrollbar styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0ea5e9, #4f46e5);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #06b6d4, #4338ca);
        }

        #main-content {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        `}
      </style>
    </div>
  );
}

export default home;
