import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

function ProductCard({
  id,
  title: name,
  price,
  brand,
  oldPrice,
  discount,
  is_active,
  image,
  quantity,
  maxQuantity = 50,
  // onAddToCart,
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const cardVariants = {
    hover: { y: -4, transition: { duration: 0.3 } },
    initial: { y: 0, transition: { duration: 0.3 } },
  };

  // Calculate stock percentage
  const stockPercentage = Math.min((quantity / maxQuantity) * 100, 100);
  let stockColor = "bg-red-500";
  if (stockPercentage > 70) stockColor = "bg-green-500";
  else if (stockPercentage > 30) stockColor = "bg-amber-500";

  // Format price with commas
  const formatPrice = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <motion.div
      className={`relative w-full max-w-xs sm:max-w-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100 ${
        !is_active ? "opacity-80 grayscale" : ""
      }`}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      animate={isHovered ? "hover" : "initial"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </div>
        </div>
      )}

      {/* Availability Badge - removed overlay */}
      {!is_active && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            Out of Stock
          </div>
        </div>
      )}

      {/* Image Container */}
      <div
        className="relative h-40 sm:h-48 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/products/${brand}/${id}`)}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-4">
        {/* Brand */}
        <div className="text-xs text-gray-500 font-medium uppercase mb-1">
          {brand}
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm mb-2 line-clamp-2 h-8 sm:h-10">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="font-bold text-gray-900 text-sm sm:text-base mr-2">
            GHS {formatPrice(price)}
          </span>
          {oldPrice && oldPrice > price && (
            <span className="text-xs text-gray-400 line-through">
              GHS {formatPrice(oldPrice)}
            </span>
          )}
        </div>

        {/* Stock Indicator (for all products) */}
        <div className="mb-3 sm:mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Stock</span>
            <span className="font-medium">
              {is_active ? `${quantity} left` : "0 left"}
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                is_active ? stockColor : "bg-gray-300"
              } transition-all duration-300`}
              style={{ width: is_active ? `${stockPercentage}%` : "0%" }}
            />
          </div>
        </div>

        {/* Action Buttons or Out of Stock indicator */}
        {is_active ? (
          <div className="flex gap-1 sm:gap-2">
            <button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white  font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center text-xs transition-colors"
              onClick={() => navigate(`/products/${brand}/${id}`)}
            >
              <FaEye className="mr-1" /> View product details
            </button>

            {/* <button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center text-xs transition-colors"
              onClick={() =>
                onAddToCart &&
                onAddToCart({ id, name, price, image, quantity: 1 })
              }
            >
              <FaShoppingCart className="mr-1" /> Add
            </button> */}
          </div>
        ) : (
          <div className="bg-gray-200 text-gray-500 font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center text-xs">
            Out of Stock
          </div>
        )}
      </div>
    </motion.div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  oldPrice: PropTypes.number,
  discount: PropTypes.number.isRequired,
  is_active: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  maxQuantity: PropTypes.number,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
