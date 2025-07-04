import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL("https://nellycollection.store"),
  title: {
    template: "%s | Nelly Collection",
    default: "Nelly Collection - Premium Modest Fashion & Hijab Store"
  },
  description: "Discover premium modest fashion, hijabs, burkinis & abayas at Nelly Collection. Elegant, comfortable designs by influencer Nelly Oumaima. Free shipping in Morocco.",
  keywords: ["modest fashion", "hijab", "burkini", "abaya", "islamic fashion", "women fashion", "modest clothing", "hijab store", "burkini collection", "premium hijabs", "nelly collection", "morocco fashion", "muslim fashion", "modest wear"],
  authors: [{ name: "Nelly Oumaima" }],
  creator: "IMFA Solutions",
  publisher: "Nelly Collection",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nellycollection.store',
    siteName: 'Nelly Collection',
    title: 'Nelly Collection - Premium Modest Fashion Store',
    description: 'Shop premium modest fashion, hijabs, burkinis & abayas. Elegant designs by Nelly Oumaima. Free shipping in Morocco.',
    images: [
      {
        url: '/logo/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Nelly Collection Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@NellyOumaima',
    creator: '@NellyOumaima',
    title: 'Nelly Collection - Premium Modest Fashion & Hijab Store',
    description: 'Discover elegant modest fashion by @NellyOumaima. Premium hijabs, burkinis & abayas with free shipping in Morocco 🇲🇦',
    images: ['/logo/logo.webp'],
  },
  verification: {
    google: 'your-google-verification-code-here',
    yandex: 'your-yandex-verification-code-here',
    yahoo: 'your-yahoo-verification-code-here',
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
      fr: "/fr",
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Nelly Collection',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#f43f5e',
    'theme-color': '#f43f5e',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${tajawal.variable}`}>
      <body className="bg-background overflow-x-hidden">{children}</body>
    </html>
  );
}
