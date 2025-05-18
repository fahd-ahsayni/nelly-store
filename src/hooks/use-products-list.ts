"use client";

import { useSupabaseState } from "@/context";
import { Product, Collection } from "@/types";
import { useCallback, useMemo, useState } from "react";

type FilterType = "all" | "new" | string; // 'all', 'new', or collection id

export function useProductsList() {
  const { products, collections, isLoading, error } = useSupabaseState();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  
  // Check if a product is new (created within the last month)
  const isNewProduct = useCallback((product: Product) => {
    if (!product.createdAt) return false;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(product.createdAt) > oneMonthAgo;
  }, []);
  
  // Filter products based on active filter
  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    if (activeFilter === "new") return products.filter(isNewProduct);
    return products.filter(product => product.collection.id === activeFilter);
  }, [activeFilter, products, isNewProduct]);
  
  // Check if we have any new products
  const hasNewProducts = useMemo(() => {
    return products.some(isNewProduct);
  }, [products, isNewProduct]);
  
  // Extract unique collections
  const uniqueCollections = useMemo(() => {
    return collections;
  }, [collections]);
  
  return {
    filteredProducts,
    hasNewProducts,
    uniqueCollections,
    activeFilter,
    setActiveFilter,
    isLoading,
    error,
    isNewProduct
  };
}
