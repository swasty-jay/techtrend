import React, { useState } from "react";
import { AiOutlineAlignRight } from "react-icons/ai";
import { FaShoppingCart, FaUser, FaTimes, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckOut from "../Cart/CheckOut";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const closeDrawer = () => setIsDrawerOpen(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-200 shadow-md fixed w-full top-0 z-50 font-medium">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between space-x-1 items-center ">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-gray-700 hover:text-gray-800">
          TechTrend
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 relative">
          <Link to="/" className=" text-gray-700 hover:text-gray-800">
            Home
          </Link>
          <Link to="/shop" className=" text-gray-700 hover:text-gray-800">
            Shop
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            onMouseLeave={() => setIsCategoryDropdownOpen(false)}
          >
            <div className="flex items-center  cursor-pointer  text-gray-700 hover:text-gray-800">
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
                    Samsung products
                  </Link>
                  <Link
                    to="/categories/apple"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Apple products
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

          <Link to="/about" className=" text-gray-700 hover:text-gray-800">
            About
          </Link>
          <Link to="/contact" className=" text-gray-700 hover:text-gray-800">
            Contact
          </Link>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              setShowCart(false); // hide the cart first
              setTimeout(() => {
                navigate("/checkOut");
              }, 300); // delay so the hide animation can complete
            }}
          >
            <FaShoppingCart className="text-gray-700 hover:text-gray-800 text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsProfileDropdownOpen(true)}
            onMouseLeave={() => setIsProfileDropdownOpen(false)}
          >
            <div className="flex items-center text-black cursor-pointer ">
              <FaUser className="text-2xl" />
              <FaChevronDown className="ml-1 text-sm" />
            </div>
            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-8 right-0 bg-gray-200 shadow-lg rounded-md py-2 w-40 z-30"
                >
                  <Link
                    to="/profile/account"
                    className="block px-4 py-2 hover:bg-gray-100 text-[14] hover:text-black"
                  >
                    Account Management
                  </Link>
                  <Link
                    to="/profile/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  {/* <Link
                    to="/profile/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Cancelled Orders
                  </Link> */}
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-semibold">
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center space-x-6">
          <Link to="/profile">
            <FaUser className="text-black text-2xl" />
          </Link>

          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart(true)}
          >
            <FaShoppingCart className="text-black text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>
          <button
            onClick={toggleDrawer}
            className="text-white focus:outline-none"
          >
            {isDrawerOpen ? (
              <FaTimes className="text-medium text-black" />
            ) : (
              <AiOutlineAlignRight className="text-medium text-black" />
            )}
          </button>
        </div>
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
              <Link to="/" onClick={closeDrawer}>
                Home
              </Link>
              <Link to="/shop" onClick={closeDrawer}>
                Shop
              </Link>

              {/* Categories Dropdown in Drawer */}
              <details className="group">
                <summary className="flex justify-between cursor-pointer text-gray-800 ">
                  Categories{" "}
                  <FaChevronDown className="text-sm group-open:rotate-180 transition" />
                </summary>
                <div className="ml-4 mt-2 flex flex-col space-y-2">
                  <Link to="/categories/samsung" onClick={closeDrawer}>
                    Samsung
                  </Link>
                  <Link to="/categories/apple" onClick={closeDrawer}>
                    Apple
                  </Link>
                  <Link to="/categories/accessories" onClick={closeDrawer}>
                    Accessories
                  </Link>
                </div>
              </details>

              <Link to="/about" onClick={closeDrawer}>
                About
              </Link>
              <Link to="/contact" onClick={closeDrawer}>
                Contact
              </Link>

              {/* Profile Dropdown in Drawer */}
              <details className="group">
                <summary className="flex justify-between cursor-pointer text-gray-800 hover:text-blue-600">
                  Profile{" "}
                  <FaChevronDown className="text-sm group-open:rotate-180 transition" />
                </summary>
                <div className="ml-4 mt-2 flex flex-col space-y-2">
                  <Link to="/profile/account" onClick={closeDrawer}>
                    Account
                  </Link>
                  <Link to="/profile/orders" onClick={closeDrawer}>
                    Orders
                  </Link>
                  <button onClick={closeDrawer} className="text-left">
                    Logout
                  </button>
                </div>
              </details>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      {showCart && <CheckOut onClose={() => setShowCart(false)} />}
    </nav>
  );
};

export default NavBar;
