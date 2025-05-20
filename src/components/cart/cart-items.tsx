"use client";

import { useShoppingCart } from "@/context/shopping-cart-context";
import ProductCard from "@/components/global/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useShoppingCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-zinc-500 mb-6">Your cart is empty</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col divide-y divide-zinc-200">
        {cartItems.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeFromCart}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
