import { motion } from "framer-motion";

function Spinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-[200px] "
    >
      <div className="w-12 md:w-20 h-12 md:h-20 border-4 border-solid rounded-full animate-spin border-red-500 border-t-transparent"></div>
    </motion.div>
  );
}

export default Spinner;
