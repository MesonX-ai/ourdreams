"use client";

import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { talkToSales } from "./talkToSales";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./Reveal";
import { useTextScramble } from "@/hooks/useAnimations";
import { useState } from "react";
import { RandomGoldenGlowDense } from "./RandomGoldenGlow";
import { Parallax } from "./CgParallax";

export function CgHero() {
  const openPanel = talkToSales((s) => s.openPanel);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const headline = useTextScramble("We automate everything but the smile.", scrambleTrigger);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-depth parallax: writes normalized cursor position as CSS vars,
  // which drive layered translations via .cg-mp-depth-* classes.
  const onMouseMove = (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - rect.left) / rect.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3));
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative overflow-hidden"
      style={{ paddingTop: "var(--header-h)" }}
      onMouseEnter={() => setScrambleTrigger(true)}
      onMouseMove={onMouseMove}
    >
      {/* Morphing gradient background */}
      <div className="cg-morph-bg absolute inset-0" />
      <div className="cg-grid-overlay absolute inset-0" />
      <RandomGoldenGlowDense count={8} />

      {/* Floating orbs (ambient) + mouse-parallax sparkle layers */}
      <div className="cg-orb" style={{ top: "5%", left: "8%", width: 300, height: 300, background: "rgba(212, 175, 55, 0.1)" }} />
      <div className="cg-orb" style={{ top: "40%", right: "5%", width: 250, height: 250, background: "rgba(255, 215, 0, 0.08)", animationDelay: "2s" }} />
      <div className="cg-orb" style={{ bottom: "10%", left: "30%", width: 200, height: 200, background: "rgba(212, 175, 55, 0.06)", animationDelay: "4s" }} />
      <div className="cg-mp-depth-1 pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <span className="cg-hero-sparkle" style={{ top: "18%", left: "12%" }}>✦</span>
        <span className="cg-hero-sparkle" style={{ top: "64%", left: "6%", animationDelay: "1.4s" }}>✧</span>
        <span className="cg-hero-sparkle" style={{ top: "12%", left: "58%", animationDelay: "2.2s" }}>✦</span>
      </div>
      <div className="cg-mp-depth-2 pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <span className="cg-hero-sparkle" style={{ top: "30%", left: "88%" }}>✧</span>
        <span className="cg-hero-sparkle" style={{ top: "76%", left: "92%", animationDelay: "0.9s" }}>✦</span>
        <span className="cg-hero-sparkle" style={{ top: "48%", left: "3%", animationDelay: "2.8s" }}>✦</span>
      </div>

      <div className="container relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content side */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-ink/80">The #1 Gifting Platform</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                className="cg-hero-headline"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="block text-ink">{headline.split("automate")[0]}</span>
                <span className="block">
                  <b className="cg-shimmer-text">automate</b>
                  {headline.split("automate")[1]?.split("smile")[0]}
                </span>
                <span className="block">
                  everything but the{" "}
                  <span className="cg-gradient-text">smile.</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="cg-sub max-w-[50ch] text-lg leading-relaxed">
                We source, customize, pack, and ship world-class gifts — automatically.
                You take the applause; we sweat every detail, so each arrival feels
                like a little piece of magic.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openPanel}
                  className="cg-magnetic-btn group"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="cg-ghost-btn group">
                  <span className="cg-play-ring">
                    <span className="cg-play-icon">▶</span>
                  </span>
                  Watch Demo
                </button>
              </div>
            </Reveal>

            {/* Social proof row */}
            <Reveal delay={0.4}>
              <div className="mt-4 flex items-center gap-6 border-t border-gold/15 pt-6">
                <div className="flex -space-x-3">
                  {["bg-amber-200", "bg-amber-300", "bg-amber-400", "bg-amber-500"].map((c, i) => (
                    <div
                      key={i}
                      className={`h-10 w-10 rounded-full border-2 border-white ${c} flex items-center justify-center text-xs font-bold text-white`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 16 16" className="cg-star-gold" aria-hidden>
                        <path d="M8 0l2.16 4.94 5.4.58-4.07 3.62 1.14 5.29L8 11.56 3.37 14.43l1.14-5.29L.44 5.52l5.4-.58z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm font-semibold text-ink">4.9</span>
                  </div>
                  <p className="text-xs text-ink/60">Loved by 20,000+ companies</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Image / Visual side — scroll parallax + mouse depth */}
          <Parallax speed={-0.08}>
            <Reveal direction="left" delay={0.2}>
            <div className="relative">
              {/* Glowing ring decoration */}
              <div className="cg-ring-decoration absolute -inset-4 opacity-60" />
              
              {/* Main card */}
              <div className="cg-hero-card cg-mp-depth-2 relative overflow-hidden rounded-3xl border border-gold/20 bg-white/80 p-2 shadow-2xl shadow-gold/10 backdrop-blur-xl">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/cg/hero-summer-2026.svg"
                    alt="Excited woman opening a new hire survival kit gift box"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              {/* Floating stat card */}
              <div className="cg-glass-card absolute -bottom-6 -left-6 animate-float p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                    <span className="text-gold text-lg">🎁</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">2M+ Gifts</p>
                    <p className="text-xs text-ink/60">Delivered worldwide</p>
                  </div>
                </div>
              </div>

              {/* Floating rating card */}
              <div className="cg-glass-card absolute -right-4 -top-4 animate-float-delayed p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">98% Satisfaction</p>
                    <p className="text-xs text-ink/60">Across all clients</p>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          </Parallax>
        </div>

        {/* Stats bar */}
        <Reveal delay={0.5}>
          <div className="cg-glass-card mt-16 grid grid-cols-2 gap-6 p-8 md:grid-cols-4">
            {[
              { value: 20000, suffix: "+", label: "Companies trust us" },
              { value: 2, suffix: "M+", label: "Gifts delivered" },
              { value: 98, suffix: "%", label: "Satisfaction rate" },
              { value: 150, suffix: "+", label: "Countries served" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold cg-gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-sm text-ink/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
