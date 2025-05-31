"use client";

import { Navbar } from "@/components/global";
import { useCartItems, useCartTotal, useCartStore } from "@/stores/cartStore";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface FormData {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  secondaryMobileNumber: string;
}

export default function Checkout() {
  const cartItems = useCartItems();
  const subtotal = useCartTotal();
  const { removeFromCart, clearCart } = useCartStore();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    mobileNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    secondaryMobileNumber: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.mobileNumber || !formData.firstName || !formData.lastName || !formData.address || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
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
        items: cartItems.map(item => ({
          product_id: item.productId,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          color_hex: item.colorHex,
          size: item.size,
          image: item.image
        })),
        total_amount: subtotal,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from('reservations')
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        toast.error("Failed to place order. Please try again.");
        return;
      }

      // Success - clear cart and redirect
      toast.success("Order placed successfully!");
      clearCart();
      
      // Redirect to success page or home with order ID
      router.push(`/order-success?orderId=${data.id}`);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <div className="relative isolate min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-zinc-900 mb-4">Your cart is empty</h2>
            <button
              onClick={() => router.push('/')}
              className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate">
      <Navbar />
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
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
        <h2 className="sr-only">Checkout</h2>

        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div>
              <h2 className="text-lg font-medium text-zinc-900">
                Contact information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm/6 font-medium text-zinc-700"
                >
                  Mobile Number <span className="text-red-500">*</span>
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
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-zinc-200 pt-10">
              <h2 className="text-lg font-medium text-zinc-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm/6 font-medium text-zinc-700"
                  >
                    First name <span className="text-red-500">*</span>
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
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm/6 font-medium text-zinc-700"
                  >
                    Last name <span className="text-red-500">*</span>
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
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm/6 font-medium text-zinc-700"
                  >
                    Address <span className="text-red-500">*</span>
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
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm/6 font-medium text-zinc-700"
                  >
                    City <span className="text-red-500">*</span>
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
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="secondaryMobileNumber"
                    className="block text-sm/6 font-medium text-zinc-700"
                  >
                    Secondary Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="secondaryMobileNumber"
                      name="secondaryMobileNumber"
                      type="tel"
                      autoComplete="tel"
                      value={formData.secondaryMobileNumber}
                      onChange={handleInputChange}
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-zinc-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-zinc-200 bg-white shadow-xs">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-zinc-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex px-4 py-6 sm:px-6">
                    <div className="shrink-0">
                      <img
                        alt={item.name}
                        src={item.image}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <span className="font-medium text-zinc-700 hover:text-zinc-800">
                              {item.name}
                            </span>
                          </h4>
                          <p className="mt-1 text-sm text-zinc-500 flex items-center gap-2">
                            <span
                              className="inline-block h-4 w-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.colorHex }}
                            />
                            {item.color}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500">
                            Size: {item.size}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="ml-4 flow-root shrink-0">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-zinc-400 hover:text-zinc-500"
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon aria-hidden="true" className="size-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-zinc-900">
                          {(item.price * item.quantity).toFixed(2)} Dhs
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-zinc-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-zinc-900">
                    {subtotal.toFixed(2)} Dhs
                  </dd>
                </div>
              </dl>

              <div className="border-t border-zinc-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full rounded-md border border-transparent bg-rose-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-rose-700 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:outline-hidden disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Confirm order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
