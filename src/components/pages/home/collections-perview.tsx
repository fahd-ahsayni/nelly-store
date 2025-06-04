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
            href={`/${locale}/shop`}
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
