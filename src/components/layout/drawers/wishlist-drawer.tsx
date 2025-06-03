"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Heading } from "../../ui/heading";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  translations: any;
}

export default function WishlistDrawer({ 
  open, 
  onClose, 
  translations 
}: WishlistDrawerProps) {
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
            "relative flex w-full max-w-md flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out",
            "ltr:ml-auto ltr:data-closed:translate-x-full rtl:mr-auto rtl:data-closed:-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
            <Heading className="text-lg font-medium text-gray-900">
              {translations.navigation.favorites}
            </Heading>
            <button
              type="button"
              onClick={onClose}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{translations.navigation.closeMenu}</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <HeartIcon className="w-10 h-10 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                Your wishlist is empty
              </h3>
              <p className="text-sm text-gray-500">
                Add items you love to save them for later
              </p>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
