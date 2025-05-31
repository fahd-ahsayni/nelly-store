"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartDrawerState, useCartItems, useCartStore, useCartTotal } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import ProductCard from "./product-card";

export default function ShoppingCart() {
  const isCartOpen = useCartDrawerState();
  const cartItems = useCartItems();
  const subtotal = useCartTotal();
  const { closeCart, updateQuantity, removeFromCart } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => {
        if (!open) closeCart();
      }}
    >
      <SheetContent
        side="right"
        maxWidth="min-w-[95vw] lg:min-w-auto lg:max-w-sm"
        className="bg-white"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader>
            <SheetTitle className="text-lg">Shopping Cart</SheetTitle>
          </SheetHeader>
          {/* Main content - scrollable area */}
          {cartItems.length > 0 ? (
            <>
              <ScrollArea className="flex-1 px-2 sm:px-3">
                <div className="flex flex-col gap-2 py-2">
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

              {/* Checkout section - fixed at bottom */}
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-zinc-900">
                  <p>Subtotal</p>
                  <p>{subtotal.toFixed(2)} Dhs</p>
                </div>
                <p className="mt-0.5 text-sm text-zinc-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button 
                    onClick={handleCheckout}
                    className="w-full rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6">
              <p className="text-lg text-zinc-500">Your cart is empty</p>
              <SheetClose className="mt-4 rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                Continue Shopping
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
