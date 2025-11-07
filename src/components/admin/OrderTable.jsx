import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Download, Search, CheckCircle, Clock, ChevronDown } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import OrderModal from "./OrderModal";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://music-backend-inky.vercel.app/api/orders", {
        headers: { "x-auth-token": token },
      });
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch orders");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://music-backend-inky.vercel.app/api/orders/${id}`, {
          headers: { "x-auth-token": token },
        });
        toast.success("Order deleted successfully");
        fetchOrders();
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  const handleDownloadAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://music-backend-inky.vercel.app/api/orders/download/all",
        {
          headers: { "x-auth-token": token },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `all-orders-${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("All orders downloaded successfully");
    } catch (error) {
      toast.error("Failed to download all orders");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Search Header with Download All Button */}
      <div className="p-3 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="🔍 Search by name or order number..."
              className="pl-10 sm:pl-12 pr-4 py-2 sm:py-3 w-full text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={handleDownloadAll}
            disabled={orders.length === 0}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition duration-200 font-semibold text-sm sm:text-base active:scale-95 whitespace-nowrap"
            title="Download All Orders"
            aria-label="Download All Orders"
          >
            <Download size={18} />
            <span>Download All</span>
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order #</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
              <th className="px-4 sm:px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Total</th>
              <th className="px-4 sm:px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Advance</th>
              <th className="px-4 sm:px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-sky-50 transition duration-200 group"
              >
                <td className="px-4 sm:px-6 py-4">
                  <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg text-sm">
                    #{order.orderNumber}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{order.name}</p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 text-sm">
                  <span className="inline-flex items-center gap-2">
                    📅 {new Date(order.date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap">
                    {order.type === "Haldi"}
                    {order.type === "Varat"}
                    {order.type === "Haldi & Varat"}
                    {order.type === "Birthday"}
                    {order.type === "Other"}
                    {order.type}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <p className="font-bold text-gray-900 text-sm sm:text-lg">₹{order.totalPrice}</p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right text-gray-600">
                  <p className="font-semibold text-sm sm:text-base">₹{order.advancePayment}</p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-center">
                  {order.completed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200 whitespace-nowrap">
                      <CheckCircle size={16} /> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
                      <Clock size={16} /> Pending
                    </span>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex justify-center gap-1 opacity-80 group-hover:opacity-100 transition">
                    <button
                      onClick={() => setEditOrder(order)}
                      className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition duration-200 hover:scale-110 active:scale-95"
                      title="Edit Order"
                      aria-label="Edit Order"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition duration-200 hover:scale-110 active:scale-95"
                      title="Delete Order"
                      aria-label="Delete Order"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border-b border-gray-200 last:border-b-0"
          >
            {/* Card Header - Click to Expand */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-sky-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
            >
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded text-xs sm:text-sm whitespace-nowrap">
                    #{order.orderNumber}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                    order.completed
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}>
                    {order.completed ? "✅ Completed" : "⏳ Pending"}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {order.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  📅 {new Date(order.date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm sm:text-base">₹{order.totalPrice}</p>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    expandedOrder === order._id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Expanded Details */}
            {expandedOrder === order._id && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 bg-sky-50 space-y-4 border-t border-gray-200">
                {/* Order Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Type</p>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap">
                      {order.type === "Haldi" }
                      {order.type === "Varat" }
                      {order.type === "Haldi & Varat"}
                      {order.type === "Birthday"}
                      {order.type === "Other"}
                      {order.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Advance</p>
                    <p className="font-semibold text-gray-900">₹{order.advancePayment}</p>
                  </div>
                </div>

                {/* Address */}
                {order.address && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Address</p>
                    <p className="text-sm text-gray-900 break-words">{order.address}</p>
                  </div>
                )}

                {/* Phone */}
                {order.phone && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{order.phone}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditOrder(order)}
                    className="flex-1 flex items-center justify-center gap-2 p-2.5 text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg transition duration-200 active:scale-95 text-sm font-semibold min-h-10"
                    aria-label="Edit Order"
                  >
                    <Edit2 size={18} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="flex-1 flex items-center justify-center gap-2 p-2.5 text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition duration-200 active:scale-95 text-sm font-semibold min-h-10"
                    aria-label="Delete Order"
                  >
                    <Trash2 size={18} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && !loading && (
        <div className="text-center py-12 sm:py-16 px-4">
          <p className="text-gray-500 text-base sm:text-lg font-medium">
            {searchTerm ? "No orders found matching your search" : "No orders yet. Create your first order!"}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 sm:py-16 px-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-sky-500"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading orders...</p>
        </div>
      )}

      {/* Edit Modal */}
      {editOrder && (
        <OrderModal
          isOpen={!!editOrder}
          onClose={() => setEditOrder(null)}
          order={editOrder}
          onSuccess={() => {
            fetchOrders();
            setEditOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default OrderTable;