import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nellycollection.store';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/checkout/success',
          '/order-success?*',
          '*.json',
          '/temp/',
          '/private/'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/success',
          '/order-success?*'
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/success',
          '/order-success?*'
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}