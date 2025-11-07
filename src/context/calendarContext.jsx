import React, { createContext, useState } from 'react';

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [bookedDates, setBookedDates] = useState([]);
  return (
    <CalendarContext.Provider value={{ bookedDates, setBookedDates }}>
      {children}
    </CalendarContext.Provider>
  );
};
