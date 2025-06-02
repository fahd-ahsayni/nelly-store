// Type definitions for translations
export interface Translations {
  common: {
    welcome: string;
    language: string;
    selectLanguage: string;
  };
  home: {
    title: string;
    description: string;
    getStarted: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

// Type-safe translation hook
export type TranslationFunction = (path: keyof Translations | `${keyof Translations}.${string}`) => string; 