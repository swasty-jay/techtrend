import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

function ProductCard({
  name,
  price,
  oldPrice,
  discount,
  rating,
  image,
  onAddToCart,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-xs border border-gray-200"
    >
      {/* Product Image + Discount Badge */}
      <div className="relative">
        <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-lg">
          {discount}% OFF
        </span>
        <img
          src={image}
          alt={name}
          className="w-full h-auto max-h-48 object-contain rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

        {/* Price */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg md:text-xl font-semibold text-gray-900">
            {price}
          </span>
          <span className="text-gray-500 line-through">GHS{oldPrice}</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center justify-center space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <AiFillStar key={i} className="text-yellow-500 text-lg" />
          ))}
          <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {rating}
          </span>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-3 w-full bg-gray-900 text-white font-medium py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-700 transition"
          onClick={() => onAddToCart({ name, price, image })}
        >
          <FaShoppingCart />
          <span>Add to cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// Example usage

export default ProductCard;
