import { TESTIMONIALS, testimonials } from "@/constants";
import { cn } from "@/lib/utils";
import { StarIcon } from "@heroicons/react/24/solid";

export interface Testimonial {
  id: number;
  name: {
    en: string;
    ar: string;
    fr: string;
  };
  rating: number;
  comment: {
    en: string;
    ar: string;
    fr: string;
  };
  image: string;
}

export default function TestimonialGrid({
  locale,
  translations,
}: {
  locale: string;
  translations: any;
}) {
  return (
    <section className="pb-12 px-4 md:px-8 -mt-20">
      <div className="">
        <div className="text-center mb-10">
          <h2 className="ltr:md:text-5xl rtl:md:text-4xl ltr:text-4xl rtl:text-3xl text-gray-800 ltr:font-serif rtl:font-semibold font-medium">
            {translations.testimonials["title-part1"]}{" "}
            <span className="text-rose-600 ltr:italic">
              {translations.testimonials["title-part2"]}
            </span>{" "}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-orange-50 rounded overflow-hidden transition-shadow duration-300 border border-gray-600"
            >
              <div className="relative aspect-[3/3.5] h-[400px] overflow-hidden w-full">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={`${testimonial.name.en} wearing our hijab`}
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex mb-2 gap-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        "size-5",
                        i < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      )}
                    />
                  ))}
                </div>

                <h3 className="text-xl mb-1">
                  {locale === "ar"
                    ? testimonial.name.ar
                    : locale === "fr"
                    ? testimonial.name.fr
                    : testimonial.name.en}
                </h3>
                <p className="text-gray-700 line-clamp-2">
                  {locale === "ar"
                    ? testimonial.comment.ar
                    : locale === "fr"
                    ? testimonial.comment.fr
                    : testimonial.comment.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
