import { products } from "@/constants";

export default function ProductsList() {
  return (
    <div className="bg-rose-50/50">
      <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-5xl tracking-tight text-gray-900 mb-8">
          <span className="font-newyork italic">Trending</span> products
        </h2>
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-x-4">
            {["All", "robs", "Hijab", "Khimar"].map((label) => {
              const isActive = label === "All";
              return (
                <button
                  key={label}
                  className={`px-6 py-1.5 border focus:outline-none transition-colors duration-200 font-medium tracking-wide ${
                    isActive
                      ? "bg-rose-600 text-white border-rose-600"
                      : "bg-white text-neutral-900 border-neutral-900 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <a
            href="#"
            className="hidden font-medium text-rose-600 hover:text-rose-500 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a href={product.href}>
                  <span className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.collection}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
