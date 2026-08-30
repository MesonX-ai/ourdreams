import type { Product } from "./types";

/**
 * Decouples UI from the raw Woo schema. Today `Product` is already a view model,
 * but keeping a mapper means a future schema change touches one file, not JSX.
 */

export type ProductCard = {
  slug: string;
  name: string;
  price: number;
  regularPrice: number | null;
  onSale: boolean;
  image: string;
  imageAlt: string;
  budgetTier: Product["budgetTier"];
  rating: number;
  reviewCount: number;
  href: string;
};

export function toProductCard(p: Product): ProductCard {
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    regularPrice: p.regularPrice,
    onSale: p.onSale,
    image: p.images[0]?.src ?? "/placeholder-product.svg",
    imageAlt: p.images[0]?.alt ?? p.name,
    budgetTier: p.budgetTier,
    rating: p.rating,
    reviewCount: p.reviewCount,
    href: `/product/${p.slug}/`,
  };
}

const currencyFormatters = new Map<string, Intl.NumberFormat>();

export function formatPrice(amount: number, currency = "USD"): string {
  let fmt = currencyFormatters.get(currency);
  if (!fmt) {
    fmt = new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 });
    currencyFormatters.set(currency, fmt);
  }
  return fmt.format(amount);
}

export function formatMoney(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}
