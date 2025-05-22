"use client";

import { useEffect, useState, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { logo } from "@/assets";
import Image from "next/image";

interface LoadingScreenProps {
    isLoading: boolean;
    onLoadingComplete?: () => void;
}

const LoadingScreen = memo(function LoadingScreen({
    isLoading,
    onLoadingComplete,
}: LoadingScreenProps) {
    const logoControls = useAnimation();
    const textControls = useAnimation();
    const progressControls = useAnimation();
    const overlayControls = useAnimation();

    const [isExiting, setIsExiting] = useState(false);
    const [introAnimationComplete, setIntroAnimationComplete] = useState(false);

    // Initialize intro animation
    useEffect(() => {
        const introSequence = async () => {
            // Initial state setup (handled by `initial` prop on motion components)
            // Build the intro animation
            await Promise.all([
                logoControls.start({
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 1.2, ease: "easeOut" },
                }),
                textControls.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, ease: "easeOut", delay: 0.2 }, // Stagger after logo
                }),
            ]);
            // Start first phase of progress bar (animates to 50% representing data fetching period)
            await progressControls.start({
                width: "50%",
                transition: { duration: 1.5, ease: "easeInOut" }, // Duration for the first 50%
            });
            setIntroAnimationComplete(true);
        };

        introSequence();
    }, [logoControls, textControls, progressControls]); // Empty dependency array ensures it runs once

    // Handle fixed loading phase and exit animation
    useEffect(() => {
        if (!isLoading && introAnimationComplete && !isExiting) {
            const finalLoadAndExitSequence = async () => {
                // Second phase of progress bar: animate from current (should be 50%) to 100% in 2 seconds
                await progressControls.start({
                    width: "100%",
                    transition: { duration: 2, ease: "linear" }, // Fixed 2-second duration
                });

                setIsExiting(true); // Signal that exit animations should start

                // Exit animation sequence for content
                await Promise.all([
                    logoControls.start({
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeIn" },
                    }),
                    textControls.start({
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeIn", delay: 0.1 },
                    }),
                    progressControls.start({
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeIn", delay: 0.2 },
                    }),
                ]);

                // Exit animation for overlay
                await overlayControls.start({
                    translateY: "-100%",
                    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }, // cubic-bezier for power4.inOut
                });

                if (onLoadingComplete) {
                    onLoadingComplete();
                }
            };

            finalLoadAndExitSequence();
        }
    }, [
        isLoading,
        introAnimationComplete,
        isExiting,
        logoControls,
        textControls,
        progressControls,
        overlayControls,
        onLoadingComplete,
    ]);

    return (
        <div
            className="fixed inset-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
            style={{ pointerEvents: isExiting ? "none" : "auto" }} // Allow interaction until exit starts, then disable
        >
            {/* Overlay for exit animation */}
            <motion.div
                initial={{ translateY: "0%" }}
                animate={overlayControls}
                className="absolute inset-0 w-full h-full bg-white transform-gpu"
            />

            {/* Content container */}
            <div className="z-10 flex flex-col items-center justify-center pointer-events-none">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={logoControls}
                    className="mb-8"
                >
                    <Image
                        src={logo}
                        alt="Nelly Collection"
                        width={120}
                        height={120}
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* Loading text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={textControls}
                    className="mb-12 text-center"
                >
                    <p className="text-lg md:text-4xl text-zinc-800 tracking-wides font-recoleta">
                        Nelly Collection
                    </p>
                    <p className="text-sm text-zinc-500 mt-2">
                        Curating elegance for you
                    </p>
                </motion.div>

                {/* Loading bar */}
                <div className="w-48 h-[1.5px] bg-zinc-200 overflow-hidden">
                    <motion.div
                        initial={{ width: "0%", opacity: 1 }}
                        animate={progressControls}
                        className="h-full bg-rose-600"
                    />
                </div>
            </div>
        </div>
    );
});

export default LoadingScreen;
