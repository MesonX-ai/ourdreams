// scripts/gen-catalog.mjs
// Generates 120 original OurDreams sample products (schema-accurate fixtures)
// + their placeholder SVGs. Original names only — no third-party copy/logos.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const lib = join(root, "lib", "wc", "fixtures");
mkdirSync(pub, { recursive: true });
mkdirSync(lib, { recursive: true });

const PALETTE = {
  ink: "#12131a", plum: "#2a1b3d", champagne: "#e8c87e", gold: "#c9a227",
  blush: "#f5e6e0", cream: "#fbf7f2", sage: "#6f8f7a",
};

function tile({ w, h, bg, fg, label }) {
  const id = "g" + Math.random().toString(36).slice(2, 8);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="${fg}" stop-opacity="0.55"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#${id})"/>
  <circle cx="${w * 0.78}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.16}" fill="${PALETTE.champagne}" opacity="0.3"/>
  <text x="50%" y="52%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(Math.min(w, h) * 0.07)}" fill="${PALETTE.cream}" opacity="0.92">${label}</text>
</svg>`;
}

const categories = {
  "home-office": { id: 11, name: "Home Office", parent: 0 },
  wellness: { id: 12, name: "Wellness", parent: 0 },
  tech: { id: 13, name: "Tech & Desk", parent: 0 },
  "food-drink": { id: 14, name: "Food & Drink", parent: 0 },
  apparel: { id: 15, name: "Apparel", parent: 0 },
  eco: { id: 16, name: "Eco & ZeroWaste", parent: 0 },
  "desk-accessories": { id: 131, name: "Desk Accessories", parent: 13 },
  drinkware: { id: 132, name: "Drinkware", parent: 14 },
  snacks: { id: 133, name: "Snacks & Treats", parent: 14 },
};

const adjectives = ["Aurora", "Lumen", "Terra", "Coast", "Maple", "Slate", "Cedar", "Bloom", "Harbor", "Ember", "Vela", "Nimbus", "Sage", "River", "Dune", "Marlow", "Wren", "Onyx", "Piper", "Sol", "Fern", "Atlas", "Cove", "Quill", "Birch", "Coral", "Hazel", "Juniper", "Lark", "Pebble", "Sable", "Thistle", "Vesper", "Willow", "Zephyr"];
const nouns = {
  "home-office": ["Desk Organizer", "Letter Tray", "Monitor Riser", "Cable Catch", "Pen Cup", "Notebook Set", "Desk Mat", "Bookend"],
  wellness: ["Diffuser", "Bath Ritual", "Sleep Mask", "Tea Ritual", "Yoga Roll", "Aroma Mist", "Wellbeing Box", "Hand Balm"],
  tech: ["Charge Pad", "Power Bank", "Desk Light", "Webcam Clip", "Mechanical Keys", "USB Hub", "Lap Desk", "Cable Kit"],
  "food-drink": ["Treat Box", "Cocoa Set", "Coffee Flight", "Honey Jar", "Granola Tin", "Spice Kit", "Tea Chest", "Confection Tower"],
  apparel: ["Commuter Tote", "Knit Beanie", "Soft Scarf", "Crew Tee", "Linen Shirt", "Weekender", "Travel Wrap", "Cap"],
  eco: ["Desk Kit", "Refill Journal", "Seed Card", "Compost Caddy", "Cork Tray", "Cotton Pouch", "Beeswax Wrap", "Planter"],
  "desk-accessories": ["Pen Set", "Paperweight", "Card Holder", "Sticky Tray", "Clip Bowl", "Ruler", "Memo Block", "Stamp Set"],
  drinkware: ["Tumbler", "Mug", "Bottle", "Carafe", "Cup Duo", "Flask", "Glass Set", "Travel Cup"],
  snacks: ["Snack Bundle", "Trail Mix", "Cookie Tin", "Caramel Set", "Nut Box", "Granola Stack", "Pretzel Tin", "Fruit Crisps"],
};
const materials = ["Ceramic", "Linen", "Oak", "Recycled", "Bamboo", "Brushed", "Vegan", "Stoneware", "Cork", "Felt", "Steel", "Glass"];
const occasions = ["onboarding", "birthdays", "work-anniversaries", "holidays", "thank-you", "wellbeing", "client-thanks", "earth-day", "life-events", "milestones"];
const budgetTiers = ["essentials", "signature", "luxury"];
const shipsTo = [["US"], ["US", "CA"], ["US", "CA", "GB"]];

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function rint(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

const COUNT = 120;
const used = new Set();
const products = [];

for (let i = 0; i < COUNT; i++) {
  const id = 201 + i;
  const catSlug = pick(Object.keys(nouns));
  const cat = categories[catSlug];
  const adj = pick(adjectives);
  const noun = pick(nouns[catSlug]);
  const mat = pick(materials);
  const name = `${adj} ${mat} ${noun}`;
  const slugBase = slugify(name);
  const slug = used.has(slugBase) ? `${slugBase}-${id}` : slugBase;
  used.add(slugBase);

  const price = rint(12, 240);
  const onSale = Math.random() < 0.25;
  const regularPrice = onSale ? price + rint(8, 60) : price;
  const salePrice = onSale ? price : null;
  const tier = pick(budgetTiers);
  const inStock = Math.random() < 0.92;
  const hasBrand = Math.random() < 0.6;
  const qtyTiers = Math.random() < 0.5
    ? [{ minQty: 25, unitPrice: Math.max(price - rint(4, 12), 8) }, { minQty: 100, unitPrice: Math.max(price - rint(10, 24), 6) }]
    : [];

  const product = {
    id,
    slug,
    name,
    type: "simple",
    status: "publish",
    featured: Math.random() < 0.15,
    description: `A considered ${mat.toLowerCase()} ${noun.toLowerCase()} for the ${cat.name.toLowerCase()} moment — gift-boxed and ready to make someone's day a little warmer.`,
    shortDescription: `${mat} ${noun.toLowerCase()} for thoughtful sends.`,
    sku: `OD-${slug.slice(0, 4).toUpperCase()}-${id}`,
    price,
    regularPrice,
    salePrice,
    onSale,
    currency: "USD",
    inStock,
    stockQuantity: inStock ? rint(20, 400) : null,
    images: [{ id, src: `/placeholder-product-${id}.svg`, alt: name }],
    categories: [{ id: cat.id, slug: catSlug, name: cat.name, parent: cat.parent, count: rint(4, 30) }],
    attributes: [{ name: "Finish", value: mat }],
    priceTiers: qtyTiers,
    occasion: [pick(occasions), pick(occasions)],
    budgetTier: tier,
    brandingAvailable: hasBrand,
    leadTimeDays: rint(4, 12),
    shipsTo: pick(shipsTo),
    rating: Number((3.8 + Math.random() * 1.2).toFixed(1)),
    reviewCount: rint(3, 320),
  };
  products.push(product);

  writeFileSync(join(pub, `placeholder-product-${id}.svg`), tile({ w: 800, h: 800, bg: PALETTE.plum, fg: PALETTE.ink, label: name }));
}

const lines = products.map((p) => "  " + JSON.stringify(p)).join(",\n");
const ts = `// AUTO-GENERATED by scripts/gen-catalog.mjs — do not edit by hand.\nimport type { Product } from "../types";\n\nexport const generatedProducts: Product[] = [\n${lines},\n];\n`;
writeFileSync(join(lib, "generated-products.ts"), ts);

console.log(`Generated ${products.length} products + ${products.length} SVGs.`);
