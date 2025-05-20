"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
};

export function ProductImage({
  src,
  alt,
  width = 500,
  height = 500,
  priority = false,
  className,
  fill = false,
  sizes,
  ...props
}: ProductImageProps & React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className={cn("overflow-hidden relative", className)} {...props}>
      {isError ? (
        <div className="flex h-full w-full items-center justify-center bg-secondary/20">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      ) : (
        <Image
          src={src || "/placeholder.jpg"}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className={cn(
            "object-cover transition-all duration-300",
            isLoading ? "scale-110 blur-md" : "scale-100 blur-0"
          )}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
}
