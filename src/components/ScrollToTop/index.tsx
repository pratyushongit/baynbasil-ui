"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./styles.module.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storySection = document.getElementById("story");
    if (!storySection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when the bottom of the story section has been passed
        const { boundingClientRect, rootBounds } = entry;
        if (rootBounds) {
          // When the bottom of story section is above the viewport top, show the button
          const sectionBottom = boundingClientRect.bottom;
          setIsVisible(sectionBottom < rootBounds.height * 0.5);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "0px",
      }
    );

    observer.observe(storySection);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={styles.backToTop}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className={styles.backToTopButton}
          >
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <ArrowUp className={styles.backToTopIcon} />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

