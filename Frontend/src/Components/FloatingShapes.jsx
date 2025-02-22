import React from "react";
import { motion } from "framer-motion";

const FloatingShapes = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute ${size} opacity-45  rounded-full blur-lg`}
      style={{
        backgroundColor: color, // Directly applying color to support dynamic values
        width: size,
        height: size,
        top: top,
        left: left,
      }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity, // Fixed syntax
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShapes;
