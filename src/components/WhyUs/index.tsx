"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Award, Heart, Sparkles } from "lucide-react";
import styles from "./styles.module.css";
import { content } from "@/constants/content";

const iconMap = {
  "Curated for convenience": Leaf,
  "Recipe Focused": Award,
  "Makes you a star chef": Heart,
  "Tested through real cooking": Sparkles,
};

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>{content.whyUs.title}</h2>
          <p className={styles.description}>{content.whyUs.description}</p>
        </motion.div>

        <div className={styles.grid}>
          {content.whyUs.features.map((feature, index) => {
            const Icon = iconMap[feature.title as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={styles.featureCard}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={styles.iconWrapper}
                >
                  <Icon className={styles.icon} />
                </motion.div>

                <h3 className={styles.featureTitle}>{feature.title}</h3>

                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
