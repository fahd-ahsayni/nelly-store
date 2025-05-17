"use client";

import { useState } from "react";
import Banner from "./banner";
import Image from "next/image";
import { logo, shoppingBagIcon } from "@/assets";
import { useShoppingCart } from "@/context/shopping-cart-context";
import { useWishlistDrawer } from "@/context/wishlist-drawer-context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openCart } = useShoppingCart();
  const { openWishlist } = useWishlistDrawer();

  return (
    <header className="w-full z-10 bg-white">
      <div className="w-full border-b border-zinc-900">
        <Banner />
        <nav className="px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
          {/* Left section - Store and Home links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className="hover:text-zinc-600 transition-colors text-lg"
            >
              Home
            </a>
            <a
              href="/store"
              className="hover:text-zinc-600 transition-colors text-lg"
            >
              Store
            </a>
          </div>

          {/* Center section - Logo */}
          <div className="text-3xl font-medium">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="Logo" width={50} height={50} />
              <span>Nelly collection</span>
            </div>
          </div>

          {/* Right section - Wishlist and Cart icons */}
          <div className="flex items-center gap-4">
            <button
              className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="View wishlist"
              onClick={openWishlist}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
            <button
              className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="View shopping cart"
              onClick={openCart}
            >
              <Image
                src={shoppingBagIcon}
                alt="Shopping Bag Icon"
                width={20}
                height={20}
              />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
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
