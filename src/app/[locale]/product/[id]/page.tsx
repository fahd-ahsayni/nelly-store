import { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { generateProductStructuredData, generateSEOMetadata } from "@/lib/seo";
import { getProductsFull } from "@/lib/supabase-server";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductClient from "./product-client";
import Image from "next/image";
import { logo } from "@/assets";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface ProductPageProps {
  params: Promise<{ locale: Locale; id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const translations = await getTranslations(locale);

  try {
    const products = await getProductsFull();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return generateSEOMetadata({
        title: `${
          translations.errors?.productNotFound || "Product Not Found"
        } - Nelly Collection`,
        description:
          translations.errors?.productNotFound || "Product not found",
        locale,
        path: `/product/${id}`,
      });
    }

    const productName = product.name || `Product ${id}`;
    const productDescription =
      product.description || translations.seo.description;
    const price = product.price?.toString() || "";

    return generateSEOMetadata({
      title: `${productName} - Nelly Collection`,
      description: `${productDescription.substring(
        0,
        160
      )}... Shop premium modest fashion at Nelly Collection.`,
      keywords:
        locale === "ar"
          ? [
              "منتج",
              "أزياء محتشمة",
              "حجاب",
              "مجموعة نيللي",
              "تسوق",
              "أزياء نسائية",
            ]
          : locale === "fr"
          ? [
              "produit",
              "mode modeste",
              "hijab",
              "collection nelly",
              "shopping",
              "mode féminine",
            ]
          : [
              "product",
              "modest fashion",
              "hijab",
              "nelly collection",
              "shopping",
              "women fashion",
            ],
      locale,
      path: `/product/${id}`,
      price,
      currency: "MAD",
      availability: "in_stock",
      category: "Fashion",
      image: product.imagesrc || "/logo/logo.webp",
    });
  } catch (error) {
    return generateSEOMetadata({
      title: `Product - Nelly Collection`,
      description: translations.seo.description,
      locale,
      path: `/product/${id}`,
    });
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, id } = await params;
  const translations = await getTranslations(locale);

  try {
    const products = await getProductsFull();
    const product = products.find((p) => p.id === id);

    if (!product) {
      notFound();
    }

    // Generate product structured data
    const productStructuredData = generateProductStructuredData({
      id: product.id,
      name: product.name || `Product ${id}`,
      description: product.description || "",
      price: product.price || 0,
      currency: "MAD",
      image: product.imagesrc || "/logo/logo.webp",
      availability: "InStock",
      category: "Fashion",
      brand: "Nelly Collection",
      sku: product.id,
      rating: product.rating || undefined,
      locale,
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />
        <main dir="rtl" className="!font-arabic">
          <nav className="w-full bg-white border-b border-gray-200 px-4 py-2 lg:px-8 lg:py-3 flex items-center justify-between">
            <div>
              <Link href={`/ar`} className="flex items-center lg:gap-x-2">
                <span className="sr-only">Nelly Collection</span>
                <Image alt="" src={logo} className="lg:h-12 h-10 w-auto" />
                <h2 className="text-lg lg:text-2xl font-bold">
                  <span className="text-gray-900">نيللي </span>
                  <span className="text-rose-600">كولكشن</span>
                </h2>
              </Link>
            </div>
            <Link href="/ar" className="flex items-center flex-row-reverse gap-x-2">
              <div className="p-2 rounded-full border border-gray-300">
                {" "}
                <ArrowLeftIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
              </div>

              <p className="font-medium text-gray-800">توجه الى موقعنا على</p>
            </Link>
          </nav>
          <div className="pb-20">
            <ProductClient product={product} />
          </div>

          <div className="mx-auto mt-6 max-w-2xl lg:max-w-7xl sm:px-6 lg:gap-x-8 lg:px-8 pb-8">
            <div className="bg-gray-200 mt-16 flex items-center justify-between px-6 py-3">
              <span className="text-title text-sm">
                &copy; {new Date().getFullYear()} IMFA. جميع الحقوق محفوظة.
              </span>
              <Link
                href="/ar/privacy-policy"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    notFound();
  }
}
