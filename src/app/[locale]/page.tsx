import SvgStar from "@/assets/svgs";
import Banner from "@/components/layout/banner";
import Header from "@/components/layout/header";
import ImageCarousel from "@/components/layout/images-carousel";
import CollectionPerview from "@/components/pages/home/collections-perview";
import ProductList from "@/components/pages/home/product-list";
import TrendProduct from "@/components/pages/home/trend-product";
import { StoreProvider } from "@/components/providers/store-provider";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { carouselImages } from "@/constants";
import { type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { getProductsFull } from "@/lib/supabase-server";
import { cn } from "@/lib/utils";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  const products = await getProductsFull();

  return (
    <StoreProvider>
      <main>
        <section className="flex h-screen flex-col items-center w-full">
          <Banner text={translations.banner.text} />
          <nav className="w-full">
            <Header translations={translations} locale={locale} />
          </nav>
          <div className="relative w-full flex-1 isolate z-10">
            <div className="h-full overflow-hidden relative isolate flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                />
              </div>
              <div className="px-6 lg:col-span-5 lg:px-0 lg:h-full pb-6 lg:pb-0 flex-shrink-0">
                <div className="max-w-lg flex lg:h-full flex-col justify-center py-20">
                  <h1
                    className={cn(
                      "mt-8 lg:mt-24 tracking-tight text-pretty text-gray-800 sm:mt-10",
                      "ltr:font-serif ltr:text-5xl/14 ltr:sm:text-5xl/14 ltr:lg:text-5xl",
                      "rtl:font-semibold rtl:text-4xl rtl:sm:text-5xl rtl:lg:text-6xl rtl:leading-18"
                    )}
                  >
                    {translations.hero["tile-part1"]}{" "}
                    <span className="text-rose-600 ltr:italic">
                      {translations.hero["tile-part2"]}
                    </span>{" "}
                    {translations.hero["tile-part3"]}{" "}
                    <span className="text-rose-600 ltr:italic">
                      {translations.hero["tile-part4"]}
                    </span>
                    .
                  </h1>
                  <div className="mt-6 lg:mt-10 flex items-center gap-x-6">
                   <InteractiveHoverButton>
                      {translations.hero.button}
                   </InteractiveHoverButton>
                  </div>
                </div>
              </div>
              <div className="relative lg:col-span-7 lg:mt-0 lg:h-full ltr:lg:-mr-8 rtl:lg:-ml-8 flex-1 min-h-80 sm:min-h-96 lg:min-h-full">
                <ImageCarousel images={carouselImages} />
              </div>
            </div>
          </div>
        </section>
        <VelocityScroll
          dir="ltr"
          numRows={1}
          defaultVelocity={-3}
          className="bg-gray-900 py-4 relative z-20"
        >
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="text-rose-200 font-serif italic">Nelly Collection</span>
            <SvgStar className="w-7 h-7 text-rose-200 ml-4" />
          </span>
        </VelocityScroll>
        <ProductList
          translations={translations}
          locale={locale}
          initialProducts={products}
        />
        <TrendProduct translations={translations} locale={locale} />
        <CollectionPerview translations={translations} locale={locale} />
      </main>
    </StoreProvider>
  );
}
