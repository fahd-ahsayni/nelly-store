import SlideArrowButton from "@/components/ui/slide-arrow-button";
import Image from "next/image";

export default function CtaOne() {
  return (
    <div className="isolate relative z-0 py-12 lg:py-24">
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
              <h1 className="text-4xl/14 md:text-7xl/24 font-serif">
                Modest{" "}
                <span className="text-rose-600 font-light italic">
                  {" "}
                  fashion
                </span>{" "}
                <Image
                  className="my-auto -mt-3 inline w-24 md:-mt-6 md:w-48 md:h-20 h-12 object-cover rounded-full"
                  width={192}
                  height={108}
                  src="https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288908.jpg?t=st=1747869028~exp=1747872628~hmac=feba7fcea83f334d6e498313164f450e3711843c6a90b74c7a5efb6b99a1ec76&w=900"
                  alt="Product image"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                ></Image>{" "}
                designed for{" "}
                <Image
                  className="my-auto -mt-3 inline w-24 md:-mt-6 md:w-48 md:h-20 h-12 object-cover rounded-full"
                  width={192}
                  height={108}
                  src="https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494550.jpg?t=st=1747869095~exp=1747872695~hmac=7386e5c28be28baffbf57bf1980ae18f06f3050bec81ff461c3d0da21d39480d&w=900"
                  alt="Product image"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                ></Image>{" "}
                <span className="text-rose-600 font-light italic">
                  confidence
                </span>{" "}
                and{" "}
                <span className="text-rose-600 font-light italic">grace</span>.
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
