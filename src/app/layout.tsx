import { StoreProvider } from "@/providers/store-provider";
import ShoppingCart from "@/components/global/shopping-cart";
import WishlistDrawer from "@/components/global/wishlist-drawer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Shop",
  description: "Modern e-commerce application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <StoreProvider>
            <ShoppingCart />
            <WishlistDrawer />
            {children}
          </StoreProvider>
      </body>
    </html>
  );
}
