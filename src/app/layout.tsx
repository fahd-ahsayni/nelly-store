import { ConfirmDialog } from "@/components/global/confirm-dialog";
import ShoppingCart from "@/components/global/shopping-cart";
import WishlistDrawer from "@/components/global/wishlist-drawer";
import { DialogProvider } from "@/context/dialog-context";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { WishlistDrawerProvider } from "@/context/wishlist-drawer-context";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern E-commerce",
  description: "A modern e-commerce website with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-screen overflow-x-hidden">
        <DialogProvider>
          <ShoppingCartProvider>
            <WishlistDrawerProvider>
              {children}
              <ShoppingCart />
              <WishlistDrawer />
              <ConfirmDialog />
            </WishlistDrawerProvider>
          </ShoppingCartProvider>
        </DialogProvider>
      </body>
    </html>
  );
}
