"use client";

import { useSupabaseState } from "@/context";
import { cn } from "@/lib/utils";
import { Collection } from "@/types";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FilterByCollections() {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Get collections from Supabase state
  const { collections, isLoading, error } = useSupabaseState();

  // If loading, show a skeleton
  if (isLoading) {
    return (
      <div className="w-full border-b border-zinc-800 py-4 px-3 lg:px-20 bg-rose-50/70 relative">
        <div className="flex space-x-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex-shrink-0 w-48 h-28 bg-zinc-200 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="w-full border-b border-zinc-800 py-4 px-3 lg:px-20 bg-rose-50/70 relative">
        <p className="text-red-500">Failed to load collections: {error}</p>
      </div>
    );
  }

  // If no collections, don't render the component
  if (collections.length === 0) {
    return null;
  }

  return (
    <div className="w-full border-b border-zinc-800 py-4 px-3 lg:px-20 bg-rose-50/70 relative">
      <div className="flex items-center">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2.5}
          breakpoints={{
            480: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6.5 },
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (
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
            swiper.navigation?.update();
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="w-full pl-6"
        >
          {collections.map((collection: Collection, index: number) => (
            <SwiperSlide
              key={collection.id}
              onClick={() => {
                setActiveIndex(index);
              }}
              className={cn(
                "cursor-pointer transition-all duration-500 ease-in-out py-2",
                activeIndex === index
                  ? "transform scale-105 z-10"
                  : "scale-100 hover:scale-102",
                index === 0 && "ml-4"
              )}
            >
              <div className="flex flex-col items-center justify-center">
                <div
                  className={cn(
                    "w-full flex items-center justify-center relative md:h-28 h-20 rounded overflow-hidden transition-all duration-500 ease-in-out",
                    activeIndex === index
                      ? "ring-2 ring-rose-400"
                      : "bg-zinc-200"
                  )}
                >
                  <img
                    src={collection.imageSrc}
                    alt={collection.name}
                    width={500}
                    height={500}
                    className={cn(
                      "w-full h-full object-cover absolute rounded inset-0 transition-all duration-500 ease-in-out",
                      activeIndex === index
                        ? "brightness-100 contrast-105"
                        : "brightness-75 hover:brightness-90"
                    )}
                  />
                  {activeIndex === index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-500/30 to-transparent"></div>
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

        {/* Previous Button */}
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

        {/* Next Button */}
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
      </div>
    </div>
  );
}
