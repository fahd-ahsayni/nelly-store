"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
  colorHex?: string;
  size?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  setItems: (items: CartItem[]) => void;
  backupCart: () => void;
  restoreCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      removeFromCart: (id) => get().removeItem(id),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      setItems: (items) => set({ items }),
      backupCart: () => {
        const { items } = get();
        if (typeof window !== "undefined") {
          localStorage.setItem("cart-backup", JSON.stringify(items));
        }
      },
      restoreCart: () => {
        if (typeof window !== "undefined") {
          const backup = localStorage.getItem("cart-backup");
          if (backup) {
            try {
              const items = JSON.parse(backup);
              set({ items });
              localStorage.removeItem("cart-backup");
            } catch (error) {
              console.error("Failed to restore cart backup:", error);
            }
          }
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      skipHydration: true,
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return persistedState;
        }
        return persistedState;
      },
    }
  )
);
