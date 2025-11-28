import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import ProductShowcase from "@/components/ProductShowcase";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AppLoader from "@/components/AppLoader";
import styles from "./page.module.css";

export default function Home() {
  return (
    <AppLoader>
      <div className={styles.page}>
        <Navbar />
        <Hero />
        <OurStory />
        <ProductShowcase />
        <WhyUs />
        <Footer />
        <ScrollToTop />
      </div>
    </AppLoader>
  );
}
