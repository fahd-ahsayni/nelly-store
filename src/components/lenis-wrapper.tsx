"use client";

import { ReactLenis } from "lenis/react";

export function LenisWrapper() {
  return (
    <ReactLenis 
      root 
      options={{ 
        prevent: (node: Element) => node.hasAttribute('data-lenis-prevent') 
      }} 
    />
  );
}
