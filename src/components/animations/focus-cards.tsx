"use client";

import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative bg-gray-100 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-xs scale-[0.98]"
      )}
    >
      <img
        src={typeof card.src === "string" ? card.src : card.src.src}
        alt={card.title}
        className={cn(
          "object-cover absolute inset-0 w-full h-full transition-all duration-300",
          hovered === index ? "brightness-110" : "brightness-75"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string | StaticImageData;
};

export function FocusCards({
  cards,
  customLayout = false,
  locale = "en",
}: {
  cards: Card[];
  customLayout?: boolean;
  locale?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (customLayout) {
    return (
      <div className="relative z-30 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:h-[700px]">
        {cards.map((card, index) => {
          let className =
            "relative h-[400px] sm:h-[450px] lg:h-auto transition-all duration-300 ease-out z-30";

          // Apply specific positioning based on index to match original layout
          if (index === 0) className += " lg:row-span-2";
          if (index === 1) className += " lg:col-start-2";
          if (index === 2) className += " lg:col-start-2 lg:row-start-2";
          if (index === 3) className += " lg:col-start-3 lg:row-span-2";

          // Add focus effects
          if (hovered !== null && hovered !== index) {
            className += " blur-[2px] scale-[0.98]";
          }

          return (
            <div key={card.title} className={className}>
              <div
                className="absolute inset-0 overflow-hidden"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={typeof card.src === "string" ? card.src : card.src.src}
                  alt={card.title}
                  className={cn(
                    "h-full w-full object-cover object-center transition-all duration-300",
                    hovered === index ? "brightness-90" : "brightness-75"
                  )}
                />
              </div>
              <div className="absolute inset-0 flex items-end pointer-events-none">
                <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                  <p
                    className={cn(
                      "text-3xl ltr:font-serif font-medium ltr:italic text-white text-center ltr:sm:text-left rtl:sm:text-right rtl:font-semibold transition-opacity duration-300",
                      hovered === index ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {card.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
