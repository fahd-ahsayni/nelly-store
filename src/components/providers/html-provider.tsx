'use client';

import { useEffect } from 'react';

interface HtmlProviderProps {
  locale: string;
  children: React.ReactNode;
}

export function HtmlProvider({ locale, children }: HtmlProviderProps) {
  const isRTL = locale === 'ar';

  useEffect(() => {
    // Update document attributes dynamically
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [locale, isRTL]);

  return <>{children}</>;
}
