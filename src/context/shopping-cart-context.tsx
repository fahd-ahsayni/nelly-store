"use client";

import { useLocalStorage } from "@/hooks/use-localstorage";
import { CartItem } from "@/types";
import React, { createContext, useContext, ReactNode } from "react";

interface ShoppingCartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartCount: number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useLocalStorage('cart-drawer-open', false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart-items', []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => 
        i.productId === item.productId && 
        i.color === item.color && 
        i.size === item.size
      );
      
      if (existingItem) {
        return prev.map(i => 
          i.id === existingItem.id 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      return [...prev, item];
    });
  };
  
  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ShoppingCartContext.Provider value={{ 
      isCartOpen, 
      openCart, 
      closeCart,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
}
