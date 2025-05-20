"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sheet,
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetClose 
} from "@/components/ui/sheet";
import { useShoppingCart } from "@/context/shopping-cart-context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProductCard from "./product-card";

export default function ShoppingCart() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart } = useShoppingCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => {
      if (!open) closeCart();
    }}>
      <SheetContent side="right" className="w-full max-w-md p-0 border-l border-zinc-200">
        <div className="flex h-full flex-col bg-white shadow-xl">
          {/* Header */}
          <div className="px-4 py-6 sm:px-6">
            <SheetHeader>
              <div className="flex items-start justify-between">
                <SheetTitle className="text-lg text-zinc-900">
                  Shopping Cart
                </SheetTitle>
                <SheetClose className="rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:outline-hidden">
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </SheetClose>
              </div>
            </SheetHeader>
          </div>

          {/* Main content - scrollable area */}
          {cartItems.length > 0 ? (
            <>
              <ScrollArea className="flex-1 px-4 sm:px-6">
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
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-zinc-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button className="w-full rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6">
              <p className="text-lg text-zinc-500">
                Your cart is empty
              </p>
              <SheetClose
                className="mt-4 rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                Continue Shopping
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
