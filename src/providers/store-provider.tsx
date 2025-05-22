"use client";

import { useFilterStore } from "@/stores/filterStore";
import { useProductStore } from "@/stores/productStore";
import { ReactNode, useEffect } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * StoreProvider initializes all Zustand stores and handles data fetching.
 * It replaces the previous context-based providers.
 */
export function StoreProvider({ children }: StoreProviderProps) {
  const { fetchProducts, fetchCollections, fetchColors, products } = useProductStore();
  const { updateProducts } = useFilterStore();

  // Initialize data on mount
  useEffect(() => {
    fetchProducts();
    fetchCollections();
    fetchColors();
  }, [fetchProducts, fetchCollections, fetchColors]);

  // Sync products between stores
  useEffect(() => {
    if (products.length > 0) {
      updateProducts(products);
    }
  }, [products, updateProducts]);

  return <>{children}</>;
}
