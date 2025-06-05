"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import type { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

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

// Cache for order data to prevent refetching
const orderCache = new Map<string, OrderData>();

function OrderSuccessContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = params.locale as Locale;
  const orderId = searchParams.get("orderId");

  const [translations, setTranslations] = useState<any>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Memoize translations loading
  const translationsPromise = useMemo(() => getTranslations(locale), [locale]);

  // Load translations with caching
  useIsomorphicLayoutEffect(() => {
    translationsPromise.then(setTranslations).catch((error) => {
      console.error("Failed to load translations:", error);
    });
  }, [translationsPromise]);

  // Fetch order data with caching
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError(true);
        setLoading(false);
        return;
      }

      // Check cache first
      const cachedOrder = orderCache.get(orderId);
      if (cachedOrder) {
        setOrderData(cachedOrder);
        setLoading(false);
        return;
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from("reservations")
          .select("*")
          .eq("id", orderId)
          .single();

        if (supabaseError) {
          setError(true);
        } else if (!data) {
          console.error("No order data found for ID:", orderId);
          setError(true);
        } else {
          // Cache the order data
          orderCache.set(orderId, data);
          setOrderData(data);
        }
      } catch (fetchError) {
        console.error("Network error fetching order:", fetchError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Memoize status functions
  const getStatusColor = useMemo(
    () => (status: string) => {
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
    },
    []
  );

  const getStatusText = useMemo(
    () => (status: string) => {
      return translations?.orderSuccess?.[status] || status;
    },
    [translations]
  );

  // Loading state
  if (loading || !translations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Error state
  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {translations?.orderSuccess?.orderNotFound || "Order not found"}
          </h1>
          <p className="text-gray-600 mb-8">
            {locale === "ar"
              ? "عذراً، لا يمكننا العثور على هذا الطلب. قد يكون الرابط غير صحيح أو أن الطلب لم يعد متوفراً."
              : locale === "fr"
              ? "Désolé, nous ne trouvons pas cette commande. Le lien peut être incorrect ou la commande n'est plus disponible."
              : "Sorry, we couldn't find this order. The link might be incorrect or the order may no longer be available."}
          </p>
          <Button
            color="rose"
            onClick={() => router.push(`/${locale}`)}
            className="h-12 flex items-center justify-center w-full"
          >
            {translations?.orderSuccess?.actions?.goHome || "Go Home"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
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
        <div className="bg-white shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {translations.orderSuccess.orderNumber}: #{orderData.id}
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
                  <span className="font-medium">
                    {translations.orderSuccess.name}:
                  </span>{" "}
                  {orderData.customer_first_name} {orderData.customer_last_name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">
                    {translations.orderSuccess.phone}:
                  </span>{" "}
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
                  <span className="font-medium">
                    {translations.orderSuccess.address}:
                  </span>{" "}
                  {orderData.customer_address}
                </p>
                <p className="text-sm">
                  <span className="font-medium">
                    {translations.orderSuccess.city}:
                  </span>{" "}
                  {orderData.customer_city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {translations.orderSuccess.items}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {orderData.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex space-x-4 py-4 border-b border-gray-100 last:border-b-0"
                >
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
                          {translations.productQuickview.size}: {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {item.quantity} × {item.price.toFixed(2)}{" "}
                      {translations.currency.mad}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(item.quantity * item.price).toFixed(2)}{" "}
                      {translations.currency.mad}
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
                  {orderData.total_amount.toFixed(2)}{" "}
                  {translations.currency.mad}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white shadow-sm border border-gray-200 mb-8">
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            color="rose"
            onClick={() => router.push(`/${locale}`)}
            className="w-full h-12 flex items-center justify-center bg-rose-600 text-white hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            {translations.orderSuccess.actions.continueShopping}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
