/**
 * Mapping between code model properties and actual Supabase column names
 * This helps handle discrepancies between camelCase in code and snake_case or other conventions in the database
 */
export const COLUMNS = {
  PRODUCTS: {
    CREATED_AT: 'createdat',
    UPDATED_AT: 'updatedat',
    COLLECTION_ID: 'collection_id',
  },
  COLLECTIONS: {
    // Add collection columns here if needed
  },
  PRODUCT_COLORS: {
    PRODUCT_ID: 'product_id',
    COLOR_ID: 'color_id',
  },
  PRODUCT_SIZES: {
    PRODUCT_ID: 'product_id',
  },
  PRODUCT_IMAGES: {
    PRODUCT_ID: 'product_id', 
    IMAGE_URL: 'image_url',
    SORT_ORDER: 'sort_order',
  },
};
