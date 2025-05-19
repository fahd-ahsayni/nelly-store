"use client";

import { useWishlistDrawer } from "@/context/wishlist-drawer-context";
import { Product } from "@/types";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface ProductCardProps {
  product: Product;
  isNewProduct?: (product: Product) => boolean;
  onQuickView?: (product: Product, e: React.MouseEvent) => void;
  className?: string;
}

export default function ProductCard({
  product,
  isNewProduct,
  onQuickView,
  className = "",
}: ProductCardProps) {
  // Wishlist integration
  const { addToWishlist, isItemInWishlist } = useWishlistDrawer();

  // Handle adding to wishlist
  const handleAddToWishlist = (e: React.MouseEvent) => {
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

  // Handle quick view (if provided)
  const handleQuickView = (e: React.MouseEvent) => {
    if (onQuickView) {
      onQuickView(product, e);
    }
  };

  // Handle card click to open quick view
  const handleCardClick = (e: React.MouseEvent) => {
    if (onQuickView) {
      onQuickView(product, e);
    }
  };

  // Check if product is new
  const isNew = isNewProduct ? isNewProduct(product) : false;

  return (
    <div 
      className={`group relative ${className} cursor-pointer`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-zinc-200 group-hover:opacity-75 relative">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={isNew}
          loading={isNew ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4="
        />

        {/* Out of stock badge */}
        {product.inStock === false && (
          <div className="absolute top-2 right-2 bg-zinc-800 text-rose-200 text-xs px-2 py-1 z-10">
            Out of stock
          </div>
        )}
        
        {/* New badge - show if product is new */}
        {isNew && (
          <div className="absolute top-2 left-2 bg-rose-600 text-white text-xs px-2 py-1 z-10">
            NEW
          </div>
        )}

        {/* Quick view and wishlist buttons */}
        <div className="absolute inset-0 flex items-end justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 px-4 pb-4 z-10">
          <button
            onClick={handleQuickView}
            className="bg-white border border-zinc-800 transition-colors duration-200 text-zinc-800 px-4 py-2 font-medium relative cursor-pointer flex-1 tracking-wide"
          >
            Quick View
          </button>
          <button
            onClick={handleAddToWishlist}
            className="bg-white border border-zinc-800 transition-colors duration-200 text-zinc-800 px-2.5 py-2.5 font-medium relative cursor-pointer"
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

      <div className="mt-4">
        <h3 className="text-zinc-700 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-zinc-500 mt-1">
          {product.collection.name}
        </p>
        <p className="font-medium text-zinc-900 mt-1">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
