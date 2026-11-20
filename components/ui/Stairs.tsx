"use client";

import { motion, type Variants } from "framer-motion";

const TOTAL_STEPS = 6;

const stairAnimation: Variants = {
  initial: { top: "0%" },
  animate: { top: "100%" },
  exit: { top: ["100%", "0%"] },
};

const reverseIndex = (index: number) => TOTAL_STEPS - index - 1;

const Stairs = () => {
  return (
    <>
      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
        <motion.div
          key={index}
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut", delay: reverseIndex(index) * 0.1 }}
          className="relative w-full h-full bg-white"
        />
      ))}
    </>
  );
};

export default Stairs;
