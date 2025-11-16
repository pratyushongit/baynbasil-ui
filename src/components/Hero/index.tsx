import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import styles from "./styles.module.css";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buttonStyle = {
    boxShadow: "var(--shadow-soft)",
    transition: "all 0.3s",
  };

  const buttonHoverStyle = {
    boxShadow: "var(--shadow-hover)",
    transform: "translateY(-4px)",
  };

  const outlineButtonStyle = {
    border: "2px solid var(--primary)",
    color: "var(--primary)",
  };

  return (
    <section id="home" ref={ref} className={styles.hero}>
      <motion.div style={{ y, opacity }} className={styles.content}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.logoWrapper}
        >
          <img src={logo} alt="Bay 'n Basil" className={styles.logo} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.title}
        >
          Pure Flavour. Modern Craft.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.subtitle}
        >
          Artisanal spice blends that bring out the chef in you
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.buttonGroup}
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("products")}
            style={buttonStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, buttonHoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, buttonStyle);
            }}
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("story")}
            style={{ ...buttonStyle, ...outlineButtonStyle }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, {
                ...buttonHoverStyle,
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              });
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, {
                ...buttonStyle,
                ...outlineButtonStyle,
              });
            }}
          >
            Explore More
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={styles.floatingElement1}
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={styles.floatingElement2}
      />
    </section>
  );
};

export default Hero;
