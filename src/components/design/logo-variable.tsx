"use client";

import { useRef } from "react";

import VariableFontCursorProximity from "../fancy/variable-font-cursor-proximity";

export default function LogoVariable() {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <div className="cursor-pointer relative overflow-hidden" ref={containerRef}>
      {/* this is the important stuff */}
      <div className="w-full h-full items-center justify-center grid text-justify">
        <VariableFontCursorProximity
          label={`Nelly Collection`}
          className="text-2xl md:text-3xl"
          fromFontVariationSettings="'wght' 400, 'slnt' 0"
          toFontVariationSettings="'wght' 900, 'slnt' -10"
          falloff="exponential"
          radius={70}
          containerRef={containerRef}
        />
      </div>
    </div>
  );
}
