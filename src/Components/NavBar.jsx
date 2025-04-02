import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
// import Link from "react-router-dom";

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate total items in cart
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[var(--azure-blue)] shadow-md fixed w-full top-0 z-20 font-medium">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-700">TechTrend</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Shop
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Categories
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Contact
          </a>
          {/* Search Icon */}
          {/* <FaSearch className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl" /> */}
          {/* User Profile Icon */}
          <div className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl flex items-center">
            <FaUser className="pl-2 text-2xl" />
            <span className="pl-2 text-sm">Profile</span>
          </div>
          {/* Cart Icon */}
          <div className="relative">
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl flex items-center">
              <FaShoppingCart />
              <span className="pl-2 text-sm">Cart</span>
            </span>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-6 absolute w-full top-16 left-0 z-10">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-2"
              onClick={toggleMobileMenu}
            >
              <span>Home</span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-2"
              onClick={toggleMobileMenu}
            >
              <span>Shop</span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-2"
              onClick={toggleMobileMenu}
            >
              <span>Categories</span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-2"
              onClick={toggleMobileMenu}
            >
              <span>Contact</span>
            </a>
            {/* Mobile Icons */}
            <div className="flex justify-between items-center border-t pt-4">
              {/* <FaSearch className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl" /> */}
              <FaUser className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl" />
              <div className="relative">
                <FaShoppingCart className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
