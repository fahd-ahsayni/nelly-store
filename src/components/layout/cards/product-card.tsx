import type { ProductFull } from "@/types/database";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export interface ProductCardProps {
  product: ProductFull;
  locale: string;
  onClick?: () => void;
  allProducts?: ProductFull[];
  translations: any;
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

  // Direct badge texts based on locale
  const newBadgeText =
    locale === "ar" ? "جديد" : locale === "fr" ? "Nouveau" : "New";
  const stockBadgeText =
    locale === "ar"
      ? "نفد المخزون"
      : locale === "fr"
      ? "Rupture de stock"
      : "Out of Stock";
  const currency = locale === "ar" ? "درهم": "MAD";
  return (
    <div key={product.id} className="group relative select-none">
      <div className="w-full overflow-hidden relative shadow-sm">
        <div className="absolute bottom-3 right-3 z-10">
          <div className="backdrop-blur-sm bg-black/20 rounded-full overflow-hidden px-3 py-1.5 border border-white/30">
            <p
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="text-white font-semibold text-sm tracking-wide"
            >
              {product.price}{" "}
              <span className="text-xs opacity-90">{currency}</span>
            </p>
          </div>
        </div>
        <Image
          width={300}
          height={400}
          priority={isNew}
          sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw, 33vw"
          quality={80}
          loading="eager"
          decoding="async"
          alt={product.name}
          src={product.imagesrc}
          className="aspect-[3/4] w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 transition-all duration-300"
        />
      </div>
      {/* Out of Stock Badge */}
      <div className="absolute top-0 left-0 w-full flex rtl:flex-row-reverse justify-between p-2">
        {!product.instock && (
          <div className="w-fit">
            <span className="flex rtl:flex-row-reverse items-center gap-1 px-2.5 py-1 text-xs font-medium bg-red-50 text-red-700 border border-red-400">
              <ExclamationTriangleIcon className="w-3 h-3" />
              {stockBadgeText}
            </span>
          </div>
        )}

        {isNew && product.instock && (
          <div className="w-fit">
            <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-rose-600 text-white">
              {newBadgeText}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-gray-80 font-medium line-clamp-1">
            <div onClick={onClick} className="cursor-pointer">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </div>
          </h3>
          <p className="text-gray-600 text-sm">{product.collections.name}</p>
        </div>
      </div>
    </div>
  );
}
