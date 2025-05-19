"use client";

import { useSupabaseState } from "@/context";
import { useFilter } from "@/context"; // Import the filter context
import { Collection, Product } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { filterNewProducts } from "@/lib/product-utils";

export function useProductsList() {
  const { 
    products, 
    collections, 
    isLoading, 
    error 
  } = useSupabaseState();
  
  // Use the filter context
  const { 
    filteredProducts: contextFilteredProducts, 
    updateSelectedCollection,
    filterState 
  } = useFilter();
  
  // Instead of managing this locally, we use the context state
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Handle filter changes
  useEffect(() => {
    if (activeFilter === "all") {
      updateSelectedCollection(null);
    } else if (activeFilter === "new") {
      // New products filter is handled differently
      // We'll keep the collection filter as null
      updateSelectedCollection(null);
    } else {
      // This is a collection ID
      updateSelectedCollection(activeFilter);
    }
  }, [activeFilter, updateSelectedCollection]);
  
  // Apply new product filter if needed (this is separate from the collection filter)
  const filteredProducts = useMemo(() => {
    if (activeFilter === "new") {
      return filterNewProducts(contextFilteredProducts);
    }
    return contextFilteredProducts;
  }, [activeFilter, contextFilteredProducts]);
  
  // Get unique collections from products for filter options
  const uniqueCollections = useMemo(() => {
    const collectionMap = new Map<string, Collection>();
    
    products.forEach((product) => {
      if (product.collection && !collectionMap.has(product.collection.id)) {
        collectionMap.set(product.collection.id, product.collection);
      }
    });
    
    return Array.from(collectionMap.values());
  }, [products]);
  
  // Check if we have any new products
  const hasNewProducts = useMemo(() => {
    return filterNewProducts(products).length > 0;
  }, [products]);

  // Function to check if a product is new (less than a month old)
  const isNewProduct = (product: Product) => {
    if (!product.createdAt) return false;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(product.createdAt) > oneMonthAgo;
  };

  return {
    filteredProducts,
    activeFilter,
    setActiveFilter,
    uniqueCollections,
    hasNewProducts,
    isLoading,
    error,
    isNewProduct,
  };
}
