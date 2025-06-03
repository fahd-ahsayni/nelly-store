"use client";

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useCartStore, CartItem } from "@/lib/cart-store";

export function useCart() {
  const [storedItems, setStoredItems] = useLocalStorage<CartItem[]>("cart-items", []);
  const store = useCartStore();

  // Sync local storage with store on mount
  useEffect(() => {
    store.setItems(storedItems);
  }, []);

  // Sync store changes to local storage
  useEffect(() => {
    setStoredItems(store.items);
  }, [store.items, setStoredItems]);

  return store;
}
