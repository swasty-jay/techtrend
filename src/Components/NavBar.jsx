import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaTimes,
  FaChevronDown,
  FaBars,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDrawerOpen &&
        !event.target.closest(".mobile-drawer") &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen]);

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg py-2" : "bg-gray-50 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-gray-800"
            } hover:opacity-80 md:mr-8`}
          >
            TechTrend
          </Link>

          {/* Mobile Cart Icon (Left) */}
          <div
            className="md:hidden flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/checkOut")}
          >
            <div className="relative">
              <FaShoppingCart
                className={`text-xl ${
                  scrolled ? "text-gray-700" : "text-gray-800"
                }`}
              />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 mx-auto">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-indigo-600"
                  : "text-gray-700 hover:text-gray-900"
              } px-2 py-1 rounded-md hover:bg-gray-100`}
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <div
                className={`flex items-center cursor-pointer font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-gray-700 hover:text-indigo-600"
                    : "text-gray-700 hover:text-gray-900"
                } px-2 py-1 rounded-md hover:bg-gray-100`}
              >
                <span>Categories</span>
                <FaChevronDown
                  className={`ml-1 text-xs transition-transform duration-300 ${
                    isCategoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <AnimatePresence>
                {isCategoryDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-10 left-0 bg-white shadow-xl rounded-lg py-2 w-48 z-30 border border-gray-100"
                  >
                    <Link
                      to="/categories/samsung"
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-800 transition-colors duration-200"
                    >
                      Samsung
                    </Link>
                    <Link
                      to="/categories/apple"
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-800 transition-colors duration-200"
                    >
                      Apple
                    </Link>
                    <Link
                      to="/categories/accessories"
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-800 transition-colors duration-200"
                    >
                      Accessories
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/about"
              className={`font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-gray-800"
                  : "text-gray-700 hover:text-gray-900"
              } px-2 py-1 rounded-md hover:bg-gray-100`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-gray-800"
                  : "text-gray-700 hover:text-gray-900"
              } px-2 py-1 rounded-md hover:bg-gray-100`}
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop Right: Cart + Profile */}
          <div className="hidden md:flex items-center space-x-6">
            <div
              className="relative cursor-pointer group"
              onClick={() => navigate("/checkOut")}
            >
              <div className="p-2 rounded-full group-hover:bg-gray-100 transition-all duration-200">
                <FaShoppingCart
                  className={`text-xl transition-colors duration-200 ${
                    scrolled
                      ? "text-gray-700 group-hover:text-gray-800"
                      : "text-gray-800 group-hover:text-gray-900"
                  }`}
                />
              </div>
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsProfileDropdownOpen(true)}
              onMouseLeave={() => setIsProfileDropdownOpen(false)}
            >
              <div
                className={`flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all duration-200`}
              >
                <FaUser
                  className={`text-xl transition-colors duration-200 ${
                    scrolled
                      ? "text-gray-700 hover:text-gray-800"
                      : "text-gray-800 hover:text-gray-900"
                  }`}
                />
                <FaChevronDown
                  className={`ml-1 text-xs transition-transform duration-300 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  } ${scrolled ? "text-gray-700" : "text-gray-800"}`}
                />
              </div>
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-12 right-0 bg-white shadow-xl rounded-lg py-3 w-48 z-30 border border-gray-100"
                  >
                    <Link
                      to="/profile/account"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/profile/orders"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                    >
                      My Orders
                    </Link>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-red-600 transition-colors duration-200">
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
            className="md:hidden menu-toggle p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {isDrawerOpen ? (
              <FaTimes
                className={`text-xl ${
                  scrolled ? "text-gray-700" : "text-gray-800"
                }`}
              />
            ) : (
              <FaBars
                className={`text-xl ${
                  scrolled ? "text-gray-700" : "text-gray-800"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={toggleDrawer}
              />

              {/* Drawer */}
              <motion.div
                variants={drawerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 mobile-drawer overflow-y-auto"
              >
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Techtrend</h2>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                    onClick={toggleDrawer}
                  >
                    <FaTimes className="text-gray-700" />
                  </button>
                </div>

                <div className="flex flex-col p-4">
                  <Link
                    to="/"
                    onClick={toggleDrawer}
                    className="py-3 px-4 rounded-md hover:bg-gray-100 text-gray-700 font-medium transition-colors duration-200"
                  >
                    Home
                  </Link>
                  {/* <Link
                    to="/shop"
                    onClick={toggleDrawer}
                    className="py-3 px-4 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200"
                  >
                    Shop
                  </Link> */}

                  <details className="group">
                    <summary className="py-3 px-4 rounded-md hover:bg-gray-100 cursor-pointer flex justify-between items-center text-gray-700 font-medium list-none">
                      Categories
                      <FaChevronDown className="text-sm transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="pl-4 pr-2">
                      <Link
                        to="/categories/samsung"
                        onClick={toggleDrawer}
                        className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                      >
                        Samsung
                      </Link>
                      <Link
                        to="/categories/apple"
                        onClick={toggleDrawer}
                        className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                      >
                        Apple
                      </Link>
                      <Link
                        to="/categories/accessories"
                        onClick={toggleDrawer}
                        className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                      >
                        Accessories
                      </Link>
                    </div>
                  </details>

                  <Link
                    to="/about"
                    onClick={toggleDrawer}
                    className="py-3 px-4 rounded-md hover:bg-gray-100 text-gray-700 font-medium transition-colors duration-200"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    onClick={toggleDrawer}
                    className="py-3 px-4 rounded-md hover:bg-gray-100 text-gray-700 font-medium transition-colors duration-200"
                  >
                    Contact Us
                  </Link>

                  <div className="h-px bg-gray-200 my-3"></div>

                  <details className="group">
                    <summary className="py-3 px-4 rounded-md hover:bg-gray-100 cursor-pointer flex justify-between items-center text-gray-700 font-medium list-none">
                      Profile
                      <FaChevronDown className="text-sm transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="pl-4 pr-2">
                      <Link
                        to="/profile/account"
                        onClick={toggleDrawer}
                        className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/profile/orders"
                        onClick={toggleDrawer}
                        className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={toggleDrawer}
                        className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  </details>

                  <div className="h-px bg-gray-200 my-3"></div>

                  <Link
                    to="/signup"
                    onClick={toggleDrawer}
                    className="px-4 py-3 bg-red-500 hover:bg-red-500 text-white font-medium rounded-md text-center transition-colors duration-200 mt-2"
                  >
                    Sign Up
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default NavBar;
