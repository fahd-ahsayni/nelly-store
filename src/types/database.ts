export interface Collection {
  id: string;
  name: string;
  description: string;
  imagesrc: string;
  created_at: string;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  selectedcolor: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  collection_id: string;
  price: number;
  imagesrc: string;
  imagealt: string;
  instock: boolean;
  rating: number;
  slug: string;
  description: string | null;
  createdat: string;
  updatedat: string;
  sizes: string[];
  image_urls: string[];
  type: string;
}

export interface ProductColor {
  id: string;
  product_id: string;
  color_id: string;
  created_at: string;
}

export interface Reservation {
  id: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_mobile: string;
  customer_secondary_mobile: string | null;
  customer_address: string;
  customer_city: string;
  items: any; // JSON object
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

// Extended types with relations
export interface ProductWithCollection extends Product {
  collections: Collection;
}

export interface ProductWithColors extends Product {
  product_colors: (ProductColor & { colors: Color })[];
}

export interface ProductFull extends Product {
  collections: Collection;
  product_colors: (ProductColor & { colors: Color })[];
}
