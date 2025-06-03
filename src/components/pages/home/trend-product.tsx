import SlideArrowButton from "@/components/ui/slide-arrow-button";

export default function TrendProduct({
  translations,
  locale,
}: {
  translations: any;
  locale: string;
}) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pb-20">
      <div className="mb-8">
        <h2 className="ltr:md:text-5xl rtl:md:text-4xl ltr:text-4xl rtl:text-3xl text-gray-800 ltr:font-serif rtl:font-semibold font-medium">
          {translations.trendProduct["title-part1"]}{" "}
          <span className="ltr:italic text-rose-600">
            {translations.trendProduct["title-part2"]}
          </span>
        </h2>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-12 mt-4 gap-4 md:gap-x-2 relative z-30">
        <div className="md:col-span-8 bg-gray-200 overflow-hidden min-h-[300px] md:min-h-[400px]">
          <img
            src="https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288964.jpg?t=st=1748902063~exp=1748905663~hmac=a44c8e3c62c09ea2753087023bffb9bc2a430566dd2d60dc98c41057dd4b488a&w=1380"
            className="w-full h-full object-cover"
            alt="Anti-tache serum bottle"
          />
        </div>
        <div className="md:col-span-4 bg-rose-200 border border-border flex flex-col justify-end p-4 md:p-6">
          <div className="mb-4 md:mb-8">
            <h2 className="text-2xl md:text-4xl text-gray-900 ltr:font-medium ltr:font-serif rtl:font-bold">
              {translations.trendProduct.title}
            </h2>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              {translations.trendProduct.paragraph}
            </p>
          </div>
          <SlideArrowButton
            className="w-[200px] cursor-pointer"
            text={translations.trendProduct.ctaButton}
          />
        </div>
      </div>
    </div>
  );
}
