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
      <div className="grid w-full grid-cols-12 mt-4 gap-x-2 relative z-30">
        <div className="col-span-8 bg-zinc-200">
          <Image
            src={serumImage}
            className="w-full h-full object-cover"
            alt="Anti-tache serum bottle"
          />
        </div>
        <div className="col-span-4 bg-rose-300 border border-border flex flex-col justify-end p-6">
          <div className="mb-8">
            <h2 className="text-5xl font-serif">
              Advanced Anti-Tache Serum{" "}
              <span className="font- italic">50% OFF</span>.
            </h2>
            <p className="mt-4 text-zinc-700 font-medium">
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
