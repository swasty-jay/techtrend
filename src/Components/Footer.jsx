import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold">TechTrend</h3>
            <p className="mt-3 text-gray-400 max-w-xs">
              Your one-stop shop for the latest tech accessories and gadgets.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <MdEmail size={16} className="mr-2" />
                <span>support@techtrend.com</span>
              </li>
              <li className="flex items-center">
                <MdPhone size={16} className="mr-2" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <MdLocationOn size={16} className="mr-2" />
                <span>123 Tech Street, Digital City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter subscription - optional */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <h4 className="text-base font-medium">
                Subscribe to our newsletter
              </h4>
              <p className="text-sm text-gray-400">
                Stay updated with our latest products
              </p>
            </div>
            <div className="w-full sm:w-auto flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full sm:w-64 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-gray-500 text-sm">
            © 2025 TechTrend. All rights reserved.
          </p>
          <div className="mt-2 sm:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-400 text-sm mr-4"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-400 text-sm mr-4"
            >
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
