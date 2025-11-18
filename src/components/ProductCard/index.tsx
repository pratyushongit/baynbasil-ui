"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import styles from "./styles.module.css";

interface ProductCardProps {
  name: string;
  image: StaticImageData;
  price: string;
  index: number;
}

const ProductCard = ({ name, image, price, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
            className={styles.imageWrapper}
          >
            <Image src={image} alt={name} className={styles.image} width={300} height={300} />
          </motion.div>

          <h3 className={styles.productName}>{name}</h3>

          <p className={styles.weight}>150g</p>

          <p className={styles.price}>{price}</p>
        </CardContent>

        <CardFooter className={styles.cardFooter}>
          <Button className={styles.addToCartButton} size="lg">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
