import Banner from "@/components/layout/banner";
import Header from "@/components/layout/header";
import ProductList from "@/components/pages/home/product-list";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const translations = await getTranslations(locale);

  return (
    <main className="">
      <section className="flex h-screen flex-col items-center w-full">
        <Banner text={translations.banner.text} />
        <nav className="w-full">
          <Header translations={translations} locale={locale} />
        </nav>
        <div className="relative w-full flex-1">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 h-full overflow-hidden relative isolate">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
              />
            </div>
            <div className="px-6 lg:col-span-5 lg:px-0 lg:h-full pb-12 lg:pb-0">
              <div className="mx-auto max-w-lg lg:mx-0 flex lg:h-full flex-col justify-center">
                <h1 className="mt-24 text-5xl tracking-tight font-medium text-pretty text-gray-900 sm:mt-10 sm:text-5xl">
                  {translations.hero["tile-part1"]}{" "}
                  <span className="text-rose-600 italic">
                    {translations.hero["tile-part2"]}
                  </span>{" "}
                  {translations.hero["tile-part3"]}{" "}
                  <span className="text-rose-600 italic">
                    {translations.hero["tile-part4"]}
                  </span>
                  .
                </h1>
                <div className="mt-10 flex items-center gap-x-6">
                  <Button color="rose">Get started</Button>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-7 lg:-mr-8 lg:mt-0 lg:h-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
                className="aspect-3/2 w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="bg-gray-950 py-12"></div>
      <ProductList translations={translations} locale={locale} />
    </main>
  );
}
