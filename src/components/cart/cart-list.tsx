"use client";

import { useShoppingCart } from "@/context/shopping-cart-context";
import ProductCard from "@/components/global/product-card";

export default function CartList() {
  const { cartItems, updateQuantity, removeFromCart } = useShoppingCart();

  if (cartItems.length === 0) {
    return <div className="p-4 text-center">Your cart is empty</div>;
  }

  return (
    <div className="divide-y divide-zinc-200">
      {cartItems.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeItem={removeFromCart} // Pass the removeFromCart function here
        />
      ))}
    </div>
  );
}
