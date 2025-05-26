"use client";

import { useEffect, useState, memo, useRef } from "react";
import { logo } from "@/assets";
import Image from "next/image";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

interface LoadingScreenProps {
    isLoading: boolean;
    onLoadingComplete?: () => void;
}

const LoadingScreen = memo(function LoadingScreen({
    isLoading,
    onLoadingComplete,
}: LoadingScreenProps) {
    const [counters] = useState([
        [0, 0],
        [2, 7],
        [6, 5],
        [9, 8],
        [9, 9]
    ]);
    
    // Refs for animation elements
    const loaderRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    
    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(CustomEase);
        CustomEase.create("hop", "0.9, 0, 0.1, 1");
        
        // Create main timeline
        const tl = gsap.timeline({
            delay: 0.3,
            defaults: {
                ease: "hop",
            },
            paused: true,
        });
        
        timelineRef.current = tl;
        
        // Animate counter digits
        const counts = document.querySelectorAll(".count");
        counts.forEach((count, index) => {
            const digits = count.querySelectorAll(".digit h1");
            
            tl.to(
                digits,
                {
                    y: "0%",
                    duration: 1,
                    stagger: 0.075,
                },
                index * 1
            );
            
            if (index < counts.length) {
                tl.to(
                    digits,
                    {
                        y: "-100%",
                        duration: 1,
                        stagger: 0.075,
                    },
                    index * 1 + 1
                );
            }
        });
        
        // Animate spinner fade out
        tl.to(".spinner", {
            opacity: 0,
            duration: 0.3,
        });
        
        // Animate logo words
        tl.to(
            ".word h1",
            {
                y: "0%",
                duration: 1,
            },
            "<"
        );
        
        // Animate divider
        tl.to(".divider", {
            scaleY: "100%",
            duration: 1,
            onComplete: () => {
                gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 })
            }});
        
        // Animate logo words exit
        tl.to("#word-1 h1", {
            y: "100%",
            duration: 1,
            delay: 0.3,
        });
        
        tl.to(
            "#word-2 h1",
            {
                y: "-100%",
                duration: 1,
            },
            "<"
        );
        
        // Animate overlay blocks exit
        tl.to(
            ".block",
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1,
                stagger: 0.1,
                delay: 0.75,
            },
            "<"
        );
        
        // Play the timeline
        tl.play();
        
        return () => {
            // Clean up animation
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, []);
    
    // Handle loading completion
    useEffect(() => {
        if (!isLoading && timelineRef.current) {
            // When data is loaded, jump to the final part of the animation
            const tl = timelineRef.current;
            const currentTime = tl.time();
            
            // If the animation hasn't reached the exit phase yet
            if (currentTime < tl.duration() - 2) {
                // Fast forward to the exit phase (adjust time as needed)
                tl.seek(tl.duration() - 2);
            }
            
            // After animation completes, call the completion handler
            tl.eventCallback("onComplete", () => {
                if (onLoadingComplete) {
                    onLoadingComplete();
                }
            });
        }
    }, [isLoading, onLoadingComplete]);
    
    return (
        <div ref={loaderRef} className="loader fixed inset-0 w-screen h-screen z-[9999] overflow-hidden">
            {/* Overlay blocks */}
            <div className="overlay absolute top-0 w-full h-full flex">
                <div className="block w-full h-full bg-zinc-800"></div>
                <div className="block w-full h-full bg-zinc-800"></div>
            </div>
            
            {/* Logo */}
            <div className="intro-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                <div className="word relative left-[-0.5rem] pr-1" id="word-1">
                    <h1 className="text-center text-white text-2xl md:text-5xl font-medium leading-none">
                        <span className="font-recoleta italic">Nelly</span>
                    </h1>
                </div>
                <div className="word" id="word-2">
                    <h1 className="text-center text-white text-2xl md:text-5xl font-medium leading-none">Collection</h1>
                </div>
            </div>
            
            {/* Divider */}
            <div className="divider absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white origin-top scale-y-0"></div>
            
            {/* Spinner */}
            <div className="spinner-container absolute bottom-[10%] left-1/2 -translate-x-1/2">
                <div className="spinner w-[50px] h-[50px] border-[1.4px] border-white border-t-white/[0.125] rounded-full animate-spin"></div>
            </div>
            
            {/* Counter */}
            <div className="counter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
                {counters.map((counterPair, index) => (
                    <div key={index} className="count absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex">
                        {counterPair.map((digit, digitIndex) => (
                            <div key={`${index}-${digitIndex}`} className="digit flex-1 pt-4">
                                <h1 className="font-recoleta text-[8rem] md:text-[15rem] font-normal text-white text-center transform translate-y-[120%]">
                                    {digit}
                                </h1>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default LoadingScreen;
