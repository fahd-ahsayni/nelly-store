"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { Product } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

// Available sort options
export type SortOption = 
  | "relevance" 
  | "price-low-high" 
  | "price-high-low" 
  | "newest" 
  | "name-a-z" 
  | "name-z-a";

// Define the filter state type
interface FilterState {
  isFilterDrawerOpen: boolean;
  searchQuery: string;
  selectedColors: string[]; // Hex codes
  selectedSizes: string[];
  selectedCollectionId: string | null; // Add selected collection ID
  priceRange: { min: number; max: number };
  isInStock: boolean | null; // true = only in stock, false = only out of stock, null = both
  sortBy: SortOption;
}

// Define the context type
interface FilterContextType {
  filterState: FilterState;
  pendingFilterState: FilterState;
  filteredProducts: Product[];
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
  toggleFilterDrawer: () => void;
  setSearchQuery: (query: string) => void;
  updatePendingColorFilter: (colorHex: string) => void;
  updatePendingSizeFilter: (size: string) => void;
  updatePendingPriceRange: (min: number, max: number) => void;
  updatePendingInStockFilter: (value: boolean | null) => void;
  updatePendingSortBy: (option: SortOption) => void;
  updateSelectedCollection: (collectionId: string | null) => void; // Add this method
  clearAllFilters: () => void;
  clearPendingColorFilters: () => void;
  clearPendingSizeFilters: () => void;
  applyFilters: () => void;
  resetPendingFilters: () => void;
  totalProductCount: number;
  filteredProductCount: number;
  updateProducts: (products: Product[]) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Initial filter state
const initialFilterState: FilterState = {
  isFilterDrawerOpen: false,
  searchQuery: "",
  selectedColors: [],
  selectedSizes: [],
  selectedCollectionId: null, // Initialize with no collection selected
  priceRange: { min: 0, max: 1000 },
  isInStock: null,
  sortBy: "relevance",
};

export function FilterProvider({ children }: { children: ReactNode; allProducts?: Product[] }) {
  // Applied filters that affect the product display
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  
  // Pending filters that are being configured in the drawer
  const [pendingFilterState, setPendingFilterState] = useState<FilterState>(initialFilterState);
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  // Use debounced search query for better performance
  const debouncedSearchQuery = useDebounce(filterState.searchQuery, 300);

  // Filter products based on current filter settings
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search query filter
      if (debouncedSearchQuery && !product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) {
        return false;
      }
      
      // Collection filter
      if (filterState.selectedCollectionId && product.collection.id !== filterState.selectedCollectionId) {
        return false;
      }
      
      // Color filter
      if (filterState.selectedColors.length > 0) {
        const productColorHexes = product.colors.map(color => color.hex);
        const hasMatchingColor = filterState.selectedColors.some(color => 
          productColorHexes.includes(color)
        );
        if (!hasMatchingColor) return false;
      }
      
      // Size filter
      if (filterState.selectedSizes.length > 0) {
        const hasMatchingSize = filterState.selectedSizes.some(size => 
          product.sizes.includes(size)
        );
        if (!hasMatchingSize) return false;
      }
      
      // Price range filter
      if (
        product.price < filterState.priceRange.min || 
        product.price > filterState.priceRange.max
      ) {
        return false;
      }
      
      // In stock filter
      if (filterState.isInStock !== null && product.inStock !== filterState.isInStock) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Apply sorting
      switch (filterState.sortBy) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "name-a-z":
          return a.name.localeCompare(b.name);
        case "name-z-a":
          return b.name.localeCompare(a.name);
        case "relevance":
        default:
          // For relevance, if there's a search query, prioritize items with the term in the name
          if (debouncedSearchQuery) {
            const aNameIncludes = a.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            const bNameIncludes = b.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            
            if (aNameIncludes && !bNameIncludes) return -1;
            if (!aNameIncludes && bNameIncludes) return 1;
          }
          // Default to newest items first
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [
    allProducts, 
    debouncedSearchQuery,
    filterState.selectedCollectionId, // Add collection ID dependency
    filterState.selectedColors, 
    filterState.selectedSizes, 
    filterState.priceRange, 
    filterState.isInStock,
    filterState.sortBy
  ]);

  // Update all products from outside (from useSupabaseState)
  const updateProducts = (products: Product[]) => {
    setAllProducts(products);
  };

