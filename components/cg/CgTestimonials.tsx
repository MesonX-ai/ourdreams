"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { RandomGoldenGlow } from "./RandomGoldenGlow";

const testimonials = [
  {
    quote:
      "Flexible, affordable, high quality products, responsive, superior customer service. They are the BEST.",
    name: "Kim",
    role: "SVP Global Client Services, IntouchCX",
    avatar: "/cg/testimonials/kim.webp",
    logo: "/cg/testimonials/intouchcx.webp",
    logoAlt: "IntouchCX",
  },
  {
    quote:
      "OurDreams was a no-brainer for us. The functionality of the platform was much better, as was the breadth and quality of gifts in the native marketplace.",
    name: "Jennifer",
    role: "Director of Strategic Programs, SAP",
    avatar: "/cg/testimonials/jennifer.webp",
    logo: "/cg/testimonials/sap.webp",
    logoAlt: "SAP",
  },
];

export function CgTestimonials() {
  return (
    <section aria-label="Customers love us" className="cg-section-elegant py-20 md:py-28">
      <div className="cg-orb" style={{ top: "20%", left: "15%", width: 260, height: 260, background: "radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)" }} />
      <RandomGoldenGlow count={5} />

      <div className="container">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="cg-h2">
              Customers <b className="cg-gradient-text">love</b> us
            </h2>
            <p className="cg-sub mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
              Don't just take our word for it — hear from the teams who use OurDreams every day.
            </p>
          </header>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} direction="scale" delay={i * 0.2}>
              <figure className="cg-quote-card cg-glass-card cg-tilt cg-glow-pulse h-full">
                {/* Stars */}
                <div className="flex items-center gap-1" aria-label="5 stars">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} width="20" height="20" viewBox="0 0 16 16" className="cg-star-gold" aria-hidden>
                      <path d="M8 0l2.16 4.94 5.4.58-4.07 3.62 1.14 5.29L8 11.56 3.37 14.43l1.14-5.29L.44 5.52l5.4-.58z" />
                    </svg>
                  ))}
                </div>
                <q className="text-lg leading-relaxed">{t.quote}</q>
                <figcaption className="mt-auto flex items-center gap-4 border-t border-gold/15 pt-6">
                  <Image src={t.avatar} alt={t.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/30" unoptimized />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">
                      <b>{t.name}</b>, {t.role}
                    </p>
                    <img src={t.logo} alt={t.logoAlt} className="mt-1 h-6 w-auto object-contain" />
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
