"use client";

import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/extension/carousel-extention";
import { Button } from "@/components/ui/button";
import { useProductQuickview } from "@/hooks/use-product-quickview";
import { cn } from "@/lib/utils";
import { Product, STANDARD_SIZES } from "@/types";
import { Dialog, DialogPanel, Radio, RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  HeartIcon,
  ShoppingBagIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Spinner } from "../ui/spinner";

type ProductQuickviewProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product?: Product;
};

export default function ProductQuickview({
  open,
  setOpen,
  product,
}: ProductQuickviewProps) {
  // Use the custom hook to handle all logic
  const {
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    addingToCart,
    addingToWishlist,
    isInWishlist,
    handleAddToCart,
    handleAddToWishlist,
    carouselImages,
    displayProduct,
  } = useProductQuickview({ product, open, setOpen });

  const canAddToCartOrWishlist = selectedColor && selectedSize;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-[9999]"
    >
      {/* Improved overlay for accessibility */}
      <div
        className="fixed inset-0 bg-zinc-500/75 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        {/* Ensure full width on mobile by removing padding on small screens */}
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <span className="hidden md:inline-block md:h-screen md:align-middle">
            &#8203;
          </span>

          {/* Make DialogPanel full width on mobile */}
          <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
            {/* Improved mobile responsiveness with better padding on small screens */}
            <div className="relative flex w-full items-center overflow-hidden bg-white bg-gradient-to-b from-rose-50/70 to-rose-50/50 px-2 pt-14 pb-6 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8 z-10"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-4 gap-y-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                {/* Image section - adjusted for better display on mobile */}
                <div className="relative sm:col-span-4 lg:col-span-5">
                  <div className="w-full relative">
                    {!displayProduct.inStock && (
                      <div className="absolute top-4 right-4 bg-zinc-800 text-rose-200 text-xs px-2 py-1 z-10">
                        Out of stock
                      </div>
                    )}

                    <Carousel className="h-full flex flex-col">
                      <div className="relative w-full flex-grow flex flex-1">
                        <CarouselMainContainer className="w-full flex-grow">
                          {carouselImages.map((image, idx) => (
                            <SliderMainItem
                              key={idx}
                              className="border-none flex items-center justify-center rounded-md p-0"
                            >
                              <div className="relative h-full w-full">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  width={500}
                                  height={500}
                                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                  className="h-full w-full object-cover object-center"
                                  priority={idx === 0}
                                  loading={idx === 0 ? "eager" : "lazy"}
                                  placeholder="blur"
                                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4="
                                />
                              </div>
                            </SliderMainItem>
                          ))}
                        </CarouselMainContainer>
                      </div>

                      {carouselImages.length > 1 && (
                        <CarouselThumbsContainer className="flex-shrink-0 h-20 pb-0">
                          {carouselImages.map((image, idx) => (
                            <SliderThumbItem
                              key={idx}
                              index={idx}
                              className="bg-transparent basis-1/4"
                            >
                              <div className="overflow-hidden h-full w-full cursor-pointer">
                                <Image
                                  src={image.src}
                                  alt={`Thumbnail ${idx + 1}`}
                                  width={100}
                                  height={100}
                                  className="h-full w-full object-cover object-center"
                                  loading="lazy"
                                  sizes="96px"
                                  placeholder="blur"
                                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4="
                                />
                              </div>
                            </SliderThumbItem>
                          ))}
                        </CarouselThumbsContainer>
                      )}
                    </Carousel>
                  </div>
                </div>

                {/* Product details section - adjusted for better mobile spacing */}
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl text-zinc-900 sm:pr-12 tracking-tight line-clamp-2 font-medium">
                    {displayProduct.name}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2 sm:mt-3"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    {/* Price section */}
                    <p className="text-xl font-medium text-zinc-900 mt-1">
                      {displayProduct.price.toFixed(2)} Dhs
                    </p>

                    {/* Reviews */}
                    <div className="mt-2">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={cn(
                                displayProduct.rating > rating
                                  ? "text-yellow-400"
                                  : "text-zinc-200",
                                "h-4 w-4 sm:h-5 sm:w-5 shrink-0"
                              )}
                            />
                          ))}
                        </div>
                        <p className="ml-2 -mb-1 text-zinc-700">
                          <span className="font-medium">
                            {displayProduct.rating}
                          </span>
                          <span className="sr-only"> out of 5 stars</span>
                        </p>
                      </div>
                    </div>

                    {/* Availability & Shipping */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-2 w-2 rounded-full ${
                            displayProduct.inStock
                              ? "bg-green-500"
                              : "bg-red-500"
                          } mr-2`}
                        ></div>
                        <p className="text-zinc-700">
                          {displayProduct.inStock ? "In stock" : "Out of stock"}
                        </p>
                      </div>

                      <div className="flex items-center text-zinc-700">
                        <TruckIcon
                          className="h-4 w-4 mr-2 text-zinc-500"
                          aria-hidden="true"
                        />
                        Fast shipping available
                      </div>
                    </div>
                  </section>

                  <section
                    aria-labelledby="options-heading"
                    className="mt-4 sm:mt-6"
                  >
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form
                      onSubmit={handleAddToCart}
                      className="space-y-4 sm:space-y-6"
                    >
                      {/* Options grid */}
                      <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {/* Color picker */}
                        {displayProduct.colors.length > 0 && (
                          <div className="sm:col-span-1">
                            <fieldset aria-label="Choose a color">
                              <legend className="block font-medium text-zinc-900 mb-2 tracking-wider">
                                Color:{" "}
                                <span className="text-rose-500 ml-1">
                                  {selectedColor
                                    ? selectedColor.name
                                    : "Select Color"}
                                </span>
                              </legend>
                              <RadioGroup
                                value={selectedColor}
                                onChange={setSelectedColor}
                                className="flex flex-wrap items-center gap-3 sm:gap-4"
                              >
                                {displayProduct.colors.map((color) => (
                                  <Radio
                                    key={color.name}
                                    value={color}
                                    aria-label={color.name}
                                    className={cn(
                                      "relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none",
                                      color === selectedColor
                                        ? "ring-2 ring-rose-500 ring-offset-2"
                                        : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-1"
                                    )}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="h-6 w-6 rounded-full border border-black/10"
                                      style={{ backgroundColor: color.hex }}
                                    />
                                  </Radio>
                                ))}
                              </RadioGroup>
                            </fieldset>
                          </div>
                        )}

                        {/* Size picker - updated to show all standard sizes */}
                        <div className="sm:col-span-2">
                          <fieldset aria-label="Choose a size">
                            <div className="flex items-center justify-between mb-2">
                              <legend className="block font-medium text-zinc-900 mb-2 tracking-wider">
                                Size:{" "}
                                <span className="text-rose-600 ml-1">
                                  {selectedSize || "Select Size"}
                                </span>
                              </legend>
                            </div>

                            <RadioGroup
                              value={selectedSize}
                              onChange={setSelectedSize}
                              className="flex items-center gap-1 sm:gap-2"
                            >
                              {/* Filter standard sizes to only show those available in product */}
                              {STANDARD_SIZES.map((size) => {
                                // Check if this size exists in product sizes
                                const exists =
                                  displayProduct.sizes.includes(size);

                                if (!exists) return null;

                                return (
                                  <Radio
                                    key={size}
                                    value={size}
                                    disabled={!exists}
                                    className={cn(
                                      "relative flex w-12 h-12 items-center justify-center rounded-none text-xs sm:text-sm font-medium uppercase focus:outline-none transition-colors",
                                      exists
                                        ? "cursor-pointer bg-white"
                                        : "cursor-not-allowed bg-zinc-50 text-zinc-300",
                                      exists && size === selectedSize
                                        ? "bg-zinc-800 text-rose-200"
                                        : "border border-zinc-800 text-zinc-700 hover:bg-zinc-50"
                                    )}
                                  >
                                    {size}
                                  </Radio>
                                );
                              })}
                            </RadioGroup>
                          </fieldset>
                        </div>

                        {/* Quantity selector - responsive adjustment */}
                        <div className="sm:col-span-2">
                          <h3 className="block font-medium text-zinc-900 mb-2 tracking-wider">
                            Quantity
                          </h3>
                          <div className="flex items-center border border-zinc-800 bg-white w-fit">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10"
                              onClick={decreaseQuantity}
                              disabled={quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-10 text-center">{quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10"
                              onClick={increaseQuantity}
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons - stacked on mobile, side by side on larger screens */}
                      <div className="mt-4 flex gap-3">
                        <button
                          type="submit"
                          disabled={
                            !displayProduct.inStock ||
                            addingToCart ||
                            !canAddToCartOrWishlist
                          }
                          className="flex flex-1 items-center justify-center border border-transparent bg-zinc-800 px-6 py-2.5 sm:py-3 font-medium text-rose-200 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          {addingToCart ? (
                            <Spinner />
                          ) : !displayProduct.inStock ? (
                            "Out of Stock"
                          ) : !canAddToCartOrWishlist ? (
                            "Select Color & Size"
                          ) : (
                            <>
                              <ShoppingBagIcon
                                className="h-5 w-5 mr-2"
                                aria-hidden="true"
                              />
                              Add to Cart
                            </>
                          )}
                        </button>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleAddToWishlist}
                            disabled={addingToWishlist || !canAddToCartOrWishlist}
                            className="flex aspect-square bg-white items-center justify-center border h-12 w-12 text-sm sm:text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                            aria-label={
                              isInWishlist
                                ? "In your wishlist"
                                : "Add to wishlist"
                            }
                          >
                            <HeartIcon
                              className={`h-5 w-5 sm:h-6 sm:w-6 ${
                                isInWishlist
                                  ? "text-pink-600 fill-pink-600"
                                  : ""
                              }`}
                              aria-hidden="true"
                            />
                          </button>
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
