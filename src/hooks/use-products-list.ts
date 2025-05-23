"use client";

import { filterNewProducts, filterProductsByCollection } from "@/lib/product-utils";
import { useProducts, useProductsError, useProductsLoading, useProductStore } from "@/stores/productStore";
import { Product } from "@/types";
import { useMemo, useState } from "react";

export function useProductsList() {
  const products = useProducts();
  const isLoading = useProductsLoading();
  const error = useProductsError();
  const { fetchProducts } = useProductStore();
  
  // Use a local state for filtering, independent of the global FilterStore
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Apply filtering locally instead of using FilterStore
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    
    if (activeFilter === "all") {
      return [...products]; // Return a copy of the array to avoid reference issues
    } else if (activeFilter === "new") {
      return filterNewProducts(products);
    } else {
      // Filter by collection ID
      return filterProductsByCollection(products, activeFilter);
    }
  }, [activeFilter, products]);
  
  // Get unique collections from products for filter options
  const uniqueCollections = useMemo(() => {
    const collectionMap = new Map();
    
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

  // Function to check if a product is new
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
