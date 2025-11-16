import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import logo from "@/assets/logo.png";
import styles from "./styles.module.css";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous! && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={styles.navbar}
    >
      <div className={styles.container}>
        <div className={styles.navContent}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.logoContainer}
          >
            <img src={logo} alt="Bay 'n Basil" className={styles.logo} />
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={styles.navList}
          >
            {["home", "story", "products", "why-us", "contact"].map(
              (item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  className={styles.navItem}
                >
                  <button
                    onClick={() => scrollToSection(item)}
                    className={styles.navButton}
                  >
                    {item === "story"
                      ? "Our Story"
                      : item === "why-us"
                      ? "Why Us"
                      : item}
                  </button>
                </motion.li>
              )
            )}
          </motion.ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
