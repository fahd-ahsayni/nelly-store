import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface SlideArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  primaryColor?: string;
}

export default function SlideArrowButton({
  text = "Get Started",
  primaryColor = "hsl(355, 46%, 58%)",
  className = "",
  ...props
}: SlideArrowButtonProps) {
  return (
    <button
      className={`group relative rounded-full border border-white bg-white p-2 text-xl font-semibold ${className}`}
      {...props}
    >
      <div
        className="absolute ltr:left-0 rtl:right-0 top-0 flex h-full w-11 items-center ltr:justify-end rtl:justify-start rounded-full transition-all duration-200 ease-in-out group-hover:w-full"
        style={{ backgroundColor: primaryColor }}
      >
        <span className="mr-3 text-white transition-all duration-200 ease-in-out">
          <ArrowRightIcon className="size-5 rtl:-scale-100" />
        </span>
      </div>
      <span className="relative ltr:left-4 rtl:right-4 z-10 whitespace-nowrap px-8 font-semibold text-black transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
        {text}
      </span>
    </button>
  );
}
