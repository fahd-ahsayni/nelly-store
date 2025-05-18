"use client";

import ProductQuickview from "@/components/global/product-quickview";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { products } from "@/constants";
import { useWishlistDrawer } from "@/context/wishlist-drawer-context";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ProductsList() {
  const [api, setApi] = useState<
    | {
        scrollPrev: () => void;
        scrollNext: () => void;
      }
    | any
  >(null);

  // Create a ref to store the autoplay plugin instance
  const autoplayRef = useRef<any>(Autoplay({ delay: 2000 }));

  // State for quick view
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Wishlist integration
  const { addToWishlist, isItemInWishlist } = useWishlistDrawer();

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
  const openQuickView = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  // Handle adding to wishlist
  const handleAddToWishlist = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isItemInWishlist(product.id)) return;

    addToWishlist({
      id: uuidv4(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.imageSrc,
      slug: product.slug,
      inStock: product.inStock,
    });
  };

  return (
    <div className="bg-rose-50/70">
      <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative z-10">
        <h2 className="md:text-5xl text-4xl tracking-tight text-zinc-800 mb-8">
          <span className="font-newyork italic">Trending</span> products
        </h2>
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-x-4">
            {["All", "robs", "Hijab", "Khimar"].map((label) => {
              const isActive = label === "All";
              return (
                <button
                  key={label}
                  className={`px-6 py-1.5 border focus:outline-none transition-colors duration-200 font-medium tracking-wide ${
                    isActive
                      ? "bg-zinc-800 text-rose-200 border-zinc-700"
                      : "bg-white text-zinc-800 border-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <a
            href="#"
            className="hidden font-medium text-rose-600 hover:text-rose-500 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
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
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="group relative">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-zinc-200 group-hover:opacity-75 relative">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />

                      {/* Out of stock badge */}
                      {product.inStock === false && (
                        <div className="absolute top-2 right-2 bg-zinc-800 text-rose-200 text-xs px-2 py-1">
                          Out of stock
                        </div>
                      )}

                      {/* Quick view and wishlist buttons - always visible on mobile, hover on desktop */}
                      <div className="absolute inset-0 flex items-end justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 bg-black/20 before:content-none px-4 pb-4">
                        <button
                          onClick={(e) => openQuickView(product, e)}
                          className="bg-rose-50 hover:bg-white border border-zinc-800 transition-colors duration-200 text-zinc-800 px-4 py-2 text-sm font-medium relative z-[100] cursor-pointer flex-1"
                        >
                          Produc Quick View
                        </button>
                        <button
                          onClick={(e) => handleAddToWishlist(product, e)}
                          className="bg-rose-50 hover:bg-white border border-zinc-800 transition-colors duration-200 text-zinc-800 px-4 py-2 text-sm font-medium relative z-[100] cursor-pointer"
                        >
                          <Heart
                            size={20}
                            className={
                              isItemInWishlist(product.id)
                                ? "fill-pink-600 text-pink-600"
                                : ""
                            }
                          />
                        </button>
                      </div>
                    </div>
                    <h3 className="mt-4 text-sm text-zinc-700">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {product.collection}
                    </p>
                    <p className="mt-1 text-sm font-medium text-zinc-900">
                      ${product.price}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
        </div>

        <div className="mt-8 text-sm md:hidden w-full flex items-center justify-center">
          <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        {/* Product Quickview - Use a conditional check to make sure it only renders when we want it to */}
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
