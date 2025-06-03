"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Heading } from "../../ui/heading";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Badge } from "@/components/ui/badge";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  translations: any;
}

export default function CartDrawer({
  open,
  onClose,
  translations,
}: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotalItems, getSubtotal } =
    useCart();

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-40">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className={cn(
            "relative flex w-full max-w-lg flex-col bg-gray-50 shadow-xl transition duration-300 ease-in-out h-full",
            "ltr:ml-auto ltr:data-closed:translate-x-full rtl:mr-auto rtl:data-closed:-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <Heading className="text-xl font-semibold text-gray-900">
              {translations.cart.title}{" "}
              <Badge color="rose">
                {totalItems}{" "}
                {totalItems === 1
                  ? translations.cart.item
                  : translations.cart.items}
              </Badge>
            </Heading>
            <button
              type="button"
              onClick={onClose}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{translations.navigation.closeMenu}</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCartIcon className="w-10 h-10 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {translations.cart.empty.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {translations.cart.empty.subtitle}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 px-6">
                {items.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex gap-4 p-4 bg-white border border-gray-100 transition-all duration-200">
                      <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-gray-900 truncate text-sm">
                              {item.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {item.size && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {translations.cart.size}: {item.size}
                                </span>
                              )}
                              {item.color && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {translations.cart.color}: {item.color}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            color="dark/white"
                            onClick={() => removeItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              color="dark/white"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <MinusIcon className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              color="dark/white"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <PlusIcon className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-gray-500">
                                ${item.price.toFixed(2)}{" "}
                                {translations.cart.each}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4 bg-white px-6 pb-6">
                <div className="flex justify-between text-base font-semibold">
                  <span>{translations.cart.total}</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  <Button className="w-full h-12 text-base font-medium">
                    {translations.cart.proceedToCheckout}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
