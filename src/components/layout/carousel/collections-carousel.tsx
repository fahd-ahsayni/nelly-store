"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Collection, ProductFull } from "@/types/database";
import { motion, useIsomorphicLayoutEffect } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CollectionsCarouselProps {
  collections: Collection[];
  products?: ProductFull[];
  translations: any;
  locale: string;
  onCollectionSelect?: (collectionId: string | null) => void;
  selectedCollectionId?: string | null;
}

export default function CollectionsCarousel({
  collections,
  products = [],
  translations,
  locale,
  onCollectionSelect,
  selectedCollectionId,
}: CollectionsCarouselProps) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [api, setApi] = useState<any>();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Only show collections that have at least one in-stock product.
  const collectionsWithProducts = collections.filter((collection) =>
    products.some(
      (product) => product.collection_id === collection.id && product.instock
    )
  );

  useIsomorphicLayoutEffect(() => {
    if (!api) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollButtons();
    api.on("scroll", updateScrollButtons);
    return () => api.off("scroll", updateScrollButtons);
  }, [api]);

  const handleCollectionSelect = (collectionId: string | null) => {
    if (collectionId === selectedCollectionId) return;
    onCollectionSelect?.(collectionId);
  };

  // Minimalistic animation variants
  const cardVariants = {
    idle: { scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.02,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: { scale: 0.98, transition: { duration: 0.1, ease: "easeOut" } },
    selected: {
      scale: prefersReducedMotion ? 1 : 1.01,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const textVariants = {
    idle: { y: 0, scale: 1 },
    selected: {
      y: prefersReducedMotion ? 0 : -1,
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  if (collectionsWithProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No collections available</p>
      </div>
    );
  }

  return (
    <div ref={carouselRef} className="relative">
      <Carousel
        opts={{ align: "start" }}
        className="w-full"
        dir="ltr"
        setApi={setApi}
      >
        <CarouselContent className="py-4 px-2 flex gap-4">
          {onCollectionSelect && (
            <CarouselItem className="basis-1/2 lg:basis-1/6">
              <motion.div
                data-collection-id="all"
                className={`group relative cursor-pointer overflow-hidden transition-colors duration-200 shadow-xs border border-gray-300 ${
                  selectedCollectionId === null
                    ? "ring-4 ring-offset-2 ring-rose-500"
                    : "border-gray-200 hover:border-rose-300"
                }`}
                onClick={() => handleCollectionSelect(null)}
                variants={cardVariants}
                initial="idle"
                animate={selectedCollectionId === null ? "selected" : "idle"}
                whileHover="hover"
                whileTap="tap"
              >
                <div className="aspect-[4/3] flex items-center justify-center bg-white">
                  <motion.div
                    className="text-gray-700 text-center"
                    variants={textVariants}
                    animate={
                      selectedCollectionId === null ? "selected" : "idle"
                    }
                  >
                    <div
                      className={cn(
                        "text-2xl font-semibold text-gray-800 text-center px-2",
                        locale !== "ar" && " ltr:font-serif ltr:italic"
                      )}
                    >
                      {translations?.collections?.allCollections ||
                        "All Collections"}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </CarouselItem>
          )}

          {collectionsWithProducts.map((collection, index) => (
            <CarouselItem
              key={collection.id}
              className="basis-1/2 lg:basis-1/6"
            >
              <motion.div
                data-collection-id={collection.id}
                className={`group relative cursor-pointer overflow-hidden transition-colors duration-200 shadow-xs border border-gray-300 ${
                  selectedCollectionId === collection.id
                    ? "ring-4 ring-offset-2 ring-rose-500"
                    : "border-gray-200 hover:border-rose-300"
                }`}
                onClick={() => handleCollectionSelect(collection.id)}
                variants={cardVariants}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  ...(selectedCollectionId === collection.id
                    ? cardVariants.selected
                    : cardVariants.idle),
                }}
                whileHover="hover"
                whileTap="tap"
                transition={{
                  delay: Math.min(index * 0.05, 0.3),
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                  <Image
                    src={collection.imagesrc}
                    alt={collection.name}
                    width={400}
                    height={400}
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-90`}
                    loading="lazy"
                  />
                  {/* Removed the overlay to prevent the white bg on selection */}
                  {onCollectionSelect && (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <h3 className="text-2xl font-semibold text-white text-center">
                        {collection.name}
                      </h3>
                    </div>
                  )}
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {canScrollPrev && (
          <div>
            <CarouselPrevious className="left-2 z-10 bg-white text-gray-700 border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all duration-200" />
          </div>
        )}

        {canScrollNext && (
          <div>
            <CarouselNext className="right-2 z-10 bg-white text-gray-700 border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all duration-200" />
          </div>
        )}
      </Carousel>

      {canScrollPrev && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
      )}
      {canScrollNext && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
      )}
    </div>
  );
}
