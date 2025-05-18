export default function Banner() {
  return (
    <div className="relative bg-zinc-900">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="sm:px-16 text-center">
          <p className="font-medium text-sm text-rose-200 tracking-wide">
            <span className="md:hidden">We announced a new website!</span>
            <span className="hidden md:inline">
              Big news! We're excited to announce a new website.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
