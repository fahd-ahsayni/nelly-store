"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import type { Color } from "@/types/database";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  translations: any;
  colors: Color[];
  availableSizes: string[];
  selectedColors: string[];
  selectedSizes: string[];
  onFiltersChange: (filters: { colors: string[]; sizes: string[] }) => void;
}

export default function FilterDrawer({
  open,
  onClose,
  translations,
  colors,
  availableSizes,
  selectedColors,
  selectedSizes,
  onFiltersChange,
}: FilterDrawerProps) {
  const [tempSelectedColors, setTempSelectedColors] =
    useState<string[]>(selectedColors);
  const [tempSelectedSizes, setTempSelectedSizes] =
    useState<string[]>(selectedSizes);

  useEffect(() => {
    setTempSelectedColors(selectedColors);
    setTempSelectedSizes(selectedSizes);
  }, [selectedColors, selectedSizes, open]);

  const handleColorToggle = (colorId: string) => {
    setTempSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleSizeToggle = (size: string) => {
    setTempSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleClearAll = () => {
    setTempSelectedColors([]);
    setTempSelectedSizes([]);
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      colors: tempSelectedColors,
      sizes: tempSelectedSizes,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-40">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className={cn(
            "relative flex w-full max-w-md flex-col bg-gray-50 shadow-xl transition duration-300 ease-in-out",
            "ltr:ml-auto ltr:data-closed:translate-x-full rtl:mr-auto rtl:data-closed:-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
            <Heading className="text-lg font-medium text-gray-900">
              {translations.shop?.filters?.title || "Filters"}
            </Heading>
            <button
              type="button"
              onClick={onClose}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">
                {translations.navigation.closeMenu}
              </span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-6 mt-8 pb-20">
            {/* Colors Filter */}
            {colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {translations.shop?.filters?.colors || "Colors"}
                </h3>
                <div className="flex items-center flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorToggle(color.id)}
                      className={cn(
                        "relative w-11 h-11 rounded-full border-2 transition-all",
                        tempSelectedColors.includes(color.id)
                          ? "border-rose-600 ring-2 ring-rose-600 ring-offset-2"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {tempSelectedColors.includes(color.id) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Filter */}
            {availableSizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {translations.shop?.filters?.sizes || "Sizes"}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={cn(
                        "px-3 py-4 font-medium border transition-colors",
                        tempSelectedSizes.includes(size)
                          ? "bg-rose-600 text-white border-rose-600"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions - Sticky Bottom */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4 gap-3 flex rtl:flex-row-reverse items-center">
            <Button
              onClick={handleClearAll}
              outline
              className="w-full h-12 flex items-center justify-center"
            >
              {translations.shop?.filters?.clearAll || "Clear All"}
            </Button>
            <Button
              onClick={handleApplyFilters}
              color="rose"
              className="w-full h-12 flex items-center justify-center"
            >
              {translations.shop?.filters?.apply || "Apply Filters"}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
