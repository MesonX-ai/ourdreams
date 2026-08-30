"use client";

/**
 * CgPixieHero — an elegant animated hero UI that sits below the navigation bar.
 *
 * Renders layered wavy golden strings (SVG paths) and glittering pixie dust
 * particles over a soft white background. All animation is CSS-driven for
 * performance.
 */
export function CgPixieHero() {
  const gold = "#d4af37";
  const goldLight = "#ffd700";
  const goldTransparent = "rgba(212, 175, 55, 0)";

  // Wavy string path definitions — organic S-curves
  const strings = [
    { d: "M0,120 C80,80 160,160 240,100 C320,40 400,120 480,80", dur: 6, delay: 0, width: 1.5 },
    { d: "M0,100 C100,140 200,60 300,110 C400,160 500,70 560,100", dur: 7, delay: 0.5, width: 2 },
    { d: "M0,80 C120,120 240,40 360,90 C480,140 600,60 680,100", dur: 8, delay: 1, width: 1 },
    { d: "M0,140 C80,100 160,180 280,120 C400,60 520,140 640,90", dur: 6.5, delay: 1.5, width: 1.5 },
    { d: "M0,90 C140,130 280,50 420,100 C560,150 700,70 800,110", dur: 7.5, delay: 2, width: 1.8 },
    { d: "M0,110 C100,70 200,150 320,80 C440,10 560,130 700,60", dur: 9, delay: 0.8, width: 1.2 },
    { d: "M0,70 C160,110 320,30 480,90 C640,150 800,50 900,100", dur: 8.5, delay: 1.8, width: 1.6 },
    { d: "M0,130 C120,90 240,170 380,100 C520,30 660,150 800,80", dur: 7.2, delay: 2.5, width: 1.4 },
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

      {/* Wavy golden strings layer */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 960 160"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gold-str-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={gold} stopOpacity="0.7" />
            <stop offset="100%" stopColor={goldLight} stopOpacity="0" />
          </linearGradient>
          <filter id="gold-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {strings.map((s, i) => (
          <path
            key={`wavy-${i}`}
            d={s.d}
            stroke="url(#gold-str-gradient)"
            strokeWidth={s.width}
            strokeLinecap="round"
            filter="url(#gold-glow)"
            className="cg-wavy-string"
            style={{
              animation: `cg-wavy-flow ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
              strokeDasharray: "400",
              strokeDashoffset: "400",
            }}
          />
        ))}
      </svg>

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
