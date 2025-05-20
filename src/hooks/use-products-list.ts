"use client";

import { useSupabaseState } from "@/context";
import { useFilter } from "@/context"; 
import { Collection, Product } from "@/types";
import { useEffect, useMemo, useState, useRef } from "react";
import { filterNewProducts } from "@/lib/product-utils";

export function useProductsList() {
  const { 
    products, 
    collections, 
    isLoading, 
    error,
    fetchProducts 
  } = useSupabaseState();
  
  // Use the filter context
  const { 
    filteredProducts: contextFilteredProducts, 
    updateSelectedCollection,
    filterState,
    updateProducts 
  } = useFilter();
  
  // Use refs to break circular dependencies
  const prevActiveFilterRef = useRef<string>("all");
  const initialRenderRef = useRef<boolean>(true);
  
  // Update the filter context with the latest products
  useEffect(() => {
    if (products.length > 0) {
      console.log("Updating products in filter context:", products.length);
      updateProducts(products);
    } else if (!isLoading && !error) {
      // Try fetching products if array is empty
      console.log("Products array is empty, fetching products");
      fetchProducts();
    }
  }, [products, updateProducts, isLoading, error, fetchProducts]);
  
  // Instead of managing this locally, we use the context state
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  useEffect(() => {
    // Skip the first render to prevent double initialization
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      
      // Initialize activeFilter based on filterState on first render only
      if (filterState.selectedCollectionId) {
        setActiveFilter(filterState.selectedCollectionId);
      }
      return;
    }
    
    // Only update if activeFilter actually changed
    if (prevActiveFilterRef.current !== activeFilter) {
      prevActiveFilterRef.current = activeFilter;
      console.log("Changing active filter to:", activeFilter);
      
      if (activeFilter === "all") {
        updateSelectedCollection(null);
      } else if (activeFilter === "new") {
        // New products filter is handled differently
        updateSelectedCollection(null);
      } else {
        // This is a collection ID
        updateSelectedCollection(activeFilter);
      }
    }
  }, [activeFilter, updateSelectedCollection, filterState.selectedCollectionId]);
  
  // Apply new product filter if needed
  const filteredProducts = useMemo(() => {
    console.log("Products after context filtering:", contextFilteredProducts.length);
    
    if (activeFilter === "new") {
      const newProducts = filterNewProducts(contextFilteredProducts);
      console.log("New products:", newProducts.length);
      return newProducts;
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
