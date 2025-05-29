import { useState } from "react";
import SamsungProducts from "./../Components/SamsungProducts";
import AppleProducts from "./../Components/AppleProducts";
import PlaystaionProducts from "./../Components/PlaystationProducts";
import WhyChooseUs from "../UI/WhyChooseUs";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("featured");
  // const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulated top-selling products for featured section
  const featuredProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra",
      price: "GHS 11,199",
      image:
        "https://gh.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/49/8297951/1.jpg?9247",
      tag: "out of stock",
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: "GHS 6,999",
      image:
        "https://gh.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/5994572/1.jpg?5847",
      tag: "out of stock",
    },
    {
      id: 3,
      name: "Samsung Galaxy Watch 6",
      price: "GHS 349",
      image:
        "https://gh.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/66/1451352/1.jpg?7808",
      tag: "out of stock",
    },
    {
      id: 4,
      name: "Apple MacBook Air M3",
      price: "GHS 9,299",
      image:
        "https://gh.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/30/5622582/1.jpg?2278",
      tag: "out of stock",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Top notification bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Free express shipping on all orders over GHS 100.{" "}
        <span className="underline font-medium">Learn more</span>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-16 px-4">
          <div className="flex flex-col space-y-4 text-lg">
            {[
              "Featured",
              "Samsung",
              "Apple",
              "Accessories",
              "Wearables",
              "Audio",
              "New Arrivals",
              "Deals",
            ].map((category) => (
              <button
                key={category}
                className={`py-2 border-b border-gray-100 text-left ${
                  activeCategory === category.toLowerCase()
                    ? "text-purple-700 font-medium"
                    : ""
                }`}
                onClick={() => {
                  setActiveCategory(category.toLowerCase());
                  setMobileMenuOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-1 py-2">
        {/* Shop by Brand */}
        <section className="mb-12 hidden md:block">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Shop by Brand</h2>
            <button className="text-sm text-red-700 font-medium hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setActiveCategory("samsung")}
              className={`flex flex-col items-center rounded-xl border p-6 transition-all ${
                activeCategory === "samsung"
                  ? "border-purple-300 bg-purple-50"
                  : "border-gray-200 hover:border-purple-200 hover:bg-purple-50"
              }`}
            >
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
                    alt=""
                  />
                </span>
              </div>
              <span className="font-medium">Samsung</span>
            </button>

            <button
              onClick={() => setActiveCategory("apple")}
              className={`flex flex-col items-center rounded-xl border p-6 transition-all ${
                activeCategory === "apple"
                  ? "border-purple-300 bg-purple-50"
                  : "border-gray-200 hover:border-purple-200 hover:bg-purple-50"
              }`}
            >
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    alt="logo"
                  />
                </span>
              </div>
              <span className="font-medium">Apple</span>
            </button>

            <button
              onClick={() => setActiveCategory("playstation")}
              className={`flex flex-col items-center rounded-xl border p-6 transition-all ${
                activeCategory === "playstation"
                  ? "border-purple-300 bg-purple-50"
                  : "border-gray-200 hover:border-purple-200 hover:bg-purple-50"
              }`}
            >
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center ">
                <span className="text-white font-bold">
                  <img
                    src="https://www.logo.wine/a/logo/PlayStation/PlayStation-Icon-White-Dark-Background-Logo.wine.svg"
                    alt=""
                  />
                </span>
              </div>
              <span className="font-medium">PlayStation</span>
            </button>

            <button className="flex flex-col items-center rounded-xl border border-gray-200 p-6 hover:border-purple-200 hover:bg-purple-50 transition-all">
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-700">
                <span className="text-white font-bold">+</span>
              </div>
              <span className="font-medium">More Brands</span>
            </button>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12 hidden md:block">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Top Picks For You</h2>
            <button className="text-sm text-red-500 font-medium hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {product.tag}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-red-700 font-semibold mb-3">
                    {product.price}
                  </p>
                  <button className="w-full bg-gray-300 hover:gray-red-400 text-gray-600 rounded-lg py-2 text-sm font-medium transition-colors">
                    out of stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Sections */}
        <section>
          {/* Samsung Products Section */}
          <div
            className={
              activeCategory === "featured" || activeCategory === "samsung"
                ? "mb-16"
                : "hidden"
            }
          >
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold">Samsung Products</h2>
              <button
                onClick={() => setActiveCategory("samsung")}
                className="text-sm text-red-500 font-medium hover:underline"
              >
                View All
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-2">
              <SamsungProducts />
            </div>
          </div>

          {/* Apple Products Section */}
          <div
            className={
              activeCategory === "featured" || activeCategory === "apple"
                ? "mb-16"
                : "hidden"
            }
          >
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold">Apple Products</h2>
              <button
                onClick={() => setActiveCategory("apple")}
                className="text-sm text-red-500 font-medium hover:underline"
              >
                View All
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-2">
              <AppleProducts />
            </div>
          </div>

          {/* Uncomment when PlayStation component is ready */}
          <div
            className={
              activeCategory === "featured" || activeCategory === "playstation"
                ? "mb-16"
                : "hidden"
            }
          >
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold">sony Products</h2>
              <button
                onClick={() => setActiveCategory("apple")}
                className="text-sm text-red-500 font-medium hover:underline"
              >
                View All
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-2">
              <PlaystaionProducts />
            </div>
          </div>
        </section>
      </main>

      {/* Newsletter and Benefits */}
      <WhyChooseUs />
    </div>
  );
};

export default Shop;
