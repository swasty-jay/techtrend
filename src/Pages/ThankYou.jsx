import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome } from "react-icons/fa";

const ThankYouPage = () => {
  const [order, setOrder] = useState({
    orderId: "",
    total: 0,
    date: "",
    paymentMethod: "",
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("orderDetails");
    if (stored) setOrder(JSON.parse(stored));
    return () => sessionStorage.removeItem("orderDetails");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">Your order has been placed.</p>

        <div className="text-left text-sm text-gray-700 space-y-2 mb-6">
          <p><strong>Order ID:</strong> {order.orderId || "N/A"}</p>
          <p><strong>Date:</strong> {order.date || new Date().toLocaleDateString()}</p>
          <p><strong>Payment:</strong> {order.paymentMethod || "Paystack"}</p>
          <p><strong>Total:</strong> GHS {order.total || 0}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            <FaHome className="inline mr-1" />
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
