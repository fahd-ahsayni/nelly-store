import { Product } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

// Define the filter state type
interface FilterState {
  products: Product[];
  filteredProducts: Product[];
  isFilterDrawerOpen: boolean;
  searchQuery: string;
  selectedColors: string[]; // Hex codes
  selectedSizes: string[];
  selectedCollectionId: string | null;
  isInStock: boolean | null; // true = only in stock, false = only out of stock, null = both
  
  // Pending states (for the drawer)
  pendingSelectedColors: string[];
  pendingSelectedSizes: string[];
  pendingIsInStock: boolean | null;
  
  // Metrics
  totalProductCount: number;
  filteredProductCount: number;
}

// Define action types
interface FilterActions {
  // Product management
  updateProducts: (products: Product[]) => void;
  
  // Drawer controls
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
  toggleFilterDrawer: () => void;
  
  // Search
  setSearchQuery: (query: string) => void;
  
  // Collection filtering
  updateSelectedCollection: (collectionId: string | null) => void;
  
  // Pending filter updates
  updatePendingColorFilter: (colorHex: string) => void;
  updatePendingSizeFilter: (size: string) => void;
  updatePendingInStockFilter: (value: boolean | null) => void;
  
  // Filter operations
  clearAllFilters: () => void;
  clearPendingColorFilters: () => void;
  clearPendingSizeFilters: () => void;
  applyFilters: () => void;
  resetPendingFilters: () => void;
}

// Create the store with both state and actions
export const useFilterStore = create<FilterState & FilterActions>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        products: [],
        filteredProducts: [],
        isFilterDrawerOpen: false,
        searchQuery: "",
        selectedColors: [],
        selectedSizes: [],
        selectedCollectionId: null,
        isInStock: null,
        pendingSelectedColors: [],
        pendingSelectedSizes: [],
        pendingIsInStock: null,
        totalProductCount: 0,
        filteredProductCount: 0,

        // Actions
        updateProducts: (products) => {
          // Update products and recalculate filtered products
          set((state) => {
            const filtered = filterProducts(
              products,
              state.searchQuery,
              state.selectedColors,
              state.selectedSizes,
              state.selectedCollectionId,
              state.isInStock
            );
            
            return {
              products,
              filteredProducts: filtered,
              totalProductCount: products.length,
              filteredProductCount: filtered.length,
            };
          });
        },

        // Drawer controls
        openFilterDrawer: () => {
          const state = get();
          set({
            isFilterDrawerOpen: true,
            pendingSelectedColors: [...state.selectedColors],
            pendingSelectedSizes: [...state.selectedSizes],
            pendingIsInStock: state.isInStock,
          });
        },
        
        closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),
        
        toggleFilterDrawer: () => {
          const state = get();
          if (!state.isFilterDrawerOpen) {
            set({
              isFilterDrawerOpen: true,
              pendingSelectedColors: [...state.selectedColors],
              pendingSelectedSizes: [...state.selectedSizes],
              pendingIsInStock: state.isInStock,
            });
          } else {
            set({ isFilterDrawerOpen: false });
          }
        },

        // Search
        setSearchQuery: (query) => {
          set((state) => {
            const filtered = filterProducts(
              state.products,
              query,
              state.selectedColors,
              state.selectedSizes,
              state.selectedCollectionId,
              state.isInStock
            );
            return {
              searchQuery: query,
              filteredProducts: filtered,
              filteredProductCount: filtered.length,
            };
          });
        },

        // Collection filtering
        updateSelectedCollection: (collectionId) => {
          set((state) => {
            const filtered = filterProducts(
              state.products,
              state.searchQuery,
              state.selectedColors,
              state.selectedSizes,
              collectionId,
              state.isInStock
            );
            return {
              selectedCollectionId: collectionId,
              pendingSelectedColors: [...state.selectedColors],
              pendingSelectedSizes: [...state.selectedSizes],
              pendingIsInStock: state.isInStock,
              filteredProducts: filtered,
              filteredProductCount: filtered.length,
            };
          });
        },

        // Pending filter updates
        updatePendingColorFilter: (colorHex) => {
          set((state) => {
            const colors = state.pendingSelectedColors.includes(colorHex)
              ? state.pendingSelectedColors.filter((color) => color !== colorHex)
              : [...state.pendingSelectedColors, colorHex];
            return { pendingSelectedColors: colors };
          });
        },
        
        updatePendingSizeFilter: (size) => {
          set((state) => {
            const sizes = state.pendingSelectedSizes.includes(size)
              ? state.pendingSelectedSizes.filter((s) => s !== size)
              : [...state.pendingSelectedSizes, size];
            return { pendingSelectedSizes: sizes };
          });
        },
        
        updatePendingInStockFilter: (value) => {
          set({ pendingIsInStock: value });
        },

        // Filter operations
        clearAllFilters: () => {
          set({
            pendingSelectedColors: [],
            pendingSelectedSizes: [],
            pendingIsInStock: null,
          });
        },
        
        clearPendingColorFilters: () => {
          set({ pendingSelectedColors: [] });
        },
        
        clearPendingSizeFilters: () => {
          set({ pendingSelectedSizes: [] });
        },
        
        applyFilters: () => {
          set((state) => {
            const filtered = filterProducts(
              state.products,
              state.searchQuery,
              state.pendingSelectedColors,
              state.pendingSelectedSizes,
              state.selectedCollectionId,
              state.pendingIsInStock
            );
            return {
              selectedColors: state.pendingSelectedColors,
              selectedSizes: state.pendingSelectedSizes,
              isInStock: state.pendingIsInStock,
              isFilterDrawerOpen: false,
              filteredProducts: filtered,
              filteredProductCount: filtered.length,
            };
          });
        },
        
        resetPendingFilters: () => {
          set((state) => ({
            pendingSelectedColors: [...state.selectedColors],
            pendingSelectedSizes: [...state.selectedSizes],
            pendingIsInStock: state.isInStock,
          }));
        },
      }),
      {
        name: "filter-storage",
        partialize: (state) => ({
          selectedColors: state.selectedColors,
          selectedSizes: state.selectedSizes,
          isInStock: state.isInStock,
          searchQuery: state.searchQuery,
        }),
      }
    )
  )
);

