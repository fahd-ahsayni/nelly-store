import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

function CreativeBtn({ text, width }: { text: string, width?: string }) {
  return (
    <>
      <div className={cn(!width ? "w-40" : width,"group relative cursor-pointer p-2  border border-neutral-600 bg-white overflow-hidden text-black text-center font-semibold")}>
        <span className="translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block tracking-wider">
          {text}
        </span>
        <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300 tracking-wider">
          <span>{text}</span>
          <ArrowRight />
        </div>
        <div className="absolute top-[40%] left-[18%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-rose-500 scale-[1] group-hover:bg-rose-500 group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] "></div>
      </div>
    </>
  );
}

export default CreativeBtn;
