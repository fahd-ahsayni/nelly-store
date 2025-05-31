import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageSrc: string;
  imageAlt: string;
  colors: Color[];
  sizes: string[];
  inStock: boolean;
  slug: string;
  images: string[];
  collection: Collection;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Define standard sizes for display
export const STANDARD_SIZES = ["M", "L", "XL", "XXL"];

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageSrc: string | StaticImageData;
}

export interface Color {
  name: string;
  hex: string;
  selectedColor: string;
}

// Additional types needed for the application
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
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  inStock: boolean;
  colorName?: string;
  colorHex?: string;
  size?: string;
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

// Helper type for product quickview
export interface ProductImage {
  src: string;
  alt: string;
}
