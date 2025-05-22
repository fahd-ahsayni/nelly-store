"use client";

import ProductQuickview from "@/components/global/product-quickview";
import ProductCard from "@/components/product/product-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilteredProducts, useFilterMetrics } from "@/stores/filterStore";
import { useProductsError, useProductsLoading } from "@/stores/productStore";
import { Product } from "@/types";
import { AlertTriangle } from "lucide-react";
import React, { useState, useCallback } from "react";

export default function ProductsGrid() {
  // Use Zustand store hooks instead of context hooks
  const filteredProducts = useFilteredProducts();
  
  // Use product store hooks
  const isLoading = useProductsLoading();
  const error = useProductsError();

  // State for quick view
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Function to check if a product is new - memoize to avoid recreating on every render
  const isNewProduct = useCallback((product: Product) => {
    if (!product.createdAt) return false;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(product.createdAt) > oneMonthAgo;
  }, []);

  // Handle quick view - use callback to avoid recreating on every render
  const openQuickView = useCallback((product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setQuickViewOpen(true);
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-rose-50 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="aspect-[3/4] bg-zinc-200" />
              <Skeleton className="h-4 w-3/4 bg-zinc-200" />
              <Skeleton className="h-4 w-1/2 bg-zinc-200" />
              <Skeleton className="h-4 w-1/4 bg-zinc-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-rose-50 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <Alert variant="destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An unexpected error occurred while loading products.
              <div className="mt-4 flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="isolate relative">
      <div className="absolute inset-x-0 -Z-10 transform-gpu overflow-hidden blur-3xl sm:-top-3/5">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c43a5d" />
              <stop offset={1} stopColor="#f0b1bb" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
       <div className="w-full flex justify-between items-center pb-4">
              <h2 className="lg:text-3xl text-xl font-medium tracking-tight text-zinc-700">
                Products
              </h2>
          
            </div>
        {filteredProducts.length > 0 ? (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
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
          <div className="flex flex-col items-center justify-start py-16 h-[70vh]">
            <Alert className="max-w-md">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="text-xl font-medium text-zinc-900">
                No Products Found
              </AlertTitle>
              <AlertDescription className="text-zinc-500">
                <p className="mb-2">
                  Sorry, no products matched your current filters or search
                  query.
                </p>
              </AlertDescription>
            </Alert>
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
