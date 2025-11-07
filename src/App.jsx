import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { CalendarProvider } from "./context/calendarContext";
import Header from "./components/Header";
import AdminPage from "./pages/AdminPage";
import { OrderProvider } from "./context/orderContext";

function App() {
  return (
    <Router>
      <CalendarProvider>
        <OrderProvider>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
        </OrderProvider>
      </CalendarProvider>
    </Router>
  );
}

export default App;
