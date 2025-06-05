import { Locale } from './config';

// Cache for loaded translations
const translationCache = new Map<Locale, any>();

export async function getTranslations(locale: Locale) {
  // Check cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale);
  }

  try {
    const translations = await import(`./translations/${locale}.json`);
    translationCache.set(locale, translations.default);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to English
    const fallback = await import('./translations/ar.json');
    return fallback.default;
  }
}

// Get nested translation value by path
export function getTranslation(translations: any, path: string): string {
  const keys = path.split('.');
  let value = translations;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      console.warn(`Translation not found for path: ${path}`);
      return path; // Return the path as fallback
    }
  }
  
  return value;
}

// Hook for client components
export function useTranslations(translations: any) {
  return (path: string) => getTranslation(translations, path);
} 