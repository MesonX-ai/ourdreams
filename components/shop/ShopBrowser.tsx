"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product, Category } from "@/lib/wc/types";

export function ShopBrowser({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [tier, setTier] = useState<string>("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && !p.categories.some((c) => c.slug === cat)) return false;
      if (tier !== "all" && p.budgetTier !== tier) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [products, cat, tier, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search gifts"
            aria-label="Search gifts"
            className="w-full rounded-full border border-ink/10 bg-white/70 py-2 pl-9 pr-4 outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "essentials", "signature", "luxury"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              className={`rounded-full px-3 py-1.5 text-sm capitalize ${tier === t ? "bg-ink text-cream" : "border border-ink/10 hover:border-ink/40"}`}
            >
              {t === "all" ? "All tiers" : t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip label="All categories" active={cat === "all"} onClick={() => setCat("all")} />
        {categories.map((c) => (
          <Chip key={c.slug} label={c.name} active={cat === c.slug} onClick={() => setCat(c.slug)} />
        ))}
      </div>

      <p className="mt-6 text-sm text-ink/60">{filtered.length} gifts</p>
      <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-full px-3 py-1.5 text-sm ${active ? "bg-plum text-cream" : "border border-ink/10 hover:border-ink/40"}`}>
      {label}
    </button>
  );
}
