import Banner from "@/components/layout/banner";
import Header from "@/components/layout/header";
import ShopContent from "@/components/pages/shop/shop-content";
import { Button } from "@/components/ui/button";
import { Input, InputGroup } from "@/components/ui/input";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { getCollections, getProductsFull, getColors } from "@/lib/supabase-server";

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
          <div className="min-w-2xl flex gap-x-4">
            <InputGroup>
              <MagnifyingGlassIcon data-slot="icon" />
              <Input
                className="flex-1 w-full h-full"
                placeholder={translations.shop?.searchPlaceholder || "Search products..."}
                data-search-input
              />
            </InputGroup>
            <Button color="rose" data-search-button>
              {translations.shop?.search || "Search"}
            </Button>
          </div>
          <Button outline data-filter-button>
            <FunnelIcon className="w-4 h-4 mr-2" />
            {translations.shop?.filter || "Filter"}
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
    </div>
  );
}
