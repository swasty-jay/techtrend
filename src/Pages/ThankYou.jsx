import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { Truck } from "lucide-react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-20 px-4 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center border border-white/30">
        {/* Icon */}
        <div className="inline-block p-6 rounded-3xl bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 shadow-lg">
          <FaCheckCircle className="text-white text-5xl" />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mt-6 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. We appreciate your business!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            to="/"
            className="w-full bg-red-500 text-white py-1 rounded-md font-medium  flex items-center justify-center gap-2"
          >
            <FaHome className="text-white" />
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="w-full bg-gray-100 text-gray-800 py-1  rounded-md font-medium hover:bg-gray-200 transition"
          >
            Track Order
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">Powered by TechTrend Delivery</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
