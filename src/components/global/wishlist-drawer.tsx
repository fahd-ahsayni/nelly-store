"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWishlistDrawerState, useWishlistItems, useWishlistStore } from "@/stores/wishlistStore";
import WishlistCard from "./wishlist-card";

export default function WishlistDrawer() {
  const isOpen = useWishlistDrawerState();
  const wishlistItems = useWishlistItems();
  const { closeWishlist } = useWishlistStore();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeWishlist();
      }}
    >
      <SheetContent
        side="right"
        className="bg-white"
        maxWidth="min-w-[95vw] lg:min-w-auto lg:max-w-sm"
      >
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle className="text-lg">My Wishlist</SheetTitle>
          </SheetHeader>

          <ScrollArea className="relative flex-1 px-4 sm:px-6 mt-6">
            {wishlistItems.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-zinc-500">
                  {wishlistItems.length}{" "}
                  {wishlistItems.length === 1 ? "item" : "items"}
                </p>
                <div className="divide-y divide-zinc-200">
                  {wishlistItems.map((item) => (
                    <WishlistCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <p className="text-center text-zinc-500 mt-4">
                  Your wishlist is empty
                </p>
                <SheetClose className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                  Continue Shopping
                </SheetClose>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
