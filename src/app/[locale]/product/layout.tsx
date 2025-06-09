import Banner from "@/components/layout/banner";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import StoreProvider from "@/components/providers/store-provider";
import { type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import {
  getCollections,
  getColors,
  getProductColors,
  getProductsFull,
} from "@/lib/supabase-server";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  // Fetch initial data for the store
  const [collections, products, colors, productColors] = await Promise.all([
    getCollections(),
    getProductsFull(),
    getColors(),
    getProductColors(),
  ]);

  const initialData = {
    collections,
    products,
    colors,
    productColors,
  };

  return (
    <StoreProvider initialData={initialData}>
      <div className="min-h-screen flex flex-col">
        {/* Banner */}
        <div className="bg-rose-600 text-white text-center py-2">
          <p className="text-sm">! نحن متحمسون للإعلان عن موقع إلكتروني جديد</p>
        </div>
        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </StoreProvider>
  );
}
