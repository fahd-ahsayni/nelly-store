"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/config";
import { supabase } from "@/lib/supabase";
import { CheckCircleIcon, PhoneIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { styles } from "@/constants";

interface OrderData {
  id: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_mobile: string;
  customer_secondary_mobile?: string;
  customer_address: string;
  customer_city: string;
  items: any[];
  total_amount: number;
  status: string;
  created_at: string;
}

export default function OrderSuccess() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = params.locale as Locale;
  const orderId = searchParams.get("orderId");

  const [translations, setTranslations] = useState<any>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const t = await getTranslations(locale);
        setTranslations(t);
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };
    loadTranslations();
  }, [locale]);

  // Fetch order data
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("reservations")
          .select("*")
          .eq("id", orderId)
          .single();

        if (error) {
          console.error("Error fetching order:", error);
          setError(true);
        } else {
          setOrderData(data);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Loading state
  if (loading || !translations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  // Error state
  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order not found
          </h1>
          <button
            onClick={() => router.push(`/${locale}`)}
            className={cn(styles.primaryButton)}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-blue-600 bg-blue-100";
      case "shipped":
        return "text-purple-600 bg-purple-100";
      case "delivered":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const getStatusText = (status: string) => {
    return translations.orderSuccess[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {translations.orderSuccess.title}
          </h1>
          <p className="text-lg text-gray-600">
            {translations.orderSuccess.subtitle}
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {translations.orderSuccess.orderNumber}: #{orderData.id.slice(-8)}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(orderData.created_at).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  getStatusColor(orderData.status)
                )}
              >
                {getStatusText(orderData.status)}
              </span>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {translations.orderSuccess.customerInfo}
              </h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{translations.orderSuccess.name}:</span>{" "}
                  {orderData.customer_first_name} {orderData.customer_last_name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{translations.orderSuccess.phone}:</span>{" "}
                  {orderData.customer_mobile}
                </p>
                {orderData.customer_secondary_mobile && (
                  <p className="text-sm">
                    <span className="font-medium">
                      {translations.checkout.form.secondaryMobileNumber}:
                    </span>{" "}
                    {orderData.customer_secondary_mobile}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {translations.orderSuccess.shippingInfo}
              </h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{translations.orderSuccess.address}:</span>{" "}
                  {orderData.customer_address}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{translations.orderSuccess.city}:</span>{" "}
                  {orderData.customer_city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {translations.orderSuccess.items}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {orderData.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.product_name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.product_name}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      {item.color && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full border"
                            style={{ backgroundColor: item.color_hex }}
                          />
                          {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-xs text-gray-500">
                          Size: {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {item.quantity} × {item.price.toFixed(2)} Dhs
                    </p>
                    <p className="text-sm text-gray-500">
                      {(item.quantity * item.price).toFixed(2)} Dhs
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  {translations.orderSuccess.total}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {orderData.total_amount.toFixed(2)} Dhs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {translations.orderSuccess.nextSteps.title}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(translations.orderSuccess.nextSteps)
                .filter(([key]) => key.startsWith("step"))
                .map(([key, step], index) => (
                  <div key={key} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{step as string}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {translations.orderSuccess.support.title}
            </h2>
          </div>
          <div className="p-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <a
                href="tel:+212123456789"
                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <PhoneIcon className="h-5 w-5 text-rose-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {translations.orderSuccess.support.phone}
                  </p>
                  <p className="text-xs text-gray-500">+212 123 456 789</p>
                </div>
              </a>
              <a
                href="https://wa.me/212123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {translations.orderSuccess.support.whatsapp}
                  </p>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                </div>
              </a>
              <a
                href="mailto:support@nellycollection.store"
                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {translations.orderSuccess.support.email}
                  </p>
                  <p className="text-xs text-gray-500">Email</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push(`/${locale}`)}
            className={cn(styles.primaryButton)}
          >
            {translations.orderSuccess.actions.continueShopping}
          </button>
          <button
            onClick={() => router.push(`/${locale}/contact`)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {translations.orderSuccess.actions.contactSupport}
          </button>
        </div>
      </div>
    </div>
  );
}
