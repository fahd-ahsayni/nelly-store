import { Collection, Product } from "@/types";

/**
 * Database column name mappings to handle discrepancies 
 * between our model and the database
 */
export const DB_COLUMNS = {
  PRODUCTS: {
    ID: 'id',
    NAME: 'name',
    PRICE: 'price',
    CREATED_AT: 'createdat', // Note lowercase in database
    UPDATED_AT: 'updatedat', // Note lowercase in database
    COLLECTION_ID: 'collection_id',
    IMAGE_SRC: 'imagesrc', // Note lowercase in database
    IMAGE_ALT: 'imagealt', // Note lowercase in database
    IN_STOCK: 'instock', // Note lowercase in database
    RATING: 'rating',
    SLUG: 'slug',
    IMAGE_URLS: 'image_urls',
    SIZES: 'sizes',
  },
};

/**
 * Maps a product from the database format to our application model format
 */
export function mapDatabaseProductToModel(dbProduct: any): Product {
  // Parse collection from the nested collection data
  const collection: Collection = dbProduct.collections ? {
    id: dbProduct.collections.id,
    name: dbProduct.collections.name,
    description: dbProduct.collections.description || '',
    imageSrc: dbProduct.collections.imagesrc || '/placeholder.jpg',
  } : {
    id: 'unknown',
    name: 'Unknown',
    description: '',
    imageSrc: '/placeholder.jpg',
  };

  // Parse sizes from array or string
  let sizes: string[] = [];
  if (dbProduct.sizes) {
    if (typeof dbProduct.sizes === 'string') {
      try {
        sizes = JSON.parse(dbProduct.sizes);
      } catch {
        sizes = [dbProduct.sizes]; // If parsing fails, use as a single size
      }
    } else if (Array.isArray(dbProduct.sizes)) {
      sizes = dbProduct.sizes;
    }
  }

  // Parse images from array or string
  let images: string[] = [];
  if (dbProduct.image_urls) {
    if (typeof dbProduct.image_urls === 'string') {
      try {
        images = JSON.parse(dbProduct.image_urls);
      } catch {
        images = [dbProduct.image_urls]; // If parsing fails, use as a single image
      }
    } else if (Array.isArray(dbProduct.image_urls)) {
      images = dbProduct.image_urls;
    }
  }

  // If no images found, fallback to the main image
  if (images.length === 0 && dbProduct.imagesrc) {
    images = [dbProduct.imagesrc];
  }

  // Map the database product to our model format
  return {
    id: dbProduct.id,
    name: dbProduct.name || 'Unknown Product',
    price: typeof dbProduct.price === 'number' ? dbProduct.price : parseFloat(dbProduct.price) || 0,
    rating: typeof dbProduct.rating === 'number' ? dbProduct.rating : parseFloat(dbProduct.rating) || 0,
    imageSrc: dbProduct.imagesrc || '/placeholder.jpg',
    imageAlt: dbProduct.imagealt || dbProduct.name || 'Product image',
    colors: [], // Colors are handled separately
    sizes: sizes.length > 0 ? sizes : ['ONE SIZE'],
    inStock: typeof dbProduct.instock === 'boolean' ? dbProduct.instock : 
             typeof dbProduct.instock === 'string' ? dbProduct.instock.toLowerCase() === 'true' : true,
    slug: dbProduct.slug || `product-${dbProduct.id}`,
    images,
    collection,
    createdAt: dbProduct.createdat || new Date().toISOString(),
    updatedAt: dbProduct.updatedat || new Date().toISOString(),
  };
}
