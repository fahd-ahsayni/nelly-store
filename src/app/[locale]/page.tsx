import { getTranslations } from "@/i18n/utils";
import { type Locale } from "@/i18n/config";

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const translations = await getTranslations(locale);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
