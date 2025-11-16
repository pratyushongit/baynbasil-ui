import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, ArrowUp } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import styles from "./styles.module.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brandSection}>
            <img src={logo} alt="Bay 'n Basil" className={styles.logo} />
            <p className={styles.brandDescription}>
              Artisanal spice blends that bring out the chef in you. Pure
              flavours, modern craft, authentic experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {[
                { label: "Home", id: "home" },
                { label: "Our Story", id: "story" },
                { label: "Products", id: "products" },
                { label: "Why Us", id: "why-us" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={styles.linkButton}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className={styles.sectionTitle}>Connect</h3>
            <div className={styles.socialLinks}>
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.socialLink}
                  >
                    <Icon className={styles.socialIcon} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2024 Bay 'n Basil. All rights reserved.
          </p>

          <div className={styles.legalLinks}>
            <button className={styles.legalButton}>Privacy Policy</button>
            <button className={styles.legalButton}>Terms of Service</button>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
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
    </footer>
  );
};

export default Footer;
