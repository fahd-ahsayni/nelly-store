export default function Banner({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:px-3.5 w-full">
      <p className="text-base/6 text-rose-200 text-center">{text}</p>
    </div>
  );
}
