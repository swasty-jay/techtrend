import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import Rating from "../UI/Rating";
import Button from "../UI/Button";
import ImageSkeleton from "../UI/ImageSkeleton";

function ProductCard({
  title: name,
  price,
  oldPrice,
  discount,
  is_active,
  image,
  quantity, // 🆕
  maxQuantity = 20, // 🆕 Default max quantity
  onAddToCart,
}) {
  const CardWrapper = is_active ? motion.div : "div";

  return (
    <CardWrapper
      {...(is_active && { whileHover: { scale: 1.02 } })}
      className={`bg-white rounded-2xl shadow-lg p-2 w-full max-w-xs border border-gray-200 ${
        !is_active ? "opacity-55" : ""
      }`}
    >
      {/* Product Image + Discount Badge */}
      <div className="relative">
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
          <span className="text-[12px] md:text-[14px] font-bold text-gray-900">
            {price}
          </span>
          <span className=" text-sm text-gray-500 line-through">
            GHS{oldPrice}
          </span>
        </div>
        {/* Rating
        <div className="flex items-center justify-center space-x-1">
          <Rating />
        </div> */}

        {/* Quantity Progress Bar for only active products */}
        {is_active && (
          <div className="w-full px-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Stock</span>
              <span>{quantity} left</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500"
                style={{ width: `${(quantity / maxQuantity) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Add to Cart or Out of Stock */}
        {is_active ? (
          <Button
            className="flex items-center space-x-2"
            variant="primary"
            onClick={() => onAddToCart({ name, price, image })}
          >
            <FaShoppingCart />
            <span className="text-[9px] font-semibold md:text-[14px]">
              Add to cart
            </span>
          </Button>
        ) : (
          <p className="text-red-500 font-semibold text-sm md:text-base">
            Out of Stock
          </p>
        )}
      </div>
    </CardWrapper>
  );
}

export default ProductCard;
