export const locales = ['en', 'ar', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français'
};

export const localeConfig = {
  locales,
  defaultLocale,
  localeNames
} as const; 