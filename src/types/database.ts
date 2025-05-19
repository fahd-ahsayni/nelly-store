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
          imagesrc: string // Changed from imageSrc to match database column
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          imagesrc: string // Changed from imageSrc to match database column
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          imagesrc?: string // Changed from imageSrc to match database column
          created_at?: string
        }
      }
      
      // Colors table
      colors: {
        Row: {
          id: string
          name: string
          hex: string
          selectedcolor: string // Changed from selectedColor to selectedcolor to match DB
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          hex: string
          selectedcolor: string // Changed from selectedColor to selectedcolor
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          hex?: string
          selectedcolor?: string // Changed from selectedColor to selectedcolor
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
          inStock: boolean | string // Accepting either type to handle different formats
          rating: number
          slug: string
          createdAt: string
          updatedAt: string
          description: string | null
          sizes: string[]
          image_urls: string[]
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
          sizes?: string[]
          image_urls?: string[]
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
          sizes?: string[]
          image_urls?: string[]
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
