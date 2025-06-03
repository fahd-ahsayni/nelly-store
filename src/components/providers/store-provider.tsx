"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

interface StoreProviderProps {
  children: ReactNode;
  initialData?: {
    collections?: any[];
    products?: any[];
    colors?: any[];
    productColors?: any[];
  };
}

export default function StoreProvider({
  children,
  initialData,
}: StoreProviderProps) {
  const hasInitialized = useRef(false);
  const collections = useStore((state) => state.collections);
  const products = useStore((state) => state.products);

  useEffect(() => {
    // Only initialize if we have initial data and haven't initialized yet
    if (initialData && !hasInitialized.current) {
      const state = useStore.getState();

      // Set initial data if store is empty
      if (collections.length === 0 && initialData.collections) {
        // You might want to add a method to set initial data directly
        // For now, we'll let the store fetch as needed
      }

      hasInitialized.current = true;
    }
  }, [initialData, collections.length]);

  return <>{children}</>;
}
