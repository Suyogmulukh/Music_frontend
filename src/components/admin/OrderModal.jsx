import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const OrderModal = ({ isOpen, onClose, order, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    date: "",
    type: "Haldi",
    totalPrice: "",
    advancePayment: "",
    completed: false,
  });

  useEffect(() => {
    if (order) {
      setFormData({
        ...order,
        date: new Date(order.date).toISOString().split("T")[0],
      });
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = order
        ? `https://music-backend-inky.vercel.app/api/orders/${order._id}`
        : "https://music-backend-inky.vercel.app/api/orders";
      const method = order ? "put" : "post";

      await axios[method](url, formData, {
        headers: { "x-auth-token": token },
      });

      toast.success(`Order ${order ? "updated" : "created"} successfully`);
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Failed to save order");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-0 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl shadow-2xl my-0 sm:my-8 sm:rounded-2xl overflow-hidden min-h-screen sm:min-h-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-sky-500 to-blue-600 px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {order ? "✏️ Edit Order" : "Create New Order"}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 hover:bg-white/20 rounded-lg transition text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-12rem)]"
        >
          <div className="space-y-4 sm:space-y-6">
            {/* Name & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter customer name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition outline-none text-gray-900 placeholder-gray-400"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition outline-none text-gray-900 placeholder-gray-400"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                Order Address
              </label>
              <input
                type="text"
                placeholder="Enter delivery address"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition outline-none text-gray-900 placeholder-gray-400"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            {/* Date & Type Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition outline-none text-gray-900"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition outline-none bg-white text-gray-900 font-medium"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="Haldi">Haldi</option>
                  <option value="Varat">Varat</option>
                  <option value="Haldi & Varat">Haldi & Varat</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Price & Advance Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                  Total Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 text-gray-600 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition outline-none text-gray-900 placeholder-gray-400"
                    value={formData.totalPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, totalPrice: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                  Advance Payment <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 text-gray-600 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition outline-none text-gray-900 placeholder-gray-400"
                    value={formData.advancePayment}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        advancePayment: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center p-3 sm:p-4 bg-sky-50 rounded-lg border-2 border-sky-200 gap-3">
              <input
                type="checkbox"
                id="completed"
                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-sky-300 text-sky-600 focus:ring-2 focus:ring-sky-500 cursor-pointer flex-shrink-0"
                checked={formData.completed}
                onChange={(e) =>
                  setFormData({ ...formData, completed: e.target.checked })
                }
              />
              <label
                htmlFor="completed"
                className="text-xs sm:text-sm font-semibold text-gray-800 cursor-pointer"
              >
                ✅ Mark as completed
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition active:scale-95 min-h-10 sm:min-h-12"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-300 transition active:scale-95 min-h-10 sm:min-h-12"
            >
              {order ? "Update Order" : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
