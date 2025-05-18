/**
 * Utility to help debug Supabase data in development
 */
import { supabase } from '@/lib/supabase';

/**
 * Log details about products to help debug issues
 * @param products Array of products to debug
 */
export function debugProducts(products: any[]): void {
  if (process.env.NODE_ENV !== 'development') return;

  console.log(`Debugging ${products.length} products:`);
  
  products.forEach((product, index) => {
    console.log(`\nProduct ${index + 1}: ${product.name} (ID: ${product.id})`);
    console.log(`- inStock: ${product.inStock} (type: ${typeof product.inStock})`);
    console.log(`- Colors: ${product.colors?.length || 0}`);
    product.colors?.forEach((color: any, cIndex: number) => {
      console.log(`  - Color ${cIndex + 1}: ${color.name}, ${color.hex}`);
    });
    console.log(`- Sizes: ${Array.isArray(product.sizes) ? product.sizes.join(', ') : 'None'}`);
    console.log(`- Images: ${Array.isArray(product.image_urls) ? product.image_urls.length : 'None'}`);
  });
}

/**
 * Create a SQL statement to help debug database issues
 * @param productId The product ID to debug
 * @returns SQL statement to run in Supabase SQL editor
 */
export function createDebugSql(productId?: string): string {
  if (productId) {
    return `
-- Debug specific product
SELECT 
  p.*,
  c.name AS collection_name
FROM products p
LEFT JOIN collections c ON p.collection_id = c.id
WHERE p.id = '${productId}';

-- Debug colors for this product
SELECT 
  pc.id AS junction_id, 
  pc.product_id,
  pc.color_id,
  c.name AS color_name,
  c.hex AS color_hex,
  c.selectedColor
FROM product_colors pc
JOIN colors c ON pc.color_id = c.id
WHERE pc.product_id = '${productId}';
    `;
  }
  
  return `
-- Debug products table structure
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'products';

-- Check product count
SELECT COUNT(*) FROM products;

-- Check first 5 products
SELECT * FROM products LIMIT 5;

-- Check colors table
SELECT * FROM colors LIMIT 10;

-- Check product_colors table
SELECT * FROM product_colors LIMIT 10;
  `;
}

/**
 * Get column information for a specific table
 * @param tableName The name of the table to inspect
 * @returns Promise with column information
 */
export async function getTableColumns(tableName: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type, is_nullable')
    .eq('table_name', tableName)
    .eq('table_schema', 'public');
  
  if (error) {
    console.error(`Error getting columns for ${tableName}:`, error);
    return [];
  }
  
  return data || [];
}

/**
 * Create SQL to check table schema in Supabase SQL editor
 */
export function createSchemaCheckSql(): string {
  return `
-- Check the colors table schema
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns
WHERE table_name = 'colors' AND table_schema = 'public';

-- Check a sample color record
SELECT * FROM colors LIMIT 1;

-- Check the product_colors table schema
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns
WHERE table_name = 'product_colors' AND table_schema = 'public';

-- Check a sample product_color record
SELECT * FROM product_colors LIMIT 1;
`;
}

/**
 * Create SQL to fix column names if needed
 */
export function createColumnFixSql(): string {
  return `
-- If you need to rename columns to match your code
-- ALTER TABLE colors RENAME COLUMN selectedcolor TO "selectedColor";

-- Or alternatively, create a view that maps the columns
CREATE OR REPLACE VIEW colors_view AS
SELECT 
  id,
  name,
  hex,
  selectedcolor AS "selectedColor",
  created_at
FROM colors;
`;
}