// Helper function to filter products based on criteria
function filterProducts(
  products: Product[],
  searchQuery: string,
  selectedColors: string[],
  selectedSizes: string[],
  selectedCollectionId: string | null,
  isInStock: boolean | null
): Product[] {
  const debouncedQuery = searchQuery.toLowerCase();
  
  return products
    .filter((product) => {
      // Search query filter
      if (
        debouncedQuery &&
        !product.name.toLowerCase().includes(debouncedQuery)
      ) {
        return false;
      }

      // Collection filter
      if (
        selectedCollectionId &&
        product.collection &&
        String(product.collection.id) !== String(selectedCollectionId)
      ) {
        return false;
      }

      // Color filter - handle possible undefined or empty arrays
      if (selectedColors.length > 0) {
        if (!product.colors || product.colors.length === 0) return false;

        const productColorHexes = product.colors.map((color) =>
          String(color.hex).toLowerCase()
        );
        const hasMatchingColor = selectedColors.some((color) =>
          productColorHexes.includes(String(color).toLowerCase())
        );
        if (!hasMatchingColor) return false;
      }

      // Size filter - handle possible undefined or empty arrays
      if (selectedSizes.length > 0) {
        if (!product.sizes || product.sizes.length === 0) return false;

        const hasMatchingSize = selectedSizes.some((size) =>
          product.sizes.some(
            (s) => String(s).toLowerCase() === String(size).toLowerCase()
          )
        );
        if (!hasMatchingSize) return false;
      }

      // In stock filter - handle possible boolean conversion issues
      if (isInStock !== null) {
        // Convert string "true"/"false" to boolean if needed
        const productInStock = !!product.inStock;

        if (productInStock !== isInStock) return false;
      }

      return true;
    })
    // Default to newest items first or by relevance if search query exists
    .sort((a, b) => {
      if (debouncedQuery) {
        const aNameIncludes = a.name
          .toLowerCase()
          .includes(debouncedQuery);
        const bNameIncludes = b.name
          .toLowerCase()
          .includes(debouncedQuery);

        if (aNameIncludes && !bNameIncludes) return -1;
        if (!aNameIncludes && bNameIncludes) return 1;
      }
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
}

// Selector hooks with shallow equality comparison to prevent infinite loops
export const useFilteredProducts = () => useFilterStore((state) => state.filteredProducts);
export const useFilterDrawerState = () => useFilterStore((state) => state.isFilterDrawerOpen);

// Fix selectors that return objects by using shallow equality comparison
export const useFilterMetrics = () => (useFilterStore as any)(
  (state: FilterState) => ({
    totalCount: state.totalProductCount,
    filteredCount: state.filteredProductCount,
  }),
  shallow // Add shallow comparison to prevent new object references
);

// Replace with individual selectors for each pending state property
export const usePendingColors = () => useFilterStore((state) => state.pendingSelectedColors);
export const usePendingSizes = () => useFilterStore((state) => state.pendingSelectedSizes);
export const usePendingInStock = () => useFilterStore((state) => state.pendingIsInStock);

// Individual selector hooks for better performance and stability
export const useSelectedColors = () => useFilterStore((state) => state.selectedColors);
export const useSelectedSizes = () => useFilterStore((state) => state.selectedSizes);
export const useIsInStock = () => useFilterStore((state) => state.isInStock);
export const useSelectedCollectionId = () => useFilterStore((state) => state.selectedCollectionId);
export const useSearchQuery = () => useFilterStore((state) => state.searchQuery);
export const useActiveFilterCount = () => useFilterStore(state => {
  const colorCount = state.selectedColors.length;
  const sizeCount = state.selectedSizes.length;
  const stockCount = state.isInStock !== null ? 1 : 0;
  return colorCount + sizeCount + stockCount;
});
