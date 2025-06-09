import { type Locale } from '@/i18n/config';

interface StructuredDataProps {
  locale: Locale;
  translations: any;
}

export function StructuredData({ locale, translations }: StructuredDataProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nelly Collection",
    "alternateName": "مجموعة نيللي",
    "url": "https://nellycollection.store",
    "logo": "https://nellycollection.store/logo/logo.webp",
    "description": translations.seo.description,
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Nelly Oumaima",
      "jobTitle": "Fashion Designer & Influencer",
      "sameAs": [
        "https://instagram.com/nellyoumaima",
        "https://tiktok.com/@nellyoumaima"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Boulevard Souhaib Arroumi, next to El Jazair Mosque",
      "addressLocality": "Sidi Bernoussi",
      "addressRegion": "Casablanca",
      "addressCountry": "MA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+212781697996",
      "contactType": "customer service",
      "areaServed": "MA",
      "availableLanguage": ["Arabic", "French", "English"]
    },
    "sameAs": [
      "https://instagram.com/nellyoumaima",
      "https://tiktok.com/@nellyoumaima"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nelly Collection",
    "url": "https://nellycollection.store",
    "description": translations.seo.description,
    "publisher": {
      "@type": "Organization",
      "name": "Nelly Collection"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://nellycollection.store/${locale}/shop?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const ecommerceSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Nelly Collection",
    "description": translations.seo.description,
    "url": "https://nellycollection.store",
    "logo": "https://nellycollection.store/logo/logo.webp",
    "image": "https://nellycollection.store/logo/logo.webp",
    "priceRange": "50-500 MAD",
    "currenciesAccepted": "MAD",
    "paymentAccepted": ["Cash", "Credit Card"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Boulevard Souhaib Arroumi, next to El Jazair Mosque",
      "addressLocality": "Sidi Bernoussi",
      "addressRegion": "Casablanca",
      "postalCode": "20000",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.6131",
      "longitude": "-7.5897"
    },
    "openingHours": "Mo-Sa 09:00-21:00",
    "telephone": "+212781697996",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Modest Fashion Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Hijab Collection",
            "category": "Fashion/Modest Wear"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Burkini Collection",
            "category": "Fashion/Swimwear"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Abaya Collection",
            "category": "Fashion/Modest Wear"
          }
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": translations.navigation.home,
        "item": `https://nellycollection.store/${locale}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": locale === 'ar' ? "هل الشحن مجاني في المغرب؟" : locale === 'fr' ? "La livraison est-elle gratuite au Maroc ?" : "Is shipping free in Morocco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar' ? "نعم، نقدم شحن مجاني في جميع أنحاء المغرب للطلبات التي تزيد عن 200 درهم." : locale === 'fr' ? "Oui, nous offrons la livraison gratuite partout au Maroc pour les commandes de plus de 200 MAD." : "Yes, we offer free shipping throughout Morocco for orders over 200 MAD."
        }
      },
      {
        "@type": "Question",
        "name": locale === 'ar' ? "كم يستغرق التوصيل؟" : locale === 'fr' ? "Combien de temps prend la livraison ?" : "How long does delivery take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === 'ar' ? "عادة ما يستغرق التوصيل 24-48 ساعة داخل الدار البيضاء و2-4 أيام للمدن الأخرى." : locale === 'fr' ? "La livraison prend généralement 24-48 heures à Casablanca et 2-4 jours pour les autres villes." : "Delivery usually takes 24-48 hours in Casablanca and 2-4 days for other cities."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ecommerceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
