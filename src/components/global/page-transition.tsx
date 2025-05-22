"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/providers/loading-provider";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { showPageContent } = useLoading();
  const pageRef = useRef<HTMLDivElement>(null);

  // Entrance animation when page is ready to show
  useEffect(() => {
    if (showPageContent && pageRef.current) {
      const ctx = gsap.context(() => {
        // Stagger all direct children of the main content
        gsap.from(pageRef.current?.children || [], {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all"
        });
      });

      return () => ctx.revert();
    }
  }, [showPageContent]);

  return (
    <div ref={pageRef} className="w-full">
      {children}
    </div>
  );
}
