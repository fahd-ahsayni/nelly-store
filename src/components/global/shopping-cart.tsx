"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useShoppingCart } from "@/context/shopping-cart-context";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProductCard from "./product-card";

export default function ShoppingCart() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart } = useShoppingCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Dialog open={isCartOpen} onClose={closeCart} className="relative z-[99]">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col bg-white shadow-xl">
                {/* Header */}
                <div className="px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg text-zinc-900">
                      Shopping Cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={closeCart}
                        className="relative rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:outline-hidden"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
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
                    <button
                      className="mt-4 rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                      onClick={closeCart}
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
