"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    // Try to detect locale from URL or use default
    const path = window.location.pathname;
    const localeMatch = path.match(/^\/([a-z]{2})\//);
    if (localeMatch) {
      setLocale(localeMatch[1]);
    }
  }, []);

  const getLocalizedText = () => {
    switch (locale) {
      case "ar":
        return {
          title: "الصفحة غير موجودة",
          subtitle: "عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها.",
          description:
            "قد يكون الرابط معطلاً أو أن الصفحة قد تم نقلها إلى مكان آخر.",
          homeButton: "العودة للرئيسية",
          shopButton: "تسوق الآن",
        };
      case "fr":
        return {
          title: "Page non trouvée",
          subtitle: "Désolé, nous ne trouvons pas la page que vous recherchez.",
          description:
            "Le lien peut être cassé ou la page a peut-être été déplacée vers un autre emplacement.",
          homeButton: "Retour à l'accueil",
          shopButton: "Magasiner maintenant",
        };
      default:
        return {
          title: "Page Not Found",
          subtitle: "Sorry, we couldn't find the page you're looking for.",
          description:
            "The link might be broken or the page may have been moved to another location.",
          homeButton: "Go Home",
          shopButton: "Shop Now",
        };
    }
  };

  const text = getLocalizedText();

  const handleGoHome = () => {
    router.push(`/${locale}`);
  };

  const handleGoShop = () => {
    router.push(`/${locale}/store`);
  };

  return (
    <main
      className={cn(
        "grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8",
        locale === "ar" && "!font-arabic"
      )}
    >
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <ExclamationTriangleIcon className="h-16 w-16 text-rose-600" />
        </div>
        <p className="text-base font-semibold text-rose-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          {text.title}
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          {text.subtitle}
        </p>
        <p className="mt-2 text-sm text-gray-400">{text.description}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={handleGoHome} color="rose" className="flex items-center justify-center h-12 w-full">
            <HomeIcon className="h-5 w-5 mr-2" />
            {text.homeButton}
          </Button>
        </div>
      </div>
    </main>
  );
}
