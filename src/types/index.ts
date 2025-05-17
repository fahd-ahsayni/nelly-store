export interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  href: string;
  imageSrc: string; // Main image (for backwards compatibility)
  imageAlt: string;
  inStock: boolean;
  colors: Color[];
  sizes: Size[];
  rating: number;
  reviewCount: number;
  description?: string;
  slug: string;
  images: ProductImage[]; // Array of product images for carousel
  createdAt?: string;
  updatedAt?: string;
  stockLevel?: string; // Optional stock level message
  shipping?: string;   // Optional shipping information
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Color {
  name: string;
  hex: string;
  selectedColor?: string; // Make selectedColor optional to avoid TS errors
}

// Define standard sizes for display
export const STANDARD_SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

export interface Size {
  name: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  colorHex: string;
  size: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  inStock: boolean;
  productId: string;
}

// Dialog context types
export interface DialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel?: () => void;
}
