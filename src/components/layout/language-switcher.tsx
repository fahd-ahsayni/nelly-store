"use client";

import { france, morocco, unitedKingdom } from "@/assets";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";

interface LanguageSwitcherProps {
  translations: any;
  className?: string;
  showText?: boolean;
}

export default function LanguageSwitcher({
  translations,
  className = "",
  showText = true,
}: LanguageSwitcherProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = (params.locale as Locale) || "en";

  const switchLanguage = (locale: Locale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    // Create new path with the selected locale
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  const getCurrentLocaleFlag = (locale: Locale) => {
    const flags = {
      en: unitedKingdom,
      fr: france,
      ar: morocco,
    };
    return flags[locale] || flags.en;
  };

  return (
    <Popover className={`relative ${className}`}>
      <PopoverButton className="flex items-center text-gray-700 hover:text-gray-800 focus:outline-none rounded-md p-1">
        <Image
          alt={localeNames[currentLocale]}
          src={getCurrentLocaleFlag(currentLocale)}
          className="block h-auto w-5 shrink-0"
        />
        {showText && (
          <span className="lrt:ml-2 rtl:mr-2 block text-sm font-medium">
            {localeNames[currentLocale]}
          </span>
        )}
        <ChevronDownIcon
          className="ltr:ml-1 rtl:mr-1 h-4 w-4 transition-transform ui-open:rotate-180"
          aria-hidden="true"
        />
        <span className="sr-only">
          {translations
            ? translations("navigation.changeLanguage")
            : "Change language"}
        </span>
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`flex w-full items-center px-4 py-2 text-sm transition-colors ${
                locale === currentLocale
                  ? "bg-rose-50 text-rose-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Image
                alt={localeNames[locale]}
                src={getCurrentLocaleFlag(locale)}
                className="ltr:mr-3 rtl:ml-3 h-auto w-5 shrink-0"
              />
              <span className="font-medium">{localeNames[locale]}</span>
              {locale === currentLocale && (
                <svg
                  className="ltr:ml-auto rtl:mr-auto h-4 w-4 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
