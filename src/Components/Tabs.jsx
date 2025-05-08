import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppleProducts from "./AppleProducts";
import SamsungProducts from "./SamsungProducts";
import SonyProducts from "./PlaystationProducts";

const tabs = [
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    component: <AppleProducts />,
  },
  {
    name: "Samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    component: <SamsungProducts />,
  },
  {
    name: "PlayStation",
    logo: "https://www.logo.wine/a/logo/PlayStation/PlayStation-Icon-White-Dark-Background-Logo.wine.svg",
    component: <SonyProducts />,
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setShowDropdown(false);
  };

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Dropdown */}
      {isMobile && (
        <div className="relative mb-6">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-center space-x-3">
              <img
                src={tabs.find((tab) => tab.name === activeTab)?.logo}
                alt={activeTab}
                className="h-6 w-6 object-contain"
              />
              <span className="font-medium">{activeTab}</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                showDropdown ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    activeTab === tab.name ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleTabChange(tab.name)}
                >
                  <img
                    src={tab.logo}
                    alt={tab.name}
                    className="h-6 w-6 object-contain"
                  />
                  <span
                    className={`font-medium ${
                      activeTab === tab.name
                        ? "text-indigo-600"
                        : "text-gray-700"
                    }`}
                  >
                    {tab.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tablet/Desktop Tabs */}
      {!isMobile && (
        <div className="flex flex-wrap justify-center mb-8">
          <div
            className={`inline-flex p-1 ${
              isTablet ? "w-full" : ""
            } rounded-xl bg-gray-100`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isTablet ? "flex-1 justify-center" : "px-6"
                } ${
                  activeTab === tab.name
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange(tab.name)}
              >
                <img
                  src={tab.logo}
                  alt={tab.name}
                  className={`h-5 w-5 object-contain ${
                    activeTab === tab.name ? "opacity-100" : "opacity-70"
                  }`}
                />
                <span className={`${isTablet ? "text-xs" : "text-sm"}`}>
                  {tab.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Render Active Tab Content with Animation */}
      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        variants={tabContentVariants}
        className="min-h-[300px]"
      >
        {tabs.find((tab) => tab.name === activeTab)?.component}
      </motion.div>
    </div>
  );
};

export default Tabs;
