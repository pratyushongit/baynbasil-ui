/**
 * The product catalog — the single source of truth for every spice.
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
 */

export type Category = "Chillies" | "Ground" | "Whole" | "Blends";

export interface Product {
  /** Stable id — also the persistence key and image lookup. */
  slug: string;
  name: string;
  category: Category;
  /** Default pouch size shown on the card, e.g. "500g". */
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

/** Size options offered in the quick-view drawer. */
export const sizeOptions = ["100g", "250g", "500g"] as const;

/** Default selected size index in the quick-view drawer (250g). */
export const defaultSizeIndex = 1;

export const products: Product[] = [
  {
    slug: "red-chilli",
    name: "Red Chilli",
    category: "Chillies",
    weight: "500g",
    price: 249,
    note: "Sun-dried Guntur pods. Proper heat.",
    heat: "Hot",
    origin: "Guntur, AP",
    desc: "Whole Guntur Sannam pods, sun-dried on farm and stone-ground with the seeds in. Bold, clean heat with a smoky finish — the workhorse chilli of every Indian kitchen.",
    ingredients: "100% red chilli. Nothing else.",
    use: "Curries, tadkas, pickles, chilli oil.",
    image: "red-chilli.jpg",
    featured: true,
  },
  {
    slug: "kashmiri",
    name: "Kashmiri Chilli",
    category: "Chillies",
    weight: "250g",
    price: 329,
    note: "All colour, gentle warmth.",
    heat: "Mild",
    origin: "Byadgi, KA",
    desc: "Deep crimson colour with barely-there heat. This is the chilli that makes butter chicken glow and rogan josh blush without setting anyone on fire.",
    ingredients: "100% Kashmiri-style byadgi chilli.",
    use: "Butter chicken, rogan josh, tandoori marinades.",
    image: "kashmiri.jpg",
    featured: true,
  },
  {
    slug: "turmeric",
    name: "Turmeric",
    category: "Ground",
    weight: "500g",
    price: 199,
    note: "Lakadong-grade, 5%+ curcumin.",
    heat: "None",
    origin: "Lakadong, ML",
    desc: "High-curcumin roots from Meghalaya, boiled, dried and cold-ground. Earthy, bitter-sweet, and so pigmented a pinch does the work of a spoonful.",
    ingredients: "100% turmeric root. No fillers, no colour.",
    use: "Dals, haldi doodh, marinades, rice.",
    image: "turmeric.jpg",
    featured: true,
  },
  {
    slug: "garam",
    name: "Garam Masala",
    category: "Blends",
    weight: "200g",
    price: 299,
    note: "Nine spices, roasted separately.",
    heat: "Warm",
    origin: "House blend",
    desc: "Nine whole spices — each roasted separately to its own moment, then ground together once. Finish a dish with it and the kitchen changes weather.",
    ingredients:
      "Coriander, cumin, black pepper, cardamom, cinnamon, clove, bay leaf, nutmeg, star anise.",
    use: "Finishing curries, biryanis, kebabs.",
    image: "garam.jpg",
    featured: true,
  },
  {
    slug: "coriander",
    name: "Coriander",
    category: "Ground",
    weight: "500g",
    price: 179,
    note: "Cold-ground, citrus-bright.",
    heat: "None",
    origin: "Kota, RJ",
    desc: "Eagle-grade seeds ground cold and slow so the lemony top notes survive. Sweet, floral, and nothing like the flat dust in supermarket boxes.",
    ingredients: "100% coriander seed.",
    use: "Base masalas, chutneys, rasam.",
    image: "coriander.jpg",
    featured: true,
  },
  {
    slug: "cumin",
    name: "Cumin, Whole",
    category: "Whole",
    weight: "250g",
    price: 219,
    note: "Smoky, unbroken seeds.",
    heat: "None",
    origin: "Unjha, GJ",
    desc: "Plump, unbroken seeds with a deep smoky-sweet aroma. Bloom them in hot ghee and the whole house knows dinner is serious.",
    ingredients: "100% cumin seed.",
    use: "Tadkas, jeera rice, raitas, spice blends.",
    image: "cumin.jpg",
    featured: true,
  },
  {
    slug: "pepper",
    name: "Black Pepper",
    category: "Whole",
    weight: "250g",
    price: 389,
    note: "Malabar bold, sharp and floral.",
    heat: "Hot",
    origin: "Wayanad, KL",
    desc: "Bold-grade Malabar corns picked ripe and sun-dried. Sharp heat up front, pine and citrus behind it. Grind fresh, always.",
    ingredients: "100% black peppercorn.",
    use: "Pepper chicken, rasam, everything.",
    image: "pepper.jpg",
  },
  {
    slug: "mustard",
    name: "Mustard Seeds",
    category: "Whole",
    weight: "250g",
    price: 149,
    note: "Small, pungent, pop-ready.",
    heat: "Pungent",
    origin: "Jodhpur, RJ",
    desc: "Small black seeds that pop clean and fast. Nutty once bloomed, fiery when crushed — the opening note of every South Indian tadka.",
    ingredients: "100% black mustard seed.",
    use: "Tadkas, pickles, kadhi.",
    image: "mustard.jpg",
  },
  {
    slug: "methi",
    name: "Fenugreek",
    category: "Whole",
    weight: "200g",
    price: 139,
    note: "Bitter-sweet, maple-deep.",
    heat: "None",
    origin: "Nagaur, RJ",
    desc: "Golden seeds with that unmistakable maple-bitter depth. A little goes far; toasted right, it rounds out pickles and sambar like nothing else.",
    ingredients: "100% fenugreek seed.",
    use: "Pickles, sambar powder, methi dal.",
    image: "methi.jpg",
  },
  {
    slug: "sambar",
    name: "Sambar Masala",
    category: "Blends",
    weight: "200g",
    price: 269,
    note: "Roasted dal-and-chilli classic.",
    heat: "Medium",
    origin: "House blend",
    desc: "Roasted chana dal, coriander, byadgi chilli and fenugreek in the classic Kumbakonam proportion. One spoon, honest sambar.",
    ingredients:
      "Coriander, chana dal, byadgi chilli, fenugreek, cumin, black pepper, turmeric, curry leaf, hing.",
    use: "Sambar, kootu, roasted vegetables.",
    image: "sambar.jpg",
  },
  {
    slug: "chaat",
    name: "Chaat Masala",
    category: "Blends",
    weight: "150g",
    price: 229,
    note: "Tangy, sulphurous, addictive.",
    heat: "Tangy",
    origin: "House blend",
    desc: "Kala namak, amchur and roasted cumin doing their loud, tangy thing. Dust it on fruit, fries, salads — anything that needs waking up.",
    ingredients:
      "Amchur, kala namak, roasted cumin, coriander, black pepper, mint, hing, chilli.",
    use: "Fruit, chaats, lemonade rims, fries.",
    image: "chaat.jpg",
  },
  {
    slug: "cardamom",
    name: "Green Cardamom",
    category: "Whole",
    weight: "100g",
    price: 449,
    note: "Fat 8mm pods, eucalyptus-sweet.",
    heat: "None",
    origin: "Idukki, KL",
    desc: "Fat, bright-green 8mm pods from high-range Idukki estates. Floral, eucalyptus-sweet, and strong enough to perfume a whole pot of chai with three pods.",
    ingredients: "100% green cardamom.",
    use: "Chai, kheer, biryani, baking.",
    image: "cardamom.jpg",
  },
];

/** Ordered category filters, derived from the catalog ("All" first). */
export const categories: ("All" | Category)[] = [
  "All",
  ...(Array.from(new Set(products.map((p) => p.category))) as Category[]),
];

/** Products shown in the landing-page bestsellers carousel. */
export const featuredProducts = products.filter((p) => p.featured);
