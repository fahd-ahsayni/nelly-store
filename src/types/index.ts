import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  collection: Collection;
  price: number;
  imageSrc: string;
  imageAlt: string;
  inStock: boolean;
  colors: Color[];
  sizes: string[];
  rating: number;
  slug: string;
  images: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Define standard sizes for display
export const STANDARD_SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageSrc: string | StaticImageData;
}

export interface Color {
  name: string | any;
  hex: string | any;
  selectedColor: string | any;
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

// Helper type for product quickview
export interface ProductImage {
  src: string;
  alt: string;
}
