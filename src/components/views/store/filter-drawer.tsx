"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFilter, useSupabaseState } from "@/context";
import { cn } from "@/lib/utils";
import { STANDARD_SIZES } from "@/types";
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
    <Sheet
      open={filterState.isFilterDrawerOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseDrawer();
      }}
    >
      <SheetContent side="right" className="bg-white " maxWidth="max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">Filters</SheetTitle>
        </SheetHeader>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
        >
          <div className="relative flex-1 flex flex-col px-6">
            {/* ScrollArea with height constraint */}
            <div className="flex-1 overflow-auto">
              <div className="space-y-6">
                {/* Color Filter */}
                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="mb-4">Colors</h3>
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
                  <div className="flex gap-x-4 flex-wrap px-1">
                    {uniqueColors.map((color) => (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => updatePendingColorFilter(color.hex)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          pendingFilterState.selectedColors.includes(color.hex)
                            ? "ring-2 ring-offset-2 ring-offset-white"
                            : "ring-1 ring-zinc-200 hover:ring-zinc-300"
                        )}
                        style={
                          pendingFilterState.selectedColors.includes(color.hex)
                            ? ({
                                "--tw-ring-color": color.hex,
                              } as React.CSSProperties)
                            : undefined
                        }
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
                    <h3 className="mb-4">Sizes</h3>
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
                        className={`w-12 h-12 flex items-center justify-center border text-sm  tracking-wider font-medium ${
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

                {/* In Stock Filter */}
                <div className="border-t border-zinc-200 pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="mb-4">Availability</h3>
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
              </div>
            </div>

            {/* Apply Filters Button - fixed to bottom */}
            <div className="h-20"></div>
          </div>
        </form>
        <SheetFooter>
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
