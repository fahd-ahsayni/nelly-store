"use client";

import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { WishlistItem } from "@/types";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface WishlistItemWithDetails extends WishlistItem {
  colorName?: string;
  colorHex?: string;
  size?: string;
}

interface WishlistCardProps {
  item: WishlistItemWithDetails;
}

export default function WishlistCard({ item }: WishlistCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleRemoveFromWishlist = async () => {
    setIsRemoving(true);
    try {
      // Small delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));
      removeFromWishlist(item.id);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // Small delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Add to cart with default color and size
      addToCart({
        id: uuidv4(),
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        color: item.colorName || "Default", // Use stored color or fallback
        colorHex: item.colorHex || "#000000", // Use stored color hex or fallback
        size: item.size || "M", // Use stored size or fallback
      });

      toast("Added to cart!");

      // Optionally remove from wishlist after adding to cart
      // removeFromWishlist(item.id)
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      className="py-4 flex items-start group relative"
      data-testid={`wishlist-item-${item.id}`}
    >
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-zinc-200 relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 96px, 96px"
          className="object-cover object-center"
          // Fallback image on error
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.jpg";
          }}
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between">
            <h3 className="text-sm pr-4">
              <Link href={`/products/${item.slug}`}>{item.name}</Link>
            </h3>
          </div>
          <p className="mt-1 text-sm font-medium">
            {item.price.toFixed(2)} Dhs
          </p>
        </div>

        <div className="flex-1 flex items-end justify-between mt-4">
          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart || !item.inStock}
            aria-label={`Add ${item.name} to cart`}
          >
            {isAddingToCart ? (
              <span className="flex items-center">
                <Spinner size="small" />
              </span>
            ) : (
              <>
                <ShoppingBagIcon
                  className="w-4 h-4 mr-1.5"
                  aria-hidden="true"
                />
                {!item.inStock ? "Out of Stock" : "Add to Cart"}
              </>
            )}
          </Button>
        </div>
      </div>

      <button
        type="button"
        className="absolute top-4 right-0 transition-opacity text-zinc-400 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md"
        onClick={handleRemoveFromWishlist}
        disabled={isRemoving}
        aria-label={`Remove ${item.name} from wishlist`}
      >
        {isRemoving ? (
          <svg
            className="animate-spin h-5 w-5 text-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
