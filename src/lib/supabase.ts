import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper function to handle Supabase errors and return a user-friendly message
 */
export function handleSupabaseError(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    // Handle Supabase error object
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    
    // Handle PostgreSQL error code
    if ('code' in error && typeof error.code === 'string') {
      switch (error.code) {
        case '23505':
          return 'A record with this value already exists.';
        case '23503':
          return 'This record is referenced by another record and cannot be deleted.';
        case '23502':
          return 'A required field is missing.';
        case 'PGRST116':
          return 'No records found.';
        default:
          return `Database error (${error.code})`;
      }
    }
  }
  
  // Generic error handler
  return 'An unknown error occurred. Please try again later.';
}
