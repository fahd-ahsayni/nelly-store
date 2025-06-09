"use client";

import { logo } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { useInitializeStore } from "@/hooks/useStoreData";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/store/useStore";
import { Color, ProductColor, ProductFull } from "@/types/database";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
}

interface ResolvedParams {
  locale: string;
}

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

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const [resolvedParams, setResolvedParams] = useState<ResolvedParams | null>(
    null
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isLoading: storeLoading } = useInitializeStore();
  const products = useStore((state) => state.products);
  const collections = useStore((state) => state.collections);
  const productColors = useStore((state) => state.productColors);
  const colors = useStore((state) => state.colors);

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

  // Get product data from URL params
  const productId = searchParams.get("productId");
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");
  const quantity = parseInt(searchParams.get("quantity") || "1");

  // Resolve params once
  useEffect(() => {
    params.then(setResolvedParams).catch(console.error);
  }, [params]);

  // Memoize product computation
  const product = useMemo((): ProductFull | null => {
    if (!productId || storeLoading || products.length === 0) {
      return null;
    }

    const foundProduct = products.find((p) => p.id === productId);
    if (!foundProduct) return null;

    const collection = collections.find(
      (c) => c.id === foundProduct.collection_id
    );
    if (!collection) return null;

    const productColorsWithColors = productColors
      .filter((pc) => pc.product_id === foundProduct.id)
      .map((pc) => {
        const color = colors.find((color) => color.id === pc.color_id);
        return color ? { ...pc, colors: color } : null;
      })
      .filter((pc): pc is ProductColor & { colors: Color } => pc !== null);

    return {
      ...foundProduct,
      collections: collection,
      product_colors: productColorsWithColors,
    };
  }, [productId, storeLoading, products, collections, productColors, colors]);

  const selectedColorInfo = useMemo(() => {
    if (!product || !selectedColor) return null;
    return product.product_colors.find(
      (pc: any) => pc.colors.name === selectedColor
    );
  }, [product, selectedColor]);

  const isLoading = storeLoading || !resolvedParams || !product;
  const productNotFound = !isLoading && !product && productId;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
      errors.mobileNumber = "رقم الهاتف مطلوب";
    }
    if (!formData.firstName.trim()) {
      errors.firstName = "الاسم الأول مطلوب";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "الاسم الأخير مطلوب";
    }
    if (!formData.address.trim()) {
      errors.address = "العنوان مطلوب";
    }
    if (!formData.city.trim()) {
      errors.city = "المدينة مطلوبة";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !product) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_first_name: formData.firstName,
        customer_last_name: formData.lastName,
        customer_mobile: formData.mobileNumber,
        customer_secondary_mobile: formData.secondaryMobileNumber || null,
        customer_address: formData.address,
        customer_city: formData.city,
        items: [
          {
            product_id: product.id,
            product_name: product.name,
            price: product.price,
            quantity: quantity,
            color: selectedColor,
            color_hex: selectedColorInfo?.colors?.hex || null,
            size: selectedSize,
            image: product.imagesrc || null,
          },
        ],
        total_amount: product.price * quantity,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("reservations")
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        toast.error("فشل في إرسال الطلب");
        return;
      }

      toast.success("تم إرسال طلبك بنجاح!");
      setIsRedirecting(true);

      setTimeout(() => {
        router.push(
          `/${resolvedParams?.locale}/order-success?orderId=${data.id}`
        );
      }, 500);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state - same as product page
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center !font-arabic relative isolate"
        dir="rtl"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:right-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="animate-pulse text-center">
          <div>
            <span className="flex flex-col justify-center items-center gap-4">
              <span className="sr-only">Nelly Collection</span>
              <Image
                alt="nelly collection"
                src={logo}
                className="h-20 w-auto"
              />
              <div className="flex items-center gap-2">
                <Spinner size={7} color="rose" />
                <h2 className="text-lg lg:text-3xl rtl:font-bold">
                  نيللي <span className="ltr:italic text-rose-600">كولكشن</span>
                </h2>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (productNotFound) {
    redirect("/");
  }

  // Redirect state
  if (isRedirecting) {
    return (
      <div
        className="min-h-screen flex items-center justify-center !font-arabic relative isolate"
        dir="rtl"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-rose-600 opacity-30 sm:right-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
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
              تم إرسال طلبك بنجاح!
            </h2>
            <p className="text-gray-600">جاري التوجيه لصفحة تفاصيل الطلب...</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Spinner color="rose" size={6} />
            <span className="text-sm text-gray-500">يرجى الانتظار...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main dir="rtl" className="!font-arabic">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Order Form */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              إتمام الطلب
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  معلومات التواصل
                </h2>

                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className={formErrors.mobileNumber ? "border-red-500" : ""}
                  />
                  {formErrors.mobileNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  معلومات الشحن
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      الاسم الأول <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={formErrors.firstName ? "border-red-500" : ""}
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      الاسم الأخير <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={formErrors.lastName ? "border-red-500" : ""}
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    العنوان <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className={formErrors.address ? "border-red-500" : ""}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      المدينة <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className={formErrors.city ? "border-red-500" : ""}
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="secondaryMobileNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      رقم هاتف إضافي
                    </label>
                    <Input
                      id="secondaryMobileNumber"
                      name="secondaryMobileNumber"
                      type="tel"
                      value={formData.secondaryMobileNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              ملخص الطلب
            </h2>

            <div className="border border-gray-200 bg-white shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={product?.imagesrc || "/placeholder.png"}
                    alt={product?.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 capitalize">
                    {product?.name}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {selectedColor && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">اللون:</span>
                        <div className="flex items-center gap-1">
                          {selectedColorInfo && (
                            <span
                              className="inline-block h-4 w-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor: selectedColorInfo.colors.hex,
                              }}
                            />
                          )}
                          <span className="text-sm">{selectedColor}</span>
                        </div>
                      </div>
                    )}
                    {selectedSize && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">المقاس:</span>
                        <span className="text-sm">{selectedSize}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">الكمية:</span>
                      <span className="text-sm">{quantity}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">المجموع</span>
                  <span className="text-base font-medium text-gray-900">
                    {((product?.price || 0) * quantity).toFixed(2)} درهم
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  color="rose"
                  className="w-full flex items-center justify-center h-12"
                >
                  {isSubmitting && <Spinner color="white" size={4} />}
                  <span>
                    {isSubmitting ? "جاري المعالجة..." : "تأكيد الطلب"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-2xl lg:max-w-7xl sm:px-6 lg:gap-x-8 lg:px-8 pb-8">
        <div className="bg-gray-200 mt-16 flex items-center justify-between px-6 py-3">
          <span className="text-title text-sm">
            &copy; {new Date().getFullYear()} IMFA. جميع الحقوق محفوظة.
          </span>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            سياسة الخصوصية
          </Link>
        </div>
      </div>
    </main>
  );
}
