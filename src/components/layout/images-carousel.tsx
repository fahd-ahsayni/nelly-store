"use client";

import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CarouselImage {
  src: string | StaticImageData;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export default function ImageCarousel({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHoveringNav = useRef(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isHoveringNav.current) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHoveringNav.current]);

  if (!images.length) return null;

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            {index === 0 ? (
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                className="w-full h-full"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="object-cover"
                  loading="eager"
                />
              </motion.div>
            ) : (
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom navigation dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded"
        onMouseEnter={() => {
          isHoveringNav.current = true;
        }}
        onMouseLeave={() => {
          isHoveringNav.current = false;
        }}
      >
        <button
          onClick={goToPrevious}
          className="text-rose-200 hover:text-rose-50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-5 w-5 rtl:-scale-x-100" />
        </button>

        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              index === currentIndex
                ? "bg-rose-500"
                : "bg-rose-200 hover:bg-rose-50"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}

        <button
          onClick={goToNext}
          className="text-rose-200 hover:text-rose-50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-5 w-5 rtl:-scale-x-100" />
        </button>
      </div>
    </div>
  );
}
