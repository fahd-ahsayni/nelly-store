"use client";

import { Navbar } from "@/components/global";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Redirect to home after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="relative isolate min-h-screen">
      <Navbar />
      
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
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

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>

          {/* Success Message */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Order Placed Successfully!
          </h1>
          
          <p className="mt-4 text-lg text-zinc-600">
            Thank you for your order. We've received your reservation and will process it shortly.
          </p>

          {orderId && (
            <div className="mt-6 rounded-md bg-zinc-50 px-4 py-3 sm:px-6">
              <p className="text-sm text-zinc-700">
                Order ID: <span className="font-medium text-zinc-900">{orderId}</span>
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Please save this ID for your reference
              </p>
            </div>
          )}

          {/* What's Next Section */}
          <div className="mt-10 border-t border-zinc-200 pt-10">
            <h2 className="text-lg font-medium text-zinc-900">What happens next?</h2>
            <ul className="mt-4 space-y-3 text-left max-w-md mx-auto">
              <li className="flex items-start">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-xs font-medium text-rose-600">
                  1
                </span>
                <span className="ml-3 text-sm text-zinc-600">
                  You'll receive a confirmation call on your mobile number
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-xs font-medium text-rose-600">
                  2
                </span>
                <span className="ml-3 text-sm text-zinc-600">
                  Our team will prepare your order for delivery
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-xs font-medium text-rose-600">
                  3
                </span>
                <span className="ml-3 text-sm text-zinc-600">
                  Your order will be delivered to your address
                </span>
              </li>
            </ul>
          </div>

          {/* Auto-redirect notice */}
          <div className="mt-10">
            <p className="text-sm text-zinc-500">
              Redirecting to home page in {countdown} seconds...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center justify-center rounded-md bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}