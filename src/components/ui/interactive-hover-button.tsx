import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto z-30 cursor-pointer overflow-hidden border border-border bg-white p-2 px-6 text-center tracking-wide font-semibold",
        className,
      )}
      {...props}
    >
      {/* Using a pseudo-element for the hover effect instead of a div */}
      <div className="relative z-0 flex rtl:flex-row-reverse items-center gap-2">
        {/* This div acts as a visual indicator only, not the hover trigger */}
        <div className="h-2 w-2 rounded-full bg-rose-600 transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full ltr:translate-x-12 rtl:-translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 ltr:group-hover:-translate-x-5 rtl:group-hover:translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRightIcon className="h-6 w-6 rtl:-scale-100" />
      </div>
      {/* Adding a full-width/height pseudo-background that acts as the hover trigger */}
      <div className="absolute inset-0 -z-10 bg-transparent"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
