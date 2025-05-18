"use client";

import { supabase, handleSupabaseError } from '@/lib/supabase';
import { COLUMNS } from '@/lib/supabase-columns';
import { Collection, Color, Product } from '@/types';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
    selectedColor: string;
  };
}

// Alternative structure in case the first one doesn't match
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
        .order(COLUMNS.PRODUCTS.CREATED_AT, { ascending: false });
        
      if (productsError) throw productsError;
      
      // Process each product to get its colors, sizes, and images
      const productsWithRelations = await Promise.all(productsData.map(async (product) => {
        // Get product colors
        const { data: colorData, error: colorError } = await supabase
          .from('product_colors')
          .select(`
            colors:color_id(*)
          `)
          .eq('product_id', product.id);
          
        if (colorError) throw colorError;
        
        // Fix type issue by examining the actual structure of data
        // and converting to our Color format
        const productColors: Color[] = [];
        
        if (colorData && colorData.length > 0) {
          console.log('Color data structure:', JSON.stringify(colorData[0]));
          
          for (const item of colorData) {
            // Try different approaches based on the actual structure
            if (item.colors && typeof item.colors === 'object') {
              // If colors is an object with the expected properties
              if ('name' in item.colors && 'hex' in item.colors && 'selectedColor' in item.colors) {
                productColors.push({
                  name: String(item.colors.name || ''),
                  hex: String(item.colors.hex || ''),
                  selectedColor: String(item.colors.selectedColor || ''), // Ensure string type
                });
              } 
              // If colors is an array
              else if (Array.isArray(item.colors) && item.colors.length > 0) {
                const colorItem = item.colors[0];
                if (colorItem && 'name' in colorItem && 'hex' in colorItem && 'selectedColor' in colorItem) {
                  productColors.push({
                    name: String(colorItem.name || ''),
                    hex: String(colorItem.hex || ''),
                    selectedColor: String(colorItem.selectedColor || ''), // Ensure string type
                  });
                }
              }
            }
          }
        }
        
        // Get product sizes
        const { data: sizeData, error: sizeError } = await supabase
          .from('product_sizes')
          .select('*')
          .eq('product_id', product.id);
          
        if (sizeError) throw sizeError;
        
        const productSizes: string[] = sizeData.map((item: SizeResult) => item.size);
        
        // Get product images
        const { data: imageData, error: imageError } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', product.id)
          .order('sort_order');
          
        if (imageError) throw imageError;
        
        const productImages: string[] = imageData.map((item: ImageResult) => item.image_url);
        
        // Return transformed product
        return {
          id: product.id,
          name: product.name,
          collection: {
            id: product.collections.id,
            name: product.collections.name,
            description: product.collections.description,
            imageSrc: product.collections.imageSrc,
          },
          price: product.price,
          imageSrc: product.imageSrc,
          imageAlt: product.imageAlt,
          inStock: product.inStock,
          colors: productColors,
          sizes: productSizes,
          rating: product.rating,
          slug: product.slug,
          images: productImages,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        } as Product;
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
        if (item.colors && typeof item.colors === 'object') {
          if ('name' in item.colors && 'hex' in item.colors && 'selectedColor' in item.colors) {
            colors.push({
              name: String(item.colors.name || ''),
              hex: String(item.colors.hex || ''),
              selectedColor: String(item.colors.selectedColor || ''), // Ensure string type
            });
          } else if (Array.isArray(item.colors) && item.colors.length > 0) {
            const colorItem = item.colors[0];
            if (colorItem && 'name' in colorItem && 'hex' in colorItem && 'selectedColor' in colorItem) {
              colors.push({
                name: String(colorItem.name || ''),
                hex: String(colorItem.hex || ''),
                selectedColor: String(colorItem.selectedColor || ''), // Ensure string type
              });
            }
          }
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
