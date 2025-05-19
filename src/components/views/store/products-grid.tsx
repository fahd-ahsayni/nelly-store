"use client";

import ProductCard from "@/components/product/product-card";
import ProductQuickview from "@/components/global/product-quickview";
import { useProductsList } from "@/hooks/use-products-list";
import { Product } from "@/types";
import React, { useState } from "react";

export default function ProductsGrid() {
  // Use our custom hook to get products and filter functionality
  const { filteredProducts, isLoading, error, isNewProduct } =
    useProductsList();

  // State for quick view
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      <div className=" py-4 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
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
        ) : (
          <div className="py-10 text-center text-zinc-500">
            No products found.
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
