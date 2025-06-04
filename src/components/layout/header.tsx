"use client";

import { logo } from "@/assets";
import { useCart } from "@/hooks/useCart";
import { useTranslations } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  HeartIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heading } from "../ui/heading";
import CartDrawer from "./drawers/cart-drawer";
import WishlistDrawer from "./drawers/wishlist-drawer";
import LanguageSwitcher from "./language-switcher";
import { Button } from "../ui/button";

interface HeaderProps {
  translations: any;
  locale: string;
}

export default function Header({ translations, locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const t = useTranslations(translations);
  const { getTotalItems } = useCart();
  const pathname = usePathname();

  const isCurrentPage = (href: string) => {
    return pathname === href;
  };

  return (
    // Set the document direction based on locale conditions
    <div className="bg-white">
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
              // ltr: slide from left, rtl: slide from right
              "ltr:data-closed:-translate-x-full rtl:data-closed:translate-x-full"
            )}
          >
            <div className={cn("flex px-4 pt-5 pb-2 rtl:justify-end")}>
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
              {[
                { name: t("navigation.home"), href: `/${locale}` },
                { name: t("navigation.store"), href: `/${locale}/shop` },
              ].map((page) => (
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

      {/* Wishlist drawer */}
      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        translations={translations}
      />

      {/* Cart drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        translations={translations}
      />

      <header className="relative bg-white">
        <nav aria-label="Top" className="px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <Button
                plain
                type="button"
                onClick={() => setOpen(true)}
                className={cn(
                  "relative rounded-md bg-white p-2 text-gray-400 lg:hidden",
                  // In rtl, place button to the start (first)
                  "rtl:order-first"
                )}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">{t("navigation.menu")}</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </Button>

              {/* Flyout menus */}
              <div className="hidden lg:inline-block h-full">
                <div className="flex h-full rtl:space-x-6 ltr:space-x-6">
                  {[
                    { name: t("navigation.home"), href: `/${locale}` },
                    { name: t("navigation.store"), href: `/${locale}/shop` },
                  ].map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className={cn(
                        "flex items-center px-2 text-sm font-medium text-gray-700 hover:text-gray-800",
                        isCurrentPage(page.href) &&
                          " border-b-2 border-rose-500 -mb-px font-semibold"
                      )}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Logo */}
              <div
                className={cn("flex", locale === "ar" ? "mr-auto" : "ml-auto")}
              >
                <Link
                  href={`/${locale}`}
                  className="flex items-center lg:gap-x-2"
                >
                  <span className="sr-only">Nelly Collection</span>
                  <Image alt="" src={logo} className="lg:h-14 h-10 w-auto" />
                  <h2 className="ltr:font-serif text-lg lg:text-3xl rtl:font-bold">
                    {translations.navigation.logo.one}{" "}
                    <span className="ltr:italic text-rose-600">
                      {translations.navigation.logo.two}
                    </span>
                  </h2>
                </Link>
              </div>

              <div className="flex items-center ltr:ml-auto rtl:mr-auto">
                <div className="hidden ltr:lg:ml-8 rtl:lg:mr-8 lg:flex">
                  <LanguageSwitcher translations={t} showText={true} />
                </div>

                {/* Favorites */}
                <div className="flex ltr:lg:ml-6 rtl:lg:mr-6 ltr:ml-2 rtl:ml-2">
                  <button
                    onClick={() => setWishlistOpen(true)}
                    className="p-2 text-gray-700 hover:text-gray-800"
                  >
                    <span className="sr-only">{t("navigation.favorites")}</span>
                    <HeartIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Cart */}
                <div
                  className={cn(
                    "flow-root",
                    // ltr: margin left, rtl: margin right
                    "ltr:ml-2 ltr:lg:ml-6 rtl:mr-2 rtl:lg:mr-6"
                  )}
                >
                  <button
                    onClick={() => setCartOpen(true)}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-700 group-hover:text-gray-800"
                    />
                    <span
                      className={cn(
                        "text-sm font-medium text-gray-700 group-hover:text-gray-800",
                        "ltr:ml-2 rtl:mr-2"
                      )}
                    >
                      {getTotalItems()}
                    </span>
                    <span className="sr-only">{t("navigation.items")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
