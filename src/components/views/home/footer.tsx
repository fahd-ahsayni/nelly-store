"use client";
import { profile } from "@/assets";
import AnimatedText from "@/components/ui/cursor-follow-text";
import Image from "next/image";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <div className="px-6 lg:px-8 bg-rose-50/70">
        <footer className="relative 2xl:h-[550px] h-fit lg:pb-20 w-full mx-auto rounded overflow-hidden">
          <div className="relative gap-10 sm:flex justify-between p-5 2xl:py-10 py-5 bg-rose-200 border border-zinc-800 rounded rounded-b-none">
            <div className="w-fit flex-col flex justify-center">
              <div className="2xl:w-24 2xl:h-24 w-20 h-20 ml-3 bg-rose-400 z-10 rounded before:z-0 before:absolute relative before:w-full before:h-full before:bg-rose-400/50  before:rounded-md before:-top-3 before:-left-3">
                <Image
                  src={profile}
                  alt=""
                  className="w-full h-full object-cover relative z-10 rounded"
                />
              </div>
              <article className="py-2 2xl:w-80 w-64 space-y-1">
                <h1 className="newFont text-3xl text-zinc-800">
                  Nelly Oumaima
                </h1>
                <p className="text-sm text-zinc-700">
                  Copy and paste designs that you love to have on your website.
                  Don't forget to share them with your friends. I'll bring more
                  and more components that really make sense for your design.
                </p>
              </article>
            </div>
            <div className="sm:block flex sm:mt-0 mt-4 gap-2 sm:w-auto w-full sm:space-y-2 relative z-[1]">
              <a
              href="https://www.instagram.com/yourInstagramUser/"
              target="_blank"
              className="bg-rose-50 sm:w-auto w-full aspect-square 2xl:p-10 p-5 rounded-lg flex items-center justify-center border border-zinc-800"
              >
              <FaInstagram className="sm:text-6xl absolute text-4xl text-rose-500" />
              </a>
              <a
              href="https://www.tiktok.com/@yourTiktokUser"
              target="_blank"
              className="bg-rose-50 sm:w-auto w-full aspect-square 2xl:p-10 p-5 rounded-lg flex items-center justify-center border border-zinc-800"
              >
              <FaTiktok className="sm:text-6xl text-4xl text-rose-600" />
              </a>
            </div>
          </div>
          <div className="lg:flex hidden">
            <AnimatedText
              text="Nelly Collection"
              className="2xl:text-[10rem] text-[10vw] font-newyork"
            />
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
