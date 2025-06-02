"use client";

import { useTranslations } from "@/i18n/utils";
import { cn } from "@/lib/utils"; // Add this import
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
    Bars3Icon,
    HeartIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { Heading } from "../ui/heading";
import LanguageSwitcher from "./language-switcher";

interface HeaderProps {
  translations: any;
  locale: string;
}

export default function Header({ translations, locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations(translations);
  const isRTL = false;

  const navigation = {
    pages: [
      { name: t("navigation.home"), href: `/${locale}` },
      { name: t("navigation.store"), href: `/${locale}/store` },
    ],
  };

  return (
    <div className="bg-white" dir="ltr">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className={cn(
              "relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out",
              isRTL
                ? "data-closed:translate-x-full"
                : "data-closed:-translate-x-full"
            )}
          >
            <div className={cn("flex px-4 pt-5 pb-2", isRTL && "justify-end")}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">{t("navigation.closeMenu")}</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <LanguageSwitcher
                translations={t}
                className="w-full"
                showText={true}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <nav aria-label="Top" className="px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={cn(
                  "relative rounded-md bg-white p-2 text-gray-400 lg:hidden",
                  isRTL && "order-1"
                )}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">{t("navigation.menu")}</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Flyout menus */}
              <div className="hidden lg:inline-block">
                <div
                  className={cn(
                    "flex h-full",
                    isRTL ? "space-x-reverse space-x-8" : "space-x-8"
                  )}
                >
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Logo */}
              <div className={cn("flex", isRTL ? "mr-auto" : "ml-auto")}>
                <Link href="#" className="flex items-center gap-x-2">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=rose&shade=600"
                    className="h-8 w-auto"
                  />
                  <Heading>Nelly Collection</Heading>
                </Link>
              </div>

              <div
                className={cn(
                  "flex items-center",
                  isRTL ? "mr-auto" : "ml-auto"
                )}
              >
                <div className="hidden lg:ml-8 lg:flex">
                  <LanguageSwitcher translations={t} showText={true} />
                </div>

                {/* Favorites */}
                <div className="flex lg:ml-6">
                  <Link
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">{t("navigation.favorites")}</span>
                    <HeartIcon aria-hidden="true" className="size-6" />
                  </Link>
                </div>

                {/* Cart */}
                <div
                  className={cn(
                    "flow-root",
                    isRTL ? "mr-4 lg:mr-6" : "ml-4 lg:ml-6"
                  )}
                >
                  <Link href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span
                      className={cn(
                        "text-sm font-medium text-gray-700 group-hover:text-gray-800",
                        isRTL ? "mr-2" : "ml-2"
                      )}
                    >
                      0
                    </span>
                    <span className="sr-only">{t("navigation.items")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
