import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import type { Color, ProductColor, ProductFull } from '@/types/database';

// Global flag to track if data has been fetched
let hasInitialized = false;

// Hook to fetch all data on app initialization
export const useInitializeStore = () => {
  const fetchAllData = useStore((state) => state.fetchAllData);
  const loading = useStore((state) => state.loading);
  const errors = useStore((state) => state.errors);
  const products = useStore((state) => state.products);
  const collections = useStore((state) => state.collections);
  const hasDataRef = useRef(false);

  useEffect(() => {
    const hasData = products.length > 0 && collections.length > 0;
    
    // In production, always fetch fresh data on mount
    const shouldFetch = process.env.NODE_ENV === 'production' 
      ? !hasDataRef.current 
      : !hasData && !hasInitialized && !hasDataRef.current;
    
    if (shouldFetch) {
      hasInitialized = true;
      hasDataRef.current = true;
      fetchAllData();
    }
  }, [fetchAllData, products.length, collections.length]);

  // Add effect to periodically refresh data in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const interval = setInterval(() => {
        const state = useStore.getState();
        if (state.forceRefreshAll) {
          state.forceRefreshAll();
        }
      }, 60000); // Refresh every minute in production

      return () => clearInterval(interval);
    }
  }, []);

  const isLoading = Object.values(loading).some(Boolean);
  const hasErrors = Object.values(errors).some(Boolean);

  return { isLoading, hasErrors, errors };
};

// Simple product finder - avoiding complex selectors
export const useProductBySlug = (slug: string): ProductFull | undefined => {
  const products = useStore((state) => state.products);
  const collections = useStore((state) => state.collections);
  const productColors = useStore((state) => state.productColors);
  const colors = useStore((state) => state.colors);

  if (!slug || products.length === 0) return undefined;

  const product = products.find(p => p.slug === slug);
  if (!product) return undefined;

  const collection = collections.find(c => c.id === product.collection_id);
  if (!collection) return undefined;

  const productColorsWithColors = productColors
    .filter(pc => pc.product_id === product.id)
    .map(pc => {
      const color = colors.find(color => color.id === pc.color_id);
      return color ? { ...pc, colors: color } : null;
    })
    .filter((pc): pc is ProductColor & { colors: Color } => pc !== null);

  return {
    ...product,
    collections: collection,
    product_colors: productColorsWithColors,
  };
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
  const products = useStore((state) => state.products);
  const collections = useStore((state) => state.collections);
  const productColors = useStore((state) => state.productColors);
  const colors = useStore((state) => state.colors);

  if (products.length === 0) return [];

  // Build full products
  const fullProducts = products.map(product => {
    const collection = collections.find(c => c.id === product.collection_id);
    if (!collection) return null;

    const productColorsWithColors = productColors
      .filter(pc => pc.product_id === product.id)
      .map(pc => {
        const color = colors.find(color => color.id === pc.color_id);
        return color ? { ...pc, colors: color } : null;
      })
      .filter((pc): pc is ProductColor & { colors: Color } => pc !== null);

    return {
      ...product,
      collections: collection,
      product_colors: productColorsWithColors,
    };
  }).filter((product): product is ProductFull => product !== null);

  if (!filters) return fullProducts;

  return fullProducts.filter((product) => {
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
