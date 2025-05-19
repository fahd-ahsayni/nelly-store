"use client";

import { supabase, handleSupabaseError } from '@/lib/supabase';
import { COLUMNS, mapColorFromDb } from '@/lib/supabase-columns';
import { Collection, Color, Product } from '@/types';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DB_COLUMNS, mapDatabaseProductToModel } from '@/lib/db-mapping';

// Define the state shape
interface SupabaseStateContextType {
  isLoading: boolean;
  error: string | null;
  collections: Collection[];
  products: Product[];
  colors: Color[];
  fetchCollections: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchColors: () => Promise<void>;
  getProductsByCollection: (collectionId: string) => Product[];
  getNewProducts: () => Product[]; // Products created in the last month
  clearError: () => void;
}

// Create the context
const SupabaseStateContext = createContext<SupabaseStateContextType | undefined>(undefined);

// Define some types for Supabase responses - fix the structure to match actual response
interface ColorJoinResult {
  colors: {
    id: string;
    name: string;
    hex: string;
    selectedcolor: string;
  } | {
    id: string;
    name: string;
    hex: string;
    selectedcolor: string;
  }[];
}

interface ColorData {
  id: string;
  name: string;
  hex: string;
  selectedColor: string;
}

interface SizeResult {
  id: string;
  product_id: string;
  size: string;
  inStock: boolean;
}

interface ImageResult {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
}

// Provider component
export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<Color[]>([]);

  // Clear error
  const clearError = () => setError(null);

  // Fetch collections from Supabase
  const fetchCollections = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Query the collections table
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      // Transform to match our Collection type
      const transformedCollections: Collection[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        imageSrc: item.imageSrc,
      }));
      
      setCollections(transformedCollections);
    } catch (error) {
      setError(handleSupabaseError(error));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch colors from Supabase
  const fetchColors = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('colors')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      const transformedColors: Color[] = data.map(item => ({
        name: item.name,
        hex: item.hex,
        selectedColor: item.selectedColor,
      }));
      
      setColors(transformedColors);
    } catch (error) {
      setError(handleSupabaseError(error));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch products with their relationships
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get all products with their collections
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          collections:collection_id(*)
        `)
        .order(DB_COLUMNS.PRODUCTS.CREATED_AT, { ascending: false });
        
      if (productsError) throw productsError;
      
      // Process each product to get its colors
      const productsWithRelations = await Promise.all(productsData.map(async (dbProduct) => {
        // Get product colors with proper column selection
        const { data: colorData, error: colorError } = await supabase
          .from('product_colors')
          .select(`
            color_id,
            colors:color_id(id, name, hex, selectedcolor)
          `)
          .eq('product_id', dbProduct.id);
          
        if (colorError) throw colorError;
        
        const productColors: Color[] = [];
        
        // Improved type handling for colors
        if (colorData && colorData.length > 0) {
          for (const item of colorData) {
            try {
              if (item.colors) {
                // Check if colors is an array or a single object
                const colorObj = Array.isArray(item.colors) ? item.colors[0] : item.colors;
                
                // Only proceed if we have a valid color object
                if (colorObj && typeof colorObj === 'object') {
                  productColors.push({
                    name: String(colorObj.name || ''),
                    hex: String(colorObj.hex || ''),
                    selectedColor: String(colorObj.selectedcolor || ''),
                  });
                }
              }
            } catch (e) {
              console.error("Error processing color data:", e);
            }
          }
        }
        
        // Map database product to our model format
        const mappedProduct = mapDatabaseProductToModel(dbProduct);
        
        // Add the colors we fetched separately
        mappedProduct.colors = productColors.length > 0 ? productColors : [
          { name: "Default", hex: "#000000", selectedColor: "ring-zinc-900" }
        ];
        
        return mappedProduct;
      }));
      
      setProducts(productsWithRelations);
    } catch (error) {
      setError(handleSupabaseError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a single product by ID
  async function getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        collections:collection_id(*)
      `)
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    
    if (!data) return null;
    
    // Get colors
    const { data: colorData, error: colorError } = await supabase
      .from('product_colors')
      .select('colors:color_id(*)')
      .eq('product_id', id);
      
    if (colorError) throw colorError;
    
    // Fix the same type issue here as well
    const colors: Color[] = [];
    
    if (colorData && colorData.length > 0) {
      for (const item of colorData) {
        try {
          if (item.colors) {
            // Check if colors is an array or a single object
            const colorObj = Array.isArray(item.colors) ? item.colors[0] : item.colors;
            
            // Only proceed if we have a valid color object
            if (colorObj && typeof colorObj === 'object') {
              colors.push({
                name: String(colorObj.name || ''),
                hex: String(colorObj.hex || ''),
                selectedColor: String(colorObj.selectedcolor || ''),
              });
            }
          }
        } catch (e) {
          console.error("Error processing color data:", e);
        }
      }
    }
    
    return {
      id: data.id,
      name: data.name,
      collection: {
        id: data.collections.id,
        name: data.collections.name,
        description: data.collections.description,
        imageSrc: data.collections.imageSrc,
      },
      price: data.price,
      imageSrc: data.imageSrc,
      imageAlt: data.imageAlt,
      inStock: data.inStock,
      colors,
      sizes: [],
      rating: data.rating,
      slug: data.slug,
      images: [],
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    } as Product;
  }
  
  // Utility functions to filter products
  const getProductsByCollection = (collectionId: string): Product[] => {
    return products.filter(product => product.collection.id === collectionId);
  };
  
  const getNewProducts = (): Product[] => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return products.filter(product => {
      const createdDate = new Date(product.createdAt);
      return createdDate > oneMonthAgo;
    });
  };
  
  // Load initial data on mount
  useEffect(() => {
    fetchCollections();
    fetchProducts();
    fetchColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <SupabaseStateContext.Provider
      value={{
        isLoading,
        error,
        collections,
        products,
        colors,
        fetchCollections,
        fetchProducts,
        fetchColors,
        getProductsByCollection,
        getNewProducts,
        clearError,
      }}
    >
      {children}
    </SupabaseStateContext.Provider>
  );
}

// Hook to use the Supabase state
export function useSupabaseState() {
  const context = useContext(SupabaseStateContext);
  if (context === undefined) {
    throw new Error('useSupabaseState must be used within a SupabaseProvider');
  }
  return context;
}
