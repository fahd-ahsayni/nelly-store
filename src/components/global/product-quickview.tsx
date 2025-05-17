'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'

// Default product data (will be overridden by props)
const defaultProduct = {
  name: "Women's Basic Tee",
  price: '$32',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
  imageAlt: "Back of women's Basic Tee in black.",
  colors: [
    { name: 'Black', bgColor: 'bg-zinc-900', selectedColor: 'ring-zinc-900' },
    { name: 'Heather Grey', bgColor: 'bg-zinc-400', selectedColor: 'ring-zinc-400' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: false },
  ],
  inStock: true,
}

type ProductQuickviewProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product?: any;
}

export default function ProductQuickview({ 
  open, 
  setOpen, 
  product = defaultProduct 
}: ProductQuickviewProps) {
  // Initialize with fallback values
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || defaultProduct.colors[0]
  );
  
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || defaultProduct.sizes[0]
  );

  // Update selections when product changes
  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    
    if (product?.sizes?.length > 0) {
      const firstInStockSize = product.sizes.find((size: any) => size.inStock);
      setSelectedSize(firstInStockSize || product.sizes[0]);
    }
  }, [product]);

  // Use the provided product data or fall back to defaults
  const displayProduct = {
    ...defaultProduct,
    ...product,
    // Ensure these properties exist even if not provided in the product prop
    colors: product?.colors || defaultProduct.colors,
    sizes: product?.sizes || defaultProduct.sizes,
    rating: product?.rating || defaultProduct.rating,
    reviewCount: product?.reviewCount || defaultProduct.reviewCount,
    inStock: product?.inStock ?? defaultProduct.inStock,
  }

  console.log("Quick view open state:", open);
  console.log("Product data:", displayProduct);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-zinc-500/75" aria-hidden="true" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <span className="hidden md:inline-block md:h-screen md:align-middle">&#8203;</span>
          
          <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                <div className="relative sm:col-span-4 lg:col-span-5">
                  <img
                    src={displayProduct.imageSrc}
                    alt={displayProduct.imageAlt}
                    className="aspect-[2/3] w-full rounded-lg bg-zinc-100 object-cover"
                  />
                  {!displayProduct.inStock && (
                    <div className="absolute top-4 right-4 bg-zinc-800 text-white text-xs px-2 py-1">
                      Out of stock
                    </div>
                  )}
                </div>
                
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-xl font-medium text-zinc-900 sm:pr-12">{displayProduct.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-1">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="font-medium text-zinc-900">{displayProduct.price}</p>

                    {/* Reviews */}
                    <div className="mt-4">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <p className="text-sm text-zinc-700">
                          {displayProduct.rating}
                          <span className="sr-only"> out of 5 stars</span>
                        </p>
                        <div className="ml-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={cn(
                                displayProduct.rating > rating ? 'text-yellow-400' : 'text-zinc-200',
                                'h-5 w-5 shrink-0',
                              )}
                            />
                          ))}
                        </div>
                        <div className="ml-4 hidden lg:flex lg:items-center">
                          <span aria-hidden="true" className="text-zinc-300">
                            &middot;
                          </span>
                          <a href="#" className="ml-4 text-sm font-medium text-rose-600 hover:text-rose-500">
                            See all {displayProduct.reviewCount} reviews
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-8">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form>
                      {/* Color picker */}
                      <fieldset aria-label="Choose a color">
                        <legend className="text-sm font-medium text-zinc-900">Color</legend>

                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="mt-2 flex items-center gap-x-3"
                        >
                          {displayProduct.colors.map((color: any) => (
                            <Radio
                              key={color.name}
                              value={color}
                              aria-label={color.name}
                              className={cn(
                                color.selectedColor,
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-checked:ring-2',
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(color.bgColor, 'h-8 w-8 rounded-full border border-black/10')}
                              />
                            </Radio>
                          ))}
                        </RadioGroup>
                      </fieldset>

                      {/* Size picker */}
                      <fieldset aria-label="Choose a size" className="mt-8">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-zinc-900">Size</div>
                          <a href="#" className="text-sm font-medium text-rose-600 hover:text-rose-500">
                            Size guide
                          </a>
                        </div>

                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-2 grid grid-cols-7 gap-2"
                        >
                          {displayProduct.sizes.map((size: any) => (
                            <Radio
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={cn(
                                size.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                                'flex items-center justify-center rounded-md border border-zinc-200 bg-white px-3 py-3 text-sm font-medium text-zinc-900 uppercase hover:bg-zinc-50 data-checked:border-transparent data-checked:bg-rose-600 data-checked:text-white data-checked:hover:bg-rose-700 sm:flex-1',
                              )}
                            >
                              {size.name}
                            </Radio>
                          ))}
                        </RadioGroup>
                      </fieldset>

                      <button
                        type="submit"
                        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-8 py-3 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>

                      <p className="absolute top-4 left-4 text-center sm:static sm:mt-8">
                        <a href={displayProduct.href} className="font-medium text-rose-600 hover:text-rose-500">
                          View full details
                        </a>
                      </p>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
