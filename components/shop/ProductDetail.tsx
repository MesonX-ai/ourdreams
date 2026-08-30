"use client";

import { useState } from "react";
import { useLivePrice } from "@/lib/wc/store";
import { formatPrice } from "@/lib/wc/map";
import { useCart } from "@/lib/cart/store";
import type { Product } from "@/lib/wc/types";

export function ProductDetail({ product }: { product: Product }) {
  const live = useLivePrice(product.slug, product.price);
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.attributes[0]?.value ?? "");
  const [recipient, setRecipient] = useState("");
  const [added, setAdded] = useState(false);

  const tierPrice = (() => {
    const t = [...product.priceTiers].reverse().find((pt) => qty >= pt.minQty);
    return t ? t.unitPrice : live.price;
  })();

  function addToCart() {
    add({
      productSlug: product.slug,
      name: product.name,
      unitPrice: tierPrice,
      quantity: qty,
      recipient: recipient || undefined,
      image: product.images[0]?.src ?? "/placeholder-product.svg",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white/60">
        <img src={product.images[0]?.src ?? "/placeholder-product.svg"} alt={product.images[0]?.alt ?? product.name} className="aspect-square w-full object-cover" />
      </div>

      <div>
        <p className="eyebrow">{product.categories[0]?.name ?? "Gift"}</p>
        <h1 className="mt-2 text-[var(--step-2)]">{product.name}</h1>

        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-display text-2xl">{formatPrice(tierPrice)}</span>
          {live.regularPrice && live.regularPrice > tierPrice && (
            <span className="text-ink/40 line-through">{formatPrice(live.regularPrice)}</span>
          )}
          {!live.live && <span className="text-xs text-ink/40">fixture price</span>}
        </div>

        <p className="prose-od mt-5 max-w-prose" dangerouslySetInnerHTML={{ __html: product.description }} />

        {product.attributes.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">{product.attributes[0].name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.attributes.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => setVariant(a.value)}
                  className={`rounded-full border px-3 py-1.5 text-sm ${variant === a.value ? "border-gold bg-champagne/30" : "border-ink/10 hover:border-ink/40"}`}
                >
                  {a.value}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.priceTiers.length > 0 && (
          <div className="mt-6 rounded-2xl bg-blush/50 p-4 text-sm">
            <p className="font-medium">Volume pricing</p>
            <ul className="mt-1 text-ink/70">
              {product.priceTiers.map((t) => (
                <li key={t.minQty}>From {t.minQty}+ units: {formatPrice(t.unitPrice)} each</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Quantity</span>
            <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-xl border border-ink/10 px-3 py-2 outline-none focus:border-gold" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Recipient (optional)</span>
            <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="For multi-recipient sends" className="w-full rounded-xl border border-ink/10 px-3 py-2 outline-none focus:border-gold" />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={addToCart} className="btn-primary">
            {added ? "Added to cart ✓" : `Add to cart · ${formatPrice(tierPrice * qty)}`}
          </button>
          {product.brandingAvailable && (
            <span className="rounded-full bg-sage/10 px-3 py-1.5 text-xs text-sage">Logo branding available</span>
          )}
          <span className="text-xs text-ink/50">{product.leadTimeDays}-day lead time · ships to {product.shipsTo.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
