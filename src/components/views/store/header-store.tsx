"use client";

import AnimationTextHeaderStore from "@/components/design/animation-text-header-store";
import { Button } from "@/components/ui/button";
import { useActiveFilterCount, useFilterStore, useSearchQuery } from "@/stores/filterStore";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function HeaderStore() {
  const { toggleFilterDrawer, setSearchQuery } = useFilterStore();
  const activeFilterCount = useActiveFilterCount();
  const currentQuery = useSearchQuery();
  const [searchInputValue, setSearchInputValue] = useState("");
  
  // Initialize search input with the global query value
  useEffect(() => {
    setSearchInputValue(currentQuery);
  }, [currentQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInputValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputValue(value);
    // Optionally update global search query on each change for real-time filtering
    setSearchQuery(value);
  };

  return (
    <div className="bg-white py-4 border-b border-zinc-200 sticky top-0 z-30 max-w-full px-3 lg:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <AnimationTextHeaderStore />

          <div className="flex items-center gap-4">
            {/* Search Bar - Hidden on mobile, visible on larger screens */}
            <div className="hidden md:block relative max-w-xs w-64">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-zinc-600" />
                  </div>
                  <input
                    type="search"
                    value={searchInputValue}
                    onChange={handleSearchChange}
                    className="block w-full pl-10 pr-3 py-2 bg-white border border-border rounded-md text-sm placeholder-zinc-600 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Search products..."
                  />
                </div>
              </form>
            </div>

            {/* Filter Button */}
            <Button
              type="button"
              onClick={toggleFilterDrawer}
              className="inline-flex items-center px-4 py-2 border border-zinc-600 rounded-md text-sm font-medium text-zinc-800 bg-white hover:bg-accent hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-zinc-700" />
              </div>
              <input
                type="search"
                value={searchInputValue}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-border text-sm placeholder-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-300"
                placeholder="Search products..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
