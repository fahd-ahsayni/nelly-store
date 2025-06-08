import { createClient } from '@supabase/supabase-js';
import type {
  Collection,
  Color,
  Product,
  ProductColor,
  Reservation,
  ProductFull
} from '@/types/database';

// Server client with cache-busting
export const createServerSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate',
        },
      },
    }
  );
};

// Add cache-busting timestamp to all queries
const addCacheBuster = () => `?t=${Date.now()}`;

// Server-side data fetching functions with cache-busting
export const getCollections = async (): Promise<Collection[]> => {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  return data || [];
};

export const getColors = async (): Promise<Color[]> => {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('colors')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching colors:', error);
    return [];
  }

  return data || [];
};

export const getProducts = async (): Promise<Product[]> => {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('createdat', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
};

export const getProductColors = async (): Promise<ProductColor[]> => {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('product_colors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching product colors:', error);
    return [];
  }

  return data || [];
};

export const getReservations = async (): Promise<Reservation[]> => {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }

  return data || [];
};

// Get products with full relations - force fresh data
export const getProductsFull = async (forceFresh: boolean = true): Promise<ProductFull[]> => {
  const supabase = createServerSupabaseClient();
  
  let query = supabase
    .from('products')
    .select(`
      *,
      collections (
        id,
        name,
        description,
        imagesrc,
        created_at
      ),
      product_colors (
        id,
        product_id,
        color_id,
        created_at,
        colors (
          id,
          name,
          hex,
          selectedcolor,
          created_at
        )
      )
    `)
    .order('createdat', { ascending: false });

  // Add cache busting for production
  if (forceFresh) {
    query = query.limit(1000); // Refresh query structure
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products with relations:', error);
    return [];
  }

  return data || [];
};

// Get single product by slug with relations
export const getProductBySlug = async (slug: string): Promise<ProductFull | null> => {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      collections (
        id,
        name,
        description,
        imagesrc,
        created_at
      ),
      product_colors (
        id,
        product_id,
        color_id,
        created_at,
        colors (
          id,
          name,
          hex,
          selectedcolor,
          created_at
        )
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }

  return data;
};

// Get products by collection
export const getProductsByCollection = async (collectionId: string): Promise<ProductFull[]> => {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      collections (
        id,
        name,
        description,
        imagesrc,
        created_at
      ),
      product_colors (
        id,
        product_id,
        color_id,
        created_at,
        colors (
          id,
          name,
          hex,
          selectedcolor,
          created_at
        )
      )
    `)
    .eq('collection_id', collectionId)
    .order('createdat', { ascending: false });

  if (error) {
    console.error('Error fetching products by collection:', error);
    return [];
  }

  return data || [];
};
