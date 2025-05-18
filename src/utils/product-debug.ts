import { Product } from "@/types";

/**
 * Helper function to debug product data from Supabase
 */
export function debugProduct(dbProduct: any): void {
  console.group(`Debugging Product ${dbProduct.id}`);
  
  // Log the raw database fields
  console.log('Raw database fields:');
  console.table({
    id: dbProduct.id,
    name: dbProduct.name,
    collection_id: dbProduct.collection_id,
    price: dbProduct.price,
    imageSrc: dbProduct.imageSrc,
    imagesrc: dbProduct.imagesrc,
    imageAlt: dbProduct.imageAlt,
    imagealt: dbProduct.imagealt,
    inStock: dbProduct.inStock,
    instock: dbProduct.instock,
    rating: dbProduct.rating,
    slug: dbProduct.slug,
    createdAt: dbProduct.createdAt,
    createdat: dbProduct.createdat,
    updatedAt: dbProduct.updatedAt,
    updatedat: dbProduct.updatedat,
  });
  
  // Check array fields
  console.log('Array fields:');
  console.log('sizes:', typeof dbProduct.sizes, dbProduct.sizes);
  console.log('image_urls:', typeof dbProduct.image_urls, dbProduct.image_urls);
  
  // Parse array fields if they're strings
  if (typeof dbProduct.sizes === 'string') {
    try {
      const parsed = JSON.parse(dbProduct.sizes);
      console.log('Parsed sizes:', parsed);
    } catch (e) {
      console.error('Failed to parse sizes:', e);
    }
  }
  
  if (typeof dbProduct.image_urls === 'string') {
    try {
      const parsed = JSON.parse(dbProduct.image_urls);
      console.log('Parsed image_urls:', parsed);
    } catch (e) {
      console.error('Failed to parse image_urls:', e);
    }
  }
  
  console.groupEnd();
}

export function addProductDebugging() {
  // Override the Supabase fetch for products to add debugging
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0]?.toString() || '';
    if (url.includes('supabase') && url.includes('products')) {
      return originalFetch.apply(this, args)
        .then(async (response) => {
          const clone = response.clone();
          try {
            const data = await clone.json();
            if (data && data.data && Array.isArray(data.data)) {
              console.log('Intercepted Supabase products response:');
              data.data.forEach(debugProduct);
            }
          } catch (e) {
            // Ignore parsing errors on the clone
          }
          return response;
        });
    }
    return originalFetch.apply(this, args);
  };
}
