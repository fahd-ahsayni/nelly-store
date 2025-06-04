import Banner from "@/components/layout/banner";
import Header from "@/components/layout/header";
import ShopContent from "@/components/pages/shop/shop-content";
import { type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { getCollections, getProductsFull } from "@/lib/supabase-server";

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
      <Banner text={translations.banner.text} />
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
