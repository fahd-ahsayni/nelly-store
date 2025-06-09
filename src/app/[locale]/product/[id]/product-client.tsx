"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductFull } from "@/types/database";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ProductClientProps {
  product: ProductFull;
}

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export default function ProductClient({ product }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();

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
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Memoize computed values
  const displayImages = useMemo(() => {
    const images = [product.imagesrc, ...(product.image_urls || [])].filter(
      Boolean
    );

    return images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  }, [product.imagesrc, product.image_urls]);

  const hasColors = product.product_colors && product.product_colors.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToBag = (e: React.FormEvent) => {
    e.preventDefault();

    // Build checkout URL with product details
    const checkoutParams = new URLSearchParams({
      productId: product.id,
      quantity: quantity.toString(),
    });

    if (selectedColor?.colors?.name) {
      checkoutParams.set("color", selectedColor.colors.name);
    }

    if (selectedSize) {
      checkoutParams.set("size", selectedSize);
    }

    // Navigate to checkout page with correct locale path
    router.push(
      `/${params.locale}/product/checkout?${checkoutParams.toString()}`
    );
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 24 hours when countdown reaches 0
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      <div className="mb-10 mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <img
          alt={product.imagealt || product.name || "Product image"}
          src={displayImages[0]}
          className="hidden aspect-3/4 size-full shadow-xl shadow-rose-300/30 object-cover lg:block"
          loading="eager"
        />
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <img
            alt={product.imagealt || product.name || "Product image"}
            src={displayImages[1] || displayImages[0]}
            className="aspect-3/2 size-full shadow-xl shadow-rose-300/30 object-cover"
            loading="lazy"
          />
          <img
            alt={product.imagealt || product.name || "Product image"}
            src={displayImages[2] || displayImages[0]}
            className="aspect-3/2 size-full shadow-xl shadow-rose-300/30 object-cover"
            loading="lazy"
          />
        </div>
        <img
          alt={product.imagealt || product.name || "Product image"}
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

            {/* Countdown Timer */}
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  عرض محدود الوقت!
                </h3>
              </div>

              <p className="text-gray-700 mb-4 font-medium">
                احصلي على خصم 30% - ينتهي العرض خلال:
              </p>

              <div
                dir="ltr"
                className="flex items-center justify-end gap-4 mt-8"
              >
                <div className="text-center">
                  <div className="bg-rose-600 text-white px-3 py-2 min-w-[60px]">
                    <span className="text-2xl font-bold">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs text-rose-600 mt-1 font-medium">ساعة</p>
                </div>

                <span className="text-rose-600 text-2xl font-bold">:</span>

                <div className="text-center">
                  <div className="bg-rose-600 text-white px-3 py-2 min-w-[60px]">
                    <span className="text-2xl font-bold">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    دقيقة
                  </p>
                </div>

                <span className="text-rose-600 text-2xl font-bold">:</span>

                <div className="text-center">
                  <div className="bg-rose-600 text-white px-3 py-2 min-w-[60px]">
                    <span className="text-2xl font-bold">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    ثانية
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-rose-600">
                  ⚡ سارعي بالطلب قبل انتهاء العرض!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-10">
          <h2 className="sr-only">معلومات المنتج</h2>
          <div>
            <p className="text-3xl tracking-tight text-gray-900 font-bold">
              {(product.price || 0).toFixed(2)} درهم فقط
            </p>
            <p className="text-xl tracking-tight text-gray-400 line-through">
              {Math.floor((product.price || 0) * 1.3) + ".00"} درهم
            </p>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">التقييمات</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIconSolid
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
                1,247 تقييم
              </a>
            </div>

            {/* Sales Badge */}
            <div className="mt-3 inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <div className="flex items-center gap-1">
                <span className="text-green-700 font-semibold text-sm">
                  5K+
                </span>
                <span className="text-green-600 text-sm">
                  تم بيعها هذا الشهر
                </span>
              </div>
            </div>
          </div>

          {/* Feature badges */}
          <div className="mt-6 space-y-3">
            <div className="grid gap-3 grid-cols-2">
              <div className="group flex items-center gap-3 bg-sky-50 p-3 transition-all duration-200 border border-sky-300">
                <div className="flex-shrink-0">
                  <BoltIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    توصيل سريع
                  </p>
                  <p className="text-xs text-blue-700">48-24 ساعة</p>
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
                        aria-label={productColor.colors?.name || "Color"}
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-checked:ring-2 data-checked:ring-rose-500 data-focus:data-checked:ring-2 data-focus:data-checked:ring-offset-1"
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            backgroundColor: productColor.colors?.hex || "#000",
                          }}
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

            {/* Quantity */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900 mb-3">الكمية</h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="flex bg-white items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-2xl">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="flex bg-white items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Button
              type="submit"
              color="rose"
              className="mt-10 w-full flex items-center justify-center h-12"
            >
              اشتري الآن
            </Button>
          </form>
        </div>
      </div>

      {/* Loved by Sisters Worldwide Section */}
      <div className="mt-16 py-16 relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-40"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                محبوبة من الأخوات حول العالم
              </h2>
            </div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              انضمي إلى مجتمعنا من محبات الأزياء المحتشمة الواثقات
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                icon: HeartIcon,
                iconColor: "text-rose-500",
                value: "50K+",
                label: "عميلة سعيدة",
              },
              {
                icon: StarIcon,
                iconColor: "text-yellow-500",
                value: "4.9",
                label: "متوسط التقييم",
              },
              {
                icon: HandThumbUpIcon,
                iconColor: "text-green-500",
                value: "98%",
                label: "ينصحن بالمنتج",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center mx-auto mb-4">
                  <stat.icon
                    className={`lg:size-12 size-10 ${stat.iconColor}`}
                  />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
