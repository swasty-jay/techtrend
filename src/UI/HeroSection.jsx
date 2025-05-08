import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ card, index, isSelected, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${index}`}
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-500 ${
        isSelected ? "z-10" : "z-0"
      } h-64 sm:h-80 md:h-96 lg:h-112`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: isSelected ? 1 : 0.9,
        opacity: 1,
        filter: isSelected ? "brightness(1)" : "brightness(0.7)",
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full w-full overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-black/20" />
        <img
          src={card.src}
          alt={card.title}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-20">
          <p className="text-xs sm:text-sm font-medium opacity-70">
            {card.category}
          </p>
          <h2 className="mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
            {card.title}
          </h2>
        </div>
      </div>
    </motion.div>
  );
};

const ExpandedCard = ({ card, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90vh] sm:max-h-[85vh] w-[95vw] sm:w-[90vw] md:w-[85vw] max-w-7xl overflow-y-auto rounded-xl sm:rounded-2xl md:rounded-3xl bg-white dark:bg-neutral-900"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 sm:p-4 md:p-6">
          <button
            onClick={onClose}
            className="absolute right-3 sm:right-4 top-3 sm:top-4 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/10 text-black dark:bg-white/10 dark:text-white"
          >
            ✕
          </button>
          <div className="mt-4 sm:mt-6">
            <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {card.category}
            </span>
            <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white">
              {card.title}
            </h2>
            {card.content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, []);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;
    const cardWidth = carouselRef.current
      ? carouselRef.current.offsetWidth / 4
      : 100;
    const swipeThreshold = Math.max(40, cardWidth * 0.3); // Minimum 40px or 30% of card width

    if (swipe < -swipeThreshold && activeIndex < items.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (swipe > swipeThreshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" && activeIndex < items.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (e.key === "ArrowLeft" && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, items.length]);

  return (
    <>
      <div className="relative w-full overflow-hidden py-4 sm:py-6 md:py-8">
        <motion.div
          ref={carouselRef}
          className="flex flex-row space-x-3 sm:space-x-4 md:space-x-6 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {items.map((child, index) => (
            <div
              className="flex-shrink-0 w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/3"
              key={`carousel-container-${index}`}
            >
              {React.cloneElement(child, {
                key: `carousel-item-${index}`,
                index,
                isSelected: activeIndex === index,
                onClick: () => handleCardClick(index),
              })}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {items.map((_, index) => (
          <button
            key={`carousel-dot-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              activeIndex === index
                ? "bg-black dark:bg-white w-6"
                : "bg-neutral-300 dark:bg-neutral-700"
            }`}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedCard !== null && (
          <ExpandedCard
            card={items[selectedCard].props.card}
            onClose={handleCloseCard}
          />
        )}
      </AnimatePresence>

      {/* Mobile navigation buttons for better touch control */}
      <div className="flex justify-between px-4 sm:hidden mt-4">
        <button
          onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
          className={`rounded-full p-2 bg-neutral-200 dark:bg-neutral-800 ${
            activeIndex === 0 ? "opacity-40" : "opacity-100"
          }`}
          disabled={activeIndex === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() =>
            activeIndex < items.length - 1 && setActiveIndex(activeIndex + 1)
          }
          className={`rounded-full p-2 bg-neutral-200 dark:bg-neutral-800 ${
            activeIndex === items.length - 1 ? "opacity-40" : "opacity-100"
          }`}
          disabled={activeIndex === items.length - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </>
  );
};

// const DummyContent = () => {
//   return (
//     <>
//       {[...new Array(3).fill(1)].map((_, index) => (
//         <div
//           key={`dummy-content-${index}`}
//           className="bg-neutral-100 dark:bg-neutral-800 p-4 sm:p-6 md:p-8 lg:p-14 rounded-xl sm:rounded-2xl md:rounded-3xl mb-4"
//         >
//           <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg lg:text-2xl font-sans max-w-3xl mx-auto">
//             <span className="font-bold text-neutral-700 dark:text-neutral-200">
//               The first rule of Apple club is that you boast about Apple club.
//             </span>{" "}
//             Keep a journal, quickly jot down a grocery list, and take amazing
//             class notes. Want to convert those notes to text? No problem.
//             Langotiya jeetu ka mara hua yaar is ready to capture every thought.
//           </p>
//           <div className="mt-4 sm:mt-6">
//             <img
//               src="https://assets.aceternity.com/macbook.png" // You can replace with your own image URL
//               alt="Product mockup"
//               className="w-full sm:w-3/4 md:w-1/2 h-auto mx-auto object-contain"
//             />
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/bg-images//photo-1599202860130-f600f4948364.avif", // Replace with your actual image URL
    // content: <DummyContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/bg-images//photo-1593508512255-86ab42a8e620.avif", // Replace with your actual image URL
    // content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "/api/placeholder/800/500", // Replace with your actual image URL
    // content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "/api/placeholder/800/500", // Replace with your actual image URL
    // content: <DummyContent />,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "/api/placeholder/800/500", // Replace with your actual image URL
    // content: <DummyContent />,
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "/api/placeholder/800/500", // Replace with your actual image URL
    // content: <DummyContent />,
  },
];

export default function AppleCardsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={`card-${index}`} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-8 sm:py-12 md:py-16 lg:py-20">
      <h2 className="max-w-7xl px-4 mx-auto text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-4 sm:mb-6 md:mb-8">
        Get to know your iSad.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
