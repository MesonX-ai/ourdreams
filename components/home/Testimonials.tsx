"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const items = [
  { quote: "Onboarding feels warm now. New hires mention the box in week-one check-ins.", who: "Sample · People Ops Lead", company: "Placeholder client" },
  { quote: "We automated 12,000 anniversaries a year with zero manual sends. It just works.", who: "Sample · HR Director", company: "Placeholder client" },
  { quote: "One vendor, nine regions, fully on brand. Procurement finally stopped sweating.", who: "Sample · VP Procurement", company: "Placeholder client" },
];

export function Testimonials() {
  const [ref, embla] = useEmblaCarousel({ loop: true });
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">In their words</p>
        <h2 className="mt-2 text-[var(--step-3)]">Stories from the team.</h2>
        <div className="mt-8 overflow-hidden" ref={ref}>
          <div className="flex gap-5">
            {items.map((t, i) => (
              <figure key={i} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_60%]">
                <div className="card h-full p-8">
                  <Quote className="h-7 w-7 text-champagne" />
                  <blockquote className="mt-4 font-display text-xl leading-snug md:text-2xl">{t.quote}</blockquote>
                  <figcaption className="mt-6 text-sm text-ink/60">
                    {t.who} · {t.company}
                    <span className="ml-2 rounded-full bg-ink/5 px-2 py-0.5 text-[10px] uppercase text-ink/40">Sample</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <button type="button" aria-label="Previous testimonial" className="btn-ghost border border-ink/10" onClick={prev}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next testimonial" className="btn-ghost border border-ink/10" onClick={next}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
