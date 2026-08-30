"use client";

import { CgRequestForm } from "./CgRequestForm";
import { Reveal } from "./Reveal";
import { RandomGoldenGlow } from "./RandomGoldenGlow";

export function CgDemo() {
  return (
    <section aria-label="Request a demo" className="cg-section-elegant py-20 md:py-28">
      <div className="cg-orb" style={{ top: "15%", right: "5%", width: 300, height: 300, background: "radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)" }} />
      <div className="cg-orb" style={{ bottom: "10%", left: "10%", width: 200, height: 200, background: "radial-gradient(circle, rgba(255,215,0,0.05), transparent 70%)", animationDelay: "2s" }} />
      <RandomGoldenGlow count={6} />

      <div className="container">
        <Reveal>
          <div className="cg-glass-card cg-shimmer-border overflow-hidden px-6 py-14 md:px-14">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="flex flex-col gap-6">
                <h2 className="cg-h2">
                  Ready to <b className="cg-gradient-text">transform</b> your gifting?
                </h2>
                <p className="cg-sub max-w-md text-lg leading-relaxed">
                  See how we take the heavy lifting out of swag and gifting. A specialist will walk you through
                  the platform and help you plan your next program.
                </p>
                <ul className="space-y-4 text-sm text-ink">
                  {[
                    "Thousands of gifts, one vendor of record",
                    "Multi-recipient checkout & virtual swag closet",
                    "Automated milestones, triggers & integrations",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10">
                        <svg width="14" height="10" viewBox="0 0 12 9" fill="none" aria-hidden>
                          <path d="M1 4.5 4.2 8 11 1" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-gold/15 bg-white/80 p-6 backdrop-blur-sm md:p-8">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-gold">Talk to sales</p>
                <CgRequestForm id="demo" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
