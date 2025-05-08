import { useState, useEffect } from "react";
import SamsungProducts from "./../Components/SamsungProducts";
import AppleProducts from "./../Components/AppleProducts";
import PlaystaionProducts from "./../Components/PlaystationProducts";
import { ShoppingCart, Heart } from "lucide-react";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("featured");
  // const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulated top-selling products for featured section
  const featuredProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra",
      price: "$1,199",
      image: "/api/placeholder/120/120",
      tag: "New",
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: "$1,099",
      image: "/api/placeholder/120/120",
      tag: "Popular",
    },
    {
      id: 3,
      name: "Samsung Galaxy Watch 6",
      price: "$349",
      image: "/api/placeholder/120/120",
      tag: "Best Seller",
    },
    {
      id: 4,
      name: "Apple MacBook Air M3",
      price: "$1,299",
      image: "/api/placeholder/120/120",
      tag: "Limited",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Top notification bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Free express shipping on all orders over $100.{" "}
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl mb-10">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-800 py-10 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Summer Tech Sale
              </h2>
              <p className="text-purple-100 text-lg mb-6">
                Up to 40% off on premium devices. Limited time offer.
              </p>
              <button className="bg-white text-purple-900 font-medium py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors">
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://res.cloudinary.com/du4q0ipx8/image/upload/v1746727601/C_est_d%C3%A9j%C3%A0_53_minutes_d5onh1.jpg"
                alt="Featured products"
                className="rounded-lg py-0"
              />
            </div>
          </div>
        </div>

        {/* Shop by Brand */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Shop by Brand</h2>
            <button className="text-sm text-purple-700 font-medium hover:underline">
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
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                <span className="text-white font-bold">S</span>
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
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-medium">Apple</span>
            </button>

            <button className="flex flex-col items-center rounded-xl border border-gray-200 p-6 hover:border-purple-200 hover:bg-purple-50 transition-all  ">
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                <span className="text-white font-bold">P</span>
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
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Top Picks For You</h2>
            <button className="text-sm text-purple-700 font-medium hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {product.tag}
                  </span>
                  <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart
                      size={16}
                      className="text-gray-600 hover:text-red-500"
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-purple-700 font-semibold mb-3">
                    {product.price}
                  </p>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 text-sm font-medium transition-colors">
                    Add to Cart
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
                className="text-sm text-purple-700 font-medium hover:underline"
              >
                View All
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Apple Products</h2>
              <button
                onClick={() => setActiveCategory("apple")}
                className="text-sm text-purple-700 font-medium hover:underline"
              >
                View All
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <AppleProducts />
            </div>
          </div>

          {/* Uncomment when PlayStation component is ready */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">PlayStation Products</h2>
              <button className="text-sm text-purple-700 font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <PlaystaionProducts />
            </div>
          </div>
        </section>
      </main>

      {/* Newsletter and Benefits */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
              <p className="mb-6 text-purple-100">
                Subscribe to our newsletter for exclusive deals and tech news
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-l-lg text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-purple-700 font-medium px-6 py-3 rounded-r-lg hover:bg-purple-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Why Shop With Us</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <ShoppingCart size={20} className="text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Free Shipping</h4>
                    <p className="text-sm text-gray-600">
                      On all orders over $100
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-700"
                    >
                      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Money Back</h4>
                    <p className="text-sm text-gray-600">30-day guarantee</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-700"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Always here to help</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-700"
                    >
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Secure Payment</h4>
                    <p className="text-sm text-gray-600">
                      100% protected checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
