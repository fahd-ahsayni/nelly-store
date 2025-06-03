"use client";

import { useCartStore } from "@/lib/cart-store";
import { useCart } from "./useCart";
import { useEffect, useState } from "react";

export interface CartItemFormatted {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  colorHex: string;
  size: string;
}

export function useCartItems(): CartItemFormatted[] {
  const items = useCartStore((state) => state.items);
  const { isHydrated } = useCart();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Return empty array if not mounted or not hydrated yet to prevent hydration mismatch
  if (!mounted || !isHydrated) {
    return [];
  }
  
  return items.map(item => ({
    id: item.id,
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image || "",
    color: item.color || "",
    colorHex: item.colorHex || "",
    size: item.size || "",
  }));
}

export function useCartTotal(): number {
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const { isHydrated } = useCart();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Return 0 if not mounted or not hydrated yet
  if (!mounted || !isHydrated) {
    return 0;
  }
  
  return getSubtotal();
}

// Hook for cart count that prevents hydration mismatch
export function useCartCount(): number {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const { isHydrated } = useCart();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Return 0 if not mounted or not hydrated yet
  if (!mounted || !isHydrated) {
    return 0;
  }
  
  return getTotalItems();
}

// Re-export the cart store for convenience
export { useCartStore } from "@/lib/cart-store";
