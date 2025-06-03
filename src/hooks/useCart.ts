"use client";

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useCartStore, CartItem as StoreCartItem } from "@/lib/cart-store";

// If CartItem is not properly defined in cart-store, define it here
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
