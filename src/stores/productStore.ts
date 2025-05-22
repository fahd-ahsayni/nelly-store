import { Collection, Color, Product } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { supabase, handleSupabaseError } from "@/lib/supabase";
import { DB_COLUMNS, mapDatabaseProductToModel } from "@/lib/db-mapping";

interface ProductState {
  products: Product[];
  collections: Collection[];
  colors: Color[];
  isLoading: boolean;
  error: string | null;
}

interface ProductActions {
  fetchProducts: () => Promise<void>;
  fetchCollections: () => Promise<void>;
  fetchColors: () => Promise<void>;
  getProductsByCollection: (collectionId: string) => Product[];
  getNewProducts: () => Product[];
  clearError: () => void;
}

export const useProductStore = create<ProductState & ProductActions>()(
  devtools((set, get) => ({
    products: [],
    collections: [],
    colors: [],
    isLoading: false,
    error: null,
    
    fetchProducts: async () => {
      set({ isLoading: true, error: null });
      
      try {
        console.log("Fetching products from Supabase...");
        
        // Get all products with their collections
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select(`
            *,
            collections:collection_id(*)
          `)
          .order(DB_COLUMNS.PRODUCTS.CREATED_AT, { ascending: false });
          
        if (productsError) throw productsError;
        
        console.log(`Fetched ${productsData?.length || 0} raw products from Supabase`);
        
        if (!productsData || productsData.length === 0) {
          set({ products: [], isLoading: false });
          return;
        }
        
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
            
          if (colorError) {
            console.error(`Error fetching colors for product ${dbProduct.id}:`, colorError);
            throw colorError;
          }
          
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
          
          try {
            // Map database product to our model format
            const mappedProduct = mapDatabaseProductToModel(dbProduct);
            
            // Add the colors we fetched separately
            mappedProduct.colors = productColors.length > 0 ? productColors : [
              { name: "Default", hex: "#000000", selectedColor: "ring-zinc-900" }
            ];
            
            return mappedProduct;
          } catch (error) {
            console.error(`Error mapping product ${dbProduct.id}:`, error);
            // Return a basic product with default values to prevent crashing
            return {
              id: dbProduct.id || "unknown",
              name: dbProduct.name || "Unknown Product",
              price: dbProduct.price || 0,
              collection: dbProduct.collections || {
                id: "unknown-collection",
                name: "Unknown",
                description: "",
                imageSrc: "/placeholder.jpg"
              },
              imageSrc: dbProduct.imageSrc || "/placeholder.jpg",
              imageAlt: dbProduct.imageAlt || "",
              inStock: Boolean(dbProduct.inStock),
              colors: [{ name: "Default", hex: "#000000", selectedColor: "ring-zinc-900" }],
              sizes: dbProduct.sizes || ["ONE SIZE"],
              rating: dbProduct.rating || 0,
              slug: dbProduct.slug || "unknown",
              images: dbProduct.image_urls || [dbProduct.imageSrc] || ["/placeholder.jpg"],
              createdAt: dbProduct.createdAt || new Date().toISOString(),
              updatedAt: dbProduct.updatedAt || new Date().toISOString(),
            };
          }
        }));
        
        console.log(`Processed ${productsWithRelations.length} products with relationships`);
        set({ products: productsWithRelations, isLoading: false });
        
      } catch (error) {
        console.error("Error in fetchProducts:", error);
        set({ error: handleSupabaseError(error), isLoading: false });
      }
    },
    
    fetchCollections: async () => {
      set({ isLoading: true, error: null });
      
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
          imageSrc: item.imagesrc, // Changed from imageSrc to imagesrc to match DB column
        }));
        
        set({ collections: transformedCollections, isLoading: false });
      } catch (error) {
        set({ error: handleSupabaseError(error), isLoading: false });
      }
    },
    
    fetchColors: async () => {
      set({ isLoading: true, error: null });
      
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
        
        set({ colors: transformedColors, isLoading: false });
      } catch (error) {
        set({ error: handleSupabaseError(error), isLoading: false });
      }
    },
    
    getProductsByCollection: (collectionId) => {
      return get().products.filter(product => product.collection.id === collectionId);
    },
    
    getNewProducts: () => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      
      return get().products.filter(product => {
        const createdDate = new Date(product.createdAt);
        return createdDate > oneMonthAgo;
      });
    },
    
    clearError: () => set({ error: null }),
  }))
);

// Selector hooks for performance optimization
export const useProducts = () => useProductStore((state) => state.products);
export const useCollections = () => useProductStore((state) => state.collections);
export const useColors = () => useProductStore((state) => state.colors);
export const useProductsLoading = () => useProductStore((state) => state.isLoading);
export const useProductsError = () => useProductStore((state) => state.error);
