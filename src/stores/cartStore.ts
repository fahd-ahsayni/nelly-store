import { CartItem } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  cartCount: number;
}

interface CartActions {
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState & CartActions>()(
  devtools(
    persist(
      (set, get) => ({
        isCartOpen: false,
        cartItems: [],
        cartCount: 0,
        
        openCart: () => set({ isCartOpen: true }),
        closeCart: () => set({ isCartOpen: false }),
        toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
        
        addToCart: (item) => {
          set((state) => {
            const existingItem = state.cartItems.find(
              (i) => 
                i.productId === item.productId && 
                i.color === item.color && 
                i.size === item.size
            );
            
            let newItems;
            if (existingItem) {
              newItems = state.cartItems.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              );
            } else {
              newItems = [...state.cartItems, item];
            }
            
            const newCount = newItems.reduce((total, item) => total + item.quantity, 0);
            
            return {
              cartItems: newItems,
              cartCount: newCount,
            };
          });
        },
        
        removeFromCart: (id) => {
          set((state) => {
            const newItems = state.cartItems.filter((item) => item.id !== id);
            const newCount = newItems.reduce((total, item) => total + item.quantity, 0);
            
            return {
              cartItems: newItems,
              cartCount: newCount,
            };
          });
        },
        
        updateQuantity: (id, quantity) => {
          set((state) => {
            if (quantity <= 0) {
              const newItems = state.cartItems.filter((item) => item.id !== id);
              const newCount = newItems.reduce((total, item) => total + item.quantity, 0);
              
              return {
                cartItems: newItems,
                cartCount: newCount,
              };
            }
            
            const newItems = state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );
            
            const newCount = newItems.reduce((total, item) => total + item.quantity, 0);
            
            return {
              cartItems: newItems,
              cartCount: newCount,
            };
          });
        },
        
        clearCart: () => set({ cartItems: [], cartCount: 0 }),
      }),
      {
        name: "cart-storage",
      }
    )
  )
);

// Selector hooks for performance optimization
export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useCartDrawerState = () => useCartStore((state) => state.isCartOpen);
export const useCartItemCount = () => useCartStore((state) => state.cartCount);
export const useCartTotal = () => 
  useCartStore((state) => 
    state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  );
