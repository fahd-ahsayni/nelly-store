import { SpinningText } from "@/components/ui/spinning-text";
import { ArrowDownRight } from "lucide-react";

export default function CoverSection() {
  return (
    <div className="mx-auto px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start md:gap-12 bg-accent-foreground border border-zinc-800 py-12 px-8 h-[550px] md:h-[400px] rounded">
          <h2 className="text-3xl lg:text-5xl font-serif">
            The <span className="font-light text-rose-600 italic"> Nelly Collection</span>{" "}
            Brings Together Modesty, Style, and Comfort.
          </h2>
          <div className="space-y-6 lg:pt-0 pt-4 text-zinc-700 font-medium">
            <p>
              We design modern, elegant pieces that let you express your values
              with confidence—clothing that fits beautifully and feels just
              right for everyday life.
            </p>
          </div>
        </div>
        <div className="relative -top-[200px] px-6 lg:px-8 flex justify-center">
          <div className="size-40 absolute bg-zinc-800 z-10 -bottom-20 lg:bottom-auto lg:-top-20 rounded-full lg:-mr-80 flex items-center justify-center  ring-8 lg:ring-rose-200 ring-rose-50">
            <SpinningText radius={6} fontSize={1} className="text-rose-200">
              shop now shop now shop now
            </SpinningText>
            <ArrowDownRight
              size={50}
              strokeWidth={1}
              className="absolute text-rose-200"
            />
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
