"use client";

import { create } from "zustand";

export const talkToSales = create<{ open: boolean; openPanel: () => void; closePanel: () => void }>(
  (set) => ({
    open: false,
    openPanel: () => set({ open: true }),
    closePanel: () => set({ open: false }),
  }),
);