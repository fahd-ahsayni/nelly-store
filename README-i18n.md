# Next.js Internationalization (i18n) Setup

This project implements a complete internationalization solution for Next.js with best practices for SEO and performance.

## Features

- **Multi-language support**: English (en), Arabic (ar), and French (fr)
- **Automatic locale detection** based on browser preferences
- **URL-based routing** for better SEO (`/en`, `/ar`, `/fr`)
- **RTL support** for Arabic
- **Performance optimized** with translation caching
- **SEO optimized** with proper meta tags and sitemap
- **Persistent language selection** using cookies

## Project Structure

```
src/
├── i18n/
│   ├── config.ts          # i18n configuration
│   ├── utils.ts           # Translation utilities
│   └── translations/      # Translation files
│       ├── en.json
│       ├── ar.json
│       └── fr.json
├── middleware.ts          # Locale detection and routing
├── app/
│   ├── [locale]/         # Locale-specific pages
│   │   ├── layout.tsx    # Locale layout with RTL support
│   │   └── page.tsx      # Example page with translations
│   ├── layout.tsx        # Root layout
│   ├── sitemap.ts        # Dynamic sitemap generation
│   └── robots.ts         # Robots.txt configuration
└── components/
    └── LanguageSwitcher.tsx  # Language selection component
```

## How It Works

### 1. **Middleware** (`src/middleware.ts`)
- Intercepts all requests
- Detects user's preferred language from browser settings
- Redirects to appropriate locale URL
- Stores language preference in cookies

### 2. **Translation Loading** (`src/i18n/utils.ts`)
- Lazy loads translation files
- Implements caching for better performance
- Provides fallback to English if translation is missing

### 3. **Dynamic Routing** (`src/app/[locale]/`)
- Uses Next.js dynamic segments for locale routing
- Generates static pages for all locales
- Provides locale-specific metadata

## Usage

### Adding New Translations

1. Add translation keys to all language files:

```json
// src/i18n/translations/en.json
{
  "newSection": {
    "title": "New Section",
    "description": "This is a new section"
  }
}
```

2. Use in your components:

```tsx
const translations = await getTranslations(locale);
<h1>{translations.newSection.title}</h1>
```

### Adding New Languages

1. Update `src/i18n/config.ts`:

```typescript
export const locales = ['en', 'ar', 'fr', 'es'] as const; // Add 'es'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  es: 'Español' // Add Spanish
};
```

2. Create translation file `src/i18n/translations/es.json`

3. The middleware and routing will automatically handle the new locale

### Creating New Pages

For each new page, create it under the `[locale]` directory:

```tsx
// src/app/[locale]/about/page.tsx
import { getTranslations } from '@/i18n/utils';
import { type Locale } from '@/i18n/config';

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: Locale };
}) {
  const translations = await getTranslations(locale);
  
  return (
    <div>
      <h1>{translations.about.title}</h1>
    </div>
  );
}
```

## SEO Best Practices Implemented

1. **URL Structure**: Each language has its own URL path (`/en`, `/ar`, `/fr`)
2. **Metadata**: Language-specific meta tags and descriptions
3. **Sitemap**: Automatically generated with alternate language links
4. **Hreflang Tags**: Proper language alternates for search engines
5. **RTL Support**: Automatic `dir="rtl"` for Arabic

## Performance Optimizations

1. **Static Generation**: All locale pages are statically generated
2. **Translation Caching**: Translations are cached after first load
3. **Lazy Loading**: Translations are loaded on-demand
4. **Cookie-based Persistence**: Language preference stored in cookies

## Testing the Setup

1. Visit `http://localhost:3000` - You'll be redirected to your browser's preferred language
2. Visit `http://localhost:3000/ar` - Arabic version with RTL layout
3. Visit `http://localhost:3000/fr` - French version
4. Use the language switcher to change languages
5. Refresh the page - Your language preference is remembered

## Deployment Considerations

1. Update the `baseUrl` in:
   - `src/app/layout.tsx`
   - `src/app/sitemap.ts`
   - `src/app/robots.ts`

2. Ensure your hosting platform supports:
   - Dynamic routing
   - Middleware execution
   - Cookie handling

## Next Steps

1. Add more pages following the pattern
2. Implement language-specific formatting (dates, numbers)
3. Add more languages as needed
4. Consider implementing a CMS for translation management
5. Add language-specific fonts if needed

## Troubleshooting

- **404 errors**: Make sure middleware matcher is configured correctly
- **Translation not showing**: Check if translation key exists in all language files
- **RTL issues**: Ensure Tailwind CSS RTL utilities are properly configured
- **Cookie not persisting**: Check browser cookie settings 