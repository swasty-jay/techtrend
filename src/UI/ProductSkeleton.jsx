import { motion } from "framer-motion";

function ProductSkeleton() {
  return (
    <motion.div
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="bg-gray-300 rounded-xl shadow-md overflow-hidden p-4"
    >
      <div className="w-full h-48 bg-gray-400 animate-pulse"></div>
      <div className="mt-3 h-5 w-3/4 bg-gray-400 animate-pulse"></div>
      <div className="mt-2 h-4 w-1/2 bg-gray-400 animate-pulse"></div>
      <div className="mt-4 h-10 w-full bg-gray-400 animate-pulse rounded-lg"></div>
    </motion.div>
  );
}

export default ProductSkeleton;
