/**
 * The product catalog — the single source of truth for every masala blend.
 *
 * To ADD a product: append an object below.
 * To REMOVE one: delete its object.
 * To REORDER: move it in the array.
 *
 * The product grid, category filter chips, the landing-page carousel
 * (`featured: true`), quick-view details, and all count labels are derived
 * from this array — nothing else needs editing.
 *
 * Images: put a file at `public/images/products/<image>` and set `image` to
 * its filename. If the file is missing, a faithful placeholder is shown
 * instead, so the site looks complete before real photos exist.
 *
 * NOTE: prices and pack sizes below are PLACEHOLDERS — edit the `price` and
 * `weight` fields (and `sizeOptions`) to your real numbers.
 */

export type Category = "Chicken" | "Mutton" | "Fish" | "Veg" | "Rice";

export interface Product {
  /** Stable id — also the persistence key and image lookup. */
  slug: string;
  name: string;
  category: Category;
  /** Default pouch size shown on the card, e.g. "100g". */
  weight: string;
  /** Price in ₹ (number so it can be formatted/summed anywhere). */
  price: number;
  /** Short one-line blurb on the card. */
  note: string;
  /** Heat level shown as a tag, e.g. "Hot", "Mild", "None". */
  heat: string;
  origin: string;
  /** Long description in the quick-view drawer. */
  desc: string;
  ingredients: string;
  /** "Best in" usage line. */
  use: string;
  /** Filename under public/images/products/ (optional). */
  image?: string;
  /** Show in the landing-page bestsellers carousel. */
  featured?: boolean;
}

/** Size options offered in the quick-view drawer. Packs ship in one 185g size
 *  (as printed on the pouch). Add more sizes here if you sell them. */
export const sizeOptions = ["185g"] as const;

/** Default selected size index in the quick-view drawer. */
export const defaultSizeIndex = 0;

