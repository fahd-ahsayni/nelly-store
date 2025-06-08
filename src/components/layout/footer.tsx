"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Link from "next/link";
import { useState } from "react";

export default function Footer({
  translations,
  locale,
}: {
  translations: any;
  locale: string;
}) {
  const [time, setTime] = useState<string>("00:00:00");

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    setTime(`${hours}:${minutes}:${seconds}`);
  };

  useIsomorphicLayoutEffect(() => {
    // Update time immediately
    updateTime();

    // Set up interval to update time every second
    const interval = setInterval(updateTime, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8">
      <div className="px-3 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-4xl ltr:italic ltr:font-serif md:text-6xl tracking-tighter"
          >
            nellycollection.store
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-muted-foreground">
          <div className="text-sm">
            {translations.footer?.copyright ||
              `© imfa solutions ${currentYear}`}
          </div>

          <div className="text-sm flex items-center">
            {translations.footer?.timeLabel || "Time"}{" "}
            <span className="mx-1">→</span> {time}
          </div>

          <Link
            href={`mailto:${
              translations.footer?.contactEmail || "nelly@contact.com"
            }`}
            className="text-sm hover:text-foreground transition-colors"
          >
            {translations.footer?.contactEmail || "nelly@contact.com"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
