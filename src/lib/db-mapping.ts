import { Collection, Color, Product } from "@/types";

/**
 * Database column names for consistent reference
 */
export const DB_COLUMNS = {
  COLLECTIONS: {
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',
    IMAGE_SRC: 'imagesrc', // Note lowercase in database
    CREATED_AT: 'created_at',
  },
  PRODUCTS: {
    ID: 'id',
    NAME: 'name',
    COLLECTION_ID: 'collection_id',
    PRICE: 'price',
    IMAGE_SRC: 'imagesrc', // Note lowercase in database
    IMAGE_ALT: 'imagealt', // Note lowercase in database
    IN_STOCK: 'instock',
    RATING: 'rating',
    SLUG: 'slug',
    DESCRIPTION: 'description',
    CREATED_AT: 'createdat',
    UPDATED_AT: 'updatedat',
    SIZES: 'sizes',
    IMAGE_URLS: 'image_urls',
  },
  COLORS: {
    NAME: 'name',
    HEX: 'hex',
    SELECTED_COLOR: 'selectedcolor',
  },
};

/**
 * Maps database product to our application model
 */
export function mapDatabaseProductToModel(dbProduct: any): Product {
  // Map images from string array stored in database to string[]
  let images: string[] = [];
  if (dbProduct.image_urls) {
    try {
      // If it's a string representation of an array, parse it
      if (typeof dbProduct.image_urls === 'string') {
        images = JSON.parse(dbProduct.image_urls);
      } else if (Array.isArray(dbProduct.image_urls)) {
        images = dbProduct.image_urls;
      }
    } catch (error) {
      console.error("Error parsing product images:", error);
    }
  }

  // Map sizes from string array stored in database to string[]
  let sizes: string[] = [];
  if (dbProduct.sizes) {
    try {
      // If it's a string representation of an array, parse it
      if (typeof dbProduct.sizes === 'string') {
        sizes = JSON.parse(dbProduct.sizes);
      } else if (Array.isArray(dbProduct.sizes)) {
        sizes = dbProduct.sizes;
      }
    } catch (error) {
      console.error("Error parsing product sizes:", error);
    }
  }

  // Ensure boolean values are properly converted
  const inStock = typeof dbProduct.instock === 'boolean' 
    ? dbProduct.instock 
    : dbProduct.instock === true || dbProduct.instock === 'true' || dbProduct.instock === 't';

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    collection: {
      id: dbProduct.collections?.id || '',
      name: dbProduct.collections?.name || '',
      description: dbProduct.collections?.description || '',
      imageSrc: dbProduct.collections?.imagesrc || '', // Note accessing as lowercase
    },
    price: parseFloat(dbProduct.price) || 0,
    imageSrc: dbProduct.imagesrc || dbProduct.imageSrc || '',
    imageAlt: dbProduct.imagealt || dbProduct.imageAlt || '',
    inStock: inStock,
    colors: [], // Colors are handled separately via joins
    sizes: sizes.length > 0 ? sizes : ["ONE SIZE"],
    rating: parseFloat(dbProduct.rating) || 0,
    slug: dbProduct.slug || '',
    images: images.length > 0 ? images : [dbProduct.imagesrc || dbProduct.imageSrc || ''],
    createdAt: dbProduct.createdat || dbProduct.createdAt || new Date().toISOString(),
    updatedAt: dbProduct.updatedat || dbProduct.updatedAt || new Date().toISOString(),
  };
}

/**
 * Maps database collection to our application model
 */
export function mapDatabaseCollectionToModel(dbCollection: any): Collection {
  return {
    id: dbCollection.id || '',
    name: dbCollection.name || '',
    description: dbCollection.description || '',
    imageSrc: dbCollection.imagesrc || '', // Note accessing as lowercase
  };
}
