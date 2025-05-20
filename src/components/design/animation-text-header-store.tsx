"use client";

import { LayoutGroup, motion } from "motion/react";

import TextRotate from "@/components/fancy/text-rotate";

export default function AnimationTextHeaderStore() {
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl flex flex-row items-center justify-center bg-white dark:text-muted text-foreground font-light overflow-hidden">
      <LayoutGroup>
        <motion.span className="flex whitespace-pre" layout>
          <motion.span
            className="pt-0.5 sm:pt-1 md:pt-2"
            layout
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            Make it{" "}
          </motion.span>
          <TextRotate
            texts={[
              "work!",
              "fancy ✽",
              "right",
              "fast",
              "fun",
              "rock",
              "🕶️🕶️🕶️",
            ]}
            mainClassName="text-primary px-2 sm:px-2 md:px-3 bg-[#f4d1d3] overflow-hidden py-0.5 sm:py-1 justify-center"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.span>
      </LayoutGroup>
    </div>
  );
}
