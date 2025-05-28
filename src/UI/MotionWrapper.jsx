// Description: This component wraps its children with a motion div from framer-motion.
// It applies initial, animate, and exit animations to create a smooth transition effect when the component mounts and unmounts.

// MotionWrapper.jsx
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

function MotionWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
export default MotionWrapper;
