import { Collection, Product } from "@/types";

/**
 * Get all unique collections from products
 */
export function getUniqueCollections(products: Product[]): Collection[] {
  const collectionMap = new Map<string, Collection>();
  
  products.forEach((product) => {
    if (product.collection && !collectionMap.has(product.collection.id)) {
      collectionMap.set(product.collection.id, product.collection);
    }
  });
  
  return Array.from(collectionMap.values());
}

/**
 * Filters products to only include those from a specific collection
 */
export function filterProductsByCollection(products: Product[], collectionId: string): Product[] {
  return products.filter(product => 
    product.collection && product.collection.id === collectionId
  );
}

/**
 * Filters products to only include those created in the last month (new arrivals)
 */
export function filterNewProducts(products: Product[]): Product[] {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return products.filter(product => {
    try {
      const createdDate = new Date(product.createdAt);
      return createdDate > oneMonthAgo;
    } catch {
      // If date parsing fails, exclude the product
      return false;
    }
  });
}

/**
 * Sort products by price, either ascending or descending
 */
export function sortProductsByPrice(products: Product[], ascending = true): Product[] {
  return [...products].sort((a, b) => {
    if (ascending) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
}

/**
 * Sort products by newest first (based on creation date)
 */
export function sortProductsByNewest(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Check if a product is new (created within the last month)
 */
export function isNewProduct(product: Product): boolean {
  if (!product.createdAt) return false;
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  try {
    return new Date(product.createdAt) > oneMonthAgo;
  } catch {
    return false;
  }
}

/**
 * Check if there are any new products (created in the last month)
 */
export function hasNewProducts(products: Product[]): boolean {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return products.some(product => {
    if (!product.createdAt) return false;
    return new Date(product.createdAt) > oneMonthAgo;
  });
}
