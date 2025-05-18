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
 * Filter products by collection ID
 */
export function filterProductsByCollection(products: Product[], collectionId: string): Product[] {
  return products.filter(product => product.collection.id === collectionId);
}

/**
 * Filter products to only show those created within the last month
 */
export function filterNewProducts(products: Product[]): Product[] {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return products.filter(product => {
    if (!product.createdAt) return false;
    return new Date(product.createdAt) > oneMonthAgo;
  });
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
