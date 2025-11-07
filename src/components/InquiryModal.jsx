import React, { useState } from "react";
import { X, CheckCircle, Loader } from "lucide-react";

const InquiryModal = ({ date, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    location: "",
    guests: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useAI, setUseAI] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.message
      ) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Prepare data for submission
      const inquiryData = {
        ...formData,
        date: date, // Include the selected date
      };

      // Submit to backend
      const response = await fetch("http://localhost:3000/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      // Success handling
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          location: "",
          guests: "",
          message: "",
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to submit inquiry");
    } finally {
      setLoading(false);
    }
  };

  const generateAIMessage = async () => {
    setAiLoading(true);
    try {
      const response = await fetch(
        "https://music-backend-inky.vercel.app/api/inquiry/ai-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            date,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate message");
      }

      setAiMessage(data.message);
    } catch (err) {
      setError(err.message || "Failed to generate AI message");
    } finally {
      setAiLoading(false);
    }
  };

  const copyAIMessage = () => {
    setFormData({ ...formData, message: aiMessage });
    setUseAI(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in border-2 border-slate-200 max-h-[85vh] overflow-y-auto scrollbar-hide">
        {/* Success State */}
        {submitted ? (
          <div className="text-center py-10">
            <CheckCircle
              size={64}
              className="text-green-500 mx-auto mb-4 animate-bounce"
            />
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              Inquiry Sent! 🎉
            </h3>
            <p className="text-slate-600">
              We'll get back to you within 24 hours.
            </p>
          </div>
        ) : !useAI ? (
          /* Main Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header with Back Button */}
            <div className="relative mb-6">
              <button
                onClick={onClose}
                className="absolute left-0 -top-14 px-6 py-2 bg-white shadow-md hover:shadow-lg text-slate-700 rounded-xl transition-all font-medium border border-slate-200 hover:bg-slate-50"
              >
                Back
              </button>
              <div className="text-center bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-2xl border border-slate-200 mt-12">
                <h3 className="text-2xl font-semibold text-slate-900 mb-1">
                  Book Your Event 🎵
                </h3>
                {date && (
                  <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
                    <span className="bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                      📅 {new Date(date).toLocaleDateString()}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-300 text-rose-700 rounded-xl text-sm flex items-center gap-2">
                <span className="bg-rose-100 p-1 rounded">⚠️</span>
                {error}
              </div>
            )}

            {/* Form Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Info */}
              <div className="space-y-4 md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-medium text-slate-900">
                  Personal Information
                </h4>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4 md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-medium text-slate-900">Event Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="">Select type</option>
                      <option value="Wedding">Only Wedding </option>
                      <option value="Festival">Only Haldi</option>
                      <option value="Corporate">Haldi & Wedding</option>
                      <option value="Birthday">Birthday </option>
                      <option value="Other">Other 🎯</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      placeholder="Number of guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Venue Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Event venue address"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Additional Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Tell us more about your event requirements..."
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 sticky bottom-0 bg-white border-t border-slate-200 mt-6">
              <button
                type="button"
                onClick={() => setUseAI(true)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-medium rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>✨</span> Use AI Assistant
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </div>
          </form>
        ) : (
          /* AI Draft Section */
          <div className="space-y-4">
            <div className="relative mb-8">
              <button
                onClick={() => setUseAI(false)}
                className="absolute left-0 top-0 px-6 py-2 bg-white shadow-md hover:shadow-lg text-slate-700 rounded-xl transition-all font-medium border border-slate-200 hover:bg-slate-50"
              >
                Back
              </button>
              <h3 className="text-2xl font-semibold text-slate-800 text-center mt-12">
                ✨ AI Event Assistant
              </h3>
            </div>

            {!aiMessage ? (
              <>
                <p className="text-sm text-slate-600">
                  Fill these quick details and let AI write your perfect
                  message:
                </p>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-700"
                  >
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Festival">Festival</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Birthday">Birthday Party</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Event location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Expected Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    placeholder="Approx. number"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                </div>

                <button
                  onClick={generateAIMessage}
                  disabled={aiLoading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-medium rounded-xl hover:from-slate-900 hover:to-slate-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {aiLoading ? (
                    <>
                      <Loader size={18} className="animate-spin" />{" "}
                      Generating...
                    </>
                  ) : (
                    "Generate Message"
                  )}
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-600">
                  Here's your AI-drafted message:
                </p>
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 shadow-inner">
                  <p className="text-slate-700 leading-relaxed">{aiMessage}</p>
                </div>

                <div className="space-y-3 sticky bottom-0 bg-white pb-2">
                  <button
                    onClick={copyAIMessage}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                  >
                    Use This Message
                  </button>
                  <button
                    onClick={() => {
                      setAiMessage("");
                      generateAIMessage();
                    }}
                    className="w-full px-4 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all"
                  >
                    Regenerate
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.25s ease-out; }
      `}</style>
    </div>
  );
};

export default InquiryModal;
