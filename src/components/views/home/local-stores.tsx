import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function LocalStores() {
  return (
    <div className="px-6 lg:px-8 py-16 sm:py-24 isolate relative">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
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
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-serif mb-3">
          Visit
          <span className="font-light text-rose-600 italic">
            Our Stores
          </span>{" "}
        </h2>
      </div>
      <div className="mx-auto max-w-7xl grid min-h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 px-0 lg:px-8 gap-4 h-[799px]">
        <div className="relative flex">
          <img
            alt=""
            src="https://img.freepik.com/free-photo/young-muslim-woman-taking-photo-ther-street_1157-48957.jpg?t=st=1747411439~exp=1747415039~hmac=674d9719db89257c91a907b50b6718947e042e1b440549fab2c29ddc4c188685&w=1380"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative flex w-full flex-col items-start justify-end bg-black/40 p-8 sm:p-12">
            <h2 className="text-lg font-medium text-white/75">Tanger</h2>
            <p className="mt-1 text-2xl font-medium text-white">
              Av 12 Novembre, 90000 Tanger
            </p>
            <InteractiveHoverButton className="mt-6">
              Want Localization ?
            </InteractiveHoverButton>
          </div>
        </div>
        <div className="relative flex">
          <img
            alt=""
            src="https://img.freepik.com/free-photo/fashion-model-grey-jacket-orange-shawl-with-sunglasses_114579-8601.jpg?t=st=1747411502~exp=1747415102~hmac=b891d340c41f1e0ec51201cebda5df7dca66d4199b6631107da87199172dc508&w=996"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative flex w-full flex-col items-start justify-end bg-black/40 p-8 sm:p-12">
            <h2 className="text-lg font-medium text-white/75">Casablanca</h2>
            <p className="mt-1 text-2xl font-medium text-white">
              N129, Av Elanamar{" "}
            </p>
            <InteractiveHoverButton className="mt-6">
              Want Localization ?
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 Z-10 transform-gpu overflow-hidden blur-3xl sm:top-3/5">
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
    </div>
  );
}
