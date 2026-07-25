import type { Metadata } from "next";
import ProductsPage from "@/components/products/ProductsPage";

// Short title for the browser tab (template adds " — Bay'n Basil");
// a richer title is used for social/link previews.
const tabTitle = "The Pantry";
const ogTitle = "The Pantry — every spice we grind";
const description =
  "Single-origin spices and blends, stone-ground and pouched within 48 hours.";

export const metadata: Metadata = {
  title: tabTitle,
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: ogTitle,
    description,
    url: "/products",
    type: "website",
  },
};

export default function Products() {
  return <ProductsPage />;
}
