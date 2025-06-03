import { cn } from "@/lib/utils";
import type { ProductFull } from "@/types/database";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export interface ProductCardProps {
  product: ProductFull;
  locale: string;
  onClick?: () => void;
}

export default function ProductCard({ product, locale, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="block w-full max-w-[280px] group cursor-pointer"
    >
      <div
        className={cn(
          "relative rounded-2xl",
          "bg-white/80 dark:bg-gray-900/80",
          "shadow-xs",
          "transition-all duration-300",
          "hover:shadow-md group"
        )}
      >
        <div className="relative h-[320px] overflow-hidden">
          <Image
            src={product.imagesrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          )}
        />

        {product.instock && (
          <div className="absolute top-3 right-3">
            <span
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-medium",
                "bg-white text-gray-800",
                "backdrop-blur-md",
                "shadow-xs",
                "border border-white/20"
              )}
            >
              New
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold text-white dark:text-gray-100 leading-snug tracking-tighter">
                {product.name}
              </h3>
              <p className="text-sm text-gray-200 dark:text-gray-300 line-clamp-1 tracking-tight">
                {product.collections.name}
              </p>
              <p className="text-sm font-medium text-white">
                {product.price} MAD
              </p>
            </div>
            <div
              className={cn(
                "p-2 rounded-full",
                "bg-rose-500",
                "group-hover:bg-rose-600",
                "transition-colors duration-300"
              )}
            >
              <ArrowUpRightIcon className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
