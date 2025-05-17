'use client'

import { useShoppingCart } from '@/context/shopping-cart-context';
import { useWishlistDrawer } from '@/context/wishlist-drawer-context';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { Dialog, DialogPanel, Radio, RadioGroup } from '@headlessui/react';
import { HeartIcon, MinusIcon, PlusIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Default product data (will be overridden by props)
const defaultProduct: Product = {
  id: "default",
  name: "Product Name",
  price: 0,
  rating: 0,
  reviewCount: 0,
  href: '#',
  imageSrc: '/images/placeholder.jpg',
  imageAlt: "Product image placeholder",
  inStock: true,
  colors: [
    { name: 'Black', hex: '#000000', selectedColor: 'ring-zinc-900' },
    { name: 'Gray', hex: '#6B7280', selectedColor: 'ring-zinc-400' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
  ],
  collection: "Default",
  slug: "default-product"
};

type ProductQuickviewProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product?: Product;
}

export default function ProductQuickview({ 
  open, 
  setOpen, 
  product = defaultProduct 
}: ProductQuickviewProps) {
  // State management
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || defaultProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes.find(s => s.inStock) || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Context hooks
  const { addToCart } = useShoppingCart();
  const { addToWishlist, isItemInWishlist } = useWishlistDrawer();
  const isInWishlist = isItemInWishlist(product.id);

  // Update state when product changes
  useEffect(() => {
    if (product) {
      // Find first in-stock size
      const availableSize = product.sizes.find(s => s.inStock);
      setSelectedSize(availableSize || product.sizes[0]);
      
      // Set first available color
      if (product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      
      // Reset quantity
      setQuantity(1);
    }
  }, [product]);

  // Display product data
  const displayProduct = {
    ...defaultProduct,
    ...product
  };

  // Handle quantity changes
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Handle form submission
  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (addingToCart || !product.inStock) return;
    
    setAddingToCart(true);
    try {
      // Add item to cart
      addToCart({
        id: uuidv4(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.imageSrc,
        color: selectedColor.name,
        colorHex: selectedColor.hex,
        size: selectedSize.name,
      });
      
      // Show success message
      setSuccessMessage("Added to cart!");
      setTimeout(() => setSuccessMessage(""), 2000);
      
      // Optionally close the modal after adding to cart
      // setTimeout(() => setOpen(false), 1500);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (addingToWishlist || isInWishlist) return;
    
    setAddingToWishlist(true);
    try {
      // Add to wishlist
      addToWishlist({
        id: uuidv4(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.imageSrc,
        slug: product.slug,
        inStock: product.inStock
      });
      
      // Show success message
      setSuccessMessage("Added to wishlist!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    } finally {
      setAddingToWishlist(false);
    }
  };

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
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-zinc-100">
                    <img
                      src={displayProduct.imageSrc}
                      alt={displayProduct.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                    {!displayProduct.inStock && (
                      <div className="absolute top-4 right-4 bg-zinc-800 text-white text-xs px-2 py-1">
                        Out of stock
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-xl font-medium text-zinc-900 sm:pr-12">{displayProduct.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-1">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="font-medium text-zinc-900">${displayProduct.price.toFixed(2)}</p>

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

                    {/* Description if available */}
                    {displayProduct.description && (
                      <div className="mt-4">
                        <p className="text-sm text-zinc-700">{displayProduct.description}</p>
                      </div>
                    )}
                  </section>

                  <section aria-labelledby="options-heading" className="mt-8">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form onSubmit={handleAddToCart}>
                      {/* Color picker */}
                      {displayProduct.colors.length > 0 && (
                        <fieldset aria-label="Choose a color" className="mb-4">
                          <legend className="text-sm font-medium text-zinc-900">Color</legend>
                          <RadioGroup
                            value={selectedColor}
                            onChange={setSelectedColor}
                            className="mt-2 flex items-center gap-x-3"
                          >
                            {displayProduct.colors.map((color) => (
                              <Radio
                                key={color.name}
                                value={color}
                                aria-label={color.name}
                                className={cn(
                                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-checked:ring-2 data-checked:ring-rose-600 data-checked:ring-offset-1',
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className="h-8 w-8 rounded-full border border-black/10"
                                  style={{ backgroundColor: color.hex }}
                                />
                              </Radio>
                            ))}
                          </RadioGroup>
                        </fieldset>
                      )}

                      {/* Size picker */}
                      {displayProduct.sizes.length > 0 && (
                        <fieldset aria-label="Choose a size" className="mt-6">
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
                            {displayProduct.sizes.map((size) => (
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
                      )}

                      {/* Quantity selector */}
                      <div className="mt-6">
                        <label htmlFor="quantity" className="text-sm font-medium text-zinc-900">
                          Quantity
                        </label>
                        <div className="mt-2 flex items-center border border-zinc-300 rounded-md max-w-[8rem]">
                          <button
                            type="button"
                            onClick={decreaseQuantity}
                            className="p-2 text-zinc-500 hover:text-zinc-700 focus:outline-none"
                            disabled={quantity <= 1}
                          >
                            <MinusIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-10 text-center border-0 focus:outline-none focus:ring-0"
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={increaseQuantity}
                            className="p-2 text-zinc-500 hover:text-zinc-700 focus:outline-none"
                          >
                            <PlusIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-6 flex gap-x-4">
                        <button
                          type="submit"
                          disabled={!displayProduct.inStock || addingToCart}
                          className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-8 py-3 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                        >
                          {addingToCart ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Adding...
                            </span>
                          ) : !displayProduct.inStock ? (
                            "Out of Stock"
                          ) : (
                            <>
                              <ShoppingBagIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                              Add to Cart
                            </>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleAddToWishlist}
                          disabled={addingToWishlist || isInWishlist}
                          className="rounded-md border border-zinc-300 bg-white px-3 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          <HeartIcon 
                            className={`h-5 w-5 ${isInWishlist ? 'text-rose-600 fill-rose-600' : ''}`} 
                            aria-hidden="true" 
                          />
                        </button>
                      </div>

                      {/* Full details link */}
                      <p className="mt-6">
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
      
      {/* Success message toast */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-md shadow-lg"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
