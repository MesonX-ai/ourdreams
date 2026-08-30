"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/* Intersection Observer — scroll reveal                               */
/* ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [(node: T | null) => void, boolean] {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15, ...options }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [options]
  );

  return [ref, inView];
}

/* ------------------------------------------------------------------ */
/* Parallax on scroll                                                  */
/* ------------------------------------------------------------------ */
export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setOffset((center - window.innerHeight / 2) * speed * -0.1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}

/* ------------------------------------------------------------------ */
/* Mouse position tracking                                             */
/* ------------------------------------------------------------------ */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return pos;
}

/* ------------------------------------------------------------------ */
/* Count up animation                                                  */
/* ------------------------------------------------------------------ */
export function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let frame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start]);
  return count;
}

/* ------------------------------------------------------------------ */
/* Magnetic hover                                                      */
/* ------------------------------------------------------------------ */
export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const reset = () => {
      el.style.transform = "translate(0, 0)";
    };
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", reset);
    };
  }, [strength]);
  return ref;
}

/* ------------------------------------------------------------------ */
/* Text scramble effect                                                */
/* ------------------------------------------------------------------ */
export function useTextScramble(finalText: string, trigger: boolean) {
  const [displayText, setDisplayText] = useState(finalText);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split("")
          .map((_, index) => {
            if (index < iteration) return finalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= finalText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, finalText]);
  return displayText;
}
