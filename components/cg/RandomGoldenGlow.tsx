"use client";

import { useMemo } from "react";

type Glow = {
  width: number;
  height: number;
  top: string;
  left: string;
  opacity: number;
  delay: number;
  duration: number;
  blur: number;
};

function generateGlows(count: number): Glow[] {
  return Array.from({ length: count }, () => ({
    width: 120 + Math.random() * 280,
    height: 120 + Math.random() * 280,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: 0.04 + Math.random() * 0.1,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    blur: 40 + Math.random() * 60,
  }));
}

export function RandomGoldenGlow({ count = 6 }: { count?: number }) {
  const glows = useMemo(() => generateGlows(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {glows.map((g, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: g.width,
            height: g.height,
            top: g.top,
            left: g.left,
            background: `radial-gradient(circle, rgba(212, 175, 55, ${g.opacity + 0.1}) 0%, rgba(255, 215, 0, ${g.opacity}) 40%, transparent 70%)`,
            filter: `blur(${g.blur}px)`,
            animation: `cg-orb-float ${g.duration}s ease-in-out infinite`,
            animationDelay: `${g.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function RandomGoldenGlowDense({ count = 12 }: { count?: number }) {
  const glows = useMemo(() => generateGlows(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {glows.map((g, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: g.width * 0.7,
            height: g.height * 0.7,
            top: g.top,
            left: g.left,
            background: `radial-gradient(circle, rgba(255, 215, 0, ${g.opacity + 0.05}) 0%, rgba(212, 175, 55, ${g.opacity * 0.8}) 50%, transparent 70%)`,
            filter: `blur(${g.blur * 0.8}px)`,
            animation: `cg-orb-float ${g.duration + 2}s ease-in-out infinite`,
            animationDelay: `${g.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function RandomGoldenGlowSparse({ count = 4 }: { count?: number }) {
  const glows = useMemo(() => generateGlows(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {glows.map((g, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: g.width * 1.5,
            height: g.height * 1.5,
            top: g.top,
            left: g.left,
            background: `radial-gradient(circle, rgba(212, 175, 55, ${g.opacity * 0.7}) 0%, transparent 60%)`,
            filter: `blur(${g.blur * 1.2}px)`,
            animation: `cg-orb-float ${g.duration + 4}s ease-in-out infinite`,
            animationDelay: `${g.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
