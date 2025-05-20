"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { Product } from "@/types";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

// Define the filter state type
interface FilterState {
    isFilterDrawerOpen: boolean;
    searchQuery: string;
    selectedColors: string[]; // Hex codes
    selectedSizes: string[];
    selectedCollectionId: string | null; // Add selected collection ID
    isInStock: boolean | null; // true = only in stock, false = only out of stock, null = both
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
    updatePendingInStockFilter: (value: boolean | null) => void;
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
    isInStock: null,
};

export function FilterProvider({
    children,
}: {
    children: ReactNode;
    allProducts?: Product[];
}) {
    // Applied filters that affect the product display
    const [filterState, setFilterState] =
        useState<FilterState>(initialFilterState);

    // Pending filters that are being configured in the drawer
    const [pendingFilterState, setPendingFilterState] =
        useState<FilterState>(initialFilterState);

    const [allProducts, setAllProducts] = useState<Product[]>([]);

    // Use debounced search query for better performance
    const debouncedSearchQuery = useDebounce(filterState.searchQuery, 300);

    // Filter products based on current filter settings
    const filteredProducts = useMemo(() => {
        console.log("Filtering products, count:", allProducts.length);
        console.log("Current filters:", {
            colors: filterState.selectedColors,
            sizes: filterState.selectedSizes,
            collection: filterState.selectedCollectionId,
            inStock: filterState.isInStock,
        });

        return allProducts
            .filter((product) => {
                // Search query filter
                if (
                    debouncedSearchQuery &&
                    !product.name
                        .toLowerCase()
                        .includes(debouncedSearchQuery.toLowerCase())
                ) {
                    return false;
                }

                // Collection filter
                if (
                    filterState.selectedCollectionId &&
                    product.collection &&
                    String(product.collection.id) !==
                        String(filterState.selectedCollectionId)
                ) {
                    return false;
                }

                // Color filter - handle possible undefined or empty arrays
                if (filterState.selectedColors.length > 0) {
                    if (!product.colors || product.colors.length === 0) return false;

                    const productColorHexes = product.colors.map((color) =>
                        String(color.hex).toLowerCase()
                    );
                    const hasMatchingColor = filterState.selectedColors.some((color) =>
                        productColorHexes.includes(String(color).toLowerCase())
                    );
                    if (!hasMatchingColor) return false;
                }

                // Size filter - handle possible undefined or empty arrays
                if (filterState.selectedSizes.length > 0) {
                    if (!product.sizes || product.sizes.length === 0) return false;

                    const hasMatchingSize = filterState.selectedSizes.some((size) =>
                        product.sizes.some(
                            (s) => String(s).toLowerCase() === String(size).toLowerCase()
                        )
                    );
                    if (!hasMatchingSize) return false;
                }

                // In stock filter - handle possible boolean conversion issues
                if (filterState.isInStock !== null) {
                    // Convert string "true"/"false" to boolean if needed
                    const productInStock =
                        typeof product.inStock === "string"
                            ? (product.inStock as unknown as string).toLowerCase() === "true"
                            : !!product.inStock;

                    if (productInStock !== filterState.isInStock) return false;
                }

                return true;
            })
            // Default to newest items first or by relevance if search query exists
            .sort((a, b) => {
                if (debouncedSearchQuery) {
                    const aNameIncludes = a.name
                        .toLowerCase()
                        .includes(debouncedSearchQuery.toLowerCase());
                    const bNameIncludes = b.name
                        .toLowerCase()
                        .includes(debouncedSearchQuery.toLowerCase());

                    if (aNameIncludes && !bNameIncludes) return -1;
                    if (!aNameIncludes && bNameIncludes) return 1;
                }
                return (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            });
    }, [
        allProducts,
        debouncedSearchQuery,
        filterState.selectedCollectionId,
        filterState.selectedColors,
        filterState.selectedSizes,
        filterState.isInStock,
    ]);

    // Update all products from outside (from useSupabaseState)
    const updateProducts = (products: Product[]) => {
        setAllProducts(products);
    };

    // Effect to get products from localStorage on initial mount
    useEffect(() => {
        try {
            // This is just a fallback if needed
            const storedProducts = localStorage.getItem("cached-products");
            if (storedProducts) {
                setAllProducts(JSON.parse(storedProducts));
            }
        } catch (error) {
            console.error("Error loading cached products:", error);
        }
    }, []);

    // Drawer control
    const openFilterDrawer = () => {
        // Copy current filters to pending when opening the drawer
        setPendingFilterState({ ...filterState });
        setFilterState((prev) => ({ ...prev, isFilterDrawerOpen: true }));
    };

    const closeFilterDrawer = () => {
        setFilterState((prev) => ({ ...prev, isFilterDrawerOpen: false }));
    };

    const toggleFilterDrawer = () => {
        if (!filterState.isFilterDrawerOpen) {
            // Copy current filters to pending when opening
            setPendingFilterState({ ...filterState });
        }
        setFilterState((prev) => ({
            ...prev,
            isFilterDrawerOpen: !prev.isFilterDrawerOpen,
        }));
    };

    // Search functionality - this still applies immediately for better UX
    const setSearchQuery = (query: string) => {
        setFilterState((prev) => ({ ...prev, searchQuery: query }));
        setPendingFilterState((prev) => ({ ...prev, searchQuery: query }));
    };

    // Pending filter updates (don't immediately apply)
    const updatePendingColorFilter = (colorHex: string) => {
        setPendingFilterState((prev) => {
            if (prev.selectedColors.includes(colorHex)) {
                return {
                    ...prev,
                    selectedColors: prev.selectedColors.filter((hex) => hex !== colorHex),
                };
            } else {
                return { ...prev, selectedColors: [...prev.selectedColors, colorHex] };
            }
        });
    };

    const updatePendingSizeFilter = (size: string) => {
        setPendingFilterState((prev) => {
            if (prev.selectedSizes.includes(size)) {
                return {
                    ...prev,
                    selectedSizes: prev.selectedSizes.filter((s) => s !== size),
                };
            } else {
                return { ...prev, selectedSizes: [...prev.selectedSizes, size] };
            }
        });
    };

    const updatePendingInStockFilter = (value: boolean | null) => {
        setPendingFilterState((prev) => ({ ...prev, isInStock: value }));
    };

    // Collection filter update
    const updateSelectedCollection = (collectionId: string | null) => {
        setFilterState((prev) => ({ ...prev, selectedCollectionId: collectionId }));
        setPendingFilterState((prev) => ({
            ...prev,
            selectedCollectionId: collectionId,
        }));
    };

    // Apply pending filters
    const applyFilters = () => {
        setFilterState((prev) => ({
            ...prev,
            selectedColors: pendingFilterState.selectedColors,
            selectedSizes: pendingFilterState.selectedSizes,
            isInStock: pendingFilterState.isInStock,
            isFilterDrawerOpen: false, // Close drawer on apply
        }));
    };

    // Reset pending filters to match current applied filters
    const resetPendingFilters = () => {
        setPendingFilterState({ ...filterState });
    };

    // Clear filters
    const clearAllFilters = () => {
        const clearedState = {
            ...initialFilterState,
            isFilterDrawerOpen: filterState.isFilterDrawerOpen,
            searchQuery: filterState.searchQuery, // Keep search query
        };
        setPendingFilterState(clearedState);
    };

    const clearPendingColorFilters = () => {
        setPendingFilterState((prev) => ({ ...prev, selectedColors: [] }));
    };

    const clearPendingSizeFilters = () => {
        setPendingFilterState((prev) => ({ ...prev, selectedSizes: [] }));
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
                updatePendingInStockFilter,
                updateSelectedCollection,
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
