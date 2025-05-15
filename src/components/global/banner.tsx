export default function Banner() {
  return (
    <div className="relative bg-zinc-900">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="font-medium text-sm text-rose-200 tracking-wide">
            <span className="md:hidden">We announced a new product!</span>
            <span className="hidden md:inline">
              Big news! We're excited to announce a brand new product.
            </span>
            <span className="block sm:ml-2 sm:inline-block">
              <a
                href="#"
                className="font-bold text-rose-100 underline underline-offset-2"
              >
                Learn more
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
