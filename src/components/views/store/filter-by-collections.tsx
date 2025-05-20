"use client";

import { allCollections } from "@/assets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilter, useSupabaseState } from "@/context";
import { cn } from "@/lib/utils";
import { Collection } from "@/types";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FilterByCollections() {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  // Access the filter context to update selected collection
  const { updateSelectedCollection, filterState } = useFilter();

  // Find the index of the currently selected collection
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [shouldShowNavigation, setShouldShowNavigation] = useState(true);

  const {
    collections: fetchedCollections,
    isLoading,
    error,
  } = useSupabaseState();

  // Define the "All" collection card.
  const allCollectionsCard: Collection = useMemo(
    () => ({
      id: "all", // Use consistent ID for "All" option
      name: "All",
      imageSrc: allCollections,
      description: "All items in the store",
    }),
    []
  );

  // Create the list of collections to display, prepending the "All" card.
  const displayCollections = useMemo(() => {
    return [allCollectionsCard, ...(fetchedCollections || [])];
  }, [allCollectionsCard, fetchedCollections]);

  // Update activeIndex when filterState.selectedCollectionId changes
  useEffect(() => {
    const collectionId = filterState.selectedCollectionId;
    if (collectionId === null) {
      setActiveIndex(0); // "All" is at index 0
    } else {
      const index = displayCollections.findIndex((c) => c.id === collectionId);
      setActiveIndex(index >= 0 ? index : 0);
    }
  }, [filterState.selectedCollectionId, displayCollections]);

  // Check window size for responsive behavior
  useEffect(() => {
    const checkSize = () => {
      const currentWindowWidth = window.innerWidth;
      setIsMobile(currentWindowWidth < 640);
      setIsTablet(currentWindowWidth >= 640 && currentWindowWidth < 1024);

      const currentCollectionsLength = displayCollections.length;
      let slidesPerViewBasedOnWidth = 2.5; // Default for smallest screens

      if (currentWindowWidth >= 1024) {
        // Desktop
        slidesPerViewBasedOnWidth = 6.5;
      } else if (currentWindowWidth >= 768) {
        // Large Tablet
        slidesPerViewBasedOnWidth = 4;
      } else if (currentWindowWidth >= 640) {
        // Small Tablet
        slidesPerViewBasedOnWidth = 3.5;
      }
      // else, for mobile (<640px), it remains 2.5

      setShouldShowNavigation(
        currentCollectionsLength > slidesPerViewBasedOnWidth
      );
    };

    checkSize(); // Initial check
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [displayCollections.length]);

  // Handle collection selection
  const handleCollectionSelect = (index: number) => {
    setActiveIndex(index);

    // Map index to collection ID
    const collectionId =
      index === 0 ? null : displayCollections[index]?.id || null;
    updateSelectedCollection(collectionId);
  };

  if (isLoading) {
    return (
    <div className="w-full border-b border-zinc-800 py-4 px-3 lg:px-8 bg-zinc-50 relative">
      <div className="flex space-x-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex-shrink-0 w-48 h-28">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-center relative h-20 md:h-28 overflow-hidden">
            <Skeleton className="w-full h-full rounded absolute inset-0 bg-zinc-100" />
            <div className="relative z-10 text-center">
              <Skeleton className="h-5 w-20 mx-auto mt-10 bg-zinc-200" />
            </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    );
  }

  if (error) {
    return (
      <div className="w-full border-b border-zinc-800 py-4 px-3 lg:px-20 bg-rose-50/70 relative">
        <div className="mx-auto max-w-3xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load collections. Please try again later or contact support.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // `displayCollections` will always have at least the "All" card
  const showButtons = shouldShowNavigation && !isMobile && !isTablet;

  return (
    <div
      className={cn(
        "w-full border-b border-border py-4 px-3",
        showButtons ? "lg:px-20" : "lg:px-6",
        "bg-zinc-50 relative"
      )}
    >
      <div className="flex items-center">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2.5}
          breakpoints={{
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6.5 },
          }}
          navigation={
            showButtons
              ? {
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }
              : false
          }
          onBeforeInit={(swiper) => {
            if (
              showButtons &&
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }
          }}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            if (showButtons) {
              swiper.navigation?.update();
            }
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="w-full pl-6"
        >
          {displayCollections.map((collection: Collection, index: number) => (
            <SwiperSlide
              key={collection.id}
              onClick={() => handleCollectionSelect(index)}
              className={cn(
                "cursor-pointer py-2",
                activeIndex === index
                  ? "transform scale-110 z-10  transition-all duration-500 ease-in-out"
                  : "scale-100",
                index === 0 && "ml-4" // This will apply to the "All" card
              )}
            >
              <div className="flex flex-col items-center justify-center">
                <div
                  className={cn(
                    "w-full flex items-center justify-center relative md:h-28 h-20 overflow-hidden transition-all duration-500 ease-in-out"
                  )}
                >
                  <Image
                    src={collection.imageSrc}
                    alt={collection.name}
                    width={500}
                    height={500}
                    className={cn(
                      "w-full h-full object-cover absolute inset-0 transition-all duration-500 ease-in-out",
                      activeIndex === index
                        ? "brightness-100 contrast-105"
                        : "brightness-75 hover:brightness-90"
                    )}
                  />
                  {activeIndex === index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-500/60 to-transparent"></div>
                  )}
                  <div
                    className={cn(
                      "relative z-10 text-center transition-all duration-500 ease-in-out",
                      activeIndex === index
                        ? "transform scale-105"
                        : "transform scale-100"
                    )}
                  >
                    <p
                      className={cn(
                        "text-white font-medium transition-all duration-500 text-base md:text-lg lg:text-xl"
                      )}
                    >
                      {collection.name}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showButtons && (
          <>
            <div className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-10 h-full py-5">
              <button
                ref={navigationPrevRef}
                className={cn(
                  "flex items-center justify-center w-9 md:w-10 h-full bg-zinc-800/90 hover:bg-zinc-700 border-zinc-700 border focus:outline-none text-rose-200 transition-all duration-300 rounded-lg",
                  isBeginning
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                )}
                aria-label="Previous slide"
                disabled={isBeginning}
              >
                <FiChevronLeft size={20} />
              </button>
            </div>

            <div className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-10 h-full py-5">
              <button
                ref={navigationNextRef}
                className={cn(
                  "flex items-center justify-center w-9 h-full md:w-10 bg-zinc-800/90 hover:bg-zinc-700 border-zinc-700 border focus:outline-none text-rose-200 transition-all duration-300 rounded-lg",
                  isEnd
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                )}
                aria-label="Next slide"
                disabled={isEnd}
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
