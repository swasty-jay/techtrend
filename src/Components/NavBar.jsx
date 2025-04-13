import React, { useState } from "react";
import { AiOutlineAlignRight } from "react-icons/ai";
import { FaShoppingCart, FaUser, FaTimes, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <nav className="bg-gray-200 shadow-md fixed w-full top-0 z-50 font-medium">
      <div className="max-w-7xl mx-auto px-4 py-4 relative flex items-center justify-between">
        {/* Left: Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-700 hover:text-gray-800 absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 md:left-0"
        >
          TechTrend
        </Link>

        {/* Mobile Cart Icon (Left) */}
        <div
          className="md:hidden absolute left-4"
          onClick={() => navigate("/checkOut")}
        >
          <FaShoppingCart className="text-gray-700 hover:text-gray-800 text-2xl" />
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          <Link to="/shop" className="text-gray-700 hover:text-gray-800">
            Shop
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            onMouseLeave={() => setIsCategoryDropdownOpen(false)}
          >
            <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-800">
              <span>Categories</span>
              <FaChevronDown className="ml-1 text-sm" />
            </div>
            <AnimatePresence>
              {isCategoryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-8 left-0 bg-white shadow-lg rounded-md py-2 w-40 z-30"
                >
                  <Link
                    to="/categories/samsung"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Samsung
                  </Link>
                  <Link
                    to="/categories/apple"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Apple
                  </Link>
                  <Link
                    to="/categories/accessories"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Accessories
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/about" className="text-gray-700 hover:text-gray-800">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-800">
            Contact Us
          </Link>
        </div>

        {/* Right: Cart + Profile */}
        <div className="hidden md:flex items-center space-x-6">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/checkOut")}
          >
            <FaShoppingCart className="text-gray-700 hover:text-gray-800 text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsProfileDropdownOpen(true)}
            onMouseLeave={() => setIsProfileDropdownOpen(false)}
          >
            <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-800">
              <FaUser className="text-2xl" />
              <FaChevronDown className="ml-1 text-sm" />
            </div>
            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-8 right-0 bg-white shadow-lg rounded-md py-2 w-40 z-30"
                >
                  <Link
                    to="/profile/account"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Account
                  </Link>
                  <Link
                    to="/profile/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleDrawer}
          className="md:hidden absolute right-4 text-gray-700"
        >
          {isDrawerOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <AiOutlineAlignRight className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-40"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Menu</h2>
              <FaTimes
                className="text-xl cursor-pointer"
                onClick={toggleDrawer}
              />
            </div>

            <div className="flex flex-col space-y-4 p-6">
              <Link to="/" onClick={toggleDrawer}>
                Home
              </Link>
              <Link to="/shop" onClick={toggleDrawer}>
                Shop
              </Link>

              <details className="group">
                <summary className="flex justify-between cursor-pointer text-gray-800">
                  Categories
                  <FaChevronDown className="text-sm group-open:rotate-180 transition" />
                </summary>
                <div className="ml-4 mt-2 flex flex-col space-y-2">
                  <Link to="/categories/samsung" onClick={toggleDrawer}>
                    Samsung
                  </Link>
                  <Link to="/categories/apple" onClick={toggleDrawer}>
                    Apple
                  </Link>
                  <Link to="/categories/accessories" onClick={toggleDrawer}>
                    Accessories
                  </Link>
                </div>
              </details>

              <Link to="/about" onClick={toggleDrawer}>
                About
              </Link>
              <Link to="/contact" onClick={toggleDrawer}>
                Contact
              </Link>

              <details className="group">
                <summary className="flex justify-between cursor-pointer text-gray-800">
                  Profile
                  <FaChevronDown className="text-sm group-open:rotate-180 transition" />
                </summary>
                <div className="ml-4 mt-2 flex flex-col space-y-2">
                  <Link to="/profile/account" onClick={toggleDrawer}>
                    Account
                  </Link>
                  <Link to="/profile/orders" onClick={toggleDrawer}>
                    Orders
                  </Link>
                  <button onClick={toggleDrawer} className="text-left">
                    Logout
                  </button>
                </div>
              </details>

              <Link to="/signup" onClick={toggleDrawer}>
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
