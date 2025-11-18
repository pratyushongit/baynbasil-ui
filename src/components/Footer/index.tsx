"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, ArrowUp } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import styles from "./styles.module.css";
import { content } from "@/constants/content";

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
            <Image src={logo} alt={content.brand.name} className={styles.logo} width={200} height={80} />
            <p className={styles.brandDescription}>
              {content.footer.brandDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.sectionTitle}>{content.footer.sections.quickLinks.title}</h3>
            <ul className={styles.linkList}>
              {content.footer.sections.quickLinks.links.map((link) => (
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
            <h3 className={styles.sectionTitle}>{content.footer.sections.connect.title}</h3>
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
            {content.footer.copyright}
          </p>

          <div className={styles.legalLinks}>
            <button className={styles.legalButton}>{content.footer.legal.privacyPolicy}</button>
            <button className={styles.legalButton}>{content.footer.legal.termsOfService}</button>
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
