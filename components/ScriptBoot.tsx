"use client";

import { useEffect } from "react";
import type { StaticScript } from "@/content/home/scripts";

declare global {
  interface Window {
    __odScriptsBooted?: boolean;
  }
}

/**
 * Boots the saved static page inside the Next.js app:
 *
 * 1. Unwraps the SSR'd homepage markup from its wrapper into <body>, so that
 *    `body > ...` selectors and the page layout behave exactly like the
 *    original document.
 * 2. Re-executes the page's scripts in their original document order
 *    (external scripts are awaited sequentially to preserve order).
 *
 * Idempotent: guarded by a window flag so React StrictMode's double
 * effect invocation in dev doesn't boot the runtime twice. Intentionally
 * has no effect cleanup — the injected runtime must not be aborted.
 */
export default function ScriptBoot({ scripts, rootId }: { scripts: StaticScript[]; rootId: string }) {
  useEffect(() => {
    if (typeof window === "undefined" || window.__odScriptsBooted) return;
    window.__odScriptsBooted = true;

    // 1. Move the static markup into <body> directly.
    const root = document.getElementById(rootId);
    if (root) {
      while (root.firstChild) {
        document.body.appendChild(root.firstChild);
      }
      root.remove();
    }

    // 2. Re-execute the saved scripts in document order.
    const queue = scripts.slice();
    const runNext = () => {
      const spec = queue.shift();
      if (!spec) return;
      const el = document.createElement("script");
      if (spec.id) el.id = spec.id;
      if (spec.type) el.type = spec.type;
      if (spec.src) {
        el.src = spec.src;
        el.async = false; // preserve execution order
        el.addEventListener("load", runNext);
        el.addEventListener("error", runNext);
        document.body.appendChild(el);
      } else {
        el.textContent = spec.content ?? "";
        document.body.appendChild(el);
        runNext();
      }
    };
    runNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}