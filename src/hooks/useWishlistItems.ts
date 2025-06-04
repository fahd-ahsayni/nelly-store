"use client";

import { useWishlistStore } from "@/lib/wishlist-store";
import { useWishlist } from "./useWishlist";
import { useEffect, useState } from "react";

export interface WishlistItemFormatted {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  colorHex: string;
  size: string;
}

export function useWishlistItems(): WishlistItemFormatted[] {
  const items = useWishlistStore((state) => state.items);
  const { isHydrated } = useWishlist();
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
    name: item.name,
    price: item.price,
    image: item.image || "",
    color: item.color || "",
    colorHex: item.colorHex || "",
    size: item.size || "",
  }));
}

// Hook for wishlist count that prevents hydration mismatch
export function useWishlistCount(): number {
  const getTotalItems = useWishlistStore((state) => state.getTotalItems);
  const { isHydrated } = useWishlist();
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

// Re-export the wishlist store for convenience
export { useWishlistStore } from "@/lib/wishlist-store";
