import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import Rating from "../UI/Rating";
import Button from "../UI/Button";
import ImageSkeleton from "../UI/ImageSkeleton";

function ProductCard({
  name,
  price,
  oldPrice,
  discount,
  // rating,
  image,
  onAddToCart,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-2 w-full max-w-xs border border-gray-200"
    >
      {/* Product Image + Discount Badge */}
      <div className="relative">
        {/* <img
          src={image}
          alt={name}
          className="w-full h-auto max-h-48 object-contain rounded-lg"
        /> */}

        <ImageSkeleton src={image} alt={name} className="w-full h-auto" />

        <span className="absolute top-1 left-0.5 bg-black text-white text-[6px] md:text-xs font-bold px-2 py-1 rounded-lg">
          {discount}% OFF
        </span>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2 text-center">
        <h2 className="text-[12px] md:text-[18px] font-semibold text-gray-800">
          {name}
        </h2>

        {/* Price */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-[12px] md:text-xl font-semibold text-gray-900">
            {price}
          </span>
          <span className="text-gray-500 line-through">GHS{oldPrice}</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center justify-center space-x-1">
          {/* {Array.from({ length: 5 }, (_, i) => (
            <AiFillStar key={i} className="text-yellow-500 text-lg" />
          ))}
          <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {rating}
          </span> */}
          <Rating />
        </div>

        {/* Add to Cart Button */}

        <Button
          className="flex items-center space-x-2"
          variant="primary"
          onClick={() => onAddToCart({ name, price, image })}
        >
          <FaShoppingCart />
          <span className="text-[9px] font-semibold md:text-[18px]">
            Add to cart
          </span>
        </Button>
      </div>
    </motion.div>
  );
}

// Example usage

export default ProductCard;
