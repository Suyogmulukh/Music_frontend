import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useOrders } from "../context/orderContext";

const Calendar = ({ onDateSelect }) => {
  const { getBookedDates } = useOrders();
  const bookedDates = getBookedDates();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching booked dates
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) calendarDays.push(null);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateString = dateObj.toISOString().split("T")[0];
      const isBooked = bookedDates.includes(dateString);
      const isPast = dateObj < today;
      const isToday = dateObj.getTime() === today.getTime();

      calendarDays.push({
        day,
        dateString,
        isBooked,
        isPast,
        isToday,
      });
    }
    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const getDateStatus = (item) => {
    if (item.isPast) return "Past";
    if (item.isBooked) return "Booked";
    if (item.isToday) return "Today";
    return "Available";
  };

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return bookedDates.includes(formattedDate) ? "booked-date" : "";
  };

  const tileDisabled = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return bookedDates.includes(formattedDate);
  };

  return (
    <section
      id="calendar"
      className="relative py-24 px-6 bg-gradient-to-br from-emerald-50 via-white to-sky-50 overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Book Your Date
          </h3>
          <div className="h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 rounded-full w-28 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select your ideal event day from our calendar.{" "}
            <span className="text-emerald-600 font-semibold">Green dates</span>{" "}
            are open,{" "}
            <span className="text-rose-600 font-semibold">red dates</span> are
            booked.
          </p>
        </div>

        {/* Calendar Card */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 hover:shadow-3xl transition-all duration-500">
          {/* Month Header */}
          <div className="bg-gradient-to-r from-emerald-50 via-sky-50 to-indigo-50 p-8 flex justify-between items-center">
            <button
              onClick={handlePrevMonth}
              className="p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-emerald-600 transition-all duration-200 hover:shadow-md active:scale-95 font-bold text-xl"
            >
              <ChevronLeft size={24} />
            </button>
            <h4 className="text-3xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-center w-60">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h4>
            <button
              onClick={handleNextMonth}
              className="p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white hover:text-emerald-600 transition-all duration-200 hover:shadow-md active:scale-95 font-bold text-xl"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-8">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-3 text-center font-bold text-slate-700 mb-6 text-sm md:text-base">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div
                  key={d}
                  className="py-3 rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-7 gap-3">
                {[...Array(35)].map((_, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-200 rounded-lg animate-pulse h-12"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-3">
                {renderDays().map((item, idx) => (
                  <div key={idx} className="relative group">
                    {item ? (
                      <>
                        <button
                          disabled={item.isPast || item.isBooked}
                          onClick={() =>
                            !item.isBooked &&
                            !item.isPast &&
                            onDateSelect(item.dateString)
                          }
                          onMouseEnter={() => setHoveredDate(idx)}
                          onMouseLeave={() => setHoveredDate(null)}
                          className={`relative w-full p-2 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform border
                            ${
                              item.isPast
                                ? "text-slate-400 bg-white/40 border-slate-100 cursor-not-allowed"
                                : item.isBooked
                                ? "bg-gradient-to-br from-rose-500 to-pink-600 text-white border-rose-200 shadow-lg hover:shadow-rose-300/50 scale-100"
                                : item.isToday
                                ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white border-amber-200 shadow-lg ring-2 ring-amber-300"
                                : "bg-gradient-to-br from-emerald-400 to-sky-500 text-white border-transparent cursor-pointer hover:shadow-xl hover:-translate-y-1 active:scale-95"
                            }`}
                        >
                          <span className="relative z-10">{item.day}</span>
                          {item.isBooked && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent animate-pulse" />
                          )}
                        </button>

                        {/* Tooltip */}
                        {hoveredDate === idx && (
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap z-10 animate-fade-in">
                            {getDateStatus(item)}
                          </div>
                        )}
                      </>
                    ) : (
                      <div />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-400"></div>
            <span className="text-slate-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-rose-500"></div>
            <span className="text-slate-700">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-300"></div>
            <span className="text-slate-700">Past</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-400"></div>
            <span className="text-slate-700">Today</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .booked-date {
          background-color: #fee2e2 !important;
          color: #ef4444 !important;
        }
      `}</style>
    </section>
  );
};

export default Calendar;
