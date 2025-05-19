"use client";

import { useFilter } from "@/context";
import {
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon,
    ArrowsUpDownIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";

export default function HeaderStore() {
  const { 
    filterState, 
    toggleFilterDrawer, 
    setSearchQuery, 
    updatePendingSortBy,
    filteredProductCount,
    totalProductCount 
  } = useFilter();
  
  const [localSearchQuery, setLocalSearchQuery] = useState(filterState.searchQuery);
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  // Update local search when filter state changes
  useEffect(() => {
    setLocalSearchQuery(filterState.searchQuery);
  }, [filterState.searchQuery]);

  // Get active filter count
  const activeFilterCount =
    filterState.selectedColors.length +
    filterState.selectedSizes.length +
    (filterState.isInStock !== null ? 1 : 0) +
    (filterState.priceRange.min > 0 || filterState.priceRange.max < 1000
      ? 1
      : 0);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
  };
  
  // Apply search on typing after debounce
  const debouncedSearch = useDebounce(localSearchQuery, 500);
  
  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const renderSortOptions = () => (
    <div className={`absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md border border-zinc-200 z-50 ${!showSortMenu ? 'hidden' : ''}`}>
      <div className="py-1">
        <button
          onClick={() => { updatePendingSortBy("relevance"); setShowSortMenu(false); }}
          className={`block px-4 py-2 text-sm w-full text-left hover:bg-zinc-50 ${filterState.sortBy === 'relevance' ? 'bg-zinc-50 font-medium' : ''}`}
        >
          Relevance
        </button>
        <button
          onClick={() => { updatePendingSortBy("newest"); setShowSortMenu(false); }}
          className={`block px-4 py-2 text-sm w-full text-left hover:bg-zinc-50 ${filterState.sortBy === 'newest' ? 'bg-zinc-50 font-medium' : ''}`}
        >
          Newest
        </button>
        <button
          onClick={() => { updatePendingSortBy("price-low-high"); setShowSortMenu(false); }}
          className={`block px-4 py-2 text-sm w-full text-left hover:bg-zinc-50 ${filterState.sortBy === 'price-low-high' ? 'bg-zinc-50 font-medium' : ''}`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => { updatePendingSortBy("price-high-low"); setShowSortMenu(false); }}
          className={`block px-4 py-2 text-sm w-full text-left hover:bg-zinc-50 ${filterState.sortBy === 'price-high-low' ? 'bg-zinc-50 font-medium' : ''}`}
        >
          Price: High to Low
        </button>
        <button
          onClick={() => { updatePendingSortBy("name-a-z"); setShowSortMenu(false); }}
          className={`block px-4 py-2 text-sm w-full text-left hover:bg-zinc-50 ${filterState.sortBy === 'name-a-z' ? 'bg-zinc-50 font-medium' : ''}`}
        >
          Name: A to Z
        </button>
        <button
          onClick={() => { updatePendingSortBy("name-z-a"); setShowSortMenu(false); }}
          className={`block px-4 py-2 text-sm w-full text-left hover:bg-zinc-50 ${filterState.sortBy === 'name-z-a' ? 'bg-zinc-50 font-medium' : ''}`}
        >
          Name: Z to A
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white py-4 border-b border-zinc-200 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
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
                      value={localSearchQuery}
                      onChange={(e) => setLocalSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-md text-sm placeholder-zinc-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Search products..."
                    />
                    {localSearchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setLocalSearchQuery('');
                          setSearchQuery('');
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-500"
                      >
                        <span className="sr-only">Clear search</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
              
              {/* Sort Dropdown - Desktop */}
              <div className="hidden md:block relative">
                <button
                  type="button"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="inline-flex items-center px-4 py-2 border border-zinc-300 rounded-md text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  <ArrowsUpDownIcon className="h-5 w-5 mr-2 text-zinc-500" />
                  Sort
                </button>
                {renderSortOptions()}
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
          <div className="md:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="search"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-md text-sm placeholder-zinc-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Search products..."
                />
                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSearchQuery('');
                      setSearchQuery('');
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-500"
                  >
                    <span className="sr-only">Clear search</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Mobile Sort - Row at bottom */}
          <div className="md:hidden">
            <div className="flex flex-wrap justify-between items-center text-sm text-zinc-500">
              <div>
                Showing {filteredProductCount} of {totalProductCount} products
              </div>
              <div className="flex items-center">
                <span className="mr-2">Sort by:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) => updatePendingSortBy(e.target.value as any)}
                  className="border-none bg-transparent text-zinc-700 focus:ring-0 focus:outline-none py-1 pl-2 pr-7 text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
