import { StoreProvider } from "@/providers/store-provider";
import { LoadingProvider } from "@/providers/loading-provider";
import ShoppingCart from "@/components/global/shopping-cart";
import WishlistDrawer from "@/components/global/wishlist-drawer";
import type { Metadata } from "next";
import { Crimson_Pro, Montserrat } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap'
});
const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
});

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
    <html lang="en" className={`${crimsonPro.variable} ${montserrat.variable}`}>
      <body>
        {/* Wrap StoreProvider in Suspense to prevent unnecessary re-renders */}
        <Suspense fallback={null}>
          <StoreProvider>
          <LoadingProvider>
              {/* Fixed components that should persist through the animation */}
              <ShoppingCart />
              <WishlistDrawer />
              {/* Main content */}
              <main className="content-wrapper">{children}</main>
            </LoadingProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
