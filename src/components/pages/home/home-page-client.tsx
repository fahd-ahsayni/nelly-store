"use client";

import { useState } from "react";
import CartDrawer from "@/components/layout/drawers/cart-drawer";
import FloatingCartButton from "@/components/layout/floating-cart-button";

interface HomePageClientProps {
  translations: any;
}

export default function HomePageClient({ translations }: HomePageClientProps) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {/* Cart drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        translations={translations}
      />

      {/* Floating Cart Button for Mobile */}
      <FloatingCartButton onClick={() => setCartOpen(true)} />
    </>
  );
}
