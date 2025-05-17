'use client'

import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  slug: string
  quantity: number
}

interface CartCardProps {
  item: CartItem
}

export default function CartCard({ item }: CartCardProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  // Placeholder functions - in a real app, these would interact with your state management
  const handleRemoveFromCart = async () => {
    setIsRemoving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      // Here you would dispatch an action to remove the item from cart
      console.log(`Removed ${item.name} from cart`)
    } catch (error) {
      console.error('Error removing from cart:', error)
    } finally {
      setIsRemoving(false)
    }
  }

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      // Here you would dispatch an action to add the item to wishlist
      console.log(`Added ${item.name} to wishlist`)
    } catch (error) {
      console.error('Error adding to wishlist:', error)
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  return (
    <div className="py-4 flex items-start group relative" data-testid={`cart-item-${item.id}`}>
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-zinc-200 relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 96px, 96px"
          className="object-cover object-center"
          // Fallback image on error
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.jpg'
          }}
        />
      </div>
      
      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between">
            <h3 className="text-sm text-zinc-900 pr-4">
              <Link href={`/products/${item.slug}`}>
                {item.name}
              </Link>
            </h3>
          </div>
          <p className="mt-1 text-sm font-medium text-zinc-900">${item.price.toFixed(2)}</p>
          <p className="mt-1 text-xs text-zinc-500">Quantity: {item.quantity}</p>
        </div>
        
        <div className="flex-1 flex items-end justify-between mt-4">
            <button
            type="button"
            onClick={handleAddToWishlist}
            disabled={isAddingToWishlist}
            className="inline-flex items-center px-3 py-1.5 border border-rose-300 text-sm font-medium rounded text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label={`Move ${item.name} to wishlist`}
            >
            {isAddingToWishlist ? (
              <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding
              </span>
            ) : (
              <>
              <HeartIcon className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Save for Later
              </>
            )}
            </button>
        </div>
      </div>
      
      <button
        type="button"
        className="absolute top-4 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md"
        onClick={handleRemoveFromCart}
        disabled={isRemoving}
        aria-label={`Remove ${item.name} from cart`}
      >
        {isRemoving ? (
          <svg className="animate-spin h-5 w-5 text-zinc-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
