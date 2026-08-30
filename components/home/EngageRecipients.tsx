"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, HeartHandshake, LineChart } from "lucide-react";

const steps = [
  { icon: Mail, title: "eGifting in a click", body: "Recipients get a beautiful, branded link — redeemable in seconds, anywhere.", img: "/placeholder-collection-2.svg" },
  { icon: HeartHandshake, title: "Personal touches", body: "Handwritten-style notes and logo branding make each gift feel chosen, not sent.", img: "/placeholder-collection-3.svg" },
  { icon: LineChart, title: "Insights that matter", body: "See who engaged, what landed, and prove the program's impact.", img: "/placeholder-collection-4.svg" },
];

export function EngageRecipients() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { threshold: 0.6 },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section bg-cream">
      <div className="container grid gap-10 md:grid-cols-2">
        <div className="md:sticky md:top-24 md:h-fit">
          <div className="card overflow-hidden">
            <img src={steps[active].img} alt="" className="aspect-[4/3] w-full object-cover transition-all duration-500" />
          </div>
        </div>
        <div>
          <p className="eyebrow">Engage recipients</p>
          <h2 className="mt-2 text-[var(--step-3)]">The experience after the send.</h2>
          <div className="mt-8 space-y-16">
            {steps.map((s, i) => (
              <div
                key={s.title}
                data-idx={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="scroll-mt-28"
              >
                <s.icon className={`h-8 w-8 ${active === i ? "text-gold" : "text-ink/40"}`} />
                <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-ink/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
