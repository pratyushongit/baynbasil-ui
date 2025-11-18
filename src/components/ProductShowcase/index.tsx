"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProductCard from "../ProductCard";
import styles from "./styles.module.css";
import { products } from "@/constants/products";
import { content } from "@/constants/content";

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

        <div className={styles.grid}>
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              name={product.name}
              image={product.image}
              price={product.price}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
