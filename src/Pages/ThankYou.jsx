import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaShoppingBag,
  FaHome,
} from "react-icons/fa";

/**
 * ThankYouPage component displays a confirmation message after a successful order
 * Shows order details and provides navigation options for the customer
 */
const ThankYouPage = () => {
  // State to store order details retrieved from sessionStorage
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    total: 0,
    date: "",
    paymentMethod: "",
  });

  // Retrieve order details from sessionStorage on component mount
  useEffect(() => {
    const storedDetails = sessionStorage.getItem("orderDetails");
    if (storedDetails) {
      setOrderDetails(JSON.parse(storedDetails));
    }

    // Clean up the sessionStorage after retrieving data
    return () => {
      sessionStorage.removeItem("orderDetails");
    };
  }, []);

  // Format the date for display
  const formattedDate = orderDetails.date || new Date().toLocaleDateString();

  // Format the order ID (truncate if too long)
  const displayOrderId = orderDetails.orderId
    ? orderDetails.orderId.length > 12
      ? `${orderDetails.orderId.substring(0, 12)}...`
      : orderDetails.orderId
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Main content container */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header section with success icon */}
        <div className="bg-green-500 py-6 px-6 text-white text-center">
          <FaCheckCircle className="inline-block text-6xl mb-3" />
          <h1 className="text-3xl font-bold">Thank You For Your Order!</h1>
          <p className="mt-2 text-lg">
            Your order has been placed successfully.
          </p>
        </div>

        {/* Order details section */}
        <div className="p-8">
          <div className="mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-1">Order ID:</p>
                <p className="font-medium">{displayOrderId}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Date:</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Payment Method:</p>
                <p className="font-medium">
                  {orderDetails.paymentMethod || "PayStack"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Amount:</p>
                <p className="font-medium">GHS {orderDetails.total || 0}</p>
              </div>
            </div>
          </div>

          {/* Status and information section */}
          <div className="mb-8">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FaBoxOpen className="text-blue-500 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Order Processing</h3>
                <p className="text-gray-600">
                  We're processing your order. You will receive an email
                  confirmation shortly with the details of your purchase.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <FaShoppingBag className="text-purple-500 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Shipping</h3>
                <p className="text-gray-600">
                  Your order will be shipped within 1-3 business days. You will
                  receive tracking information via email once your order is
                  shipped.
                </p>
              </div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Link
              to="/"
              className="flex-1 bg-red-500 text-white py-3 px-6 rounded font-medium text-center hover:bg-red-600 transition flex items-center justify-center"
            >
              <FaHome className="mr-2" /> Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded font-medium text-center hover:bg-gray-300 transition"
            >
              Track Your Order
            </Link>
          </div>
        </div>

        {/* Footer message */}
        <div className="bg-gray-50 py-4 px-8 text-center border-t border-gray-200">
          <p className="text-gray-600">
            If you have any questions, please contact our customer support at{" "}
            <a
              href="mailto:support@yourstore.com"
              className="text-blue-500 hover:underline"
            >
              support@yourstore.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
