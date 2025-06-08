import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nellycollection.store'; // Replace with your actual domain
  
  // Generate URLs for each locale
  const urls = locales.flatMap(locale => [
    // Home pages
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
    // Store pages
    {
      url: `${baseUrl}/${locale}/store`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/store`])
        )
      }
    },
    // Order success pages
    {
      url: `${baseUrl}/${locale}/order-success`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}/order-success`])
        )
      }
    },
    // Add more pages here as your app grows
    // Example:
    // {
    //   url: `${baseUrl}/${locale}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    //   alternates: {
    //     languages: Object.fromEntries(
    //       locales.map(l => [l, `${baseUrl}/${l}/about`])
    //     )
    //   }
    // },
  ]);

  return urls;
}