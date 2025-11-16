import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import lifestyleImg from "@/assets/product-lifestyle.jpg";
import styles from "./OurStory.module.css";

const OurStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className={styles.section}>
      <div className={styles.container}>
        <div ref={ref} className={styles.grid}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.title}
            >
              Our Story
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={styles.content}
            >
              <p>
                Bay 'n Basil was born from a simple belief: cooking should be an
                adventure, not a chore. We noticed that home cooks were
                overwhelmed by complicated recipes and endless ingredient lists.
              </p>
              <p>
                That's when we decided to craft something different. Our spice
                blends are thoughtfully curated to bring restaurant-quality
                flavors to your home kitchen. Each blend tells a story, inspired
                by traditional recipes but reimagined for the modern cook.
              </p>
              <p>
                We source only the finest ingredients, working directly with
                farmers who share our commitment to quality and sustainability.
                Every jar is a testament to our belief that great cooking starts
                with great spices.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.imageWrapper}
          >
            <div className={styles.imageContainer}>
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={lifestyleImg}
                alt="Bay 'n Basil Product"
                className={styles.image}
              />
            </div>

            {/* Decorative element */}
            <div className={styles.decorativeElement} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
