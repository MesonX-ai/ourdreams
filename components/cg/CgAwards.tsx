"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useAnimations";
import { RandomGoldenGlow } from "./RandomGoldenGlow";

const awards = [
  { src: "/cg/awards/high-performer.svg", alt: "High performer - winter 2025" },
  { src: "/cg/awards/easiest-to-do-business.svg", alt: "Easiest to do business with - winter 2025" },
  { src: "/cg/awards/best-support.svg", alt: "Best support - winter 2025" },
  { src: "/cg/awards/best-meets-requirements.svg", alt: "Best meets requirements - winter 2015" },
  { src: "/cg/awards/best-est-roi.svg", alt: "Best Est. ROI - winter 2025" },
];

export function CgAwards() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section aria-label="Our latest awards" className="cg-section-elegant py-20 md:py-28" style={{ background: "linear-gradient(180deg, #fffef8 0%, #ffffff 50%, #fffef8 100%)" }}>
      <div className="cg-orb" style={{ top: "10%", right: "20%", width: 200, height: 200, background: "radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)" }} />
      <RandomGoldenGlow count={5} />

      <div className="container text-center">
        <h2 className="cg-h2">
          Our latest <b className="cg-gradient-text">awards</b>
        </h2>
        <p className="cg-sub mx-auto mt-4 max-w-lg">
          Recognized by G2 and industry leaders for excellence in gifting.
        </p>
        <div ref={ref} className={`cg-stagger-grid ${inView ? "is-visible" : ""} mt-14 flex flex-wrap items-end justify-center gap-6`}>
          {awards.map((a) => (
            <div key={a.src} className="cg-glass-card cg-tilt group flex items-center justify-center p-8 transition-all duration-500 hover:scale-105">
              <Image src={a.src} alt={a.alt} width={154} height={200} className="h-[150px] w-auto transition-transform duration-500 group-hover:scale-110" unoptimized />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
