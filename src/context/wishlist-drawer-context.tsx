'use client'

import { useLocalStorage } from '@/hooks/use-localstorage';
import { WishlistItem } from '@/types';
import { createContext, useContext, ReactNode } from 'react'

interface WishlistDrawerContextProps {
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isItemInWishlist: (productId: string) => boolean;
}

const WishlistDrawerContext = createContext<WishlistDrawerContextProps | undefined>(undefined)

export function WishlistDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useLocalStorage('wishlist-drawer-open', false);
  const [wishlistItems, setWishlistItems] = useLocalStorage<WishlistItem[]>('wishlist-items', []);

  const openWishlist = () => setIsOpen(true);
  const closeWishlist = () => setIsOpen(false);
  
  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      // Don't add duplicate items
      if (prev.some(i => i.productId === item.productId)) return prev;
      return [...prev, item];
    });
  };
  
  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const isItemInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  return (
    <WishlistDrawerContext.Provider value={{ 
      isOpen, 
      openWishlist, 
      closeWishlist,
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isItemInWishlist
    }}>
      {children}
    </WishlistDrawerContext.Provider>
  )
}

export function useWishlistDrawer() {
  const context = useContext(WishlistDrawerContext)
  if (context === undefined) {
    throw new Error('useWishlistDrawer must be used within a WishlistDrawerProvider')
  }
  return context
}
