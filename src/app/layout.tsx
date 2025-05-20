import { ConfirmDialog } from "@/components/global/confirm-dialog";
import ShoppingCart from "@/components/global/shopping-cart";
import WishlistDrawer from "@/components/global/wishlist-drawer";
import {
  ShoppingCartProvider,
  WishlistDrawerProvider,
  DialogProvider,
  SupabaseProvider,
  FilterProvider,
} from "@/context";
import type { Metadata } from "next";
import { Lora } from "next/font/google"; // Import Lora
import { addProductDebugging } from "@/utils/product-debug";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Initialize Lora font
const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

// Only add debugging in development
if (process.env.NODE_ENV === "development") {
  // Call this on the client side only
  if (typeof window !== "undefined") {
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lora.className} w-screen overflow-x-hidden bg-rose-50`}
      >
        {/* Apply Lora font class */}
        <FilterProvider>
          <SupabaseProvider>
            <DialogProvider>
              <ShoppingCartProvider>
                <WishlistDrawerProvider>
                  {children}
                  <ShoppingCart />
                  <WishlistDrawer />
                  <Toaster />
                </WishlistDrawerProvider>
              </ShoppingCartProvider>
            </DialogProvider>
          </SupabaseProvider>
        </FilterProvider>
      </body>
    </html>
  );
}
