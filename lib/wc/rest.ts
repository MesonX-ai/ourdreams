import "server-only";

import type { ZodType } from "zod";
import { categories as fixtureCategories } from "./fixtures/categories";
import { products as fixtureProducts } from "./fixtures/products";
import { productListSchema, categoryListSchema, type Product, type Category } from "./types";

/**
 * TIER 1 — build-time only.
 *
 * This module reads the WooCommerce REST v3 credentials and fetches catalogue
 * data while `next build` prerenders pages. It must NEVER be imported by a
 * client component: doing so would attempt to bundle the consumer secret into
 * the browser JS.
 *
 * Two guards enforce that:
 *   1. `import "server-only"` makes a client import a hard build error.
 *   2. The runtime check below fails fast if it somehow runs in a browser.
 *   3. The secret env vars are deliberately NOT prefixed NEXT_PUBLIC_ (the
 *      `NEXT_PUBLIC_` assertion keeps that invariant auditable).
 */

if (typeof window !== "undefined") {
  throw new Error(
    "lib/wc/rest.ts is server-only (Tier 1) and must never be imported in a client component.",
  );
}

for (const key of ["WC_CONSUMER_KEY", "WC_CONSUMER_SECRET"] as const) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    throw new Error(`Secret ${key} must not be exposed to the client (no NEXT_PUBLIC_ prefix).`);
  }
}

const WP_BASE_URL = process.env.WP_BASE_URL?.replace(/\/$/, "");
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

const hasLiveCreds = Boolean(WP_BASE_URL && CONSUMER_KEY && CONSUMER_SECRET);

async function fetchWc<T>(path: string, schema: ZodType<T>): Promise<T> {
  if (!WP_BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error("Live WooCommerce credentials missing.");
  }
  const url = new URL(`/wp-json/wc/v3${path}`, WP_BASE_URL);
  url.searchParams.set("consumer_key", CONSUMER_KEY);
  url.searchParams.set("consumer_secret", CONSUMER_SECRET);
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`WooCommerce ${path} failed: ${res.status}`);
  }
  return schema.parse(await res.json()) as unknown as T;
}

/* ------------------------------------------------------------------ */
/* Public API — components call these; implementation swaps fixture/live.
   When live creds are present we try WooCommerce and fall back to the
   schema-accurate fixtures if the API is unreachable, so a build never breaks. */

async function liveOr<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasLiveCreds) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.warn("[wc/rest] live fetch failed, using fixtures:", (err as Error).message);
    return fallback;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  return liveOr(
    () => fetchWc("/products?per_page=100&status=publish", productListSchema),
    fixtureProducts as unknown as Product[],
  );
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!hasLiveCreds) return fixtureProducts.find((p) => p.slug === slug) ?? null;
  const list = await liveOr(
    () => fetchWc(`/products?slug=${encodeURIComponent(slug)}&status=publish`, productListSchema),
    [],
  );
  return list[0] ?? null;
}

export async function getAllCategories(): Promise<Category[]> {
  return liveOr(
    () => fetchWc("/products/categories?per_page=100&hide_empty=true", categoryListSchema),
    fixtureCategories as unknown as Category[],
  );
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  if (!hasLiveCreds) return fixtureProducts.filter((p) => p.categories.some((c) => c.slug === slug)) as unknown as Product[];
  const cat = (await getAllCategories()).find((c) => c.slug === slug);
  if (!cat) return [];
  return liveOr(
    () => fetchWc(`/products?category=${cat.id}&status=publish`, productListSchema),
    fixtureProducts.filter((p) => p.categories.some((c) => c.slug === slug)) as unknown as Product[],
  );
}

export const usingLiveCatalogue = hasLiveCreds;

/**
 * Slugs for `generateStaticParams()`. Under `output: 'export'` every dynamic
 * page must be enumerated at build time, so we never rely on a possibly-empty
 * live response — live if non-empty, otherwise the fixtures (always non-empty).
 */
export async function getStaticProductSlugs(): Promise<{ slug: string }[]> {
  const live = hasLiveCreds
    ? await fetchWc("/products?per_page=100&status=publish", productListSchema).catch(() => null)
    : null;
  const list = live && live.length ? live : (fixtureProducts as unknown as Product[]);
  return list.map((p) => ({ slug: p.slug }));
}
