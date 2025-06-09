import SvgStar from "@/assets/svgs";
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import Banner from "@/components/layout/banner";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ImageCarousel from "@/components/layout/images-carousel";
import CallToAction from "@/components/pages/home/call-to-action";
import CollectionPerview from "@/components/pages/home/collections-perview";
import CoverSection from "@/components/pages/home/cover-section";
import HomePageClient from "@/components/pages/home/home-page-client";
import LocalStoreSection from "@/components/pages/home/local-store";
import ProductList from "@/components/pages/home/product-list";
import TestimonialGrid from "@/components/pages/home/testimonials";
import TrendProduct from "@/components/pages/home/trend-product";
import StoreProvider from "@/components/providers/store-provider";
import { StructuredData } from "@/components/seo/structured-data";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { SpinningText } from "@/components/ui/spinning-text";
import { CAROUSEL_IMAGES } from "@/constants";
import { type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { getProductsFull } from "@/lib/supabase-server";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
      <StructuredData locale={locale} translations={translations} />
      <HomePageClient translations={translations} />
      <main>
        <div className="lg:absolute inset-0">
          <Banner text={translations.banner.text} />
          <nav className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
            <Header translations={translations} locale={locale} />
          </nav>
        </div>
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center w-full">
          <div className="relative w-full flex-1 isolate z-10">
            <div className="h-full overflow-hidden relative isolate">
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

              {/* Mobile Layout */}
              <div className="flex flex-col lg:hidden min-h-screen relative z-10">
                {/* Text Content - Mobile */}
                <div className="px-6 py-8 order-1 flex-shrink-0">
                  <div className="max-w-lg mx-auto text-center">
                    <h1
                      className={cn(
                        "tracking-tight text-gray-800",
                        "ltr:font-serif ltr:text-4xl/10 ltr:sm:text-5xl/12",
                        "rtl:font-semibold rtl:text-3xl rtl:sm:text-4xl text-balance rtl:leading-10 rtl:sm:leading-12"
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
                    <div className="mt-6 flex justify-center relative">
                      <Link href={`/${locale}/shop`}>
                        <InteractiveHoverButton>
                          {translations.hero.button}
                        </InteractiveHoverButton>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Image Content - Mobile */}
                <div className="relative order-2 flex-1 min-h-[60vh] sm:min-h-[70vh] w-full">
                  <Link
                    href={`/${locale}/shop`}
                    className="size-24 sm:size-32 rounded-full absolute -top-10 ltr:right-4 rtl:left-4 z-50"
                  >
                    <div className="relative w-full h-full z-10 rounded-full bg-white/60 border border-white/30 backdrop-blur-lg shadow-2xl shadow-rose-300/50 flex items-center justify-center">
                      <SpinningText
                        radius={locale === "ar" ? 6 : 5}
                        fontSize={0.7}
                        className="font-semibold leading-none text-gray-700"
                      >
                        {`pre-order • pre-order • pre-order • `}
                      </SpinningText>
                      <ArrowUpRightIcon
                        strokeWidth={1}
                        className="absolute text-gray-700 size-6 sm:size-8"
                      />
                    </div>
                  </Link>
                  <div className="absolute inset-0 w-full h-full">
                    <ImageCarousel images={CAROUSEL_IMAGES} />
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:min-h-screen">
                <div className="lg:col-span-5 lg:px-0 lg:h-full flex-shrink-0 relative">
                  <div className="max-w-lg flex lg:h-full flex-col justify-center py-20">
                    <h1
                      className={cn(
                        "tracking-tight text-gray-800 mt-12",
                        "ltr:font-serif ltr:text-6xl/18",
                        "rtl:font-semibold rtl:text-6xl text-balance rtl:leading-18"
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
                    <div className="mt-10 flex items-center gap-x-6">
                      <Link href={`/${locale}/shop`}>
                        <InteractiveHoverButton>
                          {translations.hero.button}
                        </InteractiveHoverButton>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="relative lg:col-span-7 lg:mt-0 lg:h-full ltr:lg:-mr-8 rtl:lg:-ml-8 flex-1 lg:min-h-full">
                  <Link
                    href={`/${locale}/shop`}
                    className="size-32 rounded-full absolute bottom-16 ltr:-left-16 rtl:-right-16 z-60"
                  >
                    <div className="relative w-full h-full z-10 rounded-full bg-white/60 border border-white/30 backdrop-blur-lg shadow-2xl shadow-rose-300/50 flex items-center justify-center">
                      <SpinningText
                        radius={locale === "ar" ? 6 : 5}
                        fontSize={0.9}
                        className="font-semibold leading-none text-gray-700"
                      >
                        {`pre-order • pre-order • pre-order • `}
                      </SpinningText>
                      <ArrowUpRightIcon
                        strokeWidth={1}
                        className="absolute text-gray-700 size-[40px]"
                      />
                    </div>
                  </Link>
                  <ImageCarousel images={CAROUSEL_IMAGES} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <VelocityScroll
          dir="ltr"
          numRows={1}
          defaultVelocity={-3}
          className="bg-white py-4 relative z-20 border border-gray-200 shadow-2xl shadow-rose-300/50"
        >
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="text-rose-500 font-serif italic">
              Nelly Collection
            </span>
            <SvgStar className="w-7 h-7 text-rose-500 ml-4" />
          </span>
        </VelocityScroll>
        <ProductList
          translations={translations}
          locale={locale}
          initialProducts={products}
        />
        <TrendProduct translations={translations} locale={locale} />
        <CollectionPerview translations={translations} locale={locale} />
        <RevealOnScroll effect="zoomIn">
          <CallToAction translations={translations} locale={locale} />
        </RevealOnScroll>
        <CoverSection translations={translations} locale={locale} />
        <TestimonialGrid translations={translations} locale={locale} />
        <VelocityScroll
          dir="ltr"
          numRows={1}
          defaultVelocity={-3}
          className="bg-white py-4 relative z-20 border border-gray-200 shadow-2xl shadow-rose-300/50"
        >
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="text-rose-500 font-serif italic">
              Nelly Collection
            </span>
            <SvgStar className="w-7 h-7 text-rose-500 ml-4" />
          </span>
        </VelocityScroll>
        <LocalStoreSection translations={translations} locale={locale} />
        <div className="h-24" />
        {/* Footer */}
        <Footer translations={translations} locale={locale} />
      </main>
    </StoreProvider>
  );
}
