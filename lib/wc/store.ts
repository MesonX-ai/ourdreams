"use client";

import { useQuery } from "@tanstack/react-query";
import { fixturePriceForSlug } from "./fixtures/products";

/**
 * TIER 2 — runtime, public. No keys required.
 *
 * Talks to the WooCommerce Store API on the SAME origin as the static
 * frontend (`/wp-json/wc/store/v1`). Because it is same-origin, cart cookies
 * and credentials work and CORS is a no-op (see PLAN §1). Prices/stock hydrate
 * on mount, so a stale build never sells at a wrong price.
 *
 * When WordPress isn't wired yet (Phase 1), every call gracefully falls back
 * to the schema-accurate fixtures, so the build stays green and the UX is
 * identical. Swapping to live is config-only.
 */

const STORE_BASE = "/wp-json/wc/store/v1";

type StoreProduct = {
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  in_stock: boolean;
};

async function fetchStoreProduct(slug: string): Promise<StoreProduct | null> {
  try {
    const res = await fetch(`${STORE_BASE}/products?slug=${encodeURIComponent(slug)}`, {
      credentials: "same-origin",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { data?: StoreProduct[] };
    return data.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export type LivePrice = {
  price: number;
  regularPrice: number | null;
  onSale: boolean;
  inStock: boolean;
  live: boolean;
};

/**
 * Returns the live (or fixture-backed) price for a product slug.
 * `live: false` means we fell back to fixtures because WP isn't reachable.
 */
export function useLivePrice(slug: string, fallbackPrice: number): LivePrice {
  const fixture = fixturePriceForSlug(slug) ?? { price: fallbackPrice, regularPrice: null, onSale: false, inStock: true };

  const { data } = useQuery({
    queryKey: ["store-product", slug],
    queryFn: () => fetchStoreProduct(slug),
    retry: false,
    staleTime: 60_000,
  });

  if (data) {
    return {
      price: Number(data.price) || fixture.price,
      regularPrice: data.regular_price ? Number(data.regular_price) : null,
      onSale: data.on_sale,
      inStock: data.in_stock,
      live: true,
    };
  }

  return { ...fixture, live: false };
}
