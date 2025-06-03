"use client";

import { styles } from "@/constants";
import { cn } from "@/lib/utils";
import type { ProductFull } from "@/types/database";
import { useCart } from "@/hooks/useCart";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Radio,
    RadioGroup,
} from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
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
            <div className="relative z-50 flex w-full items-center overflow-hidden bg-rose-50 px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
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
                      <div className="flex items-center">
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
                        <a
                          href="#"
                          className="ml-3 text-sm font-medium text-rose-600 hover:text-rose-500"
                        >
                          {Math.floor(product.rating * 20)}{" "}
                          {translations.productQuickview.reviews}
                        </a>
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                      {translations.productQuickview.productOptions}
                    </h3>

                    <form onSubmit={handleAddToBag}>
                      {/* Error message */}
                      {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}

                      {/* Colors - Only show if colors exist */}
                      {colors.length > 0 && (
                        <fieldset
                          aria-label={translations.productQuickview.chooseColor}
                        >
                          <legend className="text-sm font-medium text-gray-900">
                            {translations.productQuickview.color}
                            <span className="text-red-500 ml-1">*</span>
                          </legend>

                          <RadioGroup
                            value={selectedColor}
                            onChange={setSelectedColor}
                            className="mt-4 flex items-center gap-x-3"
                          >
                            {colors.map((color) => (
                              <Radio
                                key={color.id}
                                value={color}
                                aria-label={color.name}
                                className={cn(
                                  color.selectedClass,
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  style={{ backgroundColor: color.hex }}
                                  className="size-8 rounded-full border border-black/10"
                                />
                              </Radio>
                            ))}
                          </RadioGroup>
                        </fieldset>
                      )}

                      {/* Sizes - Only show if sizes exist */}
                      {sizes.length > 0 && (
                        <fieldset
                          aria-label={translations.productQuickview.chooseSize}
                          className="mt-10"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                              {translations.productQuickview.size}
                              <span className="text-red-500 ml-1">*</span>
                            </div>
                          </div>

                          <RadioGroup
                            value={selectedSize}
                            onChange={setSelectedSize}
                            className="mt-4 grid grid-cols-4 gap-4"
                          >
                            {sizes.map((size) => (
                              <Radio
                                key={size.id}
                                value={size}
                                disabled={!size.inStock}
                                className={cn(
                                  size.inStock
                                    ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  "group relative flex items-center justify-center border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-rose-500 sm:flex-1"
                                )}
                              >
                                <span>{size.name}</span>
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px border-2 border-transparent group-data-checked:border-rose-500 group-data-focus:border"
                                />
                              </Radio>
                            ))}
                          </RadioGroup>
                        </fieldset>
                      )}

                      <button
                        type="submit"
                        className={cn(styles.primaryButton, "mt-8")}
                      >
                        {translations.productQuickview.addToBag}
                      </button>
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
