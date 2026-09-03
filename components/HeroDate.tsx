"use client";

import { useEffect } from "react";

/**
 * HeroDate
 *
 * Drives the hero's date headline so it always shows today's date:
 *   "Everything but 28 the smile."
 * becomes
 *   "<Month in words>  <zero-padded day>  <year>"
 * e.g. "September 02 2026".
 *
 * Updates on mount and re-arms itself for the next midnight, so a page left
 * open across days rolls over automatically. A MutationObserver also re-applies
 * the live values if any boot script rewrites these nodes after hydration.
 * The statically-saved markup keeps its original text as a non-hydrated
 * fallback; this component swaps in the live values as soon as it hydrates.
 */
const MONTH_WIDGET = "8e0412a"; // "Everything but"  -> current month in words
const DAY_WIDGET = "fbefb60"; //    "28"              -> current day (2-digit)
const YEAR_WIDGET = "105c727"; //   "the smile."      -> current year

function today() {
  const now = new Date();
  return {
    month: now.toLocaleString("en-US", { month: "long" }),
    day: String(now.getDate()).padStart(2, "0"),
    year: String(now.getFullYear()),
  };
}

function applyDate() {
  const { month, day, year } = today();
  const set = (dataId: string, text: string) => {
    const title = document.querySelector(
      `[data-id="${dataId}"] .ourdreams-primary-title`
    );
    if (title && title.textContent !== text) {
      title.textContent = text;
    }
  };
  set(MONTH_WIDGET, month);
  set(DAY_WIDGET, day);
  set(YEAR_WIDGET, year);
}

function msUntilNextMidnight() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
  return next.getTime() - now.getTime();
}

export default function HeroDate() {
  useEffect(() => {
    applyDate();

    // Re-apply if any boot script (anime/heading/countdown) rewrites these
    // nodes after hydration — last writer wins, and the winner is us.
    const targets: Element[] = [];
    for (const id of [MONTH_WIDGET, DAY_WIDGET, YEAR_WIDGET]) {
      const el = document.querySelector(`[data-id="${id}"] .ourdreams-primary-title`);
      if (el) targets.push(el);
    }
    const observer = new MutationObserver((records) => {
      for (const r of records) {
        const node = r.target;
        if (node.nodeType === Node.TEXT_NODE || node instanceof Element) {
          applyDate();
          break;
        }
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: false,
    });

    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      applyDate();
      timer = setTimeout(loop, msUntilNextMidnight());
    };
    timer = setTimeout(loop, msUntilNextMidnight());

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return null;
}