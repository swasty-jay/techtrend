import { motion } from "framer-motion";

function ProductSkeleton() {
  // Define shimmer animation for background gradient
  const shimmerVariants = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
      transition: {
        repeat: Infinity,
        duration: 2.5,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 w-full max-w-xs sm:max-w-sm"
      initial={{ opacity: 0.8, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image placeholder with shimmer effect */}
      <motion.div
        className="w-full h-40 sm:h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
        variants={shimmerVariants}
        animate="animate"
      />

      {/* Content area */}
      <div className="p-3 sm:p-4 space-y-3">
        {/* Brand placeholder */}
        <motion.div
          className="h-3 w-16 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
          variants={shimmerVariants}
          animate="animate"
        />

        {/* Title placeholder - two lines */}
        <div className="space-y-1.5">
          <motion.div
            className="h-3.5 w-full rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
            variants={shimmerVariants}
            animate="animate"
          />
          <motion.div
            className="h-3.5 w-3/4 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>

        {/* Price placeholder */}
        <div className="flex items-center pt-1">
          <motion.div
            className="h-5 w-20 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
            variants={shimmerVariants}
            animate="animate"
          />
          <motion.div
            className="h-3 w-14 ml-2 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>

        {/* Stock indicator placeholder */}
        <div className="pt-1 pb-1">
          <div className="flex justify-between mb-1">
            <motion.div
              className="h-3 w-10 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
              variants={shimmerVariants}
              animate="animate"
            />
            <motion.div
              className="h-3 w-12 rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
          <motion.div
            className="h-1.5 w-full rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>

        {/* Button placeholders */}
        <div className="flex gap-1 sm:gap-2 pt-1">
          <motion.div
            className="h-8 flex-1 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
            variants={shimmerVariants}
            animate="animate"
          />
          <motion.div
            className="h-8 flex-1 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%]"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default ProductSkeleton;
