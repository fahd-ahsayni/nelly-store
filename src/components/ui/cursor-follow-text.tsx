"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  return (
    <div
      className={cn(
        `text-[15vw] text-center w-full left-0 -bottom-1 absolute leading-[80%] text-zinc-800`,
        className
      )}
    >
      {text}
    </div>
  );
};

export default AnimatedText;
