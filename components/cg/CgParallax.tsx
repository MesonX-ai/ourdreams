"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll parallax wrapper — translates children vertically as the element
 * moves through the viewport. rAF-driven with direct DOM writes (no
 * re-renders), disabled for prefers-reduced-motion.
 *
 * speed > 0 → drifts down as you scroll past; speed < 0 → drifts up.
 */
export function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (Math.abs(speed) < 0.001) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress =
        (rect.top + rect.height / 2 - viewport / 2) / viewport;
      el.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`cg-parallax ${className}`}>
      {children}
    </div>
  );
}

/**
 * Decorative layer of drifting gold sparkles with scroll parallax.
 * Purely ornamental — pointer-events none, aria-hidden.
 */
export function SparkleDrift({ speed = 0.1 }: { speed?: number }) {
  const sparkles = [
    { top: "12%", left: "6%", size: 14, delay: "0s" },
    { top: "26%", left: "92%", size: 10, delay: "1.1s" },
    { top: "58%", left: "3%", size: 11, delay: "2.3s" },
    { top: "72%", left: "96%", size: 13, delay: "0.6s" },
    { top: "84%", left: "14%", size: 9, delay: "1.7s" },
    { top: "38%", left: "84%", size: 8, delay: "2.9s" },
  ];
  return (
    <Parallax speed={speed} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div aria-hidden="true" className="relative h-full w-full">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="cg-drift-sparkle"
            style={{
              top: s.top,
              left: s.left,
              fontSize: `${s.size}px`,
              animationDelay: s.delay,
            }}
          >
            ✦
          </span>
        ))}
      </div>
    </Parallax>
  );
}