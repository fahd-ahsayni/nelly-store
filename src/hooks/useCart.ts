"use client";

import { useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useCartStore, CartItem } from "@/lib/cart-store";

export { type CartItem } from "@/lib/cart-store";

export function useCart() {
  const [storedItems, setStoredItems] = useLocalStorage<CartItem[]>("cart-items", []);
  const store = useCartStore();
  const isInitialized = useRef(false);

  // Sync local storage with store on mount (only once)
  useEffect(() => {
    if (!isInitialized.current && storedItems.length > 0) {
      store.setItems(storedItems);
      isInitialized.current = true;
    }
  }, [storedItems, store]);

  // Sync store changes to local storage
  useEffect(() => {
    if (isInitialized.current) {
      setStoredItems(store.items);
    }
  }, [store.items, setStoredItems]);

  return {
    ...store,
    // Provide both naming conventions for compatibility
    removeFromCart: store.removeItem,
  };
}
