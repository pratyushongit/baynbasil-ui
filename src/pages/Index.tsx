import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import ProductShowcase from "@/components/ProductShowcase";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import styles from "./Index.module.css";

const Index = () => {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
      <OurStory />
      <ProductShowcase />
      <WhyUs />
      <Footer />
    </div>
  );
};

export default Index;
