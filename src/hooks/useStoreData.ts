import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import type { ProductFull } from '@/types/database';

// Global flag to track if data has been fetched
let hasInitialized = false;

// Hook to fetch all data on app initialization
export const useInitializeStore = () => {
  const fetchAllData = useStore((state) => state.fetchAllData);
  const loading = useStore((state) => state.loading);
  const errors = useStore((state) => state.errors);
  const hasDataRef = useRef(false);

  useEffect(() => {
    // Check if we have data in store
    const state = useStore.getState();
    const hasData = state.products.length > 0 && state.collections.length > 0;
    
    // Only fetch if we don't have data and haven't initialized globally
    if (!hasData && !hasInitialized && !hasDataRef.current) {
      hasInitialized = true;
      hasDataRef.current = true;
      fetchAllData();
    }
  }, [fetchAllData]);

  const isLoading = Object.values(loading).some(Boolean);
  const hasErrors = Object.values(errors).some(Boolean);

  return { isLoading, hasErrors, errors };
};

// Memoized selectors for better performance
export const useProductBySlug = (slug: string): ProductFull | undefined => {
  return useStore((state) => {
    // Use a more efficient lookup
    const products = state.getProductsFull();
    return products.find(product => product.slug === slug);
  });
};

export const useProductsByCollection = (collectionId: string): ProductFull[] => {
  return useStore((state) => {
    const products = state.getProductsFull();
    return products.filter(product => product.collection_id === collectionId);
  });
};

// Hook to get products with search and filter capabilities
export const useProductsFiltered = (filters?: {
  searchTerm?: string;
  collectionId?: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
}): ProductFull[] => {
  return useStore((state) => {
    const products = state.getProductsFull();
    
    if (!filters) return products;

    return products.filter((product) => {
      // Search term filter
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.collections.name.toLowerCase().includes(term);
        
        if (!matchesSearch) return false;
      }

      // Collection filter
      if (filters.collectionId && product.collection_id !== filters.collectionId) {
        return false;
      }

      // In stock filter
      if (filters.inStockOnly && !product.instock) {
        return false;
      }

      // Price filters
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }

      // Type filter
      if (filters.type && product.type !== filters.type) {
        return false;
      }

      return true;
    });
  });
};

// Hook for featured products with caching
export const useFeaturedProducts = (limit: number = 8): ProductFull[] => {
  return useStore((state) => {
    const products = state.getProductsFull();
    
    // Use a more efficient sort with caching
    return products
      .filter(product => product.instock)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  });
};

// Hook for latest products
export const useLatestProducts = (limit: number = 8): ProductFull[] => {
  return useStore((state) => {
    return state.getProductsFull()
      .filter(product => product.instock)
      .sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime())
      .slice(0, limit);
  });
};

// Hook to check if products are new (last 20 created)
export const useNewProducts = (): Set<string> => {
  return useStore((state) => {
    const products = state.getProductsFull();
    const sortedProducts = products
      .slice()
      .sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
    
    const last20Products = sortedProducts.slice(0, 20);
    return new Set(last20Products.map(p => p.id));
  });
};

// Helper function to check if a product is new
export const isProductNew = (productId: string, allProducts: ProductFull[]): boolean => {
  const sortedProducts = allProducts
    .slice()
    .sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
  
  const last20Products = sortedProducts.slice(0, 20);
  return last20Products.some(p => p.id === productId);
};

// Hook for collections with product counts
export const useCollectionsWithCounts = () => {
  return useStore((state) => {
    const collections = state.collections;
    const products = state.products;

    return collections.map(collection => ({
      ...collection,
      productCount: products.filter(product => 
        product.collection_id === collection.id && product.instock
      ).length,
    }));
  });
};

// Hook for color statistics
export const useColorStats = () => {
  return useStore((state) => {
    const colors = state.colors;
    const productColors = state.productColors;

    return colors.map(color => ({
      ...color,
      productCount: productColors.filter(pc => pc.color_id === color.id).length,
    }));
  });
};
