import { cn } from "@/lib/utils";
import { StarIcon } from "@heroicons/react/24/solid";

interface Testimonial {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  rating: number;
  comment: {
    en: string;
    ar: string;
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
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: {
        en: "Amina S.",
        ar: "أمينة س.",
      },
      rating: 5,
      comment: {
        en: "The Serenity Hijab is so comfortable and breathable. Perfect for everyday wear!",
        ar: "حجاب السكينة مريح جداً وقابل للتنفس. مثالي للارتداء اليومي!",
      },
      image:
        "https://img.freepik.com/free-photo/medium-shot-beautiful-woman-posing_23-2149226589.jpg?t=st=1747400900~exp=1747404500~hmac=e663a83d410d65aba8594c18caa83e87bae7dadb9ab10a70bf737726f047c85a&w=1380",
    },
    {
      id: 2,
      name: {
        en: "Fatima K.",
        ar: "فاطمة ك.",
      },
      rating: 5,
      comment: {
        en: "I love how elegant the Cascade Collection looks. The fabric drapes beautifully!",
        ar: "أحب كيف تبدو مجموعة الشلال أنيقة. القماش ينسدل بجمال!",
      },
      image:
        "https://img.freepik.com/free-photo/close-up-hands-holding-beautiful-flowers_23-2149226642.jpg?t=st=1747401195~exp=1747404795~hmac=14c80c6614ce775bf6032ab489a0bdae4a0794dbb2c150edf6fa5382d6d7966a&w=1380",
    },
    {
      id: 3,
      name: {
        en: "Layla H.",
        ar: "ليلى ح.",
      },
      rating: 4,
      comment: {
        en: "The Everyday Essentials hijabs are perfect for my busy lifestyle. So easy to style!",
        ar: "حجابات الأساسيات اليومية مثالية لأسلوب حياتي المزدحم. سهلة التنسيق جداً!",
      },
      image:
        "https://img.freepik.com/free-photo/front-view-woman-holding-plant_23-2149642252.jpg?t=st=1747401299~exp=1747404899~hmac=7c25d44ef2b377c6cf947b478544220c4b85f368d22cdc214f7bdf7e20415d43&w=996",
    },
    {
      id: 4,
      name: {
        en: "Noor J.",
        ar: "نور ج.",
      },
      rating: 5,
      comment: {
        en: "The Premium Silk Collection feels luxurious and looks so elegant. Worth every penny!",
        ar: "مجموعة الحرير المميزة تشعر بالفخامة وتبدو أنيقة جداً. تستحق كل قرش!",
      },
      image:
        "https://img.freepik.com/free-photo/side-view-muslim-woman-posing-chair_23-2149642295.jpg?t=st=1747401346~exp=1747404946~hmac=084144869b0765a2a9d0b81690b28dae5136f9f023bab9380c391c83d8978cbd&w=996",
    },
  ];

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
          {testimonials.map((testimonial) => (
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
                  {locale === "ar" ? testimonial.name.ar : testimonial.name.en}
                </h3>
                <p className="text-gray-700 line-clamp-2">
                  {locale === "ar"
                    ? testimonial.comment.ar
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
