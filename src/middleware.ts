import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from '@/i18n/config';

function getLocale(request: NextRequest): string {
  // Try to get locale from cookie first (for persistence)
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // Get accepted languages from headers
  const headers = {
    'accept-language': request.headers.get('accept-language') || ''
  };

  const languages = new Negotiator({ headers }).languages();
  
  // Find the first matching locale
  const locale = languages.find(lang => {
    const shortLang = lang.split('-')[0];
    return locales.includes(shortLang as any);
  });

  return locale?.split('-')[0] || defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname and set cookie
    const locale = pathname.split('/')[1];
    const response = NextResponse.next();
    response.cookies.set('locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict'
    });
    return response;
  }

  // Redirect if no locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  const response = NextResponse.redirect(newUrl);
  response.cookies.set('locale', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'strict'
  });
  
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*|manifest.json).*)',
  ]
}; 