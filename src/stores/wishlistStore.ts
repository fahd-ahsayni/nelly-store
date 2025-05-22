import { WishlistItem } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WishlistState {
  isOpen: boolean;
  items: WishlistItem[];
}

interface WishlistActions {
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isItemInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState & WishlistActions>()(
  devtools(
    persist(
      (set, get) => ({
        isOpen: false,
        items: [],
        
        openWishlist: () => set({ isOpen: true }),
        closeWishlist: () => set({ isOpen: false }),
        toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
        
        addToWishlist: (item) => {
          set((state) => {
            // Don't add duplicate items
            if (state.items.some((i) => i.productId === item.productId)) {
              return state;
            }
            return { items: [...state.items, item] };
          });
        },
        
        removeFromWishlist: (id) => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          }));
        },
        
        isItemInWishlist: (productId) => {
          return get().items.some((item) => item.productId === productId);
        },
        
        clearWishlist: () => set({ items: [] }),
      }),
      {
        name: "wishlist-storage",
      }
    )
  )
);

// Selector hooks for performance optimization
export const useWishlistItems = () => useWishlistStore((state) => state.items);
export const useWishlistDrawerState = () => useWishlistStore((state) => state.isOpen);
export const useWishlistItemCount = () => useWishlistStore((state) => state.items.length);
