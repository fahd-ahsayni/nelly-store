import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";

export function InputGroup({
  children,
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="control"
      className={clsx(
        "relative isolate block",
        "has-[[data-slot=icon]:first-child]:[&_input]:pl-10 has-[[data-slot=icon]:last-child]:[&_input]:pr-10 sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-8 sm:has-[[data-slot=icon]:last-child]:[&_input]:pr-8",
        "rtl:has-[[data-slot=icon]:first-child]:[&_input]:pr-10 rtl:has-[[data-slot=icon]:first-child]:[&_input]:pl-0 rtl:has-[[data-slot=icon]:last-child]:[&_input]:pl-10 rtl:has-[[data-slot=icon]:last-child]:[&_input]:pr-0 rtl:sm:has-[[data-slot=icon]:first-child]:[&_input]:pr-8 rtl:sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-0 rtl:sm:has-[[data-slot=icon]:last-child]:[&_input]:pl-8 rtl:sm:has-[[data-slot=icon]:last-child]:[&_input]:pr-0",
        "*:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-3 *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:top-2.5 sm:*:data-[slot=icon]:size-4",
        "[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5",
        "rtl:[&>[data-slot=icon]:first-child]:right-3 rtl:[&>[data-slot=icon]:first-child]:left-auto rtl:sm:[&>[data-slot=icon]:first-child]:right-2.5 rtl:sm:[&>[data-slot=icon]:first-child]:left-auto rtl:[&>[data-slot=icon]:last-child]:left-3 rtl:[&>[data-slot=icon]:last-child]:right-auto rtl:sm:[&>[data-slot=icon]:last-child]:left-2.5 rtl:sm:[&>[data-slot=icon]:last-child]:right-auto",
        "*:data-[slot=icon]:text-gray-500"
      )}
    >
      {children}
    </span>
  );
}

const dateTypes = ["date", "datetime-local", "month", "time", "week"];
type DateType = (typeof dateTypes)[number];

export const Input = forwardRef(function Input(
  {
    className,
    ...props
  }: {
    className?: string;
    type?:
      | "email"
      | "number"
      | "password"
      | "search"
      | "tel"
      | "text"
      | "url"
      | DateType;
  } & Omit<Headless.InputProps, "as" | "className">,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        "relative block w-full",
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        "before:absolute before:inset-px before:bg-white before:shadow-sm",
        // Focus ring
        "after:pointer-events-none after:absolute after:inset-0 after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-rose-500",
        // Disabled state
        "has-data-disabled:opacity-50 has-data-disabled:before:bg-gray-950/5 has-data-disabled:before:shadow-none",
        // Invalid state
        "has-data-invalid:before:shadow-red-500/10",
      ])}
    >
      <Headless.Input
        ref={ref}
        {...props}
        className={clsx([
          // Date classes
          props.type &&
            dateTypes.includes(props.type) && [
              "[&::-webkit-datetime-edit-fields-wrapper]:p-0",
              "[&::-webkit-date-and-time-value]:min-h-[1.5em]",
              "[&::-webkit-datetime-edit]:inline-flex",
              "[&::-webkit-datetime-edit]:p-0",
              "[&::-webkit-datetime-edit-year-field]:p-0",
              "[&::-webkit-datetime-edit-month-field]:p-0",
              "[&::-webkit-datetime-edit-day-field]:p-0",
              "[&::-webkit-datetime-edit-hour-field]:p-0",
              "[&::-webkit-datetime-edit-minute-field]:p-0",
              "[&::-webkit-datetime-edit-second-field]:p-0",
              "[&::-webkit-datetime-edit-millisecond-field]:p-0",
              "[&::-webkit-datetime-edit-meridiem-field]:p-0",
            ],
          // Basic layout
          "relative block w-full appearance-none px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]",
          // Typography
          "text-base/6 text-gray-950 placeholder:text-gray-500 sm:text-sm/6",
          // Border
          "border border-gray-950/10 data-hover:border-gray-950/20",
          // Background color
          "bg-transparent",
          // Hide default focus styles
          "focus:outline-hidden",
          // Invalid state
          "data-invalid:border-red-500 data-invalid:data-hover:border-red-500",
          // Disabled state
          "data-disabled:border-gray-950/20",
        ])}
      />
    </span>
  );
});
