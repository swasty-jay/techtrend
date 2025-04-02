import { motion } from "framer-motion";

function ProductCard({ name, price, image, onAddToCart }) {
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-400 rounded-xl shadow-md overflow-hidden transition duration-300"
  >
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4 text-center">
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <p className="text-blue-600 font-bold mt-1">{price}</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
        onClick={() => onAddToCart({ name, price, image })}
      >
        Add to Cart
      </motion.button>
    </div>
  </motion.div>;
}
export default ProductCard;