  // Effect to get products from localStorage on initial mount
  useEffect(() => {
    try {
      // This is just a fallback if needed
      const storedProducts = localStorage.getItem('cached-products');
      if (storedProducts) {
        setAllProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error('Error loading cached products:', error);
    }
  }, []);

  // Drawer control
  const openFilterDrawer = () => {
    // Copy current filters to pending when opening the drawer
    setPendingFilterState({...filterState});
    setFilterState(prev => ({ ...prev, isFilterDrawerOpen: true }));
  };

  const closeFilterDrawer = () => {
    setFilterState(prev => ({ ...prev, isFilterDrawerOpen: false }));
  };

  const toggleFilterDrawer = () => {
    if (!filterState.isFilterDrawerOpen) {
      // Copy current filters to pending when opening
      setPendingFilterState({...filterState});
    }
    setFilterState(prev => ({ ...prev, isFilterDrawerOpen: !prev.isFilterDrawerOpen }));
  };

  // Search functionality - this still applies immediately for better UX
  const setSearchQuery = (query: string) => {
    setFilterState(prev => ({ ...prev, searchQuery: query }));
    setPendingFilterState(prev => ({ ...prev, searchQuery: query }));
  };

  // Pending filter updates (don't immediately apply)
  const updatePendingColorFilter = (colorHex: string) => {
    setPendingFilterState(prev => {
      if (prev.selectedColors.includes(colorHex)) {
        return { ...prev, selectedColors: prev.selectedColors.filter(hex => hex !== colorHex) };
      } else {
        return { ...prev, selectedColors: [...prev.selectedColors, colorHex] };
      }
    });
  };

  const updatePendingSizeFilter = (size: string) => {
    setPendingFilterState(prev => {
      if (prev.selectedSizes.includes(size)) {
        return { ...prev, selectedSizes: prev.selectedSizes.filter(s => s !== size) };
      } else {
        return { ...prev, selectedSizes: [...prev.selectedSizes, size] };
      }
    });
  };

  const updatePendingPriceRange = (min: number, max: number) => {
    setPendingFilterState(prev => ({ ...prev, priceRange: { min, max } }));
  };
  
  const updatePendingInStockFilter = (value: boolean | null) => {
    setPendingFilterState(prev => ({ ...prev, isInStock: value }));
  };

  const updatePendingSortBy = (option: SortOption) => {
    // Sort can apply immediately for better UX
    setFilterState(prev => ({ ...prev, sortBy: option }));
    setPendingFilterState(prev => ({ ...prev, sortBy: option }));
  };

  // Collection filter update
  const updateSelectedCollection = (collectionId: string | null) => {
    setFilterState(prev => ({ ...prev, selectedCollectionId: collectionId }));
    setPendingFilterState(prev => ({ ...prev, selectedCollectionId: collectionId }));
  };

  // Apply pending filters
  const applyFilters = () => {
    setFilterState(prev => ({
      ...prev,
      selectedColors: pendingFilterState.selectedColors,
      selectedSizes: pendingFilterState.selectedSizes,
      priceRange: pendingFilterState.priceRange,
      isInStock: pendingFilterState.isInStock,
      sortBy: pendingFilterState.sortBy,
      isFilterDrawerOpen: false // Close drawer on apply
    }));
  };

  // Reset pending filters to match current applied filters
  const resetPendingFilters = () => {
    setPendingFilterState({...filterState});
  };

  // Clear filters
  const clearAllFilters = () => {
    const clearedState = {
      ...initialFilterState,
      isFilterDrawerOpen: filterState.isFilterDrawerOpen,
      searchQuery: filterState.searchQuery // Keep search query
    };
    setPendingFilterState(clearedState);
  };

  const clearPendingColorFilters = () => {
    setPendingFilterState(prev => ({ ...prev, selectedColors: [] }));
  };

  const clearPendingSizeFilters = () => {
    setPendingFilterState(prev => ({ ...prev, selectedSizes: [] }));
  };

  return (
    <FilterContext.Provider
      value={{
        filterState,
        pendingFilterState,
        filteredProducts,
        openFilterDrawer,
        closeFilterDrawer,
        toggleFilterDrawer,
        setSearchQuery,
        updatePendingColorFilter,
        updatePendingSizeFilter,
        updatePendingPriceRange,
        updatePendingInStockFilter,
        updatePendingSortBy,
        updateSelectedCollection, // Add this to the context value
        clearAllFilters,
        clearPendingColorFilters,
        clearPendingSizeFilters,
        applyFilters,
        resetPendingFilters,
        totalProductCount: allProducts.length,
        filteredProductCount: filteredProducts.length,
        updateProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
