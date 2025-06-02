"use client";

import type { ProductFull } from "@/types/database";

interface ProductListProps {
  translations: any;
  locale: string;
  initialProducts: ProductFull[];
}

export default function ProductList({
  translations,
  locale,
  initialProducts,
}: ProductListProps) {
  // Get featured products (top 10 highest rated, in stock products)
  const featuredProducts = initialProducts
    .filter((product) => product.instock)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <div>
      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Trending products
          </h2>
          <a
            href="#"
            className="hidden text-sm font-medium text-rose-600 hover:text-rose-500 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-5 md:gap-y-0 lg:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  alt={product.name}
                  src={product.imagesrc || "/placeholder.jpg"}
                  className="size-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a href={`/${locale}/product/${product.slug}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {product.collections.name}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product.price} MAD
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
