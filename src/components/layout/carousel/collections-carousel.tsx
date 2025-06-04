"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import type { Collection } from "@/types/database";
import Image from "next/image";

interface CollectionsCarouselProps {
  collections: Collection[];
  translations: any;
  locale: string;
  onCollectionSelect?: (collectionId: string | null) => void;
  selectedCollectionId?: string | null;
}

export default function CollectionsCarousel({
  collections,
  translations,
  locale,
  onCollectionSelect,
  selectedCollectionId,
}: CollectionsCarouselProps) {
  if (collections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No collections available</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
      dir="ltr"
    >
      <CarouselContent>
        {/* All Collections Option */}
        {onCollectionSelect && (
          <CarouselItem className="basis-1/3 lg:basis-1/6">
            <div
              className={`group relative cursor-pointer ${
                selectedCollectionId === null ? "ring-2 ring-rose-500" : ""
              }`}
              onClick={() => onCollectionSelect(null)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-rose-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">All Collections</div>
                </div>
              </div>
            </div>
          </CarouselItem>
        )}

        {collections.map((collection) => (
          <CarouselItem key={collection.id} className="basis-1/3 lg:basis-1/6">
            <div
              className={`group relative cursor-pointer ${
                selectedCollectionId === collection.id
                  ? "ring-2 ring-rose-500"
                  : ""
              }`}
              onClick={() => onCollectionSelect?.(collection.id)}
            >
              <div className="aspect-[4/3] relative overflow-hidden  bg-gray-100">
                <Image
                  src={collection.imagesrc}
                  alt={collection.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </div>
              {onCollectionSelect && (
                <div className="absolute bg-black/30 bottom-0 left-0 right-0 h-full w-full flex items-center justify-center text-white p-2 text-center text-sm font-medium">
                  <h3 className="text-2xl text-white font-semibold">
                    {collection.name}
                  </h3>
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 -translate-x-4 bg-white shadow-lg hover:bg-gray-50" />
      <CarouselNext className="right-0 translate-x-4 bg-white shadow-lg hover:bg-gray-50" />
    </Carousel>
  );
}
