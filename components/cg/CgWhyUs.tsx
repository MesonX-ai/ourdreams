"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useAnimations";
import { RandomGoldenGlow } from "./RandomGoldenGlow";

type Feature = {
  title: string;
  sub?: string;
  body: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Thousands of gifts",
    sub: "One vendor of record",
    body: "Shop our business gift marketplace. We handle all sourcing, vetting, and compliance for you.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="3" y="11" width="22" height="14" rx="2" fill="#d4af37" />
        <rect x="12" y="11" width="4" height="14" fill="#fff" />
        <path d="M14 11c-1.4-.5-3.5-.7-4.7-.7a2.7 2.7 0 1 1 2.7-2.7c0 1.5-.2 2.4-.7 3.4" stroke="#d4af37" strokeWidth="1.8" fill="none" />
        <path d="M14 11c1.4-.5 3.5-.7 4.7-.7a2.7 2.7 0 1 0-2.7-2.7c0 1.5.2 2.4.7 3.4" stroke="#d4af37" strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    title: "Send to hundreds at once",
    body: "State-of-the-art, multi-recipient checkout that makes bulk gifting effortless.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="4.5" fill="#d4af37" />
        <circle cx="19" cy="11.5" r="3.5" fill="#d4af37" opacity=".7" />
        <path d="M2.5 22c0-4 3.2-6.5 7.2-6.5s7.2 2.5 7.2 6.5" fill="#d4af37" />
        <path d="M16 17.5c3.2-.7 6.5.7 8 2.8.6.9.8 1.6.9 2.2" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Virtual swag closet",
    body: "Buy and store your goods with us, then manage them online in your virtual closet.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M3 9h22v15H3z" fill="#d4af37" />
        <path d="M3 9 5.5 4h17L25 9" fill="#d4af37" />
        <path d="M9 9c0 4 2.2 6.5 5 6.5s5-2.5 5-6.5" stroke="#fff" strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    title: "Automate employee gifting",
    body: "Set up gift workflows, milestones, and triggers — gifts go out automatically.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="4" y="5" width="20" height="18" rx="2.5" fill="#d4af37" />
        <path d="M4 11h20" stroke="#fff" strokeWidth="1.5" />
        <circle cx="9.5" cy="16" r="1.3" fill="#fff" />
        <circle cx="14" cy="16" r="1.3" fill="#fff" />
        <circle cx="18.5" cy="16" r="1.3" fill="#fff" />
      </svg>
    ),
  },
  {
    title: "Enterprise platforms",
    body: "Manage users, budgets, and permissions for gifting across your organization.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M14 2.5 24 8.5v5.5c0 5.5-4.5 9.5-10 11.5-5.5-2-10-6-10-11.5V8.5L14 2.5Z" fill="#d4af37" />
        <path d="M9.5 14l3.2 3.2L19 10.5" stroke="#fff" strokeWidth="2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    title: "Company store merch",
    body: "Sell company swag online and manage it all through our virtual closet.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M3 23 4.5 9.5h19L25 23H3Z" fill="#d4af37" />
        <path d="M9 9.5c0-3.5 1.5-5.5 5-5.5s5 2 5 5.5" stroke="#d4af37" strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
];

export function CgWhyUs() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section aria-label="Designed for frequent gifters" className="cg-section-elegant py-20 md:py-28">
      <div className="cg-orb" style={{ top: "8%", left: "5%", width: 280, height: 280, background: "radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)" }} />
      <div className="cg-orb" style={{ bottom: "5%", right: "8%", width: 320, height: 320, background: "radial-gradient(circle, rgba(255,215,0,0.06), transparent 70%)", animationDelay: "3s" }} />
      <RandomGoldenGlow count={5} />

      <div className="container">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="cg-h2">
            Designed for <b className="cg-gradient-text">frequent</b> gifters
          </h2>
          <p className="cg-sub mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
            Our platform makes recurrent gifting as simple as clicking a button. We handle
            planning, sourcing, customizing, budgeting, storing, and logistics.
          </p>
        </header>

        <div ref={ref} className={`cg-stagger-grid ${inView ? "is-visible" : ""} mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`}>
          {features.map((f) => (
            <Link key={f.title} href="/shop/" className="cg-feature-card cg-glass-card cg-spotlight cg-tilt group">
              <div className="flex items-start gap-4">
                <span className="cg-icon-bubble shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" aria-hidden>
                  {f.icon}
                </span>
                <div>
                  <p className="text-lg font-extrabold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                    {f.title}
                  </p>
                  {f.sub && <p className="mt-0.5 text-sm font-semibold text-gold">{f.sub}</p>}
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{f.body}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
