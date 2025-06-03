import { cn } from "@/lib/utils";
import type { ProductFull } from "@/types/database";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export interface ProductCardProps {
  product: ProductFull;
  locale: string;
  onClick?: () => void;
  allProducts?: ProductFull[];
  translations?: {
    new: string;
  };
}

// Helper function to check if product is in the last 20 created products
const isProductNew = (
  product: ProductFull,
  allProducts: ProductFull[] = []
): boolean => {
  if (allProducts.length === 0) return false;

  const sortedProducts = allProducts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdat).getTime() - new Date(a.createdat).getTime()
    );

  const last20Products = sortedProducts.slice(0, 20);
  return last20Products.some((p) => p.id === product.id);
};

export default function ProductCard({
  product,
  locale,
  onClick,
  allProducts = [],
  translations,
}: ProductCardProps) {
  const isNew = isProductNew(product, allProducts);

  return (
    <div
      onClick={onClick}
      className="block w-full aspect-[3/4] group cursor-pointer"
    >
      <div
        className={cn(
          "relative rounded-2xl h-full w-full",
          "bg-white/80 dark:bg-gray-900/80",
          "shadow-xs",
          "transition-all duration-300",
          "hover:shadow-md group"
        )}
      >
        <div className="relative overflow-hidden h-full w-full">
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

        {isNew && (
          <div className="absolute top-3 ltr:right-3 rtl:left-3">
            <span
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-medium",
                "bg-white text-gray-800",
                "backdrop-blur-md",
                "shadow-xs",
                "border border-white/20"
              )}
            >
              {translations?.new || "New"}
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
