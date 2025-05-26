"use client";

import { LayoutGroup, motion } from "motion/react";

import TextRotate from "@/components/fancy/text-rotate";

export default function AnimationTextHeaderStore() {
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl flex flex-row items-center justify-center dark:text-muted text-foreground font-light overflow-hidden">
      <LayoutGroup>
        <motion.span className="flex whitespace-pre" layout>
          <motion.span
            className="font-serif"
            layout
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            Nelly {" "}
          </motion.span>
          <TextRotate
            texts={[
              "Collection ✽",
              "Authentic!",
              "Exclusives",
              "Premium ✨",
            ]}
            mainClassName="text-primary font-serif italic font-light overflow-hidden justify-center"
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

