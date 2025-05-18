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
  
  // Count products by collection and include only non-empty collections
  const collectionsWithCounts = useMemo(() => {
    const counts = new Map<string, number>();
    
    // Count products per collection
    products.forEach(product => {
      const collectionId = product.collection.id;
      counts.set(collectionId, (counts.get(collectionId) || 0) + 1);
    });
    
    // Filter to only include collections with products
    return collections.filter(collection => 
      counts.get(collection.id) && counts.get(collection.id)! > 0
    );
  }, [collections, products]);
  
  return {
    filteredProducts,
    hasNewProducts,
    uniqueCollections: collectionsWithCounts, // Return only non-empty collections
    activeFilter,
    setActiveFilter,
    isLoading,
    error,
    isNewProduct
  };
}
