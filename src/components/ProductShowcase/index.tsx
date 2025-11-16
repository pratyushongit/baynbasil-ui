import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProductCard from "../ProductCard";
import andhraChicken from "@/assets/andhra-chicken.png";
import chickenKosha from "@/assets/chicken-kosha.png";
import muttonKosha from "@/assets/mutton-kosha.png";
import champaran from "@/assets/champaran.png";
import styles from "./styles.module.css";

const products = [
  {
    name: "Andhra Chicken",
    image: andhraChicken,
    price: "₹299",
  },
  {
    name: "Chicken Kosha",
    image: chickenKosha,
    price: "₹299",
  },
  {
    name: "Mutton Kosha",
    image: muttonKosha,
    price: "₹349",
  },
  {
    name: "Champaran",
    image: champaran,
    price: "₹299",
  },
];

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
          <h2 className={styles.title}>Our Signature Blends</h2>
          <p className={styles.description}>
            Each blend is crafted to perfection, bringing authentic flavors to
            your kitchen
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
