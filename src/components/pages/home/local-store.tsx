import SlideArrowButton from "@/components/ui/slide-arrow-button";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LocalStoreSection({
  translations,
  locale,
}: {
  translations: any;
  locale: string;
}) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 relative">
      <div className="mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-stretch">
          {/* Store Image */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden bg-gray-100">
              <img
                src="https://ik.imagekit.io/r3dmzmb1w/2151623460.jpg?updatedAt=1749069279348"
                alt="Local store interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Store Information */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 bg-rose-200 border border-gray-600 px-6">
            <div>
              <h2 className="text-4xl md:text-5xl ltr:font-serif font-medium text-gray-800 mb-4">
                {translations.localStore.title}{" "}
                <span className="ltr:italic text-rose-600">
                  {translations.localStore.titleHighlight}
                </span>
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                {translations.localStore.description}
              </p>
            </div>

            {/* Store Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {translations.localStore.address}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {translations.localStore.hours}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  {translations.localStore.phone}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/visit">
                <SlideArrowButton
                  className="min-w-0 cursor-pointer"
                  text={translations.localStore.visitButton}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
