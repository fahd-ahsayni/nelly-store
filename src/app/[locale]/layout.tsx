import { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/utils';
import '../globals.css';
import { cn } from '@/lib/utils';
import { ToastProvider } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({ subsets: ['arabic'] });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
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
  params
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
  const isRTL = locale === 'ar';
  const fontClass = locale === 'ar' ? cairo.className : inter.className;

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={cn(fontClass, "bg-background")}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}