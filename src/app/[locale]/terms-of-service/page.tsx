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
    title: `${translations.termsOfService.title} - Nelly Collection`,
    description:
      "Terms of Service for Nelly Collection - Read our terms and conditions for using our platform.",
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  const isRTL = locale === "ar";

  const BackIcon = isRTL ? ArrowRightIcon : ArrowLeftIcon;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 mb-6"
          >
            <BackIcon className="w-4 h-4" />
            {translations.navigation.home}
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {translations.termsOfService.title}
          </h1>
          <p className="text-gray-600">
            {translations.termsOfService.lastUpdated}:{" "}
            {new Date().toLocaleDateString(locale)}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Acceptance of Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.acceptance.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.acceptance.content}
            </p>
          </section>

          {/* Use of Service */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.useOfService.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.useOfService.content}
            </p>
          </section>

          {/* User Accounts */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.account.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.account.content}
            </p>
          </section>

          {/* Orders and Payment */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.orders.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.orders.content}
            </p>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.shipping.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.shipping.content}
            </p>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.returns.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.returns.content}
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.intellectualProperty.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.intellectualProperty.content}
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.limitation.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.limitation.content}
            </p>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.termination.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.termination.content}
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.changes.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {translations.termsOfService.changes.content}
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {translations.termsOfService.contact.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {translations.termsOfService.contact.content}
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-2">
              <p className="text-sm text-gray-700">
                <strong>{translations.termsOfService.contact.email}</strong>
              </p>
              <p className="text-sm text-gray-700">
                <strong>{translations.termsOfService.contact.developer}</strong>
              </p>
              <p className="text-sm text-gray-700">
                <strong>{translations.termsOfService.contact.brand}</strong>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
