import { parseProducts } from "../types";
import { generatedProducts } from "./generated-products";

/**
 * Schema-accurate sample catalogue. Mirrors the real WooCommerce payload
 * shape exactly, so flipping to live data (lib/wc/rest.ts) is config-only.
 */

const img = (id: number, label: string) => ({
  id,
  src: `/placeholder-product-${id}.svg`,
  alt: label,
});

const raw = [
  {
    id: 101,
    slug: "aurora-smart-mug",
    name: "Aurora Smart Mug",
    type: "simple",
    description:
      "A temperature-controlled ceramic mug that keeps coffee at the perfect 55°C for up to 90 minutes. Gift-boxed in recycled kraft with a handwritten-style note card.",
    shortDescription: "App-warmed ceramic mug, 90-minute hold.", sku: "OD-AM-101",
    price: 48, regularPrice: 58, salePrice: null, onSale: false, currency: "USD",
    inStock: true, stockQuantity: 240,
    images: [img(101, "Aurora smart mug")],
    categories: [{ id: 132, slug: "drinkware", name: "Drinkware", parent: 14, count: 9 }],
    attributes: [{ name: "Color", value: "Champagne" }],
    priceTiers: [{ minQty: 25, unitPrice: 42 }, { minQty: 100, unitPrice: 38 }],
    occasion: ["onboarding", "holidays"], budgetTier: "signature", brandingAvailable: true,
    leadTimeDays: 5, shipsTo: ["US", "CA"], rating: 4.7, reviewCount: 128,
  },
  {
    id: 102,
    slug: "linen-commuter-tote",
    name: "Linen Commuter Tote",
    type: "simple",
    description:
      "A structured linen tote with leather-free handles and a laptop sleeve. Naturally dyed in our Plum and Sage palette.",
    shortDescription: "Structured linen tote with laptop sleeve.", sku: "OD-LT-102",
    price: 39, regularPrice: 39, salePrice: null, onSale: false, currency: "USD",
    inStock: true, stockQuantity: 300,
    images: [img(102, "Linen commuter tote")],
    categories: [{ id: 15, slug: "apparel", name: "Apparel", parent: 0, count: 12 }],
    attributes: [{ name: "Color", value: "Sage" }],
    priceTiers: [{ minQty: 50, unitPrice: 34 }],
    occasion: ["onboarding", "thank-you"], budgetTier: "essentials", brandingAvailable: true,
    leadTimeDays: 7, shipsTo: ["US"], rating: 4.5, reviewCount: 64,
  },
  {
    id: 103,
    slug: "terra-diffuser-set",
    name: "Terra Diffuser Set",
    type: "simple",
    description:
      "A ceramic ultrasonic diffuser with three essential-oil blends. Calm-inducing, beautifully boxed, and a recurring favourite for wellbeing sends.",
    shortDescription: "Ceramic diffuser + 3 oil blends.", sku: "OD-TD-103",
    price: 64, regularPrice: 64, salePrice: null, onSale: false, currency: "USD",
    inStock: true, stockQuantity: 120,
    images: [img(103, "Terra diffuser set")],
    categories: [{ id: 12, slug: "wellness", name: "Wellness", parent: 0, count: 9 }],
    attributes: [{ name: "Blend", value: "Calm" }],
    priceTiers: [{ minQty: 25, unitPrice: 58 }],
    occasion: ["wellness", "holidays"], budgetTier: "signature", brandingAvailable: false,
    leadTimeDays: 6, shipsTo: ["US", "CA", "GB"], rating: 4.8, reviewCount: 201,
  },
  {
    id: 104,
    slug: "heirloom-notebook",
    name: "Heirloom Notebook",
    type: "simple",
    description:
      "A lay-flat dotted notebook with a foil-embossed cover. Refillable, made from 100% post-consumer paper.",
    shortDescription: "Foil-embossed refillable notebook.", sku: "OD-HN-104",
    price: 28, regularPrice: 32, salePrice: 28, onSale: true, currency: "USD",
    inStock: true, stockQuantity: 500,
    images: [img(104, "Heirloom notebook")],
    categories: [{ id: 131, slug: "desk-accessories", name: "Desk Accessories", parent: 13, count: 7 }],
    attributes: [{ name: "Cover", value: "Ink" }],
    priceTiers: [{ minQty: 100, unitPrice: 22 }],
    occasion: ["onboarding", "anniversary"], budgetTier: "essentials", brandingAvailable: true,
    leadTimeDays: 4, shipsTo: ["US"], rating: 4.6, reviewCount: 89,
  },
  {
    id: 105,
    slug: "zero-waste-desk-kit",
    name: "ZeroWaste Desk Kit",
    type: "simple",
    description:
      "A plastic-free desk starter: bamboo pen, seed-paper notecards, and a cork catch-all. Carbon-neutral shipping.",
    shortDescription: "Plastic-free desk starter kit.", sku: "OD-ZD-105",
    price: 36, regularPrice: 36, salePrice: null, onSale: false, currency: "USD",
    inStock: true, stockQuantity: 210,
    images: [img(105, "ZeroWaste desk kit")],
    categories: [{ id: 16, slug: "eco", name: "Eco & ZeroWaste", parent: 0, count: 8 }],
    attributes: [{ name: "Carbon", value: "Neutral" }],
    priceTiers: [{ minQty: 50, unitPrice: 31 }],
    occasion: ["earth-day", "thank-you"], budgetTier: "essentials", brandingAvailable: true,
    leadTimeDays: 8, shipsTo: ["US", "CA"], rating: 4.4, reviewCount: 52,
  },
  {
    id: 106,
    slug: "champagne-gift-box",
    name: "Champagne Reserve Gift Box",
    type: "simple",
    description:
      "A curated luxe box: single-origin chocolate, a crystal tumbler, and a printed keepsake. The signature OurDreams executive send.",
    shortDescription: "Luxe chocolate & crystal gift box.", sku: "OD-CG-106",
    price: 145, regularPrice: 145, salePrice: null, onSale: false, currency: "USD",
    inStock: true, stockQuantity: 60,
    images: [img(106, "Champagne reserve gift box")],
    categories: [{ id: 14, slug: "food-drink", name: "Food & Drink", parent: 0, count: 17 }],
    attributes: [{ name: "Tier", value: "Luxury" }],
    priceTiers: [{ minQty: 10, unitPrice: 132 }],
    occasion: ["executive", "holidays"], budgetTier: "luxury", brandingAvailable: false,
    leadTimeDays: 10, shipsTo: ["US"], rating: 4.9, reviewCount: 37,
  },
  {
    id: 107,
    slug: "wireless-charge-pad",
    name: "Slate Wireless Charge Pad",
    type: "simple",
    description:
      "A low-profile 15W charge pad in brushed slate aluminium with a vegan-leather base. Engraving available.",
    shortDescription: "15W aluminium charge pad, engraveable.", sku: "OD-WC-107",
    price: 42, regularPrice: 42, salePrice: null, onSale: false, currency: "USD",
    inStock: true, stockQuantity: 180,
    images: [img(107, "Slate wireless charge pad")],
    categories: [{ id: 13, slug: "tech", name: "Tech & Desk", parent: 0, count: 21 }],
    attributes: [{ name: "Finish", value: "Slate" }],
    priceTiers: [{ minQty: 50, unitPrice: 37 }],
    occasion: ["onboarding", "thank-you"], budgetTier: "signature", brandingAvailable: true,
    leadTimeDays: 6, shipsTo: ["US", "CA", "GB"], rating: 4.6, reviewCount: 110,
  },
  {
    id: 108,
    slug: "bloom-tea-collection",
    name: "Bloom Tea Collection",
    type: "simple",
    description:
      "Twelve hand-tied flowering teas in a keepsake tin. A mindful, screen-free moment for recipients.",
    shortDescription: "12 flowering teas in a tin.", sku: "OD-BT-108",
    price: 34, regularPrice: 34, salePrice: null, onSale: false, currency: "USD",
    inStock: true, stockQuantity: 260,
    images: [img(108, "Bloom tea collection")],
    categories: [{ id: 14, slug: "food-drink", name: "Food & Drink", parent: 0, count: 17 }],
    attributes: [{ name: "Tin", value: "Keepsake" }],
    priceTiers: [{ minQty: 50, unitPrice: 29 }],
    occasion: ["holidays", "thank-you"], budgetTier: "essentials", brandingAvailable: true,
    leadTimeDays: 5, shipsTo: ["US"], rating: 4.7, reviewCount: 73,
  },
];

// Woo always returns these; ensure the fixture matches the required wire shape.
const normalized = raw.map((p) => ({ status: "publish", featured: false, permalink: "", ...p }));

export const products = [...parseProducts(normalized), ...parseProducts(generatedProducts)];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (categorySlug: string) =>
  products.filter((p) => p.categories.some((c) => c.slug === categorySlug));

export const fixturePriceForSlug = (slug: string) => {
  const p = productBySlug(slug);
  if (!p) return null;
  return {
    price: p.price,
    regularPrice: p.regularPrice,
    onSale: p.onSale,
    inStock: p.inStock,
  };
};
