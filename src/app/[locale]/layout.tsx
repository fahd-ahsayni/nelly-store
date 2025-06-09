import { LenisWrapper } from "@/components/lenis-wrapper";
import { locales, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  return {
    title: translations.seo.title,
    description: translations.seo.description,
    keywords: translations.seo.keywords,
    authors: [{ name: translations.seo.author }],
    creator: "IMFA Solutions",
    publisher: translations.seo.brandName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_MA" : locale === "fr" ? "fr_MA" : "en_US",
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => (l === "ar" ? "ar_MA" : l === "fr" ? "fr_MA" : "en_US")),
      url: `https://nellycollection.store/${locale}`,
      siteName: translations.seo.brandName,
      title: translations.seo.ogTitle,
      description: translations.seo.ogDescription,
      images: [
        {
          url: "/logo/logo.webp",
          width: 1200,
          height: 630,
          alt: `${translations.seo.brandName} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@NellyOumaima",
      creator: "@NellyOumaima",
      title: translations.seo.twitterTitle,
      description: translations.seo.twitterDescription,
      images: ["/logo/logo.webp"],
    },
    alternates: {
      canonical: `https://nellycollection.store/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://nellycollection.store/${l}`])
      ),
    },
    other: {
      "og:site_name": translations.seo.brandName,
      "og:type": "website",
      "article:author": translations.seo.author,
      "twitter:site": "@NellyOumaima",
      "twitter:creator": "@NellyOumaima",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const isRTL = locale === "ar";
  const fontClass = locale === "ar" ? tajawal.className : inter.className;

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className={cn(fontClass, "bg-background overflow-x-hidden")}>
        <LenisWrapper />
        {children}
        <ToastContainer
          position={locale === "ar" ? "top-left" : "top-right"}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={isRTL}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className={fontClass}
        />
      </body>
    </html>
  );
}
