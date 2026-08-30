"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productSlug: string;
  name: string;
  unitPrice: number;
  quantity: number;
  // Multi-recipient: an optional per-line recipient label.
  recipient?: string;
  image: string;
};

type CartState = {
  lines: CartLine[];
  add: (line: CartLine) => void;
  updateQty: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (line) =>
        set((s) => {
          const existing = s.lines.find((l) => l.productSlug === line.productSlug);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.productSlug === line.productSlug ? { ...l, quantity: l.quantity + line.quantity } : l,
              ),
            };
          }
          return { lines: [...s.lines, line] };
        }),
      updateQty: (slug, quantity) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.productSlug === slug ? { ...l, quantity: Math.max(0, quantity) } : l))
            .filter((l) => l.quantity > 0),
        })),
      remove: (slug) => set((s) => ({ lines: s.lines.filter((l) => l.productSlug !== slug) })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: () => get().lines.reduce((n, l) => n + l.unitPrice * l.quantity, 0),
    }),
    { name: "od-cart" },
  ),
);
