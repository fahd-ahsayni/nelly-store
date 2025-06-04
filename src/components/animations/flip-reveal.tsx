"use client";

import { ComponentProps, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

type FlipRevealItemProps = {
  flipKey: string;
} & ComponentProps<"div">;

export const FlipRevealItem = ({ flipKey, ...props }: FlipRevealItemProps) => {
  return <div data-flip={flipKey} {...props} />;
};

type FlipRevealProps = {
  keys: string[];
  showClass?: string;
  hideClass?: string;
} & ComponentProps<"div">;

export const FlipReveal = ({
  keys,
  hideClass = "hidden",
  showClass = "flex",
  ...props
}: FlipRevealProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const isShow = (key: string | null) => {
    if (!key) return false;
    // If "all" is in keys, show everything
    if (keys.includes("all")) return true;
    // Otherwise, show only if the key matches
    return keys.includes(key);
  };

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const items = gsap.utils.toArray<HTMLDivElement>(
        wrapperRef.current.querySelectorAll("[data-flip]")
      );

      // Only proceed if we have items
      if (items.length === 0) return;

      const state = Flip.getState(items);

      items.forEach((item) => {
        const key = item.getAttribute("data-flip");
        if (isShow(key)) {
          item.classList.remove(hideClass);
          item.classList.add(showClass);
        } else {
          item.classList.add(hideClass);
          item.classList.remove(showClass);
        }
      });

      Flip.from(state, {
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.03,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
            }
          ),
        onLeave: (elements) =>
          gsap.to(elements, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "back.in(1.7)",
          }),
      });
    },
    { scope: wrapperRef, dependencies: [keys] }
  );

  return <div {...props} ref={wrapperRef} />;
};
