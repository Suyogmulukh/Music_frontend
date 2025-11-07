import React, { useState } from "react";
import OrderTable from "../components/admin/OrderTable";
import OrderModal from "../components/admin/OrderModal";
import { Plus, Package, Home, Menu, X } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOrders } from "../context/orderContext";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getStats } = useOrders();
  const { completed, pending, totalRevenue } = getStats();
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg">
        <div className="w-full px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-6 py-6 sm:py-8">
          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Package size={24} className="text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Orders</h1>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-white/20 rounded-lg transition text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden space-y-3 mb-4 pb-4 border-t border-white/20 pt-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/20 text-white rounded-lg hover:bg-white/30 transition w-full justify-center"
              >
                <Home size={20} />
                Back Home
              </Link>
              <button
                onClick={() => {
                  setShowAddModal(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition w-full justify-center"
              >
                <Plus className="w-5 h-5" />
                Add Order
              </button>
            </div>
          )}

          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-start gap-6">
            {/* Back Button */}
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition whitespace-nowrap"
            >
              <Home size={20} />
              Back to Home
            </Link>

            {/* Title & Description */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Package size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">
                  Order Management
                </h1>
                <p className="text-blue-100 text-lg">
                  Manage and track all your orders efficiently
                </p>
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2.5 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 shadow-lg hover:shadow-xl transition duration-200 hover:scale-105 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add New Order
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-6 py-6 sm:py-8">
        {/* Section Title */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-sky-500 to-blue-600 rounded"></div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">All Orders</h2>
          </div>
        </div>

        {/* Orders Table */}
        <OrderTable />

        {/* Stats Cards */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-green-500 hover:shadow-lg transition duration-200">
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
              ✅ Completed Orders
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{completed}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-amber-500 hover:shadow-lg transition duration-200">
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
              ⏳ Pending Orders
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-amber-600">{pending}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-blue-500 hover:shadow-lg transition duration-200 sm:col-span-2 lg:col-span-1">
            <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
              📊 Total Revenue
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Add Order Modal */}
      {showAddModal && (
        <OrderModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};

export default AdminPage;