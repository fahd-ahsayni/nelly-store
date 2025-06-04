"use client";

import CollectionsCarousel from "@/components/layout/carousel/collections-carousel";
import ProductGrid from "@/components/layout/grid/product-grid";
import { Heading } from "@/components/ui/heading";
import type { Collection, ProductFull } from "@/types/database";
import { useState } from "react";

interface ShopContentProps {
  collections: Collection[];
  products: ProductFull[];
  translations: any;
  locale: string;
}

export default function ShopContent({
  collections,
  products,
  translations,
  locale,
}: ShopContentProps) {
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  // Filter in-stock products
  const inStockProducts = products.filter((product) => product.instock);

  const handleCollectionSelect = (collectionId: string | null) => {
    setSelectedCollectionId(collectionId);
  };

  const selectedCollection = selectedCollectionId
    ? collections.find((c) => c.id === selectedCollectionId)
    : null;

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:left-[calc(50%+30rem)] sm:w-288.75"
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pt-10">
        {/* Collections Carousel Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Heading className="ltr:font-serif">
                  {translations.shop?.shopByCollection || "Shop by Collection"}
                </Heading>
              </div>
            </div>
          </div>
          <CollectionsCarousel
            collections={collections}
            translations={translations}
            locale={locale}
            onCollectionSelect={handleCollectionSelect}
            selectedCollectionId={selectedCollectionId}
          />
        </div>

        {/* Products Grid Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <Heading className="ltr:font-serif">
                {translations.shop?.exploreWhatsNew || "Explore What's New"}
              </Heading>
            </div>
          </div>

          <ProductGrid
            products={inStockProducts}
            translations={translations}
            locale={locale}
            collections={collections}
            selectedCollectionId={selectedCollectionId}
          />
        </div>
      </div>
    </div>
  );
}
