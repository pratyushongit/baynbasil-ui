/**
 * Copy for each page section. Edit a string here to change the site text —
 * no component files need touching.
 */

export const sections = {
  /** Landing hero. */
  hero: {
    eyebrow: "Small-batch Indian spices",
    title: { line1: "Ground slow.", line2: "Tastes loud." },
    body: "Whole spices from single-origin farms, stone-ground in small batches and pouched within 48 hours — so the aroma lands in your kitchen, not a warehouse.",
    ctaPrimary: { label: "Shop the collection", href: "#products" },
    ctaSecondary: { label: "Our story", href: "#story" },
    /** Giant parallax word behind the hero. */
    parallaxWord: "MASALA",
    /** Rotating stamp text around the hero pouch. */
    badge: "STONE-GROUND • SMALL BATCH • NO ADDITIVES •",
    imagePlaceholder: "hero pouch shot — black pack, front",
    imageFile: "hero-pouch.jpg",
  },

  /** Landing story section. */
  story: {
    eyebrow: "Our story",
    heading: "It started with a mortar, a pestle, and a stubborn grandmother.",
    body: [
      "She refused packet masala her whole life — she could taste the difference between spice that was ground and spice that was burnt flat in a steel mill. Bay’n Basil is her kitchen, scaled just enough.",
      "We buy whole spices directly from farm clusters we can name, grind them cold and slow, and pouch them the same week. Nothing else goes in. Ever.",
    ],
    badge: { line1: "Est. 2021", line2: "FAMILY-RUN" },
    stats: [
      { value: 14, suffix: "", label: "Partner farms" },
      { value: 48, suffix: "h", label: "Mill to pouch" },
      { value: 0, suffix: "", label: "Additives, ever" },
    ],
    imagePlaceholder: "story image — hands grinding spices / farm",
    imageFile: "story.png",
  },

  /** Landing products (bestsellers carousel) section. */
  productsCarousel: {
    eyebrow: "The collection",
    heading: { line1: "Bestsellers,", line2: "ground this week." },
    browseCard: { line1: "4 more spices", line2: "in the pantry", cta: "Browse all →" },
    viewAll: { label: "View all products", href: "/products" },
  },

  /** Landing "why us" section (light background). */
  whyUs: {
    eyebrow: "Why Bay’n Basil",
    heading: "The pouch is black. The label is honest.",
    reasons: [
      {
        num: "01",
        title: "Stone-ground, small batches",
        copy: "Industrial mills run hot and cook the volatile oils. We grind slow and cold, a few kilos at a time.",
      },
      {
        num: "02",
        title: "Single-origin sourcing",
        copy: "One farm cluster per spice, bought whole and direct. We can tell you the village on every pouch.",
      },
      {
        num: "03",
        title: "Nothing added",
        copy: "No colours, no preservatives, no anti-caking agents. The ingredient list is one word long.",
      },
      {
        num: "04",
        title: "Pouched in 48 hours",
        copy: "Milled close to order and sealed within two days, so peak aroma happens in your kitchen.",
      },
    ],
  },

  /** Products listing page header. */
  productsHeader: {
    eyebrow: "The pantry",
    title: { line1: "Every spice", line2: "we grind." },
    /** `{count}` is replaced with the number of products. */
    subtitle: "{count} single-origin spices & blends · stone-ground · pouched within 48 hours",
  },
} as const;
