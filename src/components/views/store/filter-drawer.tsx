"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { STANDARD_SIZES } from "@/types";
import { useRef } from "react";
import { useColors } from "@/stores/productStore";
import { 
  useFilterDrawerState, 
  useFilterStore, 
  usePendingColors,
  usePendingSizes,
  usePendingInStock
} from "@/stores/filterStore";

export default function FilterDrawer() {
  const isFilterDrawerOpen = useFilterDrawerState();
  
  const pendingColors = usePendingColors();
  const pendingSizes = usePendingSizes();
  const pendingInStock = usePendingInStock();
  
  const { 
    closeFilterDrawer, 
    updatePendingColorFilter, 
    updatePendingSizeFilter,
    clearAllFilters,
    clearPendingColorFilters,
    clearPendingSizeFilters,
    updatePendingInStockFilter,
    applyFilters,
    resetPendingFilters
  } = useFilterStore();

  const colors = useColors();

  const formRef = useRef<HTMLFormElement>(null);

  // Handle closing the drawer (cancel changes)
  const handleCloseDrawer = () => {
    // Reset pending filters to match applied filters
    resetPendingFilters();
    closeFilterDrawer();
  };

  // Handler for Apply Filters button
  const handleApplyFilters = () => {
    // Apply all pending filters
    applyFilters();
  };

  // Get unique hex values from colors
  const uniqueColors = [
    ...new Map(colors.map((item) => [item.hex, item])).values(),
  ];

  // Count active pending filters
  const activePendingFilterCount =
    pendingColors.length +
    pendingSizes.length +
    (pendingInStock !== null ? 1 : 0);

  return (
    <Sheet
      open={isFilterDrawerOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseDrawer();
      }}
    >
      <SheetContent side="right" className="bg-white " maxWidth="min-w-[95vw] lg:min-w-auto lg:max-w-sm">
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">Filters</SheetTitle>
        </SheetHeader>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
          className="flex flex-col h-full"
        >
          <div className="relative flex-1 flex flex-col px-6 overflow-auto">
            <div className="space-y-6">
              {/* Color Filter */}
              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="mb-4">Colors</h3>
                  {pendingColors.length > 0 && (
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
                        pendingColors.includes(color.hex)
                          ? "ring-2 ring-offset-2 ring-offset-white"
                          : "ring-1 ring-zinc-200 hover:ring-zinc-300"
                      )}
                      style={
                        pendingColors.includes(color.hex)
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
                  {pendingSizes.length > 0 && (
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
                        pendingSizes.includes(size)
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
                  {pendingInStock !== null && (
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
                      checked={pendingInStock === null}
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
                      checked={pendingInStock === true}
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
                      checked={pendingInStock === false}
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

          <SheetFooter className="pt-4 px-6 border-t border-zinc-200 mt-4">
            <div className="flex w-full space-x-4">
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
                onClick={(e) => {
                  e.preventDefault();
                  handleApplyFilters();
                }}
                className="w-2/3 py-2 px-4 bg-rose-600 border border-rose-600 rounded-md text-white hover:bg-rose-700"
              >
                Apply Filters
              </button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
