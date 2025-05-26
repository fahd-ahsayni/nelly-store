"use client";

import { useState } from "react";
import Banner from "./banner";
import Image from "next/image";
import { logo } from "@/assets";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MenuIcon } from "lucide-react";
import LogoVariable from "../design/logo-variable";
import Link from "next/link";
import { useCartItemCount, useCartStore } from "@/stores/cartStore";
import { useWishlistItemCount, useWishlistStore } from "@/stores/wishlistStore";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Replace context hooks with Zustand store hooks
  const { openCart } = useCartStore();
  const { openWishlist } = useWishlistStore();

  // Get counts from Zustand stores for badges
  const cartCount = useCartItemCount();
  const wishlistCount = useWishlistItemCount();

  return (
    <header className="w-full z-10 bg-white relative">
      <div className="w-full border-b border-border">
        <Banner />
        <nav className="px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
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
              className="md:hidden ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <MenuIcon className="w-6 h-6 text-zinc-800" />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 px-4 bg-white border-t border-zinc-200">
            <a
              href="/"
              className="block py-2 hover:text-zinc-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/store"
              className="block py-2 hover:text-zinc-600 transition-colors"
            >
              Store
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
