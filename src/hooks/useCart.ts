"use client";

import { useEffect, useState } from "react";
import { useCartStore, CartItem } from "@/lib/cart-store";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export { type CartItem } from "@/lib/cart-store";

export function useCart() {
  const store = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check if already hydrated
    if (useCartStore.persist.hasHydrated()) {
      setIsHydrated(true);
      return;
    }

    // Wait for hydration to complete
    const unsubFinishHydration = useCartStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return {
    ...store,
    isHydrated,
    // Provide both naming conventions for compatibility
    removeFromCart: store.removeItem,
  };
}
