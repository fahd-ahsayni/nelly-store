import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import SlideArrowButton from "@/components/ui/slide-arrow-button";

export default function CtaOne() {
  return (
    <div className="isolate bg-rose-50/70 relative z-0">
      <main>
        <div className=" px-6 lg:px-8">
          <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
            <svg
              className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:right-[calc(50%)] sm:h-[42.375rem]"
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
          <div className="mx-auto max-w-5xl py-16 sm:py-24 lg:pb-28 lg:pt-0">
            <div className="text-center">
              <h1 className="text-3xl md:text-6xl/24 text-zinc-800">
                This is a{" "}
                <span className="font-newyork italic">components</span>{" "}
                {/* eslint-disable-next-line */}
                <img
                  className="my-auto -mt-3 inline w-24 md:-mt-6 md:w-48 h-20 object-cover rounded-full"
                  width={192}
                  height={108}
                  src="https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494552.jpg?t=st=1747352398~exp=1747355998~hmac=28e3a3003dacf370da821d84a260e3a7c6119294a49508ac1b236f8340198da9&w=1380"
                  alt=""
                ></img>{" "}
                with special {/* eslint-disable-next-line */}
                <img
                  className="my-auto -mt-3 inline w-24 md:-mt-6 md:w-48 h-20 object-cover rounded-full"
                  width={192}
                  height={108}
                  src="https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288964.jpg?t=st=1747352698~exp=1747356298~hmac=fb438ccbd3b5e8b4173651ee36f90834e70b6bdad1120cdfdd6e3f614e9c4aed&w=1380"
                  alt=""
                ></img>{" "}
                image <span className="font-newyork italic">capabilities.</span>{" "}
                {/* eslint-disable-next-line */}
              </h1>
            </div>
            <div className="w-full flex justify-center mt-8">
              <SlideArrowButton text="Discover our new Collection" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
