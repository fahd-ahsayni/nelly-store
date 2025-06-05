"use client";

import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface FloatingCartButtonProps {
  onClick: () => void;
  className?: string;
}

export default function FloatingCartButton({
  onClick,
  className,
}: FloatingCartButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { getTotalItems, isHydrated } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return null;
  }

  const totalItems = getTotalItems();

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-30 lg:hidden",
        "w-14 h-14 bg-rose-600 hover:bg-rose-700 active:bg-rose-800",
        "rounded-full shadow-2xl shdadow-rose-600/50",
        "flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        "transform-gpu",

        // Visibility animation
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-16 opacity-0 scale-95 pointer-events-none",
        className
      )}
      aria-label="Open shopping cart"
    >
      <div className="relative">
        <ShoppingBagIcon className="w-6 h-6 text-white" />
        {totalItems > 0 && (
          <span
            className={cn(
              "absolute -top-2 -right-2 min-w-[20px] h-5",
              "bg-white text-rose-600 text-xs font-bold",
              "rounded-full flex items-center justify-center",
              "shadow-sm border-2 border-rose-600",
              "px-1"
            )}
          >
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </div>
    </button>
  );
}
