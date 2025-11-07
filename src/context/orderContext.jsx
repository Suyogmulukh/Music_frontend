import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://music-backend-inky.vercel.app/api/orders", {
        headers: { "x-auth-token": token },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getBookedDates = () => {
    return orders
      .filter((order) => order.completed)
      .map((order) => new Date(order.date).toISOString().split("T")[0]);
  };

  const getStats = () => {
    const completed = orders.filter((order) => order.completed).length;
    const pending = orders.filter((order) => !order.completed).length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.totalPrice),
      0
    );
    return { completed, pending, totalRevenue };
  };

  return (
    <OrderContext.Provider
      value={{ orders, loading, getBookedDates, getStats, fetchOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
