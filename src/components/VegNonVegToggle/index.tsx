"use client";

import { motion } from "framer-motion";
import { ProductType } from "@/constants/products";
import styles from "./styles.module.css";

interface VegNonVegToggleProps {
  selected: ProductType;
  onToggle: (type: ProductType) => void;
}

const VegNonVegToggle = ({ selected, onToggle }: VegNonVegToggleProps) => {
  const isVeg = selected === "veg";

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.toggleWrapper}>
        <motion.div
          className={styles.slider}
          animate={{
            x: isVeg ? 0 : "100%",
            rotateY: isVeg ? 0 : 180,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className={styles.sliderInner}>
            <div className={styles.sliderFront} />
            <div className={styles.sliderBack} />
          </div>
        </motion.div>

        <button
          className={`${styles.option} ${isVeg ? styles.active : ""}`}
          onClick={() => onToggle("veg")}
          aria-label="Show vegetarian products"
        >
          <motion.div
            className={styles.iconWrapper}
            animate={{
              scale: isVeg ? 1.1 : 1,
              rotateZ: isVeg ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.vegIcon}>🌱</span>
          </motion.div>
          <span className={styles.label}>Veg</span>
        </button>

        <button
          className={`${styles.option} ${!isVeg ? styles.active : ""}`}
          onClick={() => onToggle("non-veg")}
          aria-label="Show non-vegetarian products"
        >
          <motion.div
            className={styles.iconWrapper}
            animate={{
              scale: !isVeg ? 1.1 : 1,
              rotateZ: !isVeg ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.nonVegIcon}>🍗</span>
          </motion.div>
          <span className={styles.label}>Non-Veg</span>
        </button>
      </div>
    </div>
  );
};

export default VegNonVegToggle;
