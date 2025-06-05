"use client";

import CollectionsCarousel from "@/components/layout/carousel/collections-carousel";
import ProductGrid from "@/components/layout/grid/product-grid";
import FilterDrawer from "@/components/layout/drawers/filter-drawer";
import { Heading } from "@/components/ui/heading";
import type { Collection, ProductFull, Color } from "@/types/database";
import { useState, useEffect, useMemo } from "react";

interface ShopContentProps {
  collections: Collection[];
  products: ProductFull[];
  colors: Color[];
  translations: any;
  locale: string;
}

export default function ShopContent({
  collections,
  products,
  colors,
  translations,
  locale,
}: ShopContentProps) {
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Get available sizes from all products
  const availableSizes = useMemo(() => {
    const allSizes = products.flatMap((product) => product.sizes || []);
    return [...new Set(allSizes)].sort();
  }, [products]);

  // Filter products based on search, collection, colors, and sizes
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => product.instock);

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.collections.name.toLowerCase().includes(term)
      );
    }

    // Collection filter
    if (selectedCollectionId) {
      filtered = filtered.filter(
        (product) => product.collection_id === selectedCollectionId
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.product_colors.some((pc) =>
          selectedColors.includes(pc.color_id)
        )
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSizes.some((size) => product.sizes?.includes(size))
      );
    }

    return filtered;
  }, [
    products,
    searchTerm,
    selectedCollectionId,
    selectedColors,
    selectedSizes,
  ]);

  // Handle search input changes
  useEffect(() => {
    const searchInput = document.querySelector(
      "[data-search-input]"
    ) as HTMLInputElement;
    const searchButton = document.querySelector("[data-search-button]");
    const filterButton = document.querySelector("[data-filter-button]");

    const handleSearchInput = (e: Event) => {
      setSearchTerm((e.target as HTMLInputElement).value);
    };

    const handleSearchClick = () => {
      if (searchInput) {
        setSearchTerm(searchInput.value);
      }
    };

    const handleFilterClick = () => {
      setIsFilterDrawerOpen(true);
    };

    if (searchInput) {
      searchInput.addEventListener("input", handleSearchInput);
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          handleSearchClick();
        }
      });
    }

    if (searchButton) {
      searchButton.addEventListener("click", handleSearchClick);
    }

    if (filterButton) {
      filterButton.addEventListener("click", handleFilterClick);
    }

    return () => {
      if (searchInput) {
        searchInput.removeEventListener("input", handleSearchInput);
      }
      if (searchButton) {
        searchButton.removeEventListener("click", handleSearchClick);
      }
      if (filterButton) {
        filterButton.removeEventListener("click", handleFilterClick);
      }
    };
  }, []);

  const handleCollectionSelect = (collectionId: string | null) => {
    setSelectedCollectionId(collectionId);
  };

  const handleFiltersChange = (filters: {
    colors: string[];
    sizes: string[];
  }) => {
    setSelectedColors(filters.colors);
    setSelectedSizes(filters.sizes);
  };

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:left-[calc(50%+30rem)] sm:w-288.75"
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        {/* Collections Carousel Section */}
        <div className="mb-4">
          <div className="text-center mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="ltr:md:text-3xl rtl:md:text-4xl ltr:text-2xl rtl:text-2xl text-gray-800 ltr:font-serif rtl:font-semibold font-medium text-start">
                  {translations.collections["title-part1"]}{" "}
                  <span className="ltr:italic text-rose-600">
                    {translations.collections["title-part2"]}
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <CollectionsCarousel
            collections={collections}
            products={products}
            translations={translations}
            locale={locale}
            onCollectionSelect={handleCollectionSelect}
            selectedCollectionId={selectedCollectionId}
          />
        </div>

        {/* Products Grid Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="ltr:md:text-3xl rtl:md:text-4xl ltr:text-2xl rtl:text-2xl text-gray-800 ltr:font-serif rtl:font-semibold font-medium text-start">
                {translations.productsList["title-part1"]}{" "}
                <span className="ltr:italic text-rose-600">
                  {translations.productsList["title-part2"]}
                </span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length}{" "}
                {translations.shop?.productsFound || "products found"}
              </p>
            </div>
          </div>

          <ProductGrid
            products={filteredProducts}
            translations={translations}
            locale={locale}
            collections={collections}
            selectedCollectionId={selectedCollectionId}
          />
        </div>
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        translations={translations}
        colors={colors}
        availableSizes={availableSizes}
        selectedColors={selectedColors}
        selectedSizes={selectedSizes}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
}
