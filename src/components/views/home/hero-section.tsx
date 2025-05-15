"use client";

import { noiseBackground, shoppingBagIcon } from "@/assets";
import Navbar from "@/components/global/navbar";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { SpinningText } from "@/components/ui/spinning-text";
import UnderlineToBackground from "@/components/ui/underline-to-background";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 grid grid-cols-12 w-full">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center col-span-12 md:col-span-5 w-full h-full px-6 lg:px-12 relative z-60 overflow-hidden"
        >
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
            className="w-full h-full object-cover absolute left-0 right-0 -z-20"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl relative md:text-5xl lg:text-[3.68vw] text-balance font-recolta leading-tight text-zinc-800 capitalize"
          >
            Elevate your <span className="font-newyork italic">style</span> with
            selections from <span className="font-newyork italic">Nelly</span>{" "}
            Collection.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10"
          >
            <InteractiveHoverButton>Shop Now</InteractiveHoverButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
        </motion.div>

        {/* Image Section */}
        <div className="col-span-12 md:col-span-7 w-full h-full relative">
          <div className="size-32 rounded-full absolute bottom-16 -left-16 z-60">
            <div className="relative w-full h-full z-20 rounded-full bg-white/60 border border-white/30 backdrop-blur-lg shadow-2xl shadow-rose-300/50 flex items-center justify-center">
              <SpinningText
                radius={5}
                fontSize={0.95}
                className="font-medium leading-none"
              >
                {`pre-order • pre-order • pre-order • `}
              </SpinningText>
              <Image
                src={shoppingBagIcon}
                alt="Shopping Bag Icon"
                width={25}
                height={25}
                className="absolute"
              />
            </div>
          </div>
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full"
            >
              <img
                src="https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288964.jpg?t=st=1747352698~exp=1747356298~hmac=fb438ccbd3b5e8b4173651ee36f90834e70b6bdad1120cdfdd6e3f614e9c4aed&w=1380"
                alt="Elegant woman in hijab showcasing Nelly Collection"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </main>
    </section>
  );
}
