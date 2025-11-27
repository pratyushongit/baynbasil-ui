"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import ProductCard from "../ProductCard";
import VegNonVegToggle from "../VegNonVegToggle";
import styles from "./styles.module.css";
import { products, ProductType } from "@/constants/products";
import { content } from "@/constants/content";

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedType, setSelectedType] = useState<ProductType>("veg");

  const filteredProducts = products.filter(
    (product) => product.type === selectedType
  );

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>{content.productShowcase.title}</h2>
          <p className={styles.description}>
            {content.productShowcase.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <VegNonVegToggle
            selected={selectedType}
            onToggle={setSelectedType}
          />
        </motion.div>

        <div className={styles.grid}>
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={`${product.name}-${selectedType}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              >
                <ProductCard
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
