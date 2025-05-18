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
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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
    successMessage,
    isInWishlist,
    handleAddToCart,
    handleAddToWishlist,
    carouselImages,
    displayProduct,
  } = useProductQuickview({ product, open, setOpen });

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
                      <div className="relative w-full flex-grow flex">
                        <CarouselMainContainer className="w-full flex-grow">
                          {carouselImages.map((image, idx) => (
                            <SliderMainItem
                              key={idx}
                              className="border-none flex items-center justify-center rounded-md p-0"
                            >
                              <div className="relative h-full w-full">
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                            </SliderMainItem>
                          ))}
                        </CarouselMainContainer>
                      </div>

                      {carouselImages.length > 1 && (
                      <CarouselThumbsContainer className="flex-shrink-0 h-16 pb-0">
                          {carouselImages.map((image, idx) => (
                            <SliderThumbItem
                              key={idx}
                              index={idx}
                              className="bg-transparent basis-1/4"
                            >
                              <div className="overflow-hidden h-full w-full cursor-pointer">
                                <img
                                  src={image.src}
                                  alt={`Thumbnail ${idx + 1}`}
                                  className="h-full w-full object-cover object-center"
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
                  <h2 className="text-xl sm:text-2xl text-zinc-900 sm:pr-12 tracking-tight line-clamp-2 font-medium">
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
                    <p className="text-lg sm:text-xl font-medium text-zinc-900 mt-1">
                      ${displayProduct.price.toFixed(2)}
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
                        <p className="ml-2 -mb-1 text-xs sm:text-sm text-zinc-700">
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
                        <p className="text-xs sm:text-sm text-zinc-700">
                          {displayProduct.stockLevel ||
                            (displayProduct.inStock
                              ? "In stock"
                              : "Out of stock")}
                        </p>
                      </div>

                      <div className="flex items-center text-xs sm:text-sm text-zinc-700">
                        <TruckIcon
                          className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-zinc-500"
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
                              <legend className="block text-sm font-medium text-zinc-900 mb-2">
                                Color:{" "}
                                <span className="text-rose-500 ml-1">
                                  {selectedColor.name}
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
                              <legend className="block text-sm font-medium text-zinc-900">
                                Size:{" "}
                                <span className="text-rose-600 ml-1">
                                  {selectedSize.name}
                                </span>
                              </legend>
                            </div>

                            <RadioGroup
                              value={selectedSize}
                              onChange={setSelectedSize}
                              className="flex items-center gap-1 sm:gap-2"
                            >
                              {/* Always show standard sizes */}
                              {STANDARD_SIZES.map((size) => {
                                // Check if this size exists in product sizes
                                const productSize = displayProduct.sizes.find(
                                  (s) => s.name === size
                                );
                                const exists = !!productSize;

                                if (!exists) return null;

                                return (
                                  <Radio
                                    key={size}
                                    value={
                                      productSize || {
                                        name: size,
                                        inStock: false,
                                      }
                                    }
                                    disabled={
                                      !exists ||
                                      (exists && !productSize.inStock)
                                    }
                                    className={cn(
                                      "relative flex w-12 h-12 items-center justify-center rounded-none text-xs sm:text-sm font-medium uppercase focus:outline-none transition-colors",
                                      exists && productSize.inStock
                                        ? "cursor-pointer bg-white"
                                        : "cursor-not-allowed bg-zinc-50 text-zinc-300",
                                      exists &&
                                        productSize === selectedSize &&
                                        productSize.inStock
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
                          <h3 className="text-sm font-medium mb-2">Quantity</h3>
                          <div className="flex items-center border border-zinc-800 bg-white w-fit">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 sm:h-10 sm:w-10"
                              onClick={decreaseQuantity}
                              disabled={quantity <= 1}
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 sm:w-10 text-center text-sm sm:text-base">
                              {quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 sm:h-10 sm:w-10"
                              onClick={increaseQuantity}
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons - stacked on mobile, side by side on larger screens */}
                      <div className="mt-4 flex gap-3">
                        <button
                          type="submit"
                          disabled={!displayProduct.inStock || addingToCart}
                          className="flex flex-1 items-center justify-center border border-transparent bg-zinc-800 px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-rose-200 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          {addingToCart ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                              Adding...
                            </span>
                          ) : !displayProduct.inStock ? (
                            "Out of Stock"
                          ) : (
                            <>
                              <ShoppingBagIcon
                                className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
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
                            disabled={addingToWishlist}
                            className="flex w-full bg-white items-center justify-center border px-3 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none disabled:opacity-70 transition-colors"
                            aria-label={
                              isInWishlist
                                ? "In your wishlist"
                                : "Add to wishlist"
                            }
                          >
                            <HeartIcon
                              className={`h-4 w-4 sm:h-5 sm:w-5 ${
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

      {/* Success message toast */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-md shadow-lg z-[9999]"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
