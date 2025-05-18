/**
 * Mapping between code model properties and actual Supabase column names
 * This helps handle discrepancies between camelCase in code and snake_case in the database
 */
export const COLUMNS = {
  PRODUCTS: {
    CREATED_AT: 'createdat',
    UPDATED_AT: 'updatedat',
    COLLECTION_ID: 'collection_id',
    IMAGE_URLS: 'image_urls',
  },
  COLORS: {
    NAME: 'name',
    HEX: 'hex',
    SELECTED_COLOR: 'selectedcolor', // Note lowercase in database
  },
  PRODUCT_COLORS: {
    PRODUCT_ID: 'product_id',
    COLOR_ID: 'color_id',
  },
};

/**
 * Maps a Color object from database column names to our application model
 */
export function mapColorFromDb(dbColor: any): { name: string; hex: string; selectedColor: string } {
  return {
    name: dbColor.name || '',
    hex: dbColor.hex || '',
    selectedColor: dbColor.selectedcolor || '', // Note transformation from DB column name to model property
  };
}

/**
 * Maps a Color object from our application model to database column names
 */
export function mapColorToDb(color: { name: string; hex: string; selectedColor: string }): any {
  return {
    name: color.name,
    hex: color.hex,
    selectedcolor: color.selectedColor, // Note transformation from model property to DB column name
  };
}
