"use client";

import { logo } from "@/assets";
import { useCartItemCount, useCartStore } from "@/stores/cartStore";
import { useWishlistItemCount, useWishlistStore } from "@/stores/wishlistStore";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Banner from "./banner";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Replace context hooks with Zustand store hooks
  const { openCart } = useCartStore();
  const { openWishlist } = useWishlistStore();

  // Get counts from Zustand stores for badges
  const cartCount = useCartItemCount();
  const wishlistCount = useWishlistItemCount();

  return (
    <header className="w-full bg-white relative z-50">
      <div className="w-full border-b border-border">
        <Banner />
        <nav
          data-state={isMenuOpen && "active"}
          className="px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center"
        >
          {/* Left section - Store and Home links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="hover:text-zinc-600 transition-colors text-lg"
            >
              Home
            </Link>
            <Link
              href="/store"
              className="hover:text-zinc-600 transition-colors text-lg"
            >
              Store
            </Link>
          </div>

          {/* Center section - Logo */}
          <div className="text-2xl md:text-3xl font-medium">
            <div className="flex items-center gap-1 lg:gap-2">
              <Image src={logo} alt="Logo" width={50} height={50} />
              <span className="text-2xl lg:text-3xl">Nelly Collection</span>
            </div>
          </div>

          {/* Right section - Wishlist and Cart icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors relative"
              aria-label="View wishlist"
              onClick={openWishlist}
            >
              <HeartIcon className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </button>
            <button
              className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors relative"
              aria-label="View shopping cart"
              onClick={openCart}
            >
              <ShoppingBagIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-2 relative z-[60] -m-2.5 -mr-4 block cursor-pointer p-2.5"
              onClick={() => {
                console.log("Menu state:", !isMenuOpen);
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              <Menu
                className={`m-auto size-6 transition-all duration-200 ${
                  isMenuOpen
                    ? "rotate-180 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                className={`absolute inset-0 m-auto size-6 transition-all duration-200 ${
                  isMenuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-180 scale-0 opacity-0"
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay with animation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full  z-[10000] overflow-hidden">
          <AnimatePresence>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="size-full border-b bg-white shadow-2xl shadow-zinc-300/20"
            >
              <div className="p-6">
                <ul className="space-y-6 text-base">
                  <li>
                    <Link
                      href="/"
                      className="text-zinc-700 hover:text-zinc-900 block duration-150 text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/store"
                      className="text-zinc-700 hover:text-zinc-900 block duration-150 text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Store</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </header>
  );
}
