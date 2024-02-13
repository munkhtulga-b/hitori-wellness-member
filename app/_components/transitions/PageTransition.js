import { motion, AnimatePresence } from "framer-motion";

const PageTransition = ({ children }) => {
  const motionVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 1.5,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.5,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, x: -100, transition: { duration: 1.5 } }}
        variants={motionVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
