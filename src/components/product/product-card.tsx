"use client";

import { useWishlistStore } from "@/stores/wishlistStore";
import { Product } from "@/types";
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
  // Replace Context API with Zustand store
  const { addToWishlist, isItemInWishlist } = useWishlistStore();

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
        if (e.key === "Enter" || e.key === " ") {
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
      </div>

      <div className="mt-4">
        <h3 className="line-clamp-1 font-medium">{product.name}</h3>
        <p className="text-zinc-600 mt-1">{product.collection.name}</p>
        <p className="font-medium text-zinc-900 mt-1">
          {product.price.toFixed(2)} Dhs
        </p>
      </div>
    </div>
  );
}
