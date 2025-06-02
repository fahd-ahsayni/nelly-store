import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/utils';
import '../globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const translations = await getTranslations(locale);
  
  return {
    title: translations.seo.title,
    description: translations.seo.description,
    openGraph: {
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const translations = await getTranslations(locale as Locale);
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={cn(inter.className, "bg-background")}>
        {children}
      </body>
    </html>
  );
} 