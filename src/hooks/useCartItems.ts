"use client";

import { useCartStore } from "@/lib/cart-store";

export interface CartItemFormatted {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  colorHex: string;
  size: string;
}

export function useCartItems(): CartItemFormatted[] {
  const items = useCartStore((state) => state.items);
  
  return items.map(item => ({
    id: item.id,
    productId: item.id, // Using the same ID as productId
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image || "",
    color: item.color || "",
    colorHex: item.colorHex || "",
    size: item.size || "",
  }));
}

export function useCartTotal(): number {
  return useCartStore((state) => state.getSubtotal());
}

// Re-export the cart store for convenience
export { useCartStore } from "@/lib/cart-store";
