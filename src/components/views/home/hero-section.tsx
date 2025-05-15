export default function HeroSection() {
  return (
    <div className="relative bg-white">
      <div className="lg:gap-x-8 lg:grid lg:grid-cols-12 mx-auto lg:px-8 max-w-7xl">
        <div className="lg:col-span-7 xl:col-span-6 px-6 lg:px-0 pt-10 lg:pt-48 pb-24 sm:pb-32 lg:pb-56">
          <div className="mx-auto lg:mx-0 max-w-2xl">
            <img
              className="h-11"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <div className="hidden sm:flex sm:mt-32 lg:mt-16">
              <div className="relative px-3 py-1 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20 text-gray-500 text-sm leading-6">
                Anim aute id magna aliqua ad ad non deserunt sunt.{" "}
                <a
                  href="#"
                  className="font-semibold text-indigo-600 whitespace-nowrap"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className="mt-24 sm:mt-10 font-bold text-gray-900 text-4xl sm:text-6xl tracking-tight">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-gray-600 text-lg leading-8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="flex items-center gap-x-6 mt-10">
              <a
                href="#"
                className="bg-indigo-600 hover:bg-indigo-500 shadow-sm px-3.5 py-1.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 font-semibold text-white text-base leading-7"
              >
                Get started
              </a>
              <a
                href="#"
                className="font-semibold text-gray-900 text-base leading-7"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="xl:left-1/2 xl:absolute relative xl:inset-0 lg:col-span-5 lg:-mr-8 xl:mr-0">
          <img
            className="lg:absolute lg:inset-0 bg-gray-50 w-full lg:h-full object-cover aspect-[3/2] lg:aspect-auto"
            src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
