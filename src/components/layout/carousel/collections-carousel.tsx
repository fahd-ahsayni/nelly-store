"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Collection, ProductFull } from "@/types/database";
import { AnimatePresence, motion, useIsomorphicLayoutEffect } from "framer-motion";
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

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Filter collections that have at least one product
  const collectionsWithProducts = collections.filter((collection) =>
    products.some(
      (product) => product.collection_id === collection.id && product.instock
    )
  );

  useIsomorphicLayoutEffect(() => {
    if (!api) {
      return;
    }

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollButtons();
    api.on("scroll", updateScrollButtons);

    return () => {
      api.off("scroll", updateScrollButtons);
    };
  }, [api]);

  const handleCollectionSelect = (collectionId: string | null) => {
    if (collectionId === selectedCollectionId) return;

    onCollectionSelect?.(collectionId);
  };

  // Animation variants
  const cardVariants = {
    idle: { 
      scale: 1, 
      rotateY: 0,
      transition: { duration: 0.2, ease: "easeOut" } 
    },
    hover: { 
      scale: prefersReducedMotion ? 1 : 1.02,
      transition: { duration: 0.2, ease: "easeOut" } 
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1, ease: "easeOut" } 
    },
    selected: {
      scale: prefersReducedMotion ? 1 : 1.01,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const textVariants = {
    idle: { y: 0, scale: 1 },
    selected: { 
      y: prefersReducedMotion ? 0 : -1, 
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    }
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
        opts={{
          align: "start",
        }}
        className="w-full"
        dir="ltr"
        setApi={setApi}
      >
        <CarouselContent className="p-4">
          {/* All Collections Option */}
          {onCollectionSelect && (
            <CarouselItem className="basis-1/3 lg:basis-1/6">
              <motion.div
                data-collection-id="all"
                className={`group relative cursor-pointer overflow-hidden rounded-xl transition-colors duration-200 ${
                  selectedCollectionId === null 
                    ? "ring-2 ring-rose-500 ring-offset-2" 
                    : "hover:ring-1 hover:ring-rose-300"
                }`}
                onClick={() => handleCollectionSelect(null)}
                variants={cardVariants}
                initial="idle"
                animate={selectedCollectionId === null ? "selected" : "idle"}
                whileHover="hover"
                whileTap="tap"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                  <motion.div
                    className="text-rose-100 text-center z-10"
                    variants={textVariants}
                    animate={selectedCollectionId === null ? "selected" : "idle"}
                  >
                    <div className="text-lg font-semibold px-4">
                      {translations?.collections?.allCollections || "All Collections"}
                    </div>
                  </motion.div>

                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-400 via-transparent to-transparent"></div>
                  </div>

                  {/* Selection indicator */}
                  <AnimatePresence>
                    {selectedCollectionId === null && (
                      <motion.div
                        className="absolute inset-0 bg-rose-500/10 backdrop-blur-[1px]"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </CarouselItem>
          )}

          {collectionsWithProducts.map((collection, index) => (
            <CarouselItem
              key={collection.id}
              className="basis-1/3 lg:basis-1/6"
            >
              <motion.div
                data-collection-id={collection.id}
                className={`group relative cursor-pointer overflow-hidden rounded-xl transition-colors duration-200 ${
                  selectedCollectionId === collection.id
                    ? "ring-2 ring-rose-500 ring-offset-2"
                    : "hover:ring-1 hover:ring-rose-300"
                }`}
                onClick={() => handleCollectionSelect(collection.id)}
                variants={cardVariants}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  ...(selectedCollectionId === collection.id ? cardVariants.selected : cardVariants.idle)
                }}
                whileHover="hover"
                whileTap="tap"
                transition={{
                  delay: Math.min(index * 0.05, 0.3),
                  duration: 0.4,
                  ease: "easeOut"
                }}
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                  <Image
                    src={collection.imagesrc}
                    alt={collection.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Selection overlay */}
                  <AnimatePresence>
                    {selectedCollectionId === collection.id && (
                      <motion.div
                        className="absolute inset-0 bg-rose-500/15 backdrop-blur-[1px]"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      />
                    )}
                  </AnimatePresence>

                  {/* Text overlay */}
                  {onCollectionSelect && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <motion.h3
                        className="text-sm font-semibold text-center"
                        variants={textVariants}
                        animate={selectedCollectionId === collection.id ? "selected" : "idle"}
                      >
                        {collection.name}
                      </motion.h3>
                    </div>
                  )}
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons with improved styling */}
        <AnimatePresence>
          {canScrollPrev && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CarouselPrevious className="left-2 bg-white/90 text-gray-700 shadow-lg hover:bg-white hover:shadow-xl border-0 backdrop-blur-sm transition-all duration-200" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {canScrollNext && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <CarouselNext className="right-2 bg-white/90 text-gray-700 shadow-lg hover:bg-white hover:shadow-xl border-0 backdrop-blur-sm transition-all duration-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </Carousel>
    </div>
  );
}
