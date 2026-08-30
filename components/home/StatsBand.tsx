"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1_200_000, suffix: "+", label: "Gifts delivered" },
  { value: 94, suffix: "%", label: "Recipient satisfaction" },
  { value: 9, suffix: "", label: "Regions fulfilled" },
  { value: 48, suffix: "h", label: "Avg. fulfilment" },
];

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return val;
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="section bg-ink text-cream">
      <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} active={active} />
        ))}
      </div>
    </section>
  );
}

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const v = useCountUp(value, active);
  return (
    <div className="text-center">
      <p className="font-display text-4xl text-champagne md:text-5xl">
        {v.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-cream/70">{label}</p>
    </div>
  );
}
