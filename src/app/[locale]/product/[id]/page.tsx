"use client";

import { useInitializeStore } from "@/hooks/useStoreData";
import { useStore } from "@/store/useStore";
import { Color, ProductColor, ProductFull } from "@/types/database";
import { useEffect, useMemo, useState } from "react";
import ProductClient from "./product-client";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";
import { logo } from "@/assets";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ locale: string; id: string }>;
}

interface ResolvedParams {
  locale: string;
  id: string;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [resolvedParams, setResolvedParams] = useState<ResolvedParams | null>(
    null
  );

  const { isLoading: storeLoading } = useInitializeStore();

  // Use individual selectors to avoid selector instability
  const products = useStore((state) => state.products);
  const collections = useStore((state) => state.collections);
  const productColors = useStore((state) => state.productColors);
  const colors = useStore((state) => state.colors);

  // Resolve params once
  useEffect(() => {
    params.then(setResolvedParams).catch(console.error);
  }, [params]);

  // Memoize product computation
  const product = useMemo((): ProductFull | null => {
    if (!resolvedParams?.id || storeLoading || products.length === 0) {
      return null;
    }

    const foundProduct = products.find((p) => p.id === resolvedParams.id);
    if (!foundProduct) return null;

    const collection = collections.find(
      (c) => c.id === foundProduct.collection_id
    );
    if (!collection) return null;

    const productColorsWithColors = productColors
      .filter((pc) => pc.product_id === foundProduct.id)
      .map((pc) => {
        const color = colors.find((color) => color.id === pc.color_id);
        return color ? { ...pc, colors: color } : null;
      })
      .filter((pc): pc is ProductColor & { colors: Color } => pc !== null);

    return {
      ...foundProduct,
      collections: collection,
      product_colors: productColorsWithColors,
    };
  }, [
    resolvedParams?.id,
    storeLoading,
    products,
    collections,
    productColors,
    colors,
  ]);

  const isLoading = storeLoading || !resolvedParams;
  const productNotFound = !isLoading && !product && resolvedParams?.id;

  // Loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center !font-arabic relative isolate"
        dir="rtl"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:right-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="animate-pulse text-center">
          <div>
            <span className="flex flex-col justify-center items-center gap-4">
              <span className="sr-only">Nelly Collection</span>
              <Image
                alt="nelly collection"
                src={logo}
                className="h-20 w-auto"
              />
              <div className="flex items-center gap-2">
                <Spinner size={7} color="rose" />
                <h2 className="text-lg lg:text-3xl rtl:font-bold">
                  نيللي <span className="ltr:italic text-rose-600">كولكشن</span>
                </h2>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (productNotFound) {
    redirect("/");
  }
  return (
    <main dir="rtl" className="!font-arabic">
      <div className="bg-rose-600 text-white text-center py-2">
        <p className="text-sm">! نحن متحمسون للإعلان عن موقع إلكتروني جديد</p>
      </div>

      <div className="pb-20">
        <ProductClient product={product!} />
      </div>
    </main>
  );
}
