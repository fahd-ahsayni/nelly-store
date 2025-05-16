"use client";

import { products } from "@/constants";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

export default function ProductsList() {
  const [api, setApi] = useState<
    | {
        scrollPrev: () => void;
        scrollNext: () => void;
      }
    | any
  >(null);

  // Create a ref to store the autoplay plugin instance
  const autoplayRef = useRef<any>(Autoplay({ delay: 2000 }));

  // Handler functions for carousel navigation
  const handlePrevious = () => {
    api?.scrollPrev();
    // Stop autoplay when manually navigating
    autoplayRef.current?.stop();
  };

  const handleNext = () => {
    api?.scrollNext();
    // Stop autoplay when manually navigating
    autoplayRef.current?.stop();
  };

  // Handler for mouse enter to pause autoplay
  const handleMouseEnter = () => {
    autoplayRef.current?.stop();
  };

  // Handler for mouse leave to resume autoplay
  const handleMouseLeave = () => {
    autoplayRef.current?.play();
  };

  return (
    <div className="bg-rose-50/70">
      <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-5xl tracking-tight text-gray-900 mb-8">
          <span className="font-newyork italic">Trending</span> products
        </h2>
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-x-4">
            {["All", "robs", "Hijab", "Khimar"].map((label) => {
              const isActive = label === "All";
              return (
                <button
                  key={label}
                  className={`px-6 py-1.5 border focus:outline-none transition-colors duration-200 font-medium tracking-wide ${
                    isActive
                      ? "bg-zinc-800 text-rose-200 border-zinc-700"
                      : "bg-white text-neutral-900 border-neutral-900 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <a
            href="#"
            className="hidden font-medium text-rose-600 hover:text-rose-500 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-10 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[autoplayRef.current]}
            className="w-full"
            setApi={setApi}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="group relative">
                    <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      <a href={product.href}>
                        <span className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.collection}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="w-full mt-8 flex justify-end items-center space-x-8 relative z-50">
            <div className="flex items-center gap-x-6">
              <button
                className="px-8 py-1 border border-zinc-800 bg-white hover:bg-zinc-800 hover:text-rose-200 transition-colors duration-200"
                onClick={handlePrevious}
              >
                <ArrowLeft strokeWidth={1} />
              </button>
              <button
                className="px-8 py-1 border border-zinc-800 bg-white hover:bg-zinc-800 hover:text-rose-200 transition-colors duration-200"
                onClick={handleNext}
              >
                <ArrowRight strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
