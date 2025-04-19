import { motion } from "framer-motion";

const CategoryCard = ({ title, image, onClick, isActive }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className={`bg-gray-100 rounded-xl shadow-md overflow-hidden cursor-pointer transition duration-300 
      ${isActive ? "border-1 border-blue-500" : "hover:border-gray-300"}`}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-auto max-h-48 object-contain rounded-lg"
    />
    <div className="p-4 text-center">
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
  </motion.div>
);

export default CategoryCard;
