"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import lifestyleImg from "@/assets/product-lifestyle.jpg";
import styles from "./styles.module.css";
import { content } from "@/constants/content";

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
              {content.story.title}
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={styles.content}
            >
              {content.story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.imageWrapper}
          >
            <motion.div className={styles.imageContainer} whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
              <Image
                src={lifestyleImg}
                alt={content.story.imageAlt}
                className={styles.image}
                width={600}
                height={800}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
