'use client'

import { WishlistItem } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react'

interface WishlistDrawerContextProps {
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistDrawerContext = createContext<WishlistDrawerContextProps | undefined>(undefined)

export function WishlistDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const openWishlist = () => setIsOpen(true);
  const closeWishlist = () => setIsOpen(false);
  
  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      // Don't add duplicate items
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };
  
  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <WishlistDrawerContext.Provider value={{ 
      isOpen, 
      openWishlist, 
      closeWishlist,
      wishlistItems,
      addToWishlist,
      removeFromWishlist
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
