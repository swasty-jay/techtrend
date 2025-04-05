import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
// import CartCheckout from "../Cart/CartCheckOut";
import { Link } from "react-router-dom";
// import CartCheckout from "./../Cart/CartCheckOut";
import CartCheckOut from "../Cart/CartCheckOut";

const NavBar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

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
          {["Home", "Shop", "Categories", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              {item}
            </Link>
          ))}

          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart(true)}
          >
            <FaShoppingCart className="text-gray-700 hover:text-blue-600 text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>

          {/* User Profile Icon */}

          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 cursor-pointer text-xl flex items-center"
          >
            <FaUser className="pl-2 text-2xl" />
          </Link>
        </div>

        {/* Mobile Icons and Menu Button */}
        <div className="md:hidden flex items-center space-x-8">
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 text-xl"
          >
            <FaUser />
          </Link>
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart(true)}
          >
            <FaShoppingCart className="text-gray-700 hover:text-blue-600 text-xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>
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
            {["Home", "Shop", "Categories", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Cart Checkout Modal */}
      {showCart && <CartCheckOut onClose={() => setShowCart(false)} />}
    </nav>
  );
};

export default NavBar;
