"use client";

import ProductCard from "@/components/layout/cards/product-card";
import ProductQuickview from "@/components/layout/dialog/product-quickview";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import type { Collection, ProductFull } from "@/types/database";
import { useState } from "react";

interface ProductGridProps {
  products: ProductFull[];
  translations: any;
  locale: string;
  collections?: Collection[];
  showCollectionFilter?: boolean;
  selectedCollectionId?: string | null;
}

export default function ProductGrid({
  products,
  translations,
  locale,
  collections = [],
  showCollectionFilter = false,
  selectedCollectionId = null,
}: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductFull | null>(
    null
  );
  const [isQuickviewOpen, setIsQuickviewOpen] = useState(false);

  const handleProductClick = (product: ProductFull) => {
    setSelectedProduct(product);
    setIsQuickviewOpen(true);
  };

  const handleCloseQuickview = () => {
    setIsQuickviewOpen(false);
    setSelectedProduct(null);
  };

  // Create flip keys based on selected collection
  const flipKeys = selectedCollectionId ? [selectedCollectionId] : ["all"];

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <>
      {/* Products Grid with FlipReveal Animation */}
      <FlipReveal
        keys={flipKeys}
        showClass="block"
        hideClass="hidden"
        className="grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-5 xl:gap-x-8"
        dir="ltr"
      >
        {products.map((product) => (
          <FlipRevealItem
            key={product.id}
            flipKey={product.collection_id || "all"}
          >
            <ProductCard
              product={product}
              locale={locale}
              onClick={() => handleProductClick(product)}
              allProducts={products}
              translations={translations.product}
            />
          </FlipRevealItem>
        ))}
      </FlipReveal>

      <ProductQuickview
        product={selectedProduct}
        open={isQuickviewOpen}
        onClose={handleCloseQuickview}
        translations={translations}
        locale={locale}
      />

      {/* Pass collection filter props to external components if needed */}
      {showCollectionFilter && (
        <div className="hidden">
          <div
            data-collection-filter-state={JSON.stringify({
              selectedCollectionId,
            })}
          />
        </div>
      )}
    </>
  );
}
