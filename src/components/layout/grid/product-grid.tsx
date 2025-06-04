"use client";

import ProductCard from "@/components/layout/cards/product-card";
import ProductQuickview from "@/components/layout/dialog/product-quickview";
import { FlipReveal, FlipRevealItem } from "@/components/animations/flip-reveal";
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

  // Fix flip keys logic - when no collection is selected or "all" is selected, show all products
  const flipKeys = !selectedCollectionId ? ["all"] : [selectedCollectionId];

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{translations.product.noProductsAvailable}</p>
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
        className="grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-5 xl:gap-x-8 mb-24"
      >
        {products.map((product) => (
          <FlipRevealItem
            key={product.id}
            flipKey={product.collection_id?.toString() || "uncategorized"}
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
