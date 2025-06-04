"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import type { ProductFull } from "@/types/database";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

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
  const [error, setError] = useState<string>("");

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
      id: `${product.id}-size-${index}`,
      name: size,
      inStock: true,
    })) || [];

  const [selectedColor, setSelectedColor] = useState(colors[0] || null);
  const [selectedSize, setSelectedSize] = useState(
    sizes[2] || sizes[0] || null
  );

  const handleAddToBag = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!product) return;

    // Validation: Check if color is required and selected
    const hasColors = colors.length > 0;
    const hasSizes = sizes.length > 0;

    if (hasColors && !selectedColor) {
      setError(translations.productQuickview.selectColor);
      return;
    }

    if (hasSizes && !selectedSize) {
      setError(translations.productQuickview.selectSize);
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

    // Optional: Close the quickview after adding to cart
    onClose();
  };

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
                <Image
                  alt={product.imagealt}
                  src={product.image_urls?.[0] || product.imagesrc}
                  width={300}
                  height={450}
                  priority
                  className="aspect-2/3 w-full bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7 text-start">
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

                    {/* Reviews */}
                    <div className="mt-6">
                      <h4 className="sr-only">
                        {translations.productQuickview.reviews}
                      </h4>
                      <div className="flex items-center gap-x-1">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={cn(
                                product.rating > rating
                                  ? "text-yellow-400"
                                  : "text-gray-200",
                                "size-5 shrink-0"
                              )}
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {product.rating}{" "}
                          {translations.productQuickview.outOfStars}
                        </p>
                        <Badge
                          color="yellow"
                          className="border border-yellow-400"
                        >
                          {product.rating}{" "}
                          {translations.productQuickview.reviews}
                        </Badge>
                      </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="mt-6 space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="group flex items-center gap-3 bg-green-50 border border-green-300 p-3 transition-all duration-200">
                          <div className="flex-shrink-0">
                            <TruckIcon className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-green-900">
                              {translations.productQuickview?.freeShipping ||
                                "Free Shipping"}
                            </p>
                            <p className="text-xs text-green-700">
                              {translations.productQuickview
                                ?.freeShippingDesc || "On orders over 500 MAD"}
                            </p>
                          </div>
                        </div>

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
                      {error && (
                        <div className="ltr:border-l-4 rtl:border-r-4 border-yellow-600 bg-yellow-50 p-4 mb-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <ExclamationTriangleIcon
                                className="h-5 w-5 text-yellow-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3">
                              <p className="text-sm text-yellow-700">{error}</p>
                            </div>
                          </div>
                        </div>
                      )}

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

                      <div>
                        <Button
                          color="rose"
                          type="submit"
                          className={cn(
                            "mt-8 w-full !h-12 flexi items-center justify-center"
                          )}
                        >
                          {translations.productQuickview.addToBag}
                        </Button>
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
