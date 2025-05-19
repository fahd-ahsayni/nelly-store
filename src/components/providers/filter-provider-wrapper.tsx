"use client";

import { useSupabaseState } from "@/context";
import { useFilter } from "@/context/filter-context";
import { ReactNode, useEffect } from "react";

interface FilterProviderWrapperProps {
  children: ReactNode;
}

export default function FilterProviderWrapper({
  children,
}: FilterProviderWrapperProps) {
  const { products } = useSupabaseState();
  const { updateProducts } = useFilter();

  // Update products in filter context whenever they change in Supabase context
  useEffect(() => {
    if (products && products.length > 0) {
      updateProducts(products);
    }
  }, [products, updateProducts]);

  return <>{children}</>;
}
