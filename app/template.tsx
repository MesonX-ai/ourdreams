"use client";

import type { ReactNode } from "react";

/**
 * Dreamy page-transition wrapper. Re-mounts on every route change in the
 * App Router, giving each navigation a soft fade + rise + de-blur entrance.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="cg-page-enter">{children}</div>;
}