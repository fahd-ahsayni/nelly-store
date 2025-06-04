"use client";

import { ComponentProps, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type EffectType = "fadeIn" | "slideInRight" | "zoomIn" | "blurIn";

type RevealOnScrollProps = {
  effect?: EffectType;
} & ComponentProps<"div">;

export const RevealOnScroll = ({
  effect = "fadeIn",
  ...props
}: RevealOnScrollProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const element = wrapperRef.current;
      if (!element) return;

      // Clean Up
      animationRef.current?.scrollTrigger?.kill();
      animationRef.current?.kill();
      gsap.set(element, { clearProps: "all" });

      switch (effect) {
        case "fadeIn":
          animationRef.current = gsap.fromTo(
            element,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play pause play reverse",
              },
            }
          );
          break;
        case "slideInRight":
          animationRef.current = gsap.fromTo(
            element,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
          break;
        case "zoomIn":
          animationRef.current = gsap.fromTo(
            element,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
          break;

        case "blurIn":
          animationRef.current = gsap.fromTo(
            element,
            { y: 30, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
          break;
      }
      return () => {
        animationRef.current?.scrollTrigger?.kill();
        animationRef.current?.kill();
      };
    },
    { scope: wrapperRef, dependencies: [effect] }
  );

  return <div {...props} ref={wrapperRef} />;
};
