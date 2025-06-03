"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast";
import { styles } from "@/constants";
import { useCartItems, useCartStore, useCartTotal } from "@/hooks/useCartItems";
import type { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

interface FormData {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  secondaryMobileNumber: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Checkout() {
  const params = useParams();
  const locale = params.locale as Locale;
  const [translations, setTranslations] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const orderCompletedRef = useRef(false);

  const cartItems = useCartItems();
  const subtotal = useCartTotal();
  const { removeFromCart, clearCart } = useCartStore();
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    mobileNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    secondaryMobileNumber: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Load translations and set client-side flag
  useIsomorphicLayoutEffect(() => {
    const loadTranslations = async () => {
      try {
        const t = await getTranslations(locale);
        setTranslations(t);
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };

    loadTranslations();
    setIsClient(true);
  }, [locale]);

  // Load form data from localStorage on client side
  useEffect(() => {
    if (isClient) {
      try {
        const savedFormData = localStorage.getItem("checkout-form-data");
        if (savedFormData) {
          setFormData(JSON.parse(savedFormData));
        }
      } catch (error) {
        console.error("Failed to load form data from localStorage:", error);
      }
    }
  }, [isClient]);

  // Save form data to localStorage when it changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("checkout-form-data", JSON.stringify(formData));
      } catch (error) {
        console.error("Failed to save form data to localStorage:", error);
      }
    }
  }, [formData, isClient]);

  // Clear cart only when page is about to unload after successful order
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (orderCompletedRef.current) {
        clearCart();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [clearCart]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber =
        translations?.checkout.validation.requiredFields || "Required";
    }

    if (!formData.firstName.trim()) {
      errors.firstName =
        translations?.checkout.validation.requiredFields || "Required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName =
        translations?.checkout.validation.requiredFields || "Required";
    }

    if (!formData.address.trim()) {
      errors.address =
        translations?.checkout.validation.requiredFields || "Required";
    }

    if (!formData.city.trim()) {
      errors.city =
        translations?.checkout.validation.requiredFields || "Required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!translations) return;

    // Validation
    if (!validateForm()) {
      toast.error(translations.checkout.validation.requiredFields);
      return;
    }

    if (cartItems.length === 0) {
      toast.error(translations.checkout.validation.cartEmpty);
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        customer_first_name: formData.firstName,
        customer_last_name: formData.lastName,
        customer_mobile: formData.mobileNumber,
        customer_secondary_mobile: formData.secondaryMobileNumber || null,
        customer_address: formData.address,
        customer_city: formData.city,
        items: cartItems.map((item) => ({
          product_id: item.productId,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          color_hex: item.colorHex,
          size: item.size,
          image: item.image,
        })),
        total_amount: subtotal,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from("reservations")
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        toast.error(translations.checkout.success.failed);
        return;
      }

      // Success - show success message first
      toast.success(translations.checkout.success.orderPlaced);

      // Clear form data from localStorage only on success
      if (isClient) {
        localStorage.removeItem("checkout-form-data");
      }

      // Mark order as completed but don't clear cart yet
      orderCompletedRef.current = true;

      // Set redirecting state and redirect after a delay
      setIsRedirecting(true);

      setTimeout(() => {
        // Clear cart just before redirect
        clearCart();
        router.push(`/${locale}/order-success?orderId=${data.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error(translations.checkout.success.error);
      // Don't clear cart on error - let user retry
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while translations are loading
  if (!translations || !isClient) {
    return (
      <div className="relative isolate min-h-screen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty
  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <div className="relative isolate min-h-screen">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:left-[calc(50%+30rem)] sm:w-288.75"
          />
        </div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              {translations.checkout.cartEmpty.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {translations.checkout.cartEmpty.description}
            </p>
            <button
              onClick={() => router.push(`/${locale}`)}
              className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              {translations.checkout.cartEmpty.continueShopping}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show redirecting state
  if (isRedirecting) {
    return (
      <div className="relative isolate min-h-screen flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:left-[calc(50%+30rem)] sm:w-288.75"
          />
        </div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {translations.checkout.success.orderPlaced}
              </h2>
              <p className="text-gray-600">
                {translations.checkout.redirecting ||
                  "Redirecting to order details..."}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Spinner color="rose" size={6} />
              <span className="text-sm text-gray-500">
                {translations.checkout.pleaseWait || "Please wait..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate">
      {/* Background decoration */}
      <div className="absolute inset-x-0 bottom-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c43a5d" />
              <stop offset={1} stopColor="#f0b1bb" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">{translations.checkout.title}</h1>

        <form
          onSubmit={handleSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          noValidate
        >
          <div>
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {translations.checkout.contactInformation}
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm/6 font-medium text-gray-700"
                >
                  {translations.checkout.form.mobileNumber}{" "}
                  <span className="text-red-500">
                    {translations.checkout.form.required}
                  </span>
                </label>
                <div className="mt-2">
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                      formErrors.mobileNumber
                        ? "outline-red-300 focus:outline-red-600"
                        : "outline-gray-300 focus:outline-rose-600"
                    }`}
                  />
                  {formErrors.mobileNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                {translations.checkout.shippingInformation}
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm/6 font-medium text-gray-700"
                  >
                    {translations.checkout.form.firstName}{" "}
                    <span className="text-red-500">
                      {translations.checkout.form.required}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                        formErrors.firstName
                          ? "outline-red-300 focus:outline-red-600"
                          : "outline-gray-300 focus:outline-rose-600"
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm/6 font-medium text-gray-700"
                  >
                    {translations.checkout.form.lastName}{" "}
                    <span className="text-red-500">
                      {translations.checkout.form.required}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                        formErrors.lastName
                          ? "outline-red-300 focus:outline-red-600"
                          : "outline-gray-300 focus:outline-rose-600"
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm/6 font-medium text-gray-700"
                  >
                    {translations.checkout.form.address}{" "}
                    <span className="text-red-500">
                      {translations.checkout.form.required}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                        formErrors.address
                          ? "outline-red-300 focus:outline-red-600"
                          : "outline-gray-300 focus:outline-rose-600"
                      }`}
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm/6 font-medium text-gray-700"
                  >
                    {translations.checkout.form.city}{" "}
                    <span className="text-red-500">
                      {translations.checkout.form.required}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                        formErrors.city
                          ? "outline-red-300 focus:outline-red-600"
                          : "outline-gray-300 focus:outline-rose-600"
                      }`}
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="secondaryMobileNumber"
                    className="block text-sm/6 font-medium text-gray-700"
                  >
                    {translations.checkout.form.secondaryMobileNumber}
                  </label>
                  <div className="mt-2">
                    <input
                      id="secondaryMobileNumber"
                      name="secondaryMobileNumber"
                      type="tel"
                      autoComplete="tel"
                      value={formData.secondaryMobileNumber}
                      onChange={handleInputChange}
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">
              {translations.checkout.orderSummary}
            </h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-xs">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex px-4 py-6 sm:px-6">
                    <div className="shrink-0">
                      <img
                        alt={item.name}
                        src={item.image}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>

                    <div className="ltr:ml-6 rtl:mr-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <span className="font-medium text-gray-700 hover:text-gray-800">
                              {item.name}
                            </span>
                          </h4>
                          <div className="flex gap-x-4 items-center">
                            <Badge>
                              {translations?.checkout?.item?.size || "Size"}:{" "}
                              {item.size}
                            </Badge>
                            <Badge>
                              <span
                                className="inline-block h-4 w-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: item.colorHex }}
                              />
                              {item.color}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {translations?.checkout?.item?.quantity ||
                              "Quantity"}
                            : {item.quantity}
                          </p>
                        </div>

                        <div className="ltr:ml-4 rtl:mr-4 flow-root shrink-0">
                          <Button
                            color="dark/white"
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`${
                              translations?.checkout?.item?.remove || "Remove"
                            } ${item.name}`}
                          >
                            <span className="sr-only">
                              {translations?.checkout?.item?.remove || "Remove"}
                            </span>
                            <TrashIcon aria-hidden="true" className="size-5" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-1 ltr:items-end rtl:items-start justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {(item.price * item.quantity).toFixed(2)}
                          {translations.currency.mad}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium">
                    {translations?.checkout?.item?.total || "Total"}
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    {subtotal.toFixed(2)} {translations.currency.mad}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  disabled={
                    isSubmitting || cartItems.length === 0 || isRedirecting
                  }
                  className={cn(
                    styles.primaryButton,
                    "w-full disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  {isSubmitting && <Spinner color="white" />}
                  <span className="sr-only">
                    {isSubmitting
                      ? translations?.checkout?.form?.processing ||
                        "Processing..."
                      : translations?.checkout?.form?.confirmOrder ||
                        "Confirm order"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
