import SlideArrowButton from "@/components/ui/slide-arrow-button";
import { MEDIA_ASSETS } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function TrendProduct({
  translations,
  locale,
}: {
  translations: any;
  locale: string;
}) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pb-20 relative z-20 isolate">
      <div className="mb-8">
        <h2 className="ltr:md:text-5xl rtl:md:text-4xl ltr:text-4xl rtl:text-3xl text-gray-800 ltr:font-serif rtl:font-semibold font-medium">
          {translations.trendProduct["title-part1"]}{" "}
          <span className="ltr:italic text-rose-600">
            {translations.trendProduct["title-part2"]}
          </span>
        </h2>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-12 mt-4 gap-4 md:gap-x-2">
        <div className="md:col-span-8 group md:min-h-[600px] min-h-[400px]">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              fill
              src={MEDIA_ASSETS.TREND_PRODUCT}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Anti-tache serum bottle"
            />
          </div>
        </div>
        <div className="md:col-span-4 bg-rose-200 border border-border flex flex-col justify-end p-4 md:p-6">
          <div className="mb-4 md:mb-8">
            <h2 className="text-2xl md:text-4xl text-gray-900 ltr:font-medium ltr:font-serif rtl:font-bold lg:rtl:leading-14">
              {translations.trendProduct.title}
            </h2>
            <p className="mt-4 text-gray-700 text-sm md:text-base">
              {translations.trendProduct.paragraph}
            </p>
          </div>
          <Link href={`/${locale}/shop`}>
            <SlideArrowButton
              className="min-w-0 cursor-pointer"
              text={translations.trendProduct.ctaButton}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
