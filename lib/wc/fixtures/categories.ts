import { parseCategories } from "../types";

const raw = [
  { id: 11, slug: "home-office", name: "Home Office", parent: 0, count: 14 },
  { id: 12, slug: "wellness", name: "Wellness", parent: 0, count: 9 },
  { id: 13, slug: "tech", name: "Tech & Desk", parent: 0, count: 21 },
  { id: 14, slug: "food-drink", name: "Food & Drink", parent: 0, count: 17 },
  { id: 15, slug: "apparel", name: "Apparel", parent: 0, count: 12 },
  { id: 16, slug: "eco", name: "Eco & ZeroWaste", parent: 0, count: 8 },
  { id: 131, slug: "desk-accessories", name: "Desk Accessories", parent: 13, count: 7 },
  { id: 132, slug: "drinkware", name: "Drinkware", parent: 14, count: 9 },
  { id: 133, slug: "snacks", name: "Snacks & Treats", parent: 14, count: 8 },
];

export const categories = parseCategories(raw);

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export type { Category } from "../types";
