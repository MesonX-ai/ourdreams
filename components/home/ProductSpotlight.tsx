"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/wc/types";

export function ProductSpotlight({ products, title = "Trending now" }: { products: Product[]; title?: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false });

  const scroll = useCallback((dir: -1 | 1) => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback((dir: -1 | 1) => embla && embla.scrollNext(), [embla]);

  return (
    <section className="section">
      <div className="container">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">From the marketplace</p>
            <h2 className="mt-2 text-[var(--step-3)]">{title}</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" aria-label="Previous" className="btn-ghost border border-ink/10" onClick={() => scroll(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Next" className="btn-ghost border border-ink/10" onClick={() => scrollNext(1)}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {products.map((p) => (
              <div key={p.slug} className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
