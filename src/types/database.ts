export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Collections table
      collections: {
        Row: {
          id: string
          name: string
          description: string
          imageSrc: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          imageSrc: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          imageSrc?: string
          created_at?: string
        }
      }
      
      // Colors table
      colors: {
        Row: {
          id: string
          name: string
          hex: string
          selectedColor: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          hex: string
          selectedColor: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          hex?: string
          selectedColor?: string
          created_at?: string
        }
      }
      
      // Products table
      products: {
        Row: {
          id: string
          name: string
          collection_id: string
          price: number
          imageSrc: string
          imageAlt: string
          inStock: boolean
          rating: number
          slug: string
          createdAt: string
          updatedAt: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          collection_id: string
          price: number
          imageSrc: string
          imageAlt: string
          inStock: boolean
          rating: number
          slug: string
          createdAt?: string
          updatedAt?: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          collection_id?: string
          price?: number
          imageSrc?: string
          imageAlt?: string
          inStock?: boolean
          rating?: number
          slug?: string
          createdAt?: string
          updatedAt?: string
          description?: string | null
        }
      }

      // Product images table
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          alt_text: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      
      // Product colors junction table
      product_colors: {
        Row: {
          id: string
          product_id: string
          color_id: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          color_id: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          color_id?: string
          created_at?: string
        }
      }
      
      // Product sizes table
      product_sizes: {
        Row: {
          id: string
          product_id: string
          size: string
          inStock: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          size: string
          inStock: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          size?: string
          inStock?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
