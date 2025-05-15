"use client";

import { Banner } from "@/components/global";
import CreativeBtn from "@/components/ui/creative-btn";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Header */}
      <header className="w-full z-10">
        <div className="w-full border-b border-zinc-900">
          <Banner />
          <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-medium">Nelly</div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-zinc-600 transition-colors">
                Collections
              </a>
              <a href="#" className="hover:text-zinc-600 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-zinc-600 transition-colors">
                Contact
              </a>
            </div>
            <button className="md:hidden">Menu</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-12 bg-hologram w-full">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center col-span-12 md:col-span-5 w-full h-full px-6 lg:px-12 relative z-10 overflow-hidden"
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl text-balance font-recolta leading-tight text-zinc-800"
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
            <CreativeBtn text="Shop Now" width="w-40" />
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 flex items-center gap-x-8"
          >
            <a href="#" className="group">
              <p className="underline underline-offset-4 tracking-wider group-hover:text-rose-700 transition-colors duration-300">
                LinkedIn
              </p>
            </a>
            <a href="#" className="group">
              <p className="underline underline-offset-4 tracking-wider group-hover:text-rose-700 transition-colors duration-300">
                TikTok
              </p>
            </a>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <div className="col-span-12 md:col-span-7 w-full h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-transparent to-transparent md:hidden z-10"></div>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full"
          >
            <img
              src="https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288964.jpg?t=st=1747304488~exp=1747308088~hmac=b19c40f726d88fd7a5d85016861d2576fb0da783d314dcca1f349a89f322ec01&w=1380"
              alt="Elegant woman in hijab showcasing Nelly Collection"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </main>
    </section>
  );
}
