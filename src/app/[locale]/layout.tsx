import { LenisWrapper } from "@/components/lenis-wrapper";
import { locales, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Footer from "@/components/layout/footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

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
    openGraph: {
      locale: locale,
      alternateLocale: locales.filter((l) => l !== locale),
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

  const translations = await getTranslations(locale as Locale);
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
        />
        <Footer translations={translations} locale={locale} />
      </body>
    </html>
  );
}
