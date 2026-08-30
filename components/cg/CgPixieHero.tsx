"use client";

import { useMemo } from "react";

/**
 * CgPixieHero — an elegant animated hero UI that sits below the navigation bar.
 *
 * Renders thin golden strings as horizontally-periodic S-curves spanning beyond
 * both screen edges, with bright pulses flowing left → right seamlessly, a
 * random field of golden twinkling stars, glittering pixie dust, and occasional
 * sparkle bursts. Sparkle positions come from a seeded PRNG so server and
 * client render identically (no hydration mismatch). All animation is CSS.
 */

/** Deterministic PRNG — same sequence on server and client. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Twinkle = {
  left: number;
  top: number;
  size: number;
  delay: number;
  dur: number;
  glyph: string;
};

function makeTwinkles(count: number, seed: number): Twinkle[] {
  const rand = mulberry32(seed);
  const glyphs = ["✦", "✧", "✦", "✶", "✧", "✦"];
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: 4 + rand() * 88,
    size: 4 + rand() * 9,
    delay: rand() * 6,
    dur: 2.2 + rand() * 3.6,
    glyph: glyphs[Math.floor(rand() * glyphs.length)],
  }));
}

export function CgPixieHero() {
  const gold = "#d4af37";
  const goldLight = "#ffd700";
  const goldTransparent = "rgba(212, 175, 55, 0)";

  // Random golden twinkles — seeded so SSR and hydration match.
  const twinkles = useMemo(() => makeTwinkles(28, 20260830), []);
  const bursts = useMemo(() => makeTwinkles(8, 97531), []);

  // Phantom strings — short segments that appear at random spots, glow along
  // their length, then vanish. Seeded for hydration safety.
  const phantoms = useMemo(() => {
    const rand = mulberry32(555777);
    return Array.from({ length: 12 }, () => ({
      x: 60 + rand() * 840,
      y: 25 + rand() * 100,
      rot: -10 + rand() * 20,
      w: 0.5 + rand() * 0.6,
      dur: 8 + rand() * 8,
      delay: rand() * 16,
      flip: rand() > 0.5,
    }));
  }, []);

  // Horizontally-periodic wavy string paths (viewBox 0 0 960 160, drawn from
  // x = -60 to x = 1020) — start/end heights and slopes match every repeat,
  // so pulses enter/exit off-screen and the flow never shows a seam.
  const strings = [
    {
      d: "M-60,90 C60,50 180,130 300,90 C420,50 540,130 660,90 C780,50 900,130 1020,90",
      dur: 7, delay: 0, width: 0.7, dash: "140 420",
    },
    {
      d: "M-60,110 C60,155 180,65 300,110 C420,155 540,65 660,110 C780,155 900,65 1020,110",
      dur: 8, delay: -2.5, width: 0.9, dash: "180 540",
    },
    {
      d: "M-60,70 C60,35 180,105 300,70 C420,35 540,105 660,70 C780,35 900,105 1020,70",
      dur: 6, delay: -1.2, width: 0.6, dash: "120 360",
    },
    {
      d: "M-60,130 C60,170 180,90 300,130 C420,170 540,90 660,130 C780,170 900,90 1020,130",
      dur: 8.5, delay: -4, width: 0.8, dash: "160 480",
    },
    {
      d: "M-60,60 C60,35 180,85 300,60 C420,35 540,85 660,60 C780,35 900,85 1020,60",
      dur: 7.5, delay: -3.3, width: 0.6, dash: "110 330",
    },
    {
      d: "M-60,100 C60,150 180,50 300,100 C420,150 540,50 660,100 C780,150 900,50 1020,100",
      dur: 9, delay: -0.8, width: 1, dash: "200 600",
    },
    {
      d: "M-60,80 C60,35 180,125 300,80 C420,35 540,125 660,80 C780,35 900,125 1020,80",
      dur: 6.5, delay: -5.1, width: 0.75, dash: "130 390",
    },
    {
      d: "M-60,120 C60,90 180,150 300,120 C420,90 540,150 660,120 C780,90 900,150 1020,120",
      dur: 7.2, delay: -1.9, width: 0.7, dash: "150 450",
    },
  ];

  return (
    <section
      aria-hidden="true"
      className="cg-pixie-hero pointer-events-none relative z-[50] mb-[-1px] h-32 overflow-hidden sm:h-40 md:h-48"
    >
      {/* Background gradient — soft white to warm pearl */}
      <div className="cg-pixie-bg absolute inset-0" />

      {/* Central soft gold glow */}
      <div className="cg-pixie-glow absolute inset-0 mx-auto h-[220px] w-[70%] rounded-full" />

      {/* Golden strings layer — continuous base + flowing light pulses */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 960 160"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gold-str-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={gold} stopOpacity="0.9" />
            <stop offset="100%" stopColor={goldLight} stopOpacity="0.4" />
          </linearGradient>
          <filter id="gold-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {strings.map((s, i) => {
          const [dash, gap] = s.dash.split(" ").map(Number);
          const period = dash + gap;
          return (
            <g key={`string-${i}`}>
              {/* Continuous base string — always visible, edge to edge */}
              <path
                d={s.d}
                stroke="url(#gold-str-gradient)"
                strokeWidth={s.width}
                strokeLinecap="round"
                opacity={0.25}
              />
              {/* Bright pulses flowing seamlessly left → right */}
              <path
                d={s.d}
                stroke="url(#gold-str-gradient)"
                strokeWidth={s.width + 0.45}
                strokeLinecap="round"
                filter="url(#gold-glow)"
                className="cg-wavy-string"
                style={{
                  ["--dash-array" as string]: s.dash,
                  ["--dash-period" as string]: `${-period}px`,
                  ["--flow-dur" as string]: `${s.dur}s`,
                  ["--flow-delay" as string]: `${s.delay}s`,
                }}
              />
            </g>
          );
        })}
        {/* Phantom strings — appear at random spots, glow, then vanish */}
        {phantoms.map((p, i) => (
          <path
            key={`phantom-${i}`}
            d={
              p.flip
                ? "M0,0 C33,14 66,-14 100,0 C133,14 166,-14 200,0"
                : "M0,0 C33,-14 66,14 100,0 C133,-14 166,14 200,0"
            }
            pathLength={100}
            transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rot.toFixed(1)})`}
            stroke="url(#gold-str-gradient)"
            strokeWidth={p.w}
            strokeLinecap="round"
            filter="url(#gold-glow)"
            className="cg-phantom-string"
            style={{
              ["--ph-dur" as string]: `${p.dur.toFixed(2)}s`,
              ["--ph-delay" as string]: `${(-p.delay).toFixed(2)}s`,
            }}
          />
        ))}
      </svg>

      {/* Random golden twinkling stars */}
      <div className="cg-twinkle-field absolute inset-0" aria-hidden="true">
        {twinkles.map((t, i) => (
          <span
            key={`twinkle-${i}`}
            className="cg-twinkle"
            style={{
              left: `${t.left}%`,
              top: `${t.top}%`,
              fontSize: `${t.size}px`,
              color: i % 3 === 0 ? goldLight : gold,
              ["--tw-dur" as string]: `${t.dur}s`,
              ["--tw-delay" as string]: `${t.delay}s`,
            }}
          >
            {t.glyph}
          </span>
        ))}
        {/* Occasional bright bursts — rarer, larger, longer-glowing */}
        {bursts.map((t, i) => (
          <span
            key={`burst-${i}`}
            className="cg-twinkle cg-twinkle--burst"
            style={{
              left: `${t.left}%`,
              top: `${t.top}%`,
              fontSize: `${t.size + 7}px`,
              ["--tw-dur" as string]: `${t.dur + 2.5}s`,
              ["--tw-delay" as string]: `${t.delay + 2}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Pixie dust particles (64 particles staggered) */}
      {[...Array(64)].map((_, i) => {
        const size = 1.5 + (i % 5);
        const left = 2 + (i * 1.55) % 96;
        const delay = (i * 0.12) % 10;
        const duration = 5 + (i % 6);
        const drift = -60 + (i % 120);
        return (
          <div
            key={`dust-${i}`}
            className="cg-dust-particle absolute bottom-[-4px] rounded-full"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, ${goldLight} 0%, ${gold} 40%, ${goldTransparent} 80%)`,
              animation: `cg-dust-float ${duration}s ease-out infinite, cg-twinkle ${1.2 + (i % 4)}s infinite ease-in-out`,
              animationDelay: `${delay}s, ${delay * 0.5}s`,
              ["--drift" as string]: `${drift}px`,
            }}
          />
        );
      })}

      {/* Sparkle bursts — occasional bright flashes */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="cg-sparkle absolute rounded-full"
          style={{
            left: `${10 + i * 16}%`,
            bottom: `${10 + (i % 3) * 25}%`,
            width: "4px",
            height: "4px",
            background: `radial-gradient(circle, #fff8dc 0%, ${goldLight} 50%, ${goldTransparent} 100%)`,
            animation: `cg-sparkle ${3 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}
    </section>
  );
}
