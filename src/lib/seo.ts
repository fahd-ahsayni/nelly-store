import { type Locale } from '@/i18n/config';
import { type Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  locale: Locale;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  price?: string;
  currency?: string;
  availability?: 'in_stock' | 'out_of_stock';
  category?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  locale,
  path = '',
  image = '/logo/logo.webp',
  type = 'website',
  price,
  currency = 'MAD',
  availability,
  category,
}: SEOProps): Metadata {
  const baseUrl = 'https://nellycollection.store';
  const url = `${baseUrl}/${locale}${path}`;
  
  const defaultTitle = locale === 'ar' 
    ? 'مجموعة نيللي - متجر الأزياء المحتشمة والحجاب الفاخر'
    : locale === 'fr'
    ? 'Collection Nelly - Mode Modeste Haut de Gamme & Boutique Hijab'
    : 'Nelly Collection - Premium Modest Fashion & Hijab Store';

  const defaultDescription = locale === 'ar'
    ? 'اكتشفي أجمل الأزياء المحتشمة، الحجابات، البوركينيات والعبايات في مجموعة نيللي. تصاميم أنيقة ومريحة من المؤثرة نيللي أميمة. شحن مجاني في المغرب.'
    : locale === 'fr'
    ? 'Découvrez la mode modeste haut de gamme, hijabs, burkinis et abayas chez Collection Nelly. Designs élégants et confortables par l\'influenceuse Nelly Oumaima. Livraison gratuite au Maroc.'
    : 'Discover premium modest fashion, hijabs, burkinis & abayas at Nelly Collection. Elegant, comfortable designs by influencer Nelly Oumaima. Free shipping in Morocco.';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;

  const metadata: Metadata = {
    title: finalTitle,
    description: finalDescription,
    keywords: keywords?.join(', '),
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
      type: type as any,
      locale: locale === 'ar' ? 'ar_MA' : locale === 'fr' ? 'fr_MA' : 'en_US',
      url: url,
      siteName: 'Nelly Collection',
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@NellyOumaima',
      creator: '@NellyOumaima',
      title: finalTitle,
      description: finalDescription,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'ar': `${baseUrl}/ar${path}`,
        'fr': `${baseUrl}/fr${path}`,
      },
    },
  };

  // Add product-specific metadata
  if (type === 'product' && price) {
    metadata.other = {
      'product:price:amount': price,
      'product:price:currency': currency,
      'product:availability': availability || 'in_stock',
      'product:category': category || 'Fashion',
      'product:brand': 'Nelly Collection',
      'product:retailer_item_id': path.split('/').pop() || '',
    };
  }

  return metadata;
}

export function generateProductStructuredData({
  id,
  name,
  description,
  price,
  currency = 'MAD',
  image,
  availability = 'InStock',
  category = 'Fashion',
  brand = 'Nelly Collection',
  sku,
  reviews,
  rating,
  locale,
}: {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  image: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  category?: string;
  brand?: string;
  sku?: string;
  reviews?: any[];
  rating?: number;
  locale: Locale;
}) {
  const baseUrl = 'https://nellycollection.store';
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image.startsWith('http') ? image : `${baseUrl}${image}`,
    "sku": sku || id,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "category": category,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": `https://schema.org/${availability}`,
      "url": `${baseUrl}/${locale}/product/${id}`,
      "seller": {
        "@type": "Organization",
        "name": "Nelly Collection"
      },
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": rating ? {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviews?.length || 1,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "review": reviews?.map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewBody": review.comment
    }))
  };
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
  locale: Locale
) {
  const baseUrl = 'https://nellycollection.store';
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
}

export const SEO_CONSTANTS = {
  SITE_NAME: 'Nelly Collection',
  DOMAIN: 'nellycollection.store',
  TWITTER_HANDLE: '@NellyOumaima',
  INSTAGRAM_HANDLE: '@nellyoumaima',
  PHONE: '+212781697996',
  EMAIL: 'contact@nellycollection.store',
  ADDRESS: {
    street: 'Boulevard Souhaib Arroumi, next to El Jazair Mosque',
    city: 'Sidi Bernoussi',
    region: 'Casablanca',
    country: 'MA',
    postalCode: '20000'
  },
  BUSINESS_HOURS: 'Mo-Sa 09:00-21:00',
  COORDINATES: {
    latitude: '33.6131',
    longitude: '-7.5897'
  }
};
