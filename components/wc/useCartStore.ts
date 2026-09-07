"use client";

import { create } from "zustand";

export type CartProduct = {
  id: number;
  name: string;
  price: number;
  images: Array<{ src: string; alt?: string }>;
  qty: number;
};

type CartState = {
  cart: CartProduct[];
  hydrated: boolean;
  hydrate: () => void;
  addToCart: (product: Omit<CartProduct, "qty">) => void;
  removeFromCart: (id: number) => void;
  removeProductItem: (id: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "wc-cart";

function persist(cart: CartProduct[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  hydrated: false,
  hydrate: () => {
    if (get().hydrated || typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as CartProduct[]) : [];
      set({ cart: Array.isArray(parsed) ? parsed : [], hydrated: true });
    } catch {
      set({ cart: [], hydrated: true });
    }
  },
  addToCart: (product) => {
    const existing = get().cart;
    const next = [...existing];
    const index = next.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      next[index] = { ...next[index], qty: next[index].qty + 1 };
    } else {
      next.push({ ...product, qty: 1 });
    }

    persist(next);
    set({ cart: next });
  },
  removeFromCart: (id) => {
    const next = get().cart.filter((item) => item.id !== id);
    persist(next);
    set({ cart: next });
  },
  removeProductItem: (id) => {
    const next = get()
      .cart.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);
    persist(next);
    set({ cart: next });
  },
  clearCart: () => {
    persist([]);
    set({ cart: [] });
  },
}));
