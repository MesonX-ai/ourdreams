"use client";

import Link from "next/link";
import { useState } from "react";
import { useLivePrice } from "@/lib/wc/store";
import { formatPrice } from "@/lib/wc/map";
import { useCart } from "@/lib/cart/store";
import type { Product } from "@/lib/wc/types";

const tierLabel: Record<Product["budgetTier"], string> = {
  essentials: "Essentials",
  signature: "Signature",
  luxury: "Luxury",
};

export function ProductCard({ product }: { product: Product }) {
  const live = useLivePrice(product.slug, product.price);
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  function addToCart() {
    add({
      productSlug: product.slug,
      name: product.name,
      unitPrice: live.price,
      quantity: 1,
      image: product.images[0]?.src ?? "/placeholder-product.svg",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <Link href={`/product/${product.slug}/`} className="block">
        <img src={product.images[0]?.src ?? "/placeholder-product.svg"} alt={product.images[0]?.alt ?? product.name} className="aspect-square w-full object-cover" loading="lazy" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink/60">{tierLabel[product.budgetTier]}</span>
          {product.onSale && <span className="text-[10px] font-semibold uppercase text-gold">Sale</span>}
        </div>
        <Link href={`/product/${product.slug}/`} className="mt-2 font-display text-lg leading-tight hover:text-gold">
          {product.name}
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-medium">{formatPrice(live.price)}</span>
          {live.regularPrice && live.regularPrice > live.price && (
            <span className="text-sm text-ink/40 line-through">{formatPrice(live.regularPrice)}</span>
          )}
          {!live.live && <span className="text-[10px] text-ink/40" title="Fixture price (WordPress not wired yet)">·</span>}
        </div>
        <button type="button" onClick={addToCart} className="btn-secondary mt-4 w-full">
          {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
