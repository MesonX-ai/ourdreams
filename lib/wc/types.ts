import { z } from "zod";

/**
 * WooCommerce REST v3 — the subset of the schema the UI consumes.
 *
 * The canonical `Product`/`Category` types are required view models. The zod
 * schema validates the wire format; the live API and our fixtures both supply
 * every field, so no `.default()` is needed (which keeps the output type
 * required and the UI simple).
 */

export type BudgetTier = "essentials" | "signature" | "luxury";
export type ProductType = "simple" | "variable" | "grouped" | "external";

export interface WcImage {
  id: number;
  src: string;
  alt?: string;
  thumbnail?: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  parent: number;
  count: number;
}

export interface PriceTier {
  minQty: number;
  unitPrice: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  permalink?: string;
  type: ProductType;
  status: string;
  featured: boolean;
  description: string;
  shortDescription: string;
  sku: string;
  price: number;
  regularPrice: number | null;
  salePrice: number | null;
  onSale: boolean;
  currency: string;
  inStock: boolean;
  stockQuantity: number | null;
  images: WcImage[];
  categories: Category[];
  attributes: { name: string; value: string }[];
  priceTiers: PriceTier[];
  occasion: string[];
  budgetTier: BudgetTier;
  brandingAvailable: boolean;
  leadTimeDays: number;
  shipsTo: string[];
  rating: number;
  reviewCount: number;
}

const imageSchema = z.object({
  id: z.number(),
  src: z.string(),
  alt: z.string().default(""),
  thumbnail: z.string().optional(),
});

const categorySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  parent: z.number(),
  count: z.number(),
});

const priceTierSchema = z.object({ minQty: z.number(), unitPrice: z.number() });

export const productSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  permalink: z.string().optional(),
  type: z.enum(["simple", "variable", "grouped", "external"]),
  status: z.string(),
  featured: z.boolean(),
  description: z.string(),
  shortDescription: z.string(),
  sku: z.string(),
  price: z.number(),
  regularPrice: z.number().nullable(),
  salePrice: z.number().nullable(),
  onSale: z.boolean(),
  currency: z.string(),
  inStock: z.boolean(),
  stockQuantity: z.number().nullable(),
  images: z.array(imageSchema),
  categories: z.array(categorySchema),
  attributes: z.array(z.object({ name: z.string(), value: z.string() })),
  priceTiers: z.array(priceTierSchema),
  occasion: z.array(z.string()),
  budgetTier: z.enum(["essentials", "signature", "luxury"]),
  brandingAvailable: z.boolean(),
  leadTimeDays: z.number(),
  shipsTo: z.array(z.string()),
  rating: z.number().min(0).max(5),
  reviewCount: z.number(),
});

export const productListSchema = z.array(productSchema);
export const categoryListSchema = z.array(categorySchema);

export const parseProduct = (data: unknown): Product => productSchema.parse(data) as Product;
export const parseProducts = (data: unknown): Product[] => productListSchema.parse(data) as Product[];
export const parseCategories = (data: unknown): Category[] => categoryListSchema.parse(data) as Category[];
