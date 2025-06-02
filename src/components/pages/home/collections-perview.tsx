import { collection1, collection2, collection3, collection4 } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function CollectionPerview({translations, locale}: {translations: any; locale: string}) {
  return (
    <div className="pb-16 sm:pb-24 relative isolate">
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
            <h2 className="md:text-5xl text-4xl text-gray-800 font-serif">
              {translations.collection["title-part1"]}{" "}
              <span className="text-rose-600 italic">
                {translations.collection["title-part2"]}
              </span>
            </h2>
          </div>
          <Link
            href="/store"
            className="hidden font-medium text-rose-600 hover:text-rose-500 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:h-[700px]">
          {/* Card 1 */}
          <div className="relative h-[400px] sm:h-[450px] lg:h-auto lg:row-span-2">
            <div className="absolute rounded-l-lg inset-0 bg-white overflow-hidden">
              <Image
                src={collection1}
                alt="Collection Foulard"
                className="h-full w-full object-cover object-center brightness-75"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                <p className="mt-2 text-3xl font-semibold text-white text-center sm:text-left">
                  {translations.collection1}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative h-[400px] sm:h-[450px] lg:h-auto lg:col-start-2">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={collection3}
                alt="Collection des Robes"
                className="h-full w-full object-cover object-center brightness-75"
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                <p className="mt-2 text-3xl font-semibold text-white text-center sm:text-left">
                   {translations.collection3}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-[400px] sm:h-[450px] lg:h-auto lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={collection4}
                alt="Serum anti taches"
                className="h-full w-full object-cover object-center brightness-75"
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="relative flex h-full flex-col justify-end overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                  <p className="mt-2 text-3xl font-semibold text-white text-center sm:text-left">
                     {translations.collection4}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative rounded-r-lg overflow-hidden h-[400px] sm:h-[450px] lg:h-auto lg:col-start-3 lg:row-span-2">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={collection2}
                alt="Collection Khimar"
                className="h-full w-full object-cover object-center brightness-75"
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                <p className="mt-2 text-3xl font-semibold text-white text-center sm:text-left">
                   {translations.collection2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
