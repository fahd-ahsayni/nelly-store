import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com'; // Replace with your actual domain
  
  // Generate URLs for each locale
  const urls = locales.flatMap(locale => [
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