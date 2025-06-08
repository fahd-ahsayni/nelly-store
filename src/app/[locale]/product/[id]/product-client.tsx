"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductFull } from "@/types/database";
import { Radio, RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { BoltIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

interface ProductClientProps {
  product: ProductFull;
}

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export default function ProductClient({ product }: ProductClientProps) {
  // Initialize selected options with better defaults
  const initialColor = useMemo(
    () => product.product_colors?.[0] || null,
    [product.product_colors]
  );

  const initialSize = useMemo(() => {
    if (!product.sizes?.length) return null;
    // Prefer middle size if available, otherwise first
    const middleIndex = Math.floor(product.sizes.length / 2);
    return product.sizes[middleIndex];
  }, [product.sizes]);

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);

  // Memoize computed values
  const displayImages = useMemo(() => {
    const images = [product.imagesrc, ...(product.image_urls || [])].filter(
      Boolean
    );

    return images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  }, [product.imagesrc, product.image_urls]);

  const hasColors = product.product_colors && product.product_colors.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;

  const handleAddToBag = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", {
      product: product.id,
      color: selectedColor?.id,
      size: selectedSize,
    });
  };

  return (
    <section>
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:right-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Image gallery */}
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <img
          alt={product.imagealt || product.name}
          src={displayImages[0]}
          className="hidden aspect-3/4 size-full shadow-xl shadow-rose-300/30 object-cover lg:block"
          loading="eager"
        />
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <img
            alt={product.imagealt || product.name}
            src={displayImages[1] || displayImages[0]}
            className="aspect-3/2 size-full shadow-xl shadow-rose-300/30 object-cover"
            loading="lazy"
          />
          <img
            alt={product.imagealt || product.name}
            src={displayImages[2] || displayImages[0]}
            className="aspect-3/2 size-full shadow-xl shadow-rose-300/30 object-cover"
            loading="lazy"
          />
        </div>
        <img
          alt={product.imagealt || product.name}
          src={displayImages[3] || displayImages[0]}
          className="aspect-4/5 size-full object-cover sm:shadow-xl shadow-rose-300/30 lg:aspect-3/4"
          loading="lazy"
        />
      </div>

      {/* Product info */}
      <div className="px-4 max-w-2xl lg:max-w-7xl mx-auto sm:px-6 lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8">
        <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
          {/* Description and details */}
          <div>
            <h2 className="sr-only">الوصف</h2>
            <div className="prose prose-gray max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description || "لا يوجد وصف متاح",
                }}
              />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-10">
          <h2 className="sr-only">معلومات المنتج</h2>
          <div>
            <p className="text-3xl tracking-tight text-gray-900">
              {product.price.toFixed(2)} درهم فقط
            </p>
            <p className="text-xl tracking-tight text-gray-400 line-through">
              {Math.floor(product.price * 1.3) + ".00"} درهم
            </p>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">التقييمات</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={cn(
                      (product.rating || 0) > rating
                        ? "text-yellow-400"
                        : "text-gray-200",
                      "size-5 shrink-0"
                    )}
                  />
                ))}
              </div>
              <p className="sr-only">{product.rating || 0} من 5 نجوم</p>
              <a
                href="#reviews"
                className="mr-3 text-sm font-medium text-rose-600 hover:text-rose-500"
              >
                432 من التقييمات{" "}
              </a>
            </div>
          </div>

          {/* Feature badges */}
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="group flex items-center gap-3 bg-sky-50 p-3 transition-all duration-200 border border-sky-300">
                <div className="flex-shrink-0">
                  <BoltIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    توصيل سريع
                  </p>
                  <p className="text-xs text-blue-700">24-48 ساعة</p>
                </div>
              </div>

              <div className="group flex items-center gap-3 bg-pink-50 p-3 transition-all duration-200 border border-pink-300">
                <div className="flex-shrink-0">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-pink-600 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-pink-900">دعم 24/7</p>
                  <p className="text-xs text-pink-700">خدمة العملاء</p>
                </div>
              </div>
            </div>
          </div>

          <form className="mt-10" onSubmit={handleAddToBag}>
            {/* Colors */}
            {hasColors && (
              <div>
                <h3 className="text-sm font-medium text-gray-900">اللون</h3>
                <fieldset aria-label="اختر لون" className="mt-4">
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="flex items-center gap-x-3"
                  >
                    {product.product_colors.map((productColor) => (
                      <Radio
                        key={productColor.id}
                        value={productColor}
                        aria-label={productColor.colors.name}
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-checked:ring-2 data-checked:ring-rose-500 data-focus:data-checked:ring-2 data-focus:data-checked:ring-offset-1"
                      >
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: productColor.colors.hex }}
                          className="size-8 rounded-full border border-black/10"
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            )}

            {/* Sizes */}
            {hasSizes && (
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">المقاس</h3>
                </div>
                <fieldset aria-label="اختر مقاس" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {product.sizes.map((size) => (
                      <Radio
                        key={size}
                        value={size}
                        disabled={!product.instock}
                        className={cn(
                          product.instock
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-focus:ring-2 data-focus:ring-rose-500 sm:flex-1 sm:py-6"
                        )}
                      >
                        <span>{size}</span>
                        {product.instock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-rose-500"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 size-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            )}

            <Button
              type="submit"
              color="rose"
              className="mt-10 w-full flex items-center justify-center h-12"
            >
              {product.instock ? "أضف إلى الحقيبة" : "غير متوفر"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
