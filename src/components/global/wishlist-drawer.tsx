"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sheet,
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetClose 
} from "@/components/ui/sheet";
import { useWishlistDrawer } from "@/context/wishlist-drawer-context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WishlistCard from "./wishlist-card";

export default function WishlistDrawer() {
  const { isOpen, closeWishlist, wishlistItems } = useWishlistDrawer();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) closeWishlist();
    }}>
      <SheetContent side="right" className="w-full max-w-md p-0 border-l border-zinc-200">
        <div className="flex h-full flex-col bg-white py-6 shadow-xl">
          <div className="px-4 sm:px-6">
            <SheetHeader>
              <div className="flex items-start justify-between">
                <SheetTitle className="text-lg text-zinc-900">
                  My Wishlist
                </SheetTitle>
                <SheetClose className="rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:outline-hidden">
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </SheetClose>
              </div>
            </SheetHeader>
          </div>
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
                <SheetClose
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
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
