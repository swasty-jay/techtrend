import { useState } from "react";
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

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center space-x-2 px-6 py-2 font-semibold rounded-lg transition ${
              activeTab === tab.name
                ? "bg-gray-400 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            <img src={tab.logo} alt={tab.name} className="h-6 w-6" />
            <span className="text-xs">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Render Active Tab Content */}
      <div>{tabs.find((tab) => tab.name === activeTab)?.component}</div>
    </div>
  );
};

export default Tabs;
