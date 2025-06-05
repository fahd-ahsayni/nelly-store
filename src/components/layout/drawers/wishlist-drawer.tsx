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
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Heading } from "../../ui/heading";
import ProductQuickview from "../dialog/product-quickview";
import { useStore } from "@/store/useStore";
import type { ProductFull } from "@/types/database";
import { toast } from 'react-toastify';

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
  const params = useParams();
  const locale = params?.locale as string || "en";
  
  const { isHydrated } = useWishlist();
  const [mounted, setMounted] = useState(false);
  const [quickviewProduct, setQuickviewProduct] = useState<ProductFull | null>(null);
  const [isQuickviewOpen, setIsQuickviewOpen] = useState(false);

  // Get products from store and ensure store is loaded
  const fetchAllData = useStore((state) => state.fetchAllData);
  const getProductsFull = useStore((state) => state.getProductsFull);
  const products = getProductsFull();

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    if (!isHydrated) {
      useWishlistStore.persist.rehydrate();
    }
  }, [isHydrated]);

  // Ensure store data is loaded
  useEffect(() => {
    if (mounted && products.length === 0) {
      fetchAllData();
    }
  }, [mounted, products.length, fetchAllData]);

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

  const handleOpenQuickview = (item: any) => {
    // Validate item first
    if (!item || !item.id || !item.name) {
      toast.error(translations?.errors?.invalidItem);
      // Remove invalid item from wishlist
      if (item && item.id) {
        removeFromWishlist(item.id);
      }
      return;
    }
    
    // Try different methods to find the product
    let product = null;
    
    // Method 1: Try exact ID match first
    product = products.find(p => p.id === item.id);
    
    // Method 2: If no exact match, try extracting base product ID
    if (!product) {
      const baseProductId = item.id.split('-')[0];
      product = products.find(p => p.id === baseProductId);
    }
    
    // Method 3: Try matching by name as fallback
    if (!product) {
      product = products.find(p => p.name === item.name);
    }
    
    // Method 4: Try matching by slug if it exists
    if (!product && item.slug) {
      product = products.find(p => p.slug === item.slug);
    }
    
    if (product) {
      onClose(); // Close the drawer first
      setQuickviewProduct(product);
      setIsQuickviewOpen(true);
    } else {
      toast.error(translations?.errors?.productNotFound);
      removeFromWishlist(item.id);
    }
  };

  const handleCloseQuickview = () => {
    setIsQuickviewOpen(false);
    setQuickviewProduct(null);
  };

  return (
    <>
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
              "relative flex w-full max-w-sm sm:max-w-md md:max-w-lg flex-col bg-gray-50 shadow-xl transition duration-300 ease-in-out h-full",
              "ltr:ml-auto ltr:data-closed:translate-x-full rtl:mr-auto rtl:data-closed:-translate-x-full"
            )}
          >
            <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
              <Heading className="text-lg sm:text-xl font-semibold text-gray-900">
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
              <ScrollArea className="flex-1 px-4 sm:px-6 h-0" data-lenis-prevent>
                <div className="space-y-3 sm:space-y-4 pb-20">
                  {items
                    .filter(item => item && item.id && item.name) // Filter out invalid items
                    .map((item) => (
                    <div key={item.id} className="group">
                      <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white border shadow-xs border-gray-200 transition-all duration-200 rounded-md">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 overflow-hidden flex-shrink-0 rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name || "Product"}
                            fill
                            sizes="(max-width: 640px) 64px, (min-width: 641px) 80px"
                            quality={80}
                            loading="lazy"
                            decoding="async"
                            className="object-cover h-full"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium text-gray-900 truncate line-clamp-1 text-sm leading-tight">
                                {item.name}
                              </h3>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                                {item.size && (
                                  <Badge className="text-xs text-gray-500 !bg-gray-100 px-1.5 py-0.5 !rounded-sm">
                                    {translations.cart.size}: {item.size}
                                  </Badge>
                                )}
                                {item.color && (
                                  <Badge className="flex items-center gap-1 text-xs text-gray-500 !bg-gray-100 px-1.5 py-0.5 !rounded-sm">
                                    <span>{translations.cart.color}:</span>
                                    <div className="flex items-center gap-1">
                                      {item.colorHex && (
                                        <div
                                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-gray-300"
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
                              className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity h-6 w-6 sm:h-8 sm:w-8 p-0 text-gray-400 hover:text-red-500"
                            >
                              <TrashIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">
                              {typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'} {translations.currency.mad}
                            </div>
                            <Button
                              color="rose"
                              onClick={() => handleOpenQuickview(item)}
                              className="text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 h-auto"
                            >
                              {translations.cart.addToBag}
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

      {/* Product Quickview Dialog */}
      {quickviewProduct && (
        <ProductQuickview
          product={quickviewProduct}
          open={isQuickviewOpen}
          onClose={handleCloseQuickview}
          translations={translations}
          locale={locale}
        />
      )}
    </>
  );
}
