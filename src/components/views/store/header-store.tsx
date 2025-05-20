"use client";

import { useFilter } from "@/context";
import {
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function HeaderStore() {
  const { filterState, toggleFilterDrawer } = useFilter();
  const [searchQuery, setSearchQuery] = useState("");

  // Get active filter count
  const activeFilterCount =
    filterState.selectedColors.length +
    filterState.selectedSizes.length +
    (filterState.isInStock !== null ? 1 : 0) +
    (filterState.priceRange.min > 0 || filterState.priceRange.max < 1000
      ? 1
      : 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Search for:", searchQuery);
  };

  return (
    <div className="bg-white py-4 border-b border-zinc-200 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-zinc-900">Store</h1>

          <div className="flex items-center gap-4">
            {/* Search Bar - Hidden on mobile, visible on larger screens */}
            <div className="hidden md:block relative max-w-xs w-64">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-md text-sm placeholder-zinc-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Search products..."
                  />
                </div>
              </form>
            </div>

            {/* Filter Button */}
            <button
              type="button"
              onClick={toggleFilterDrawer}
              className="inline-flex items-center px-4 py-2 border border-zinc-300 rounded-md text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-zinc-500" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-md text-sm placeholder-zinc-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                placeholder="Search products..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