export const products: Product[] = [
  {
    slug: "andhra-chicken-fry",
    name: "Andhra Chicken Fry",
    category: "Chicken",
    weight: "185g",
    price: 169,
    note: "Fiery Guntur-chilli dry fry.",
    heat: "Hot",
    origin: "Andhra",
    desc: "The dry, fiery kick of a Rayalaseema chicken fry — Guntur chilli, roasted coriander and black pepper ground into a masala that clings to every piece. Cook it down till the oil separates.",
    ingredients:
      "Red chilli, coriander, black pepper, cumin, garlic, curry leaf, fenugreek, turmeric, salt.",
    use: "Andhra-style dry chicken fry.",
    image: "andhra-chicken-fry.png",
    featured: true,
  },
  {
    slug: "bengali-chicken-kosha",
    name: "Bengali Chicken Kosha",
    category: "Chicken",
    weight: "185g",
    price: 169,
    note: "Slow-bhuna kosha mangsho depth.",
    heat: "Medium",
    origin: "Bengal",
    desc: "Everything a proper kosha needs — warm garam notes, mustard and a slow caramel depth. Bhuno it low and long and the gravy turns dark, glossy and rich.",
    ingredients:
      "Coriander, cumin, red chilli, cardamom, cinnamon, clove, bay leaf, mace, nutmeg, mustard, turmeric.",
    use: "Bengali chicken (or mutton) kosha.",
    image: "bengali-chicken-kosha.png",
    featured: true,
  },
  {
    slug: "bhatti-masala-chicken",
    name: "Bhatti Masala Chicken",
    category: "Chicken",
    weight: "185g",
    price: 159,
    note: "Smoky tandoor-grill rub.",
    heat: "Medium",
    origin: "Punjab",
    desc: "A dry rub built for the bhatti — smoky, tangy and deeply savoury. Marinate, grill or pan-sear, and finish with a squeeze of lime.",
    ingredients:
      "Red chilli, coriander, cumin, black pepper, dried mango, black salt, ginger, garlic, kasuri methi.",
    use: "Grilled / tandoori-style chicken.",
    image: "bhatti-masala-chicken.png",
  },
  {
    slug: "bihari-chicken-curry",
    name: "Bihari Chicken Curry",
    category: "Chicken",
    weight: "185g",
    price: 159,
    note: "Homely mustard-oil curry base.",
    heat: "Medium",
    origin: "Bihar",
    desc: "The everyday chicken curry of a Bihari kitchen — mustard-oil forward, gently spiced, honest. One packet and a handful of onions is dinner.",
    ingredients:
      "Coriander, cumin, red chilli, turmeric, black pepper, bay leaf, clove, cardamom, cinnamon.",
    use: "Home-style Bihari chicken curry.",
    image: "bihari-chicken-curry.png",
  },
  {
    slug: "bihars-champaran",
    name: "Bihar's Champaran",
    category: "Mutton",
    weight: "185g",
    price: 189,
    note: "Ahuna handi mutton, sealed & slow.",
    heat: "Medium",
    origin: "Champaran, Bihar",
    desc: "The legendary Champaran ahuna — mutton sealed in a clay handi and cooked in its own steam. This blend brings the smoky garlic-and-chilli soul of it to any pot.",
    ingredients:
      "Red chilli, garlic, coriander, cumin, black pepper, cardamom, clove, cinnamon, bay leaf, mustard.",
    use: "Champaran-style handi mutton.",
    image: "bihars-champaran.png",
    featured: true,
  },
  {
    slug: "mutton-dehati",
    name: "Mutton Dehati",
    category: "Mutton",
    weight: "185g",
    price: 189,
    note: "Rustic, wood-fire village heat.",
    heat: "Hot",
    origin: "House blend",
    desc: "Rough-ground, rustic and unapologetically spicy — the mutton curry cooked over a wood fire in the village. Big on whole spice, big on heat.",
    ingredients:
      "Red chilli, coriander, cumin, black pepper, cardamom, clove, cinnamon, bay leaf, nutmeg, mace, turmeric.",
    use: "Rustic dehati mutton curry.",
    image: "mutton-dehati.png",
    featured: true,
  },
  {
    slug: "fish-bhuna",
    name: "Fish Bhuna",
    category: "Fish",
    weight: "185g",
    price: 149,
    note: "Mustard-bright Bengali bhuna.",
    heat: "Medium",
    origin: "Bengal",
    desc: "A bhuna built for fish — mustard, nigella and a whisper of chilli that clings to the fillet without overpowering it. Quick, sharp, coastal.",
    ingredients:
      "Mustard, coriander, red chilli, turmeric, cumin, nigella, fenugreek, black pepper.",
    use: "Bengali-style fish bhuna.",
    image: "fish-bhuna.png",
    featured: true,
  },
  {
    slug: "aloo-chatpata",
    name: "Aloo Chatpata",
    category: "Veg",
    weight: "185g",
    price: 129,
    note: "Tangy, chatpata potato masala.",
    heat: "Tangy",
    origin: "House blend",
    desc: "Loud, tangy and moreish — amchur and roasted cumin doing their chatpata thing over crisp potatoes. Toss it on aloo, chaat, fries, anything.",
    ingredients:
      "Amchur, cumin, red chilli, coriander, black salt, black pepper, dry ginger, hing.",
    use: "Chatpata aloo, jeera aloo, fries.",
    image: "aloo-chatpata.png",
  },
  {
    slug: "mushroom-fry",
    name: "Mushroom Fry",
    category: "Veg",
    weight: "185g",
    price: 139,
    note: "Peppery South-Indian fry masala.",
    heat: "Medium",
    origin: "South India",
    desc: "A peppery, curry-leaf-heavy fry masala that turns mushrooms into a proper dry starter. Works just as well on paneer, gobi or baby corn.",
    ingredients:
      "Black pepper, coriander, red chilli, cumin, fennel, curry leaf, garlic, turmeric.",
    use: "Mushroom / paneer dry fry.",
    image: "mushroom-fry.png",
  },
  {
    slug: "bengali-biryani",
    name: "Bengali Biryani",
    category: "Rice",
    weight: "185g",
    price: 199,
    note: "Kolkata biryani, aloo and all.",
    heat: "Mild",
    origin: "Kolkata",
    desc: "The gentle, fragrant Kolkata biryani — rosewater-soft, subtly sweet, built around that famous aloo. Warm whole spice, no harsh heat.",
    ingredients:
      "Cardamom, cinnamon, clove, mace, nutmeg, bay leaf, black pepper, star anise, kewra, rose.",
    use: "Kolkata-style chicken / mutton biryani.",
    image: "bengali-biryani.png",
    featured: true,
  },
];

/** Ordered category filters, derived from the catalog ("All" first). */
export const categories: ("All" | Category)[] = [
  "All",
  ...(Array.from(new Set(products.map((p) => p.category))) as Category[]),
];

/** Products shown in the landing-page bestsellers carousel. */
export const featuredProducts = products.filter((p) => p.featured);
