"use client";

import { useEffect, useRef } from "react";

/**
 * Soft dreamy aura + tiny gold dot that trail the cursor.
 * Desktop (fine pointer) only; disabled for prefers-reduced-motion.
 */
export function CgCursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const aura = auraRef.current;
    const dot = dotRef.current;
    if (!aura || !dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ax = x;
    let ay = y;
    let dx = x;
    let dy = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      aura.style.opacity = "1";
      dot.style.opacity = "1";
    };
    const onLeave = () => {
      aura.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const loop = () => {
      ax += (x - ax) * 0.075;
      ay += (y - ay) * 0.075;
      dx += (x - dx) * 0.35;
      dy += (y - dy) * 0.35;
      aura.style.transform = `translate3d(${ax}px, ${ay}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={auraRef} className="cg-cursor-aura" aria-hidden="true" />
      <div ref={dotRef} className="cg-cursor-dot" aria-hidden="true" />
    </>
  );
}