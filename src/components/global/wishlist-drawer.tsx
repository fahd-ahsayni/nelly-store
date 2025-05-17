"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useWishlistDrawer } from "@/context/wishlist-drawer-context";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WishlistCard from "./wishlist-card";

export default function WishlistDrawer() {
  const { isOpen, closeWishlist, wishlistItems } = useWishlistDrawer();

  return (
    <Dialog open={isOpen} onClose={closeWishlist} className="relative z-[99]">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg text-zinc-900">
                      My Wishlist
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={closeWishlist}
                        className="relative rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:outline-hidden"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
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
                      <button
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                        onClick={closeWishlist}
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
