import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function Example() {
  return (
    <div className="bg-rose-50/70 pb-16 sm:pb-24 relative ">
      <div className="absolute inset-x-0 Z-10 transform-gpu overflow-hidden blur-3xl sm:-top-3/5">
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
            <h2 className="text-5xl tracking-tight text-gray-900">
              <span className="font-newyork italic">Discover</span> Our
              Collections
            </h2>
          </div>
          <a
            href="#"
            className="hidden font-medium text-rose-600 hover:text-rose-500 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px bg-white">
              <img
                src="https://img.freepik.com/free-photo/medium-shot-women-with-hijab-posing_23-2149226593.jpg?t=st=1747346824~exp=1747350424~hmac=c24b4d0324b0e68ba74c6b08f952db0735f0b886e699244af89ab7690d674cf7&w=1380"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative flex h-full flex-col justify-end items-center overflow-hidden">
              <div className="px-8 pb-8 pt-3 sm:px-10 sm:pb-10 sm:pt-0">
                <InteractiveHoverButton>Explore Now</InteractiveHoverButton>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg"></div>
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg">
              <img
                src="https://img.freepik.com/free-photo/beautiful-women-wearing-hijab_23-2149288896.jpg?t=st=1747347721~exp=1747351321~hmac=427aac5eb35df5ab4bab48271afaac0703386918f766265b1154efeb0cde4f3b&w=1380"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center brightness-75"
              />
            </div>
            <div className="relative flex h-full flex-col justify-end overflow-hidden">
              <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                <p className="mt-2 text-3xl font-medium tracking-tight text-white max-lg:text-center">
                  Performance
                </p>
                <p className="max-w-xs text-sm/6 text-zinc-100 text-balance max-lg:text-center">
                  Lorem ipsum, dolor sit amet.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px">
              <img
                src="https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288933.jpg?t=st=1747349135~exp=1747352735~hmac=9d8b4ba572e15600e89b7620a1927d782ce20749b812f68e68a92b3c3c57b0f3&w=1380"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center brightness-75"
              />
            </div>
            <div className="relative flex h-full flex-col justify-end overflow-hidden">
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  className="h-[min(152px,40cqw)] object-cover opacity-0"
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                  alt=""
                />
              </div>
              <div className="px-8 pb-8 sm:px-10 sm:pb-10">
                <p className="mt-2 text-3xl font-medium tracking-tight text-white max-lg:text-center">
                  Performance
                </p>
                <p className="mmax-w-xs text-sm/6 text-zinc-100 text-balance max-lg:text-center">
                  Lorem ipsum, dolor sit amet.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px">
              <img
                src="https://img.freepik.com/free-photo/women-wearing-hijab-medium-shot_23-2149226656.jpg?t=st=1747347470~exp=1747351070~hmac=b10bda9c70d63d91c8209cdea123d369140bb15e6dc675da66c43c940b20b8e9&w=996"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative flex h-full flex-col justify-end items-center overflow-hidden">
              <div className="px-8 pb-8 pt-3 sm:px-10 sm:pb-10 sm:pt-0">
                <InteractiveHoverButton>Explore Now</InteractiveHoverButton>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
