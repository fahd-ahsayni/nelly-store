import { serumImage } from "@/assets";
import SlideArrowButton from "@/components/ui/slide-arrow-button";
import Image from "next/image";

export default function SerumSection() {
  return (
    <div className="w-full px-3 lg:px-8 pb-20">
      <div className="mb-8 max-w-lg">
        <h2 className="md:text-5xl text-4xl tracking-tight mb-2 font-serif">
          Anti-Tache{" "}
          <span className="italic font-light text-rose-600">Serum</span>
        </h2>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-12 mt-4 gap-4 md:gap-x-2 relative z-30">
        <div className="md:col-span-8 bg-zinc-200 min-h-[300px] md:min-h-[400px]">
          <Image
            src={serumImage}
            className="w-full h-full object-cover"
            alt="Anti-tache serum bottle"
          />
        </div>
        <div className="md:col-span-4 bg-accent-foreground border border-border flex flex-col justify-end p-4 md:p-6">
          <div className="mb-4 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-serif">
              Advanced Anti-Tache Serum{" "}
              <span className="italic">50% OFF</span>.
            </h2>
            <p className="mt-4 text-zinc-700 font-medium text-sm md:text-base">
              Our concentrated formula targets stubborn dark spots,
              hyperpigmentation, and uneven skin tone. Enriched with powerful
              brightening ingredients for visible results.
            </p>
          </div>
          <SlideArrowButton
            className="w-[200px] cursor-pointer"
            text="Shop now"
          />
        </div>
      </div>
    </div>
  );
}
