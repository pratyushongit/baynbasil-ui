/**
 * Global site config — brand, navigation, contact, socials, footer.
 * Change anything here and it updates everywhere it's used.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  /** Brand name (uses a curly apostrophe to match the design). */
  brand: "Bay’n Basil",

  /** Public site URL — used for SEO (canonical, sitemap, OG image URLs). */
  url: "https://www.baynbasil.com",

  /** Short tagline (title suffix / OG). */
  tagline: "Stone-ground Indian spices",

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

  /** WhatsApp number for order checkout (digits only, with country code). */
  whatsappNumber: "919876543210",

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
    "RED CHILLI",
    "TURMERIC",
    "GARAM MASALA",
    "CORIANDER",
    "CUMIN",
    "KASHMIRI CHILLI",
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
