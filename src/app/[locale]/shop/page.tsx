import Banner from "@/components/layout/banner";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ShopContent from "@/components/pages/shop/shop-content";
import { Button } from "@/components/ui/button";
import { Input, InputGroup } from "@/components/ui/input";
import { type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import {
  getCollections,
  getColors,
  getProductsFull,
} from "@/lib/supabase-server";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ShopPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Shop({ params }: ShopPageProps) {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  // Fetch data on the server
  const [collections, products, colors] = await Promise.all([
    getCollections(),
    getProductsFull(),
    getColors(),
  ]);

  return (
    <div>
      <Banner text={translations.banner.text} />
      <div className="sticky top-0 z-30">
        <Header translations={translations} locale={locale} />
        <div className="items-center justify-between flex px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-gray-300">
          <div className="flex gap-x-2 sm:gap-x-4 flex-1">
            <InputGroup className="flex-1 !bg-gray-50">
              <MagnifyingGlassIcon data-slot="icon" />
              <Input
                className="flex-1 !w-52 lg:!w-96 h-full"
                placeholder={
                  translations.shop?.searchPlaceholder || "Search products..."
                }
                data-search-input
              />
            </InputGroup>
          </div>
          <Button
            color="rose"
            data-filter-button
            className="ml-2 sm:ml-4 flex-shrink-0"
          >
            <FunnelIcon className="w-4 h-4 mr-1 sm:mr-2 stroke-2" />
            <span className="hidden sm:inline">
              {translations.shop?.filter || "Filter"}
            </span>
            <span className="sm:hidden">
              {translations.shop?.filter || "Filter"}
            </span>
          </Button>
        </div>
      </div>
      <ShopContent
        collections={collections}
        products={products}
        colors={colors}
        translations={translations}
        locale={locale}
      />
      <Footer translations={translations} locale={locale} />
    </div>
  );
}
