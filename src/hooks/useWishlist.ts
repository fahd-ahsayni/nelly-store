"use client";

import { useWishlistStore } from "@/lib/wishlist-store";
import { useEffect, useState } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  colorHex?: string;
  size?: string;
}

export function useWishlist() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useWishlistStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  const items = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const getTotalItems = useWishlistStore((state) => state.getTotalItems);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  // Return empty state if not mounted or hydrated to prevent hydration mismatch
  if (!mounted || !isHydrated) {
    return {
      items: [],
      addToWishlist: () => {},
      removeFromWishlist: () => {},
      isInWishlist: () => false,
      toggleWishlist: () => {},
      getTotalItems: 0,
      clearWishlist: () => {},
      isHydrated: false,
    };
  }

  return {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    getTotalItems: getTotalItems(),
    clearWishlist,
    isHydrated,
  };
}
