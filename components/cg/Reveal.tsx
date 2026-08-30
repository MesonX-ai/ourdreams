"use client";

import { useInView, useCountUp } from "@/hooks/useAnimations";
import type { ReactNode } from "react";

type RevealDirection = "up" | "left" | "right" | "scale" | "rotate";

const cls: Record<RevealDirection, string> = {
  up: "cg-reveal",
  left: "cg-reveal-left",
  right: "cg-reveal-right",
  scale: "cg-reveal-scale",
  rotate: "cg-reveal-rotate",
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${cls[direction]} ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
  className = "",
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const count = useCountUp(end, duration, inView);
  return (
    <div ref={ref} className={className}>
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}
