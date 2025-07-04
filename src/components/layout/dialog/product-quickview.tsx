"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { ProductFull } from "@/types/database";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  ArrowLeftIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProductQuickviewProps {
  product: ProductFull | null;
  open: boolean;
  onClose: () => void;
  translations: any;
  locale: string;
}

export default function ProductQuickview({
  product,
  open,
  onClose,
  translations,
  locale,
}: ProductQuickviewProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // State for view toggle
  const [showReservationForm, setShowReservationForm] = useState(false);

  // Reservation form state
  const [reservationForm, setReservationForm] = useState({
    fullName: "",
    address: "",
    mobile: "",
    city: "",
  });
  const [reservationErrors, setReservationErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);

  // Create default color and size options based on database structure
  const colors =
    product?.product_colors?.map((pc) => ({
      id: pc.colors.id,
      name: pc.colors.name,
      hex: pc.colors.hex,
      selectedClass: pc.colors.selectedcolor,
    })) || [];

  const sizes =
    product?.sizes?.map((size, index) => ({
      id: `${product?.id || "default"}-size-${index}`,
      name: size,
      inStock: true,
    })) || [];

  const [selectedColor, setSelectedColor] = useState<{
    id: string;
    name: string;
    hex: string;
    selectedClass: string;
  } | null>(null);
  const [selectedSize, setSelectedSize] = useState<{
    id: string;
    name: string;
    inStock: boolean;
  } | null>(null);

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      const newColors =
        product.product_colors?.map((pc) => ({
          id: pc.colors.id,
          name: pc.colors.name,
          hex: pc.colors.hex,
          selectedClass: pc.colors.selectedcolor,
        })) || [];

      const newSizes =
        product.sizes?.map((size, index) => ({
          id: `${product.id}-size-${index}`,
          name: size,
          inStock: true,
        })) || [];

      setSelectedColor(null);
      setSelectedSize(null);
    }
  }, [product?.id]);

  // Reset selections when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedColor(null);
      setSelectedSize(null);
      setShowReservationForm(false);
      setReservationForm({
        fullName: "",
        address: "",
        mobile: "",
        city: "",
      });
      setReservationErrors({});
    }
  }, [open, colors, sizes]);

  const handleAddToBag = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    // Validation: Check if color is required and selected
    const hasColors = colors.length > 0;
    const hasSizes = sizes.length > 0;

    if (hasColors && !selectedColor) {
      toast.error(translations.productQuickview.selectColor);
      return;
    }

    if (hasSizes && !selectedSize) {
      toast.error(translations.productQuickview.selectSize);
      return;
    }

    addItem({
      id: `${product.id}-${selectedColor?.id || "no-color"}-${
        selectedSize?.name || "no-size"
      }`,
      name: product.name,
      price: product.price,
      image: product.image_urls?.[0] || product.imagesrc,
      color: selectedColor?.name,
      colorHex: selectedColor?.hex,
      size: selectedSize?.name,
    });
    toast.success(translations.productQuickview.addedToBag);

    // Reset selections after adding to bag
    setSelectedColor(null);
    setSelectedSize(null);

    // Optional: Close the quickview after adding to cart
    onClose();
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    const wishlistItem = {
      id: `${product.id}-${selectedColor?.id || "no-color"}-${
        selectedSize?.name || "no-size"
      }`,
      name: product.name,
      price: product.price,
      image: product.image_urls?.[0] || product.imagesrc,
      color: selectedColor?.name,
      colorHex: selectedColor?.hex,
      size: selectedSize?.name,
    };

    const currentlyInWishlist = isInWishlist(wishlistItem.id);
    toggleWishlist(wishlistItem);
    if (currentlyInWishlist) {
      toast.info(translations.productQuickview.removeFromWishlist);
    } else {
      toast.success(translations.productQuickview.addedToWishlist);
    }
  };

  // Handle reservation form submission
  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    // Validate form
    const errors: Record<string, string> = {};
    if (!reservationForm.fullName.trim()) {
      errors.fullName = translations.productQuickview.reservationForm.required;
    }
    if (!reservationForm.address.trim()) {
      errors.address = translations.productQuickview.reservationForm.required;
    }
    if (!reservationForm.mobile.trim()) {
      errors.mobile = translations.productQuickview.reservationForm.required;
    }
    if (!reservationForm.city.trim()) {
      errors.city = translations.productQuickview.reservationForm.required;
    }

    if (Object.keys(errors).length > 0) {
      setReservationErrors(errors);
      return;
    }

    setIsSubmittingReservation(true);

    try {
      // Split full name into first name and last name
      const nameParts = reservationForm.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Create items array with the specific format
      const items = [
        {
          size: selectedSize?.name || "",
          color: selectedColor?.name || "",
          image: product.image_urls?.[0] || product.imagesrc,
          price: product.price,
          quantity: 1,
          color_hex: selectedColor?.hex || "",
          product_id: `${product.id}-${selectedColor?.id || "no-color"}-${
            selectedSize?.name || "no-size"
          }`,
          product_name: product.name,
        },
      ];

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          fullName: reservationForm.fullName,
          address: reservationForm.address,
          mobile: reservationForm.mobile,
          city: reservationForm.city,
          items: items,
          // Keep legacy fields for backward compatibility
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
        }),
      });

      if (response.ok) {
        toast.success(translations.productQuickview.reservationForm.success);
        // Reset form
        setReservationForm({
          fullName: "",
          address: "",
          mobile: "",
          city: "",
        });
        setReservationErrors({});
        // Optional: close the dialog or switch back to product view
        onClose();
      } else {
        throw new Error("Failed to submit reservation");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast.error(translations.productQuickview.reservationForm.error);
    } finally {
      setIsSubmittingReservation(false);
    }
  };

  // Handle reservation form input changes
  const handleReservationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setReservationForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (reservationErrors[name]) {
      setReservationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleShopNowClick = () => {
    if (!product) return;

    // Validation: Check if color is required and selected
    const hasColors = colors.length > 0;
    const hasSizes = sizes.length > 0;

    if (hasColors && !selectedColor) {
      toast.error(translations.productQuickview.selectColor);
      return;
    }

    if (hasSizes && !selectedSize) {
      toast.error(translations.productQuickview.selectSize);
      return;
    }

    // If validation passes, navigate to reservation form
    setShowReservationForm(true);
  };

  const isItemInWishlist = product
    ? isInWishlist(
        `${product.id}-${selectedColor?.id || "no-color"}-${
          selectedSize?.name || "no-size"
        }`
      )
    : false;

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative z-50 flex w-full items-center overflow-hidden bg-gray-50 px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-500 sm:top-8 ltr:sm:right-6 rtl:sm:left-6 md:top-6 ltr:md:right-6 rtl:md:left-6 lg:top-8 ltr:lg:right-8 rtl:lg:left-8"
              >
                <span className="sr-only">
                  {translations.productQuickview.close}
                </span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="h-full w-full overflow-hidden sm:col-span-12 lg:col-span-5 relative">
                  {/* Floating Rating Badge shifted to top left */}
                  <Badge color="white" className="absolute top-4 left-4 z-10">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-800">
                      {product.rating === null || product.rating < 4
                        ? (4.5).toFixed(1)
                        : product.rating.toFixed(1)}
                    </span>
                  </Badge>
                  <Image
                    alt={product.imagealt}
                    src={product.image_urls?.[0] || product.imagesrc}
                    width={300}
                    height={450}
                    priority
                    className="h-full w-full bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                  />
                </div>
                <div className="sm:col-span-12 lg:col-span-7 text-start">
                  {!showReservationForm ? (
                    // Product Details View
                    <>
                      <h2 className="text-xl font-bold text-gray-900 ltr:sm:pr-12 rtl:sm:pl-12">
                        {product.name}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          {translations.productQuickview.productInformation}
                        </h3>

                        <p className="text-xl text-gray-900">
                          {product.price} {translations.currency.mad}
                        </p>

                        {/* Benefits Section */}
                        <div className="mt-6 space-y-3">
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="group flex items-center gap-3 bg-sky-50 p-3 transition-all duration-200 border border-sky-300">
                              <div className="flex-shrink-0">
                                <BoltIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-blue-900">
                                  {translations.productQuickview
                                    ?.fastDelivery || "Fast Delivery"}
                                </p>
                                <p className="text-xs text-blue-700">
                                  {translations.productQuickview
                                    ?.fastDeliveryDesc || "2-5 working days"}
                                </p>
                              </div>
                            </div>

                            <div className="group flex items-center gap-3 bg-pink-50 p-3 transition-all duration-200 border border-pink-300">
                              <div className="flex-shrink-0">
                                <ChatBubbleLeftRightIcon className="h-5 w-5 text-pink-600 group-hover:scale-110 transition-transform duration-200" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-pink-900">
                                  {translations.productQuickview?.support ||
                                    "24/7 Support"}
                                </p>
                                <p className="text-xs text-pink-700">
                                  {translations.productQuickview?.supportDesc ||
                                    "Customer service"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-6"
                      >
                        <h3 id="options-heading" className="sr-only">
                          {translations.productQuickview.productOptions}
                        </h3>

                        <form onSubmit={handleAddToBag}>
                          {/* Colors - Only show if colors exist */}
                          {colors.length > 0 && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 mb-3">
                                {translations.productQuickview.color}
                                <span className="text-red-500 ml-1">*</span>
                              </h3>
                              <div className="flex items-center flex-wrap gap-3">
                                {colors.map((color) => (
                                  <button
                                    key={color.id}
                                    type="button"
                                    onClick={() => setSelectedColor(color)}
                                    className={cn(
                                      "relative w-11 h-11 rounded-full border-2 transition-all",
                                      selectedColor?.id === color.id
                                        ? "border-rose-600 ring-2 ring-rose-600 ring-offset-2"
                                        : "border-gray-300 hover:border-gray-400"
                                    )}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                  ></button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Sizes - Only show if sizes exist */}
                          {sizes.length > 0 && (
                            <div className="mt-6">
                              <h3 className="text-sm font-medium text-gray-900 mb-3">
                                {translations.productQuickview.size}
                                <span className="text-red-500 ml-1">*</span>
                              </h3>
                              <div className="grid grid-cols-4 gap-2">
                                {sizes.map((size) => (
                                  <button
                                    key={size.id}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    disabled={!size.inStock}
                                    className={cn(
                                      "px-3 py-4 font-medium border transition-colors",
                                      selectedSize?.id === size.id
                                        ? "bg-rose-600 text-white border-rose-600"
                                        : size.inStock
                                        ? "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                                        : "bg-gray-50 text-gray-200 border-gray-200 cursor-not-allowed"
                                    )}
                                  >
                                    {size.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex w-full justify-between gap-2 items-center mt-8">
                            <Button
                              color="white"
                              type="submit"
                              disabled={!product.instock}
                              className="w-full !h-12 flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {!product.instock
                                ? translations.productQuickview.outOfStock
                                : translations.productQuickview.addToBag}
                            </Button>
                            <Button
                              color="rose"
                              type="button"
                              onClick={handleShopNowClick}
                              disabled={!product.instock}
                              className="w-full !h-12 flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {translations.productQuickview.shopNow}
                            </Button>
                          </div>
                        </form>
                      </section>
                    </>
                  ) : (
                    // Reservation Form View
                    <div className="h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <button
                          type="button"
                          onClick={() => setShowReservationForm(false)}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <ArrowLeftIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {translations.productQuickview.reservationForm.title}
                        </h2>
                      </div>

                      <form
                        onSubmit={handleReservationSubmit}
                        className="space-y-4"
                      >
                        {/* Full Name */}
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-sm/6 font-medium text-gray-700"
                          >
                            {
                              translations.productQuickview.reservationForm
                                .fullName
                            }
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={reservationForm.fullName}
                            onChange={handleReservationInputChange}
                            placeholder={
                              translations.productQuickview.reservationForm
                                .fullNamePlaceholder
                            }
                            className={cn(
                              "w-full",
                              reservationErrors.fullName
                                ? "border-red-500"
                                : "border-gray-300"
                            )}
                          />
                        </div>

                        {/* Address */}
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm/6 font-medium text-gray-700"
                          >
                            {
                              translations.productQuickview.reservationForm
                                .address
                            }
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Input
                            type="text"
                            id="address"
                            name="address"
                            value={reservationForm.address}
                            onChange={handleReservationInputChange}
                            placeholder={
                              translations.productQuickview.reservationForm
                                .addressPlaceholder
                            }
                            className={cn(
                              "w-full",
                              reservationErrors.address
                                ? "border-red-500"
                                : "border-gray-300"
                            )}
                          />
                        </div>

                        {/* Mobile */}
                        <div>
                          <label
                            htmlFor="mobile"
                            className="block text-sm/6 font-medium text-gray-700"
                          >
                            {
                              translations.productQuickview.reservationForm
                                .mobile
                            }
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={reservationForm.mobile}
                            onChange={handleReservationInputChange}
                            placeholder={
                              translations.productQuickview.reservationForm
                                .mobilePlaceholder
                            }
                            className={cn(
                              "w-full",
                              reservationErrors.mobile
                                ? "border-red-500"
                                : "border-gray-300"
                            )}
                          />
                        </div>

                        {/* City */}
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm/6 font-medium text-gray-700"
                          >
                            {translations.productQuickview.reservationForm.city}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Input
                            type="text"
                            id="city"
                            name="city"
                            value={reservationForm.city}
                            onChange={handleReservationInputChange}
                            placeholder={
                              translations.productQuickview.reservationForm
                                .cityPlaceholder
                            }
                            className={cn(
                              "w-full",
                              reservationErrors.city
                                ? "border-red-500"
                                : "border-gray-300"
                            )}
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                          <Button
                            color="rose"
                            type="submit"
                            disabled={isSubmittingReservation}
                            className="w-full !h-12 flex items-center justify-center font-semibold"
                          >
                            {isSubmittingReservation
                              ? translations.productQuickview.reservationForm
                                  .submitting
                              : translations.productQuickview.reservationForm
                                  .submit}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
