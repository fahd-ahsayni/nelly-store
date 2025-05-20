"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sheet,
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetClose 
} from "@/components/ui/sheet";
import { useFilter, useSupabaseState } from "@/context";
import { STANDARD_SIZES } from "@/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function FilterDrawer() {
  const {
    filterState,
    pendingFilterState,
    closeFilterDrawer,
    updatePendingColorFilter,
    updatePendingSizeFilter,
    clearAllFilters,
    clearPendingColorFilters,
    clearPendingSizeFilters,
    updatePendingPriceRange,
    updatePendingInStockFilter,
    applyFilters,
    resetPendingFilters,
    filteredProductCount,
    totalProductCount,
  } = useFilter();

  const { colors } = useSupabaseState();

  const formRef = useRef<HTMLFormElement>(null);

  // Track the local price range while slider is being adjusted
  const [localPriceRange, setLocalPriceRange] = useState(
    pendingFilterState.priceRange
  );

  // Update local price range when pendingFilterState changes
  useEffect(() => {
    setLocalPriceRange(pendingFilterState.priceRange);
  }, [pendingFilterState.priceRange]);

  // Apply price range when done adjusting
  const handlePriceRangeChange = (type: "min" | "max", value: number) => {
    const newRange = { ...localPriceRange };
    if (type === "min") {
      newRange.min = Math.min(value, newRange.max);
    } else {
      newRange.max = Math.max(value, newRange.min);
    }
    setLocalPriceRange(newRange);
  };

  // Apply price range to pending filters
  const handlePriceRangeApply = () => {
    updatePendingPriceRange(localPriceRange.min, localPriceRange.max);
  };

  // Handle closing the drawer (cancel changes)
  const handleCloseDrawer = () => {
    // Reset pending filters to match applied filters
    resetPendingFilters();
    closeFilterDrawer();
  };

  // Handler for Apply Filters button
  const handleApplyFilters = () => {
    // Update price range from local state to pending state
    updatePendingPriceRange(localPriceRange.min, localPriceRange.max);

    // Apply all pending filters
    applyFilters();
  };

  // Get unique hex values from colors
  const uniqueColors = [
    ...new Map(colors.map((item) => [item.hex, item])).values(),
  ];

  // Count active pending filters
  const activePendingFilterCount =
    pendingFilterState.selectedColors.length +
    pendingFilterState.selectedSizes.length +
    (pendingFilterState.isInStock !== null ? 1 : 0) +
    (pendingFilterState.priceRange.min > 0 ||
    pendingFilterState.priceRange.max < 1000
      ? 1
      : 0);

  return (
    <Sheet open={filterState.isFilterDrawerOpen} onOpenChange={(open) => {
      if (!open) handleCloseDrawer();
    }}>
      <SheetContent side="right" className="w-full max-w-md p-0 border-l border-zinc-200">
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
          className="flex h-full flex-col bg-white py-6 shadow-xl"
        >
          <div className="px-4 sm:px-6">
            <SheetHeader>
              <div className="flex items-start justify-between">
                <SheetTitle className="text-lg font-medium text-zinc-900">
                  Filters
                </SheetTitle>
                <SheetClose className="rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:outline-hidden">
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </SheetClose>
              </div>
            </SheetHeader>
          </div>

          <div className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col">
            {/* ScrollArea with height constraint */}
            <ScrollArea className="flex-grow h-[calc(100vh-180px)]">
              <div className="space-y-6 pr-4">
                {/* Price Range Filter */}
                <div className="border-t border-zinc-200 pt-6">
                  <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex justify-between">
                    <span>Price Range</span>
                    {(localPriceRange.min > 0 ||
                      localPriceRange.max < 1000) && (
                      <button
                        type="button"
                        onClick={() => {
                          setLocalPriceRange({ min: 0, max: 1000 });
                          updatePendingPriceRange(0, 1000);
                        }}
                        className="text-xs text-rose-600 hover:text-rose-800"
                      >
                        Reset
                      </button>
                    )}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-full">
                        <div className="flex justify-between text-xs text-zinc-500 mb-2">
                          <span>${localPriceRange.min}</span>
                          <span>${localPriceRange.max}</span>
                        </div>
                        <div className="relative flex items-center">
                          <input
                            type="range"
                            min={0}
                            max={1000}
                            step={10}
                            value={localPriceRange.min}
                            onChange={(e) =>
                              handlePriceRangeChange(
                                "min",
                                parseInt(e.target.value)
                              )
                            }
                            onMouseUp={handlePriceRangeApply}
                            onTouchEnd={handlePriceRangeApply}
                            className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <input
                            type="range"
                            min={0}
                            max={1000}
                            step={10}
                            value={localPriceRange.max}
                            onChange={(e) =>
                              handlePriceRangeChange(
                                "max",
                                parseInt(e.target.value)
                              )
                            }
                            onMouseUp={handlePriceRangeApply}
                            onTouchEnd={handlePriceRangeApply}
                            className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label className="block text-xs text-zinc-500 mb-1">
                          Min Price
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={localPriceRange.max}
                          value={localPriceRange.min}
                          onChange={(e) =>
                            handlePriceRangeChange(
                              "min",
                              parseInt(e.target.value) || 0
                            )
                          }
                          onBlur={handlePriceRangeApply}
                          className="w-full border border-zinc-300 rounded px-2 py-1 text-sm"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-xs text-zinc-500 mb-1">
                          Max Price
                        </label>
                        <input
                          type="number"
                          min={localPriceRange.min}
                          value={localPriceRange.max}
                          onChange={(e) =>
                            handlePriceRangeChange(
                              "max",
                              parseInt(e.target.value) || 0
                            )
                          }
                          onBlur={handlePriceRangeApply}
                          className="w-full border border-zinc-300 rounded px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* In Stock Filter */}
                <div className="border-t border-zinc-200 pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-zinc-900 mb-4">
                      Availability
                    </h3>
                    {pendingFilterState.isInStock !== null && (
                      <button
                        type="button"
                        onClick={() => updatePendingInStockFilter(null)}
                        className="text-xs text-rose-600 hover:text-rose-800"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="stock-all"
                        name="stock-filter"
                        type="radio"
                        checked={pendingFilterState.isInStock === null}
                        onChange={() => updatePendingInStockFilter(null)}
                        className="h-4 w-4 border-zinc-300 text-rose-600 focus:ring-rose-500"
                      />
                      <label
                        htmlFor="stock-all"
                        className="ml-3 text-sm text-zinc-600"
                      >
                        Show All
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="stock-in"
                        name="stock-filter"
                        type="radio"
                        checked={pendingFilterState.isInStock === true}
                        onChange={() => updatePendingInStockFilter(true)}
                        className="h-4 w-4 border-zinc-300 text-rose-600 focus:ring-rose-500"
                      />
                      <label
                        htmlFor="stock-in"
                        className="ml-3 text-sm text-zinc-600"
                      >
                        In Stock Only
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="stock-out"
                        name="stock-filter"
                        type="radio"
                        checked={pendingFilterState.isInStock === false}
                        onChange={() => updatePendingInStockFilter(false)}
                        className="h-4 w-4 border-zinc-300 text-rose-600 focus:ring-rose-500"
                      />
                      <label
                        htmlFor="stock-out"
                        className="ml-3 text-sm text-zinc-600"
                      >
                        Out of Stock Only
                      </label>
                    </div>
                  </div>
                </div>

                {/* Color Filter */}
                <div className="border-t border-zinc-200 pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-zinc-900 mb-4">
                      Colors
                    </h3>
                    {pendingFilterState.selectedColors.length > 0 && (
                      <button
                        type="button"
                        onClick={clearPendingColorFilters}
                        className="text-xs text-rose-600 hover:text-rose-800"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-6 gap-4">
                    {uniqueColors.map((color) => (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() =>
                          updatePendingColorFilter(color.hex)
                        }
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          pendingFilterState.selectedColors.includes(
                            color.hex
                          )
                            ? "ring-2 ring-offset-2 ring-rose-500"
                            : "ring-1 ring-zinc-200 hover:ring-zinc-300"
                        }`}
                        aria-label={`Filter by ${color.name} color`}
                        title={color.name}
                      >
                        <span
                          className="h-8 w-8 rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="border-t border-zinc-200 pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-zinc-900 mb-4">
                      Sizes
                    </h3>
                    {pendingFilterState.selectedSizes.length > 0 && (
                      <button
                        type="button"
                        onClick={clearPendingSizeFilters}
                        className="text-xs text-rose-600 hover:text-rose-800"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STANDARD_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => updatePendingSizeFilter(size)}
                        className={`w-12 h-12 flex items-center justify-center border text-sm font-medium ${
                          pendingFilterState.selectedSizes.includes(size)
                            ? "bg-zinc-800 text-rose-200 border-zinc-800"
                            : "bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-50"
                        }`}
                        aria-label={`Filter by size ${size}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add bottom padding for scrollable content */}
                <div className="h-4"></div>
              </div>
            </ScrollArea>

            {/* Apply Filters Button - fixed to bottom */}
            <div className="sticky bottom-0 bg-white py-4 border-t border-zinc-200 mt-auto">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="w-1/3 py-2 px-4 border border-zinc-300 rounded-md text-zinc-700 hover:bg-zinc-50"
                  disabled={activePendingFilterCount === 0}
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 px-4 bg-rose-600 border border-rose-600 rounded-md text-white hover:bg-rose-700"
                >
                  Apply Filters ({filteredProductCount})
                </button>
              </div>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
