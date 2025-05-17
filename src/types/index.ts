export interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  href: string;
  imageSrc: string;
  imageAlt: string;
  inStock: boolean;
  colors: Color[];
  sizes: Size[];
  rating: number;
  reviewCount: number;
  description?: string;
  slug: string;
}

export interface Color {
  name: string;
  hex: string;
  selectedColor: string;
}

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
