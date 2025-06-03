import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  color?:
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo"
    | "gray"
    | "white"
    | "rose";
  className?: string;
}

export default function Spinner({
  size = 8,
  color = "white",
  className,
}: SpinnerProps) {
  const colorClasses = {
    blue: "border-blue-500 border-r-transparent",
    red: "border-red-500 border-r-transparent",
    green: "border-green-500 border-r-transparent",
    yellow: "border-yellow-500 border-r-transparent",
    purple: "border-purple-500 border-r-transparent",
    pink: "border-pink-500 border-r-transparent",
    indigo: "border-indigo-500 border-r-transparent",
    gray: "border-gray-500 border-r-transparent",
    white: "border-white border-r-transparent",
    rose: "border-rose-500 border-r-transparent",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-4 border-solid align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        colorClasses[color],
        className
      )}
      style={{
        width: `${size * 0.25}rem`,
        height: `${size * 0.25}rem`,
      }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
