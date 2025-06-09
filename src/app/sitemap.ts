import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nellycollection.store';
  
  // Generate URLs for each locale
  const urls = locales.flatMap(locale => [
    // Home pages - Highest priority
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}`])
        )
      }
    },
    // Store/Shop pages - Very high priority
    {
      url: `${baseUrl}/${locale}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/shop`])
        )
      }
    },
    // Collection pages - High priority
    {
      url: `${baseUrl}/${locale}/shop?collection=hijab`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/shop?collection=hijab`])
        )
      }
    },
    {
      url: `${baseUrl}/${locale}/shop?collection=burkini`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/shop?collection=burkini`])
        )
      }
    },
    {
      url: `${baseUrl}/${locale}/shop?collection=abaya`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/shop?collection=abaya`])
        )
      }
    },
    {
      url: `${baseUrl}/${locale}/shop?collection=foular`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/shop?collection=foular`])
        )
      }
    },
    // Legal pages - Medium priority
    {
      url: `${baseUrl}/${locale}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/privacy-policy`])
        )
      }
    },
    {
      url: `${baseUrl}/${locale}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/terms-of-service`])
        )
      }
    },
    // Checkout pages - Lower priority (user-specific)
    {
      url: `${baseUrl}/${locale}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/checkout`])
        )
      }
    },
    // Order success pages - Lowest priority (user-specific)
    {
      url: `${baseUrl}/${locale}/order-success`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.1,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/order-success`])
        )
      }
    }
  ]);

  // Add root domain redirect
  urls.unshift({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map(l => [l, `${baseUrl}/${l}`])
      )
    }
  });

  return urls;
}