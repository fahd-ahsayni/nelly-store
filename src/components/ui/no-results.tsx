"use client";

import { useFilter } from "@/context";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface NoResultsProps {
  onRetry?: () => void;
  isLoading?: boolean;
}

export default function NoResults({
  onRetry,
  isLoading = false,
}: NoResultsProps) {
  const { filterState, totalProductCount } = useFilter();

  // Count applied filters
  const appliedFilters = [
    filterState.selectedColors.length > 0 ? "colors" : null,
    filterState.selectedSizes.length > 0 ? "sizes" : null,
    filterState.selectedCollectionId ? "collection" : null,
    filterState.isInStock !== null ? "availability" : null,
    filterState.searchQuery ? "search query" : null,
  ].filter(Boolean);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {isLoading ? (
        <>
          <ArrowPathIcon className="h-10 w-10 text-zinc-400 animate-spin mb-4" />
          <h3 className="text-lg font-medium text-zinc-900">
            Loading products...
          </h3>
        </>
      ) : (
        <>
          <h3 className="text-xl font-medium text-zinc-900 mb-2">
            No products found
          </h3>

          {appliedFilters.length > 0 ? (
            <>
              <p className="text-zinc-500 mb-6">
                No products match the current filters:
                <span className="font-medium">
                  {" "}
                  {appliedFilters.join(", ")}
                </span>
              </p>

              <p className="text-zinc-700 mb-2">
                Try adjusting your filters or removing some to see more
                products.
              </p>

              {totalProductCount > 0 && (
                <p className="text-sm text-zinc-500">
                  There {totalProductCount === 1 ? "is" : "are"}{" "}
                  {totalProductCount} product
                  {totalProductCount !== 1 ? "s" : ""} in the database that{" "}
                  {totalProductCount !== 1 ? "are" : "is"} being filtered out.
                </p>
              )}
            </>
          ) : (
            <p className="text-zinc-500 mb-6">
              No products found in the database.
            </p>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              <ArrowPathIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Reload Products
            </button>
          )}
        </>
      )}
    </div>
  );
}
