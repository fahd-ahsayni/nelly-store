import { SpinningText } from "@/components/ui/spinning-text";
import { ArrowDownRight } from "lucide-react";

export default function CoverSection() {
  return (
    <div className="mx-auto px-6 lg:px-8 bg-rose-50/70">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 bg-rose-200 border border-zinc-800 py-12 px-8 h-[400px] md:h-[400px] rounded">
          <h2 className="text-5xl font-medium">
            The Lyra <span className="font-newyork italic">ecosystem</span>{" "}
            brings <span className="font-newyork italic">together</span> our
            models, products and platforms.
          </h2>
          <div className="space-y-6">
            <p>
              Lyra is evolving to be more than just the models. It supports an
              entire ecosystem — from products to the APIs and platforms helping
              developers and businesses innovate.
            </p>
          </div>
        </div>
        <div className="relative -top-[200px] px-6 lg:px-8 flex justify-center">
          <div className="size-40 absolute bg-zinc-800 z-10 -top-20 rounded-full -mr-80 flex items-center justify-center  ring-8 ring-rose-200">
            <SpinningText radius={6} fontSize={1} className="text-rose-200">
              shop now shop now shop now
            </SpinningText>
            <ArrowDownRight size={50} strokeWidth={1} className="absolute text-rose-200" />
          </div>
          <video
            className="rounded w-full h-[500px] object-cover object-top bg-rose-100"
            loop
            muted
            autoPlay
            playsInline
          >
            <source src="/video/video-one.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
