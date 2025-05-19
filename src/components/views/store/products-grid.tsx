"use client";

import ProductCard from "@/components/product/product-card";
import ProductQuickview from "@/components/global/product-quickview";
import { useFilter } from "@/context";
import { Product } from "@/types";
import React, { useState, useEffect } from "react";
import { useSupabaseState } from "@/context";

export default function ProductsGrid() {
  // Use our filter hook to get filtered products
  const { 
    filteredProducts, 
    filterState,
    totalProductCount,
    filteredProductCount 
  } = useFilter();
  
  // Supabase state for isNewProduct function
  const { isLoading, error } = useSupabaseState();

  // State for quick view
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Function to check if a product is new
  const isNewProduct = (product: Product) => {
    if (!product.createdAt) return false;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(product.createdAt) > oneMonthAgo;
  };

  // Handle quick view
  const openQuickView = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-rose-50/70 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-rose-50/70 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-red-500 text-lg">
            Failed to load products: {error}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-rose-50/70">
      <div className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {filteredProducts.length > 0 ? (
          <>
            {/* Info about applied filters - Desktop */}
            <div className="hidden md:block mb-8">
              <div className="text-sm text-zinc-500">
                <p>
                  Showing {filteredProducts.length} of {totalProductCount} products
                </p>
                {Object.entries(filterState).some(([key, value]) => {
                  if (key === 'isFilterDrawerOpen' || key === 'sortBy') return false;
                  if (Array.isArray(value) && value.length > 0) return true;
                  if (key === 'priceRange' && (value.min > 0 || value.max < 1000)) return true;
                  if (key === 'isInStock' && value !== null) return true;
                  if (key === 'searchQuery' && value) return true;
                  return false;
                }) && (
                  <p className="mt-1">
                    Filters applied
                  </p>
                )}
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isNewProduct={isNewProduct}
                  onQuickView={openQuickView}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <h3 className="text-xl font-medium text-zinc-900 mb-2">No products found</h3>
            <p className="text-zinc-500 mb-8">
              Try adjusting your filters or search query
            </p>
            {filterState.searchQuery && (
              <p className="text-zinc-700">
                No results for "<span className="font-medium">{filterState.searchQuery}</span>"
              </p>
            )}
          </div>
        )}

        {/* Product Quickview */}
        {quickViewOpen && selectedProduct && (
          <ProductQuickview
            open={quickViewOpen}
            setOpen={setQuickViewOpen}
            product={selectedProduct}
          />
        )}
      </div>
    </div>
  );
}
