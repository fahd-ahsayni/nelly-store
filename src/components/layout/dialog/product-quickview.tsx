"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { ProductFull } from "@/types/database";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon as HeartOutlineIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProductQuickviewProps {
  product: ProductFull | null;
  open: boolean;
  onClose: () => void;
  translations: any;
  locale: string;
}

export default function ProductQuickview({
  product,
  open,
  onClose,
  translations,
  locale,
}: ProductQuickviewProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Create default color and size options based on database structure
  const colors =
    product?.product_colors?.map((pc) => ({
      id: pc.colors.id,
      name: pc.colors.name,
      hex: pc.colors.hex,
      selectedClass: pc.colors.selectedcolor,
    })) || [];

  const sizes =
    product?.sizes?.map((size, index) => ({
      id: `${product?.id || "default"}-size-${index}`,
      name: size,
      inStock: true,
    })) || [];

  const [selectedColor, setSelectedColor] = useState(colors[0] || null);
  const [selectedSize, setSelectedSize] = useState(
    sizes[2] || sizes[0] || null
  );

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      const newColors =
        product.product_colors?.map((pc) => ({
          id: pc.colors.id,
          name: pc.colors.name,
          hex: pc.colors.hex,
          selectedClass: pc.colors.selectedcolor,
        })) || [];

      const newSizes =
        product.sizes?.map((size, index) => ({
          id: `${product.id}-size-${index}`,
          name: size,
          inStock: true,
        })) || [];

      setSelectedColor(newColors[0] || null);
      setSelectedSize(newSizes[2] || newSizes[0] || null);
    }
  }, [product?.id]);

  // Reset selections when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedColor(colors[0] || null);
      setSelectedSize(sizes[2] || sizes[0] || null);
    }
  }, [open, colors, sizes]);

  const handleAddToBag = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    // Validation: Check if color is required and selected
    const hasColors = colors.length > 0;
    const hasSizes = sizes.length > 0;

    if (hasColors && !selectedColor) {
      toast.error(translations.productQuickview.selectColor);
      return;
    }

    if (hasSizes && !selectedSize) {
      toast.error(translations.productQuickview.selectSize);
      return;
    }

    addItem({
      id: `${product.id}-${selectedColor?.id || "no-color"}-${
        selectedSize?.name || "no-size"
      }`,
      name: product.name,
      price: product.price,
      image: product.image_urls?.[0] || product.imagesrc,
      color: selectedColor?.name,
      colorHex: selectedColor?.hex,
      size: selectedSize?.name,
    });
    toast.success(translations.productQuickview.addedToBag);

    // Reset selections after adding to bag
    setSelectedColor(colors[0] || null);
    setSelectedSize(sizes[2] || sizes[0] || null);

    // Optional: Close the quickview after adding to cart
    onClose();
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    const wishlistItem = {
      id: `${product.id}-${selectedColor?.id || "no-color"}-${
        selectedSize?.name || "no-size"
      }`,
      name: product.name,
      price: product.price,
      image: product.image_urls?.[0] || product.imagesrc,
      color: selectedColor?.name,
      colorHex: selectedColor?.hex,
      size: selectedSize?.name,
    };

    const currentlyInWishlist = isInWishlist(wishlistItem.id);
    toggleWishlist(wishlistItem);
    if (currentlyInWishlist) {
      toast.info(translations.productQuickview.removeFromWishlist);
    } else {
      toast.success(translations.productQuickview.addedToWishlist);
    }
  };

  const isItemInWishlist = product
    ? isInWishlist(
        `${product.id}-${selectedColor?.id || "no-color"}-${
          selectedSize?.name || "no-size"
        }`
      )
    : false;

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative z-50 flex w-full items-center overflow-hidden bg-gray-50 px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-500 sm:top-8 ltr:sm:right-6 rtl:sm:left-6 md:top-6 ltr:md:right-6 rtl:md:left-6 lg:top-8 ltr:lg:right-8 rtl:lg:left-8"
              >
                <span className="sr-only">
                  {translations.productQuickview.close}
                </span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="h-full w-full overflow-hidden sm:col-span-12 lg:col-span-5 relative">
                  {/* Floating Rating Badge */}
                  <Badge
                    color="white"
                    className="absolute top-4 ltr:right-4 rtl:left-4 z-10"
                  >
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-800">
                      {product.rating === null && product.rating < 4
                        ? 4.5
                        : product.rating}
                    </span>
                  </Badge>
                  <Image
                    alt={product.imagealt}
                    src={product.image_urls?.[0] || product.imagesrc}
                    width={300}
                    height={450}
                    priority
                    className="h-full w-full bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                  />
                </div>
                <div className="sm:col-span-12 lg:col-span-7 text-start">
                  <h2 className="text-2xl font-bold text-gray-900 ltr:sm:pr-12 rtl:sm:pl-12">
                    {product.name}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      {translations.productQuickview.productInformation}
                    </h3>

                    <p className="text-2xl text-gray-900">
                      {product.price} {translations.currency.mad}
                    </p>

                    {/* Benefits Section */}
                    <div className="mt-6 space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="group flex items-center gap-3 bg-sky-50 p-3 transition-all duration-200 border border-sky-300">
                          <div className="flex-shrink-0">
                            <BoltIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-blue-900">
                              {translations.productQuickview?.fastDelivery ||
                                "Fast Delivery"}
                            </p>
                            <p className="text-xs text-blue-700">
                              {translations.productQuickview
                                ?.fastDeliveryDesc || "2-5 working days"}
                            </p>
                          </div>
                        </div>

                        <div className="group flex items-center gap-3 bg-pink-50 p-3 transition-all duration-200 border border-pink-300">
                          <div className="flex-shrink-0">
                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-pink-600 group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-pink-900">
                              {translations.productQuickview?.support ||
                                "24/7 Support"}
                            </p>
                            <p className="text-xs text-pink-700">
                              {translations.productQuickview?.supportDesc ||
                                "Customer service"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-6">
                    <h3 id="options-heading" className="sr-only">
                      {translations.productQuickview.productOptions}
                    </h3>

                    <form onSubmit={handleAddToBag}>
                      {/* Error message */}
                      {/* Removed error display, toast will handle it */}

                      {/* Colors - Only show if colors exist */}
                      {colors.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3">
                            {translations.productQuickview.color}
                            <span className="text-red-500 ml-1">*</span>
                          </h3>
                          <div className="flex items-center flex-wrap gap-3">
                            {colors.map((color) => (
                              <button
                                key={color.id}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                className={cn(
                                  "relative w-11 h-11 rounded-full border-2 transition-all",
                                  selectedColor?.id === color.id
                                    ? "border-rose-600 ring-2 ring-rose-600 ring-offset-2"
                                    : "border-gray-300 hover:border-gray-400"
                                )}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              ></button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sizes - Only show if sizes exist */}
                      {sizes.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium text-gray-900 mb-3">
                            {translations.productQuickview.size}
                            <span className="text-red-500 ml-1">*</span>
                          </h3>
                          <div className="grid grid-cols-4 gap-2">
                            {sizes.map((size) => (
                              <button
                                key={size.id}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                disabled={!size.inStock}
                                className={cn(
                                  "px-3 py-4 font-medium border transition-colors",
                                  selectedSize?.id === size.id
                                    ? "bg-rose-600 text-white border-rose-600"
                                    : size.inStock
                                    ? "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                                    : "bg-gray-50 text-gray-200 border-gray-200 cursor-not-allowed"
                                )}
                              >
                                {size.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-x-3 mt-8">
                        <Button
                          color="rose"
                          type="submit"
                          className={cn(
                            "flex-1 !h-12 flex items-center justify-center font-semibold"
                          )}
                        >
                          {translations.productQuickview.addToBag}
                        </Button>

                        <div className="relative">
                          <Button
                            outline
                            type="button"
                            onClick={handleWishlistToggle}
                            className={cn(
                              "!h-12 !w-12 !p-0 flex items-center justify-center",
                              "transition-colors duration-200 ease-in-out bg-white",
                              "border-2",
                              isItemInWishlist
                                ? "!border-rose-500 !text-rose-600"
                                : ""
                            )}
                          >
                            {/* Heart icon with animation */}
                            {isItemInWishlist ? (
                              <HeartIcon className="!size-6 !text-rose-500" />
                            ) : (
                              <HeartOutlineIcon className="!size-6" />
                            )}
                          </Button>

                          {/* Tooltip */}
                          <div
                            className={cn(
                              "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2",
                              "px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap",
                              "opacity-0 pointer-events-none transition-opacity duration-200",
                              "hover:opacity-100"
                            )}
                          >
                            {isItemInWishlist
                              ? translations.productQuickview
                                  ?.removeFromWishlist || "Remove from wishlist"
                              : translations.productQuickview?.addToWishlist ||
                                "Add to wishlist"}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
