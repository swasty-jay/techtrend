import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HeroImageBackground() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Premium Apple Products & Accessories",
      description: "Explore the best in iPhone, iPad, and Mac accessories",
      buttonText: "Shop Apple",
      image:
        "https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/bg-images//Best-iPhone-Accessories-0-Hero.jpg",
    },
    {
      title: "Top Samsung Products & Accessories",
      description: "Discover chargers, cases, and more for Galaxy devices",
      buttonText: "Shop Samsung",
      image:
        "https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/samsung-products//samsung.jpg",
    },
    {
      title: "Gaming Consoles & Accessories",
      description: "Level up with controllers, headsets, and more",
      buttonText: "Shop Gaming",
      image:
        "https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/bg-images//Cool_iPhone_Accessories_1.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center flex items-center justify-center text-center transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 text-4xl font-extrabold tracking-tight sm:text-2xl"
            >
              {slide.title}
            </motion.h1>
            <p className="mt-4 text-gray-300 text-lg max-w-xl mx-auto text-center sm:text-left">
              {slide.description}
            </p>
            <div className="mt-8 flex justify-center">
              <button className="h-10 px-6 text-md bg-[var(--azure-blue)] text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-gray-100 scale-125" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
export default HeroImageBackground;
