"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Heading } from "../../ui/heading";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  closeButtonLabel: string;
}

export default function CartDrawer({ 
  open, 
  onClose, 
  title, 
  closeButtonLabel 
}: CartDrawerProps) {
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
              {title}
            </Heading>
            <button
              type="button"
              onClick={onClose}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{closeButtonLabel}</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="px-4 py-6">
            <p className="text-sm text-gray-500">Your cart is empty</p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
