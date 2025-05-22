"use client";

import { noiseBackground, shoppingBagIcon } from "@/assets";
import Navbar from "@/components/global/navbar";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import ImageCarousel from "@/components/ui/images-carousel";
import { SpinningText } from "@/components/ui/spinning-text";
import UnderlineToBackground from "@/components/ui/underline-to-background";
import { carouselImages } from "@/constants";
import { useLoading } from "@/providers/loading-provider";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const { showPageContent } = useLoading();
  
  // Animation controls that only trigger when loading is complete
  const initialState = { opacity: 0, y: 20 };
  const animateState = showPageContent ? { opacity: 1, y: 0 } : initialState;
  const buttonAnimateState = showPageContent ? { opacity: 1 } : { opacity: 0 };
  
  return (
    <section className="flex flex-col w-full h-screen overflow-hidden">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 grid grid-cols-12 w-full">
        {/* Text Content */}
        <div className="flex flex-col justify-center col-span-12 md:col-span-5 w-full h-full px-6 lg:px-12 relative z-60 overflow-hidden">
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
          <Image
            src={noiseBackground}
            alt=""
            className="absolute inset-0 w-full h-full object-cover -z-20"
            priority
          />
          <motion.h1
            initial={initialState}
            animate={animateState}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl relative md:text-5xl lg:text-[3.68vw] text-balance font-recoleta leading-tight text-zinc-800 capitalize -mt-10"
          >
            Elevate your <span className="font-newyork italic">style</span> with
            selections from <span className="font-newyork italic">Nelly</span>{" "}
            Collection.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={buttonAnimateState}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 md:mt-10"
          >
            <InteractiveHoverButton>Shop Now</InteractiveHoverButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={initialState}
            animate={animateState}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 flex items-center gap-x-8"
          >
            <a href="#" className="group">
              <UnderlineToBackground
                label="Instagram"
                targetTextColor="#fff"
                className="cursor-pointer"
              />
            </a>
            <a href="#" className="group">
              <UnderlineToBackground
                label="Tiktok"
                targetTextColor="#fff"
                className="cursor-pointer"
              />
            </a>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="col-span-12 md:col-span-7 w-full h-full relative flex items-center">
            <div className="size-28 rounded-full absolute -top-16 md:top-auto md:bottom-16 right-8 md:-left-16 z-60">
            <div className="relative w-full h-full z-28 rounded-full bg-white/60 border border-white/30 backdrop-blur-lg shadow-2xl shadow-rose-300/50 flex items-center justify-center">
              <SpinningText
                radius={5}
                fontSize={0.9}
                className="font-semibold leading-none text-zinc-700"
              >
                {`pre-order • pre-order • pre-order • `}
              </SpinningText>
              <ArrowDownRight strokeWidth={1} className="absolute text-zinc-700 size-[40px]" />
            </div>
          </div>
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <ImageCarousel images={carouselImages} />
          </div>
        </div>
      </main>
    </section>
  );
}
