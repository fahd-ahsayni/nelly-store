"use client";

import ProductCard from "@/components/product/product-card";
import ProductQuickview from "@/components/global/product-quickview";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useProductsList } from "@/hooks/use-products-list";
import { Product } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

export default function ProductsList() {
  const [api, setApi] = useState<{ scrollPrev: () => void; scrollNext: () => void } | any>(null);
  
  // Use our custom hook to get products and filter functionality
  const {
    filteredProducts,
    hasNewProducts,
    uniqueCollections,
    activeFilter,
    setActiveFilter,
    isLoading,
    error,
    isNewProduct
  } = useProductsList();

  // Create a ref to store the autoplay plugin instance
  const autoplayRef = useRef<any>(Autoplay({ delay: 2000 }));

  // State for quick view
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handler functions for carousel navigation
  const handlePrevious = () => {
    api?.scrollPrev();
    // Stop autoplay when manually navigating
    autoplayRef.current?.stop();
  };

  const handleNext = () => {
    api?.scrollNext();
    // Stop autoplay when manually navigating
    autoplayRef.current?.stop();
  };

  // Handler for mouse enter to pause autoplay
  const handleMouseEnter = () => {
    autoplayRef.current?.stop();
  };

  // Handler for mouse leave to resume autoplay
  const handleMouseLeave = () => {
    autoplayRef.current?.play();
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
        <div className="animate-pulse flex flex-col space-y-4 items-center justify-center h-96">
          <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-64 w-full bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-rose-50/70 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-red-500 text-lg">Failed to load products: {error}</p>
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
      <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative z-10">
        <h2 className="md:text-5xl text-4xl tracking-tight text-zinc-800 mb-8">
          <span className="font-newyork italic">Trending</span> products
        </h2>
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:flex-1 md:pr-4 max-w-full">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex items-center gap-x-4">
                {/* All filter button - always shown */}
                <button
                  key="all"
                  onClick={() => setActiveFilter("all")}
                  className={`px-6 py-1.5 border focus:outline-none transition-colors duration-200 font-medium tracking-wide ${
                  activeFilter === "all"
                    ? "bg-zinc-800 text-rose-200 border-zinc-700"
                    : "bg-white text-zinc-800 border-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  All
                </button>
                
                {/* New filter button - only if we have new products */}
                {hasNewProducts && (
                  <button
                  key="new"
                  onClick={() => setActiveFilter("new")}
                  className={`px-6 py-1.5 border focus:outline-none transition-colors duration-200 font-medium tracking-wide ${
                    activeFilter === "new"
                    ? "bg-zinc-800 text-rose-200 border-zinc-700"
                    : "bg-white text-zinc-800 border-zinc-800 hover:bg-zinc-50"
                  }`}
                  >
                  New
                  </button>
                )}
                
                {/* Collection filter buttons - only shown for collections with products */}
                {uniqueCollections.length > 0 && uniqueCollections.map((collection) => (
                  <button
                  key={collection.id}
                  onClick={() => setActiveFilter(collection.id)}
                  className={`px-6 py-1.5 border focus:outline-none transition-colors duration-200 font-medium tracking-wide ${
                    activeFilter === collection.id
                    ? "bg-zinc-800 text-rose-200 border-zinc-700"
                    : "bg-white text-zinc-800 border-zinc-800 hover:bg-zinc-50"
                  }`}
                  >
                  {collection.name}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="h-0" />
            </ScrollArea>
          </div>
          
          {/* Only show "Shop the collection" if we have collections */}
          {uniqueCollections.length > 0 && (
            <a
              href="#"
              className="hidden font-medium text-rose-600 hover:text-rose-500 md:block"
            >
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
          )}
        </div>

        <div className="mt-10 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[autoplayRef.current]}
            className="w-full"
            setApi={setApi}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContent className="-ml-4">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 md:basis-1/4 lg:basis-1/5"
                >
                  <ProductCard
                    product={product}
                    isNewProduct={isNewProduct}
                    onQuickView={openQuickView}
                  />
                </CarouselItem>
              )) : (
                <div className="col-span-full py-10 text-center text-zinc-500">
                  No products found for this filter.
                </div>
              )}
            </CarouselContent>
          </Carousel>
          
          {filteredProducts.length > 0 && (
            <div className="w-full mt-8 flex md:justify-end justify-center items-center space-x-8 relative z-50">
              <div className="flex items-center gap-x-6">
                <button
                  className="px-8 py-1 border border-zinc-800 bg-white hover:bg-zinc-800 hover:text-rose-200 transition-colors duration-200"
                  onClick={handlePrevious}
                >
                  <ArrowLeft strokeWidth={1} />
                </button>
                <button
                  className="px-8 py-1 border border-zinc-800 bg-white hover:bg-zinc-800 hover:text-rose-200 transition-colors duration-200"
                  onClick={handleNext}
                >
                  <ArrowRight strokeWidth={1} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Only show "Shop the collection" mobile link if we have collections */}
        {uniqueCollections.length > 0 && (
          <div className="mt-8 text-sm md:hidden w-full flex items-center justify-center">
            <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
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
