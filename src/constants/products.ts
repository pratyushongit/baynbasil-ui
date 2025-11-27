import andhraChicken from "@/assets/andhra-chicken.png";
import chickenKosha from "@/assets/chicken-kosha.png";
import muttonKosha from "@/assets/mutton-kosha.png";
import champaran from "@/assets/champaran.png";
import { StaticImageData } from "next/image";

export type ProductType = "veg" | "non-veg";

export interface Product {
  name: string;
  image: StaticImageData;
  price: string;
  type: ProductType;
}

export const products: Product[] = [
  {
    name: "Aloo Chatpata",
    image: andhraChicken,
    price: "₹299",
    type: "veg",
  },
  {
    name: "Hyderabadi Dum Aloo",
    image: chickenKosha,
    price: "₹299",
    type: "veg",
  },
  {
    name: "Spicy Mushroom Fry",
    image: muttonKosha,
    price: "₹349",
    type: "veg",
  },
  {
    name: "Chicken Kosha",
    image: champaran,
    price: "₹299",
    type: "non-veg",
  },
  {
    name: "Bihar's Champaran",
    image: andhraChicken,
    price: "₹299",
    type: "non-veg",
  },
  {
    name: "Bihari Chicken Curry",
    image: chickenKosha,
    price: "₹299",
    type: "non-veg",
  },
  {
    name: "Andhra Chicken Fry",
    image: muttonKosha,
    price: "₹349",
    type: "non-veg",
  },
  {
    name: "Bengali Biryani",
    image: champaran,
    price: "₹299",
    type: "veg",
  },
  {
    name: "Bhapa & Paturi",
    image: andhraChicken,
    price: "₹299",
    type: "non-veg",
  },
  {
    name: "Mutton Kosha",
    image: chickenKosha,
    price: "₹299",
    type: "non-veg",
  },
  {
    name: "Mutton Awadhi",
    image: muttonKosha,
    price: "₹349",
    type: "non-veg",
  },
  {
    name: "Mutton ??",
    image: champaran,
    price: "₹299",
    type: "non-veg",
  },
];
