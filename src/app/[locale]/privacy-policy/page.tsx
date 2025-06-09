import { getTranslations } from "@/i18n/utils";
import { Locale } from "@/i18n/config";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  return {
    title: `${translations.privacyPolicy.title} - Nelly Collection`,
    description: translations.privacyPolicy.metaDescription,
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  const isRTL = locale === "ar";

  const BackIcon = isRTL ? ArrowRightIcon : ArrowLeftIcon;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <BackIcon className="w-4 h-4" />
            {translations.navigation.home}
          </Link>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {translations.privacyPolicy.title}
          </h1>
          <p className="text-gray-600">
            {translations.privacyPolicy.lastUpdated}:{" "}
            {new Date().toLocaleDateString(locale)}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.introduction.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.introduction.content}
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              {translations.privacyPolicy.informationWeCollect.title}
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3">
                {
                  translations.privacyPolicy.informationWeCollect.personalInfo
                    .title
                }
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {
                  translations.privacyPolicy.informationWeCollect.personalInfo
                    .content
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">
                {
                  translations.privacyPolicy.informationWeCollect.automaticInfo
                    .title
                }
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {
                  translations.privacyPolicy.informationWeCollect.automaticInfo
                    .content
                }
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.howWeUseInfo.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.howWeUseInfo.content}
            </p>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.informationSharing.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.informationSharing.content}
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.dataSecurity.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.dataSecurity.content}
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.cookies.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.cookies.content}
            </p>
          </section>

          {/* Third Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.thirdPartyServices.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.thirdPartyServices.content}
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.dataRetention.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.dataRetention.content}
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.yourRights.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.yourRights.content}
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.internationalTransfers.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.internationalTransfers.content}
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.childrenPrivacy.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.childrenPrivacy.content}
            </p>
          </section>

          {/* Policy Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.policyChanges.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.privacyPolicy.policyChanges.content}
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.privacyPolicy.contactUs.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {translations.privacyPolicy.contactUs.content}
            </p>

            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-sm">
                <strong>{translations.privacyPolicy.contactUs.email}</strong>
              </p>
              <p className="text-sm">
                <strong>
                  {translations.privacyPolicy.contactUs.developer}
                </strong>
              </p>
              <p className="text-sm">
                <strong>{translations.privacyPolicy.contactUs.brand}</strong>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
