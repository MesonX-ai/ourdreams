"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { RandomGoldenGlow } from "./RandomGoldenGlow";

const cards = [
  {
    img: "/cg/engage/send-physical.webp",
    alt: "Send physical gifts by an email or a link",
    title: "Send physical gifts by an email or a link",
    body: "With eGifting, there's no need to worry about addresses or preferences; recipients decide what's best.",
    href: "/shop/",
    tag: "eGifting",
  },
  {
    img: "/cg/engage/add-personal.webp",
    alt: "Add personal touches",
    title: "Add personal touches",
    body: "Make gifts memorable with videos, notes, customized emails, and landing pages.",
    href: "/what-we-offer/gift-automation/",
    tag: "Personalization",
  },
  {
    img: "/cg/engage/gauge-working.webp",
    alt: "Gauge what's working",
    title: "Gauge what's working",
    body: "Track activity in the dashboard to measure your engagement and ROI.",
    href: "/what-we-offer/gift-automation/",
    tag: "Analytics",
  },
];

export function CgEngage() {
  return (
    <section aria-label="Engage and empower recipients" className="cg-section-elegant py-20 md:py-28">
      <div className="cg-orb" style={{ top: "15%", right: "10%", width: 240, height: 240, background: "radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)" }} />
      <RandomGoldenGlow count={5} />

      <div className="container">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="cg-h2">
              Engage &amp; <b className="cg-gradient-text">empower</b> recipients
            </h2>
            <p className="cg-sub mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
              Every touchpoint is an opportunity to delight. Make each gift unforgettable.
            </p>
          </header>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.15}>
              <article className="group flex flex-col">
                <Link href={card.href} className="cg-media-card cg-tilt cg-shimmer-border block overflow-hidden rounded-2xl">
                  <div className="relative overflow-hidden">
                    <Image
                      src={card.img}
                      alt={card.alt}
                      width={480}
                      height={360}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                      {card.tag}
                    </span>
                  </div>
                </Link>
                <div className="flex flex-1 flex-col gap-3 px-1 py-6">
                  <h3 className="text-xl font-extrabold leading-tight transition-colors group-hover:text-gold" style={{ fontFamily: "var(--font-display)" }}>
                    {card.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-ink/60">{card.body}</p>
                  <Link href={card.href} className="cg-animated-link mt-2 w-fit text-sm font-semibold text-gold">
                    Get the details →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
