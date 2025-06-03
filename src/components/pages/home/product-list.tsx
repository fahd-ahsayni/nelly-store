"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "@/components/layout/cards/product-card";
import { cn } from "@/lib/utils";
import type { ProductFull } from "@/types/database";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const AUTOPLAY_DELAY = 4000;

interface ProductListProps {
  translations: any;
  locale: string;
  initialProducts: ProductFull[];
}

export default function ProductList({
  translations,
  locale,
  initialProducts,
}: ProductListProps) {
  // Get featured products (top 10 highest rated, in stock products)
  const featuredProducts = initialProducts
    .filter((product) => product.instock)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const shopCollectionHref = `/${locale}/shop`;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-32 lg:px-8 relative isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:left-[calc(50%+30rem)] sm:w-288.75"
        />
      </div>
      <div className="md:flex md:items-center md:justify-between">
        <h2
          className={cn(
            "text-gray-800",
            locale === "ar"
              ? "font-semibold md:text-4xl text-3xl"
              : "font-serif md:text-5xl text-4xl"
          )}
        >
          {translations.productsList["title-part1"]}{" "}
          <span className="text-rose-600 ltr:italic">
            {translations.productsList["title-part2"]}
          </span>
        </h2>
        <Link
          href={shopCollectionHref}
          className="hidden font-medium text-rose-600 hover:text-rose-500 md:block"
        >
          {translations.productsList.link}
          {locale === "ar" ? (
            <span aria-hidden="true"> &larr;</span>
          ) : (
            <span aria-hidden="true"> &rarr;</span>
          )}
        </Link>
      </div>

      <div className="relative mt-4 md:mt-8" dir="ltr">
        <Carousel
          opts={{
            loop: true,
            align: "start",
            skipSnaps: false,
            dragFree: true,
          }}
          plugins={[
            Autoplay({
              delay: AUTOPLAY_DELAY,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <ProductCard product={product} locale={locale} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-8 text-sm md:hidden">
        <Link
          href={shopCollectionHref}
          className="font-medium text-rose-600 hover:text-rose-500"
        >
          {translations.shopCollection}
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </section>
  );
}
