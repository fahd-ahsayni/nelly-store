"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scrollarea";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { Heading } from "../../ui/heading";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  translations: any;
}

export default function WishlistDrawer({ 
  open, 
  onClose, 
  translations 
}: WishlistDrawerProps) {
  const { addItem } = useCart();
  const { isHydrated } = useWishlist();
  const [mounted, setMounted] = useState(false);
  const [isMovingToCart, setIsMovingToCart] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    if (!isHydrated) {
      useWishlistStore.persist.rehydrate();
    }
  }, [isHydrated]);

  const items = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const getTotalItems = useWishlistStore((state) => state.getTotalItems);

  // Show loading state until mounted and hydrated
  if (!mounted || !isHydrated) {
    return (
      <Dialog open={open} onClose={onClose} className="relative z-40">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className={cn(
              "relative flex w-full max-w-lg flex-col bg-gray-50 shadow-xl transition duration-300 ease-in-out h-full",
              "ltr:ml-auto ltr:data-closed:translate-x-full rtl:mr-auto rtl:data-closed:-translate-x-full"
            )}
          >
            <div className="flex items-center justify-center flex-1">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    );
  }

  const totalItems = getTotalItems();

  const handleMoveToCart = async (item: any) => {
    setIsMovingToCart(item.id);
    try {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
        colorHex: item.colorHex,
        size: item.size,
      });
      removeFromWishlist(item.id);
    } finally {
      setIsMovingToCart(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-40">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          data-lenis-prevent
          className={cn(
            "relative flex w-full max-w-lg flex-col bg-gray-50 shadow-xl transition duration-300 ease-in-out h-full",
            "ltr:ml-auto ltr:data-closed:translate-x-full rtl:mr-auto rtl:data-closed:-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <Heading className="text-xl font-semibold text-gray-900">
              {translations.navigation.favorites}{" "}
              <Badge color="rose">
                {totalItems}{" "}
                {totalItems === 1
                  ? translations.cart.item
                  : translations.cart.items}
              </Badge>
            </Heading>
            <button
              type="button"
              onClick={onClose}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{translations.navigation.closeMenu}</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <HeartIcon className="w-10 h-10 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">
                  Your wishlist is empty
                </h3>
                <p className="text-sm text-gray-500">
                  Add items you love to save them for later
                </p>
              </div>
            </div>
          ) : (
            <ScrollArea className="flex-1 px-6 h-0" data-lenis-prevent>
              <div className="space-y-4 pb-20">
                {items.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex gap-4 p-4 bg-white border border-gray-100 transition-all duration-200">
                      <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover h-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-gray-900 truncate text-sm">
                              {item.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {item.size && (
                                <Badge className="text-xs text-gray-500 !bg-gray-100 px-2 py-1 !rounded-none">
                                  {translations.cart.size}: {item.size}
                                </Badge>
                              )}
                              {item.color && (
                                <Badge className="flex items-center gap-1 text-xs text-gray-500 !bg-gray-100 px-2 py-1 !rounded-none">
                                  <span>{translations.cart.color}:</span>
                                  <div className="flex items-center gap-1">
                                    {item.colorHex && (
                                      <div
                                        className="w-3 h-3 rounded-full border border-gray-300"
                                        style={{
                                          backgroundColor: item.colorHex,
                                        }}
                                      />
                                    )}
                                  </div>
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            plain
                            onClick={() => removeFromWishlist(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-gray-900">
                            {item.price.toFixed(2)} {translations.currency.mad}
                          </div>
                          <Button
                            color="rose"
                            onClick={() => handleMoveToCart(item)}
                            disabled={isMovingToCart === item.id}
                            className="text-xs px-3 py-1.5 h-auto"
                          >
                            {isMovingToCart === item.id ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            ) : (
                              translations.cart.addToBag || "Add to Cart"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
