import { ConfirmDialog } from "@/components/global/confirm-dialog";
import ShoppingCart from "@/components/global/shopping-cart";
import WishlistDrawer from "@/components/global/wishlist-drawer";
import { ShoppingCartProvider, WishlistDrawerProvider, DialogProvider, SupabaseProvider } from "@/context";
import type { Metadata } from "next";
import { addProductDebugging } from '@/utils/product-debug';
import "./globals.css";

// Only add debugging in development
if (process.env.NODE_ENV === 'development') {
  // Call this on the client side only
  if (typeof window !== 'undefined') {
    addProductDebugging();
  }
}

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
        <SupabaseProvider>
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
        </SupabaseProvider>
      </body>
    </html>
  );
}
