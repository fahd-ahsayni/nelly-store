import { getTranslations } from "@/i18n/utils";
import { type Locale } from "@/i18n/config";
import { getCollections, getProductsFull } from "@/lib/supabase-server";
import ShopContent from "@/components/pages/shop/shop-content";
import Header from "@/components/layout/header";

interface ShopPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Shop({ params }: ShopPageProps) {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  // Fetch data on the server
  const [collections, products] = await Promise.all([
    getCollections(),
    getProductsFull(),
  ]);

  return (
    <div>
      <div className="sticky top-0 z-30">
        <Header translations={translations} locale={locale} />
      </div>
      <ShopContent
        collections={collections}
        products={products}
        translations={translations}
        locale={locale}
      />
    </div>
  );
}
