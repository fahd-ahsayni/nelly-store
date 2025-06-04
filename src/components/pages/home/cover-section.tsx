import { SpinningText } from "@/components/ui/spinning-text";
import { ArrowDownRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CoverSection({
  translations,
  locale,
}: {
  translations: any;
  locale: string;
}) {
  return (
    <div className="mx-auto px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start md:gap-12 bg-rose-200 border border-gray-800 py-12 px-8 h-[550px] md:h-[400px] rounded">
          <h2 className="text-3xl ltr:md:text-5xl rtl:lg:text-4xl/14 ltr:font-serif rtl:-mt-4 rtl:font-semibold font-medium text-gray-800">
            {translations.coverSection.title}
          </h2>
          <div className="space-y-6 lg:pt-0 pt-4 text-gray-700 font-medium">
            <p>{translations.coverSection.subtitle}</p>
          </div>
        </div>
        <div className="relative ltr:-top-[200px] rtl:-top-[200px] px-6 lg:px-8 flex justify-center">
          <Link
            href={`/${locale}/shop`}
            className="size-40 absolute bg-gray-800 z-10 -bottom-20 lg:bottom-auto lg:-top-20 rounded-full ltr:lg:-mr-80 rtl:lg:-ml-80 flex items-center justify-center ring-8 lg:ring-rose-200 ring-rose-50"
          >
            <SpinningText
              radius={locale === "ar" ? 7 : 6}
              fontSize={1}
              className="text-rose-200"
            >
              {`shop now • shop now • shop now • `}
            </SpinningText>
            <ArrowDownRightIcon
              strokeWidth={1}
              className="absolute text-rose-200 size-14"
            />
          </Link>
          <video
            className="rounded w-full h-[500px] object-cover object-top bg-rose-100"
            loop
            muted
            autoPlay
            playsInline
          >
            <source src="/video/video-one.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
