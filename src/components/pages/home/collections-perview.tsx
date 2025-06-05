import { COLLECTIONS_SECTION } from "@/constants";
import { FocusCards } from "@/components/animations/focus-cards";
import Link from "next/link";

export default function CollectionPerview({
  translations,
  locale,
}: {
  translations: any;
  locale: string;
}) {
  const cards = COLLECTIONS_SECTION.map((collection) => ({
    title: collection.name, // Fallback title
    src: typeof collection.image === "string" ? collection.image : collection.image.src,
    translationKey: collection.translationKey,
  }));

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
          <FocusCards
            cards={cards}
            customLayout={true}
            locale={locale}
            translations={translations}
          />
        </div>
      </div>
    </div>
  );
}
