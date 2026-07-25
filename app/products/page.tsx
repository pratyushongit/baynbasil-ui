import type { Metadata } from "next";
import ProductsPage from "@/components/products/ProductsPage";

const title = "The Pantry — every spice we grind";
const description =
  "Single-origin spices and blends, stone-ground and pouched within 48 hours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title,
    description,
    url: "/products",
    type: "website",
  },
};

export default function Products() {
  return <ProductsPage />;
}
