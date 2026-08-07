/**
 * Global site config — brand, navigation, contact, socials, footer.
 * Change anything here and it updates everywhere it's used.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  brand: "Bay'n Basil",

  /** Public site URL — used for SEO (canonical, sitemap, OG image URLs). */
  url: "https://www.baynbasil.com",

  /** Short tagline (title suffix / OG). */
  tagline: "Authentic Indian Spices",

  /** One-line description for SEO (meta description, OG, structured data). */
  description:
    "Whole spices from single-origin farms, stone-ground in small batches and pouched within 48 hours — so the aroma lands in your kitchen, not a warehouse.",

  /** SEO keywords. */
  keywords: [
    "Indian spices",
    "stone-ground masala",
    "single-origin spices",
    "small-batch spices",
    "garam masala",
    "red chilli powder",
    "turmeric",
    "Bay n Basil",
    "BaynBasil",
    "baynbasil",
  ],

  /**
   * WhatsApp number for order checkout (digits only, with country code).
   * Set via the NEXT_PUBLIC_WHATSAPP_NUMBER env var so the real number stays
   * out of source control — see .env.example. (It's still present in the built
   * client bundle, which is unavoidable for a browser-opened wa.me link.)
   */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",

  /** Primary navigation. Anchor links (/#story) scroll on the landing page. */
  nav: [
    { label: "Home", href: "/" },
    { label: "Story", href: "/#story" },
    { label: "Products", href: "/products" },
    { label: "Why us", href: "/#why" },
    { label: "Contact", href: "/#contact" },
  ] as NavLink[],

  contact: {
    email: "hello@baynbasil.com",
    phone: "+91 98765 43210",
    city: "Bengaluru, India",
  },

  socials: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "WhatsApp", href: "#" },
  ] as NavLink[],

  /** Words scrolling in the landing-page marquee strip. */
  marquee: [
    "ANDHRA CHICKEN FRY",
    "BENGALI CHICKEN KOSHA",
    "BHATTI MASALA CHICKEN",
    "BIHARI CHICKEN CURRY",
    "BIHAR'S CHAMPARAN",
    "MUTTON DEHATI",
    "FISH BHUNA",
    "ALOO CHATPATA",
    "MUSHROOM FRY",
    "BENGALI BIRYANI",
  ],

  footer: {
    /** Landing footer contact headline (accent word is the 2nd line). */
    headline: { line1: "Let’s spice", line2: "things up." },
    newsletter: {
      label: "Get recipes & first-batch drops",
      placeholder: "your@email.com",
      button: "Join",
    },
    copyright: "© 2026 Bay’n Basil · All rights reserved",
    tagline: "Made with heat, not haste",
    /** Minimal footer used on the products page. */
    productsCopyright: "© 2026 Bay’n Basil",
    productsLink: { label: "Contact us", href: "/#contact" },
  },
} as const;
