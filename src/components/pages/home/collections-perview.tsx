import { collection1, collection2, collection3, collection4 } from "@/assets";
import { FocusCards } from "@/components/animations/focus-cards";
import Link from "next/link";

export default function CollectionPerview({
  translations,
  locale,
}: {
  translations: any;
  locale: string;
}) {
  const cards = [
    {
      title: translations.collections.collection1,
      src: collection1.src || collection1,
    },
    {
      title: translations.collections.collection3,
      src: collection3.src || collection3,
    },
    {
      title: translations.collections.collection4,
      src: collection4.src || collection4,
    },
    {
      title: translations.collections.collection2,
      src: collection2.src || collection2,
    },
  ];

  return (
    <div className="pb-16 sm:py-24 relative isolate z-30">
      <div className="absolute inset-x-0 -Z-10 transform-gpu overflow-hidden blur-3xl sm:-top-3/5">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c43a5d" />
              <stop offset={1} stopColor="#f0b1bb" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mx-auto px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-x-4">
            <h2 className="ltr:md:text-5xl rtl:md:text-4xl ltr:text-4xl rtl:text-3xl text-gray-800 ltr:font-serif rtl:font-semibold font-medium">
              {translations.collections["title-part1"]}{" "}
              <span className="text-rose-600 ltr:italic">
                {translations.collections["title-part2"]}
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden font-medium text-rose-600 hover:text-rose-500 md:block"
          >
            {translations.collections.link}
            {locale === "ar" ? (
              <span aria-hidden="true" className="rtl:pr-1">
                &larr;
              </span>
            ) : (
              <span aria-hidden="true">&rarr;</span>
            )}
          </Link>
        </div>
        <div className="mt-8 sm:mt-12">
          <FocusCards cards={cards} customLayout={true} locale={locale} />
        </div>
      </div>
    </div>
  );
}
