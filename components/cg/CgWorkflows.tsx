"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { RandomGoldenGlow } from "./RandomGoldenGlow";

const rows = [
  {
    img: "/cg/workflows/send-hundreds.webp",
    alt: "Send to hundreds of recipients at once",
    title: "Send to hundreds of recipients at once",
    body: "State-of-the-art checkout that makes it easy to send gifts directly to recipients at scale.",
    href: "/shop/",
    step: "01",
  },
  {
    img: "/cg/workflows/integrations.webp",
    alt: "Seamless system integrations",
    title: "Seamless system integrations",
    body: "Sync to your HR systems, CRMs, and more to automate gift workflows, milestone gifting, or trigger gifts by events.",
    href: "/what-we-offer/gift-automation/",
    step: "02",
  },
  {
    img: "/cg/workflows/preschedule.webp",
    alt: "Preschedule milestone gifts",
    title: "Preschedule milestone gifts",
    body: "Set up the dates in advance, and gifts arrive automatically on your selected date.",
    href: "/what-we-offer/gift-automation/",
    step: "03",
  },
];

export function CgWorkflows() {
  return (
    <section aria-label="Streamline workflows" className="cg-section-elegant py-20 md:py-28">
      <RandomGoldenGlow count={6} />
      <div className="container">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="cg-h2">
              <b className="cg-gradient-text">Streamline</b> workflows
            </h2>
            <p className="cg-sub mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
              From one gift to thousands — automate every step with powerful workflows.
            </p>
          </header>
        </Reveal>

        <div className="mt-16 space-y-20">
          {rows.map((row, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={row.title} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal direction={reversed ? "right" : "left"} delay={0.1}>
                  <div className="cg-media-card cg-tilt overflow-hidden rounded-2xl">
                    <Image
                      src={row.img}
                      alt={row.alt}
                      width={980}
                      height={520}
                      className="aspect-[2/1.06] w-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                      unoptimized
                    />
                  </div>
                </Reveal>
                <Reveal direction={reversed ? "left" : "right"} delay={0.2}>
                  <div className="flex flex-col gap-4">
                    <span className="text-6xl font-black text-gold/20" style={{ fontFamily: "var(--font-display)" }}>
                      {row.step}
                    </span>
                    <h3 className="cg-h2 !text-[clamp(1.6rem,1.8vw+1rem,2.4rem)]">{row.title}</h3>
                    <p className="cg-sub max-w-xl text-lg leading-relaxed">{row.body}</p>
                    <Link href={row.href} className="cg-animated-link mt-2 w-fit text-base font-semibold text-gold">
                      Get the details →
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
