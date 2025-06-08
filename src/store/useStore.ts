import { supabase } from "@/lib/supabase";
import type {
  Collection,
  Color,
  Product,
  ProductColor,
  ProductFull,
  ProductWithCollection,
  ProductWithColors,
  Reservation,
} from "@/types/database";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

interface StoreState {
  // Data
  collections: Collection[];
  colors: Color[];
  products: Product[];
  productColors: ProductColor[];
  reservations: Reservation[];

  // Loading states
  loading: {
    collections: boolean;
    colors: boolean;
    products: boolean;
    productColors: boolean;
    reservations: boolean;
  };

  // Error states
  errors: {
    collections: string | null;
    colors: string | null;
    products: string | null;
    productColors: string | null;
    reservations: string | null;
  };

  // Actions
  fetchCollections: () => Promise<void>;
  fetchColors: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchProductColors: () => Promise<void>;
  fetchReservations: () => Promise<void>;
  fetchAllData: () => Promise<void>;
  forceRefreshAll: () => Promise<void>;

  // Getters with relations
  getProductsWithCollections: () => ProductWithCollection[];
  getProductsWithColors: () => ProductWithColors[];
  getProductsFull: () => ProductFull[];
  getProductBySlug: (slug: string) => ProductFull | undefined;
  getProductsByCollection: (collectionId: string) => ProductFull[];

  // Reset actions
  resetCollections: () => void;
  resetColors: () => void;
  resetProducts: () => void;
  resetProductColors: () => void;
  resetReservations: () => void;
  resetAll: () => void;

  // Add timestamp for cache invalidation
  lastFetched: {
    collections: number | null;
    colors: number | null;
    products: number | null;
    productColors: number | null;
    reservations: number | null;
  };

  // Cache duration (5 minutes)
  cacheDuration: number;

  // Add cache checking methods
  shouldRefetch: (type: keyof StoreState["lastFetched"]) => boolean;
}

const initialLoadingState = {
  collections: false,
  colors: false,
  products: false,
  productColors: false,
  reservations: false,
};

const initialErrorState = {
  collections: null,
  colors: null,
  products: null,
  productColors: null,
  reservations: null,
};

const CACHE_DURATION =
  process.env.NODE_ENV === "production" ? 30 * 1000 : 5 * 60 * 1000; // 30 seconds in production, 5 minutes in dev

export const useStore = create<StoreState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      collections: [],
      colors: [],
      products: [],
      productColors: [],
      reservations: [],
      loading: initialLoadingState,
      errors: initialErrorState,
      lastFetched: {
        collections: null,
        colors: null,
        products: null,
        productColors: null,
        reservations: null,
      },
      cacheDuration: CACHE_DURATION,

      // Cache checking method - more aggressive in production
      shouldRefetch: (type) => {
        const { lastFetched, cacheDuration } = get();
        const lastFetchTime = lastFetched[type];

        // Always refetch in production if no data or cache expired
        if (process.env.NODE_ENV === "production") {
          if (!lastFetchTime) return true;
          return Date.now() - lastFetchTime > cacheDuration;
        }

        if (!lastFetchTime) return true;
        return Date.now() - lastFetchTime > cacheDuration;
      },

      // Fetch Collections with production optimizations
      fetchCollections: async () => {
        const { shouldRefetch } = get();

        // Force refetch in production or if cache invalid
        if (
          !shouldRefetch("collections") &&
          process.env.NODE_ENV !== "production"
        ) {
          return;
        }

        set(
          (state) => ({
            loading: { ...state.loading, collections: true },
            errors: { ...state.errors, collections: null },
          }),
          false,
          "fetchCollections/start"
        );

        try {
          const { data, error } = await supabase
            .from("collections")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) throw error;

          set(
            (state) => ({
              collections: data || [],
              loading: { ...state.loading, collections: false },
              lastFetched: { ...state.lastFetched, collections: Date.now() },
            }),
            false,
            "fetchCollections/success"
          );
        } catch (error) {
          set(
            (state) => ({
              loading: { ...state.loading, collections: false },
              errors: {
                ...state.errors,
                collections:
                  error instanceof Error ? error.message : "Unknown error",
              },
            }),
            false,
            "fetchCollections/error"
          );
        }
      },

      // Fetch Colors
      fetchColors: async () => {
        const { shouldRefetch } = get();

        if (!shouldRefetch("colors")) {
          return; // Skip if cache is still valid
        }

        set(
          (state) => ({
            loading: { ...state.loading, colors: true },
            errors: { ...state.errors, colors: null },
          }),
          false,
          "fetchColors/start"
        );

        try {
          const { data, error } = await supabase
            .from("colors")
            .select("*")
            .order("name", { ascending: true });

          if (error) throw error;

          set(
            (state) => ({
              colors: data || [],
              loading: { ...state.loading, colors: false },
              lastFetched: { ...state.lastFetched, colors: Date.now() },
            }),
            false,
            "fetchColors/success"
          );
        } catch (error) {
          set(
            (state) => ({
              loading: { ...state.loading, colors: false },
              errors: {
                ...state.errors,
                colors:
                  error instanceof Error ? error.message : "Unknown error",
              },
            }),
            false,
            "fetchColors/error"
          );
        }
      },

      // Fetch Products
      fetchProducts: async () => {
        const { shouldRefetch } = get();

        if (
          !shouldRefetch("products") &&
          process.env.NODE_ENV !== "production"
        ) {
          return; // Skip if cache is still valid
        }

        set(
          (state) => ({
            loading: { ...state.loading, products: true },
            errors: { ...state.errors, products: null },
          }),
          false,
          "fetchProducts/start"
        );

        try {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("createdat", { ascending: false });

          if (error) throw error;

          set(
            (state) => ({
              products: data || [],
              loading: { ...state.loading, products: false },
              lastFetched: { ...state.lastFetched, products: Date.now() },
            }),
            false,
            "fetchProducts/success"
          );
        } catch (error) {
          set(
            (state) => ({
              loading: { ...state.loading, products: false },
              errors: {
                ...state.errors,
                products:
                  error instanceof Error ? error.message : "Unknown error",
              },
            }),
            false,
            "fetchProducts/error"
          );
        }
      },

      // Fetch Product Colors
      fetchProductColors: async () => {
        const { shouldRefetch } = get();

        if (!shouldRefetch("productColors")) {
          return; // Skip if cache is still valid
        }

        set(
          (state) => ({
            loading: { ...state.loading, productColors: true },
            errors: { ...state.errors, productColors: null },
          }),
          false,
          "fetchProductColors/start"
        );

        try {
          const { data, error } = await supabase
            .from("product_colors")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) throw error;

          set(
            (state) => ({
              productColors: data || [],
              loading: { ...state.loading, productColors: false },
              lastFetched: { ...state.lastFetched, productColors: Date.now() },
            }),
            false,
            "fetchProductColors/success"
          );
        } catch (error) {
          set(
            (state) => ({
              loading: { ...state.loading, productColors: false },
              errors: {
                ...state.errors,
                productColors:
                  error instanceof Error ? error.message : "Unknown error",
              },
            }),
            false,
            "fetchProductColors/error"
          );
        }
      },

      // Fetch Reservations
      fetchReservations: async () => {
        const { shouldRefetch } = get();

        if (!shouldRefetch("reservations")) {
          return; // Skip if cache is still valid
        }

        set(
          (state) => ({
            loading: { ...state.loading, reservations: true },
            errors: { ...state.errors, reservations: null },
          }),
          false,
          "fetchReservations/start"
        );

        try {
          const { data, error } = await supabase
            .from("reservations")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) throw error;

          set(
            (state) => ({
              reservations: data || [],
              loading: { ...state.loading, reservations: false },
              lastFetched: { ...state.lastFetched, reservations: Date.now() },
            }),
            false,
            "fetchReservations/success"
          );
        } catch (error) {
          set(
            (state) => ({
              loading: { ...state.loading, reservations: false },
              errors: {
                ...state.errors,
                reservations:
                  error instanceof Error ? error.message : "Unknown error",
              },
            }),
            false,
            "fetchReservations/error"
          );
        }
      },

      // Fetch All Data
      fetchAllData: async () => {
        const {
          fetchCollections,
          fetchColors,
          fetchProducts,
          fetchProductColors,
          fetchReservations,
        } = get();

        await Promise.allSettled([
          fetchCollections(),
          fetchColors(),
          fetchProducts(),
          fetchProductColors(),
          fetchReservations(),
        ]);
      },

      // Getters with relations
      getProductsWithCollections: () => {
        const { products, collections } = get();
        return products
          .map((product) => ({
            ...product,
            collections: collections.find(
              (collection) => collection.id === product.collection_id
            )!,
          }))
          .filter((product) => product.collections) as ProductWithCollection[];
      },

      getProductsWithColors: () => {
        const { products, productColors, colors } = get();
        return products.map((product) => ({
          ...product,
          product_colors: productColors
            .filter((pc) => pc.product_id === product.id)
            .map((pc) => {
              const color = colors.find((color) => color.id === pc.color_id);
              return color ? { ...pc, colors: color } : null;
            })
            .filter(
              (pc): pc is ProductColor & { colors: Color } => pc !== null
            ),
        })) as ProductWithColors[];
      },

      getProductsFull: () => {
        const state = get();
        const { products, collections, productColors, colors } = state;

        return products
          .map((product) => {
            const collection = collections.find(
              (c) => c.id === product.collection_id
            );
            const productColorsWithColors = productColors
              .filter((pc) => pc.product_id === product.id)
              .map((pc) => {
                const color = colors.find((color) => color.id === pc.color_id);
                return color ? { ...pc, colors: color } : null;
              })
              .filter(
                (pc): pc is ProductColor & { colors: Color } => pc !== null
              );

            if (!collection) return null;

            return {
              ...product,
              collections: collection,
              product_colors: productColorsWithColors,
            };
          })
          .filter((product): product is ProductFull => product !== null);
      },

      getProductBySlug: (slug: string) => {
        const { getProductsFull } = get();
        return getProductsFull().find((product) => product.slug === slug);
      },

      getProductsByCollection: (collectionId: string) => {
        const { getProductsFull } = get();
        return getProductsFull().filter(
          (product) => product.collection_id === collectionId
        );
      },

      // Reset actions
      resetCollections: () => {
        set(
          (state) => ({
            collections: [],
            loading: { ...state.loading, collections: false },
            errors: { ...state.errors, collections: null },
          }),
          false,
          "resetCollections"
        );
      },

      resetColors: () => {
        set(
          (state) => ({
            colors: [],
            loading: { ...state.loading, colors: false },
            errors: { ...state.errors, colors: null },
          }),
          false,
          "resetColors"
        );
      },

      resetProducts: () => {
        set(
          (state) => ({
            products: [],
            loading: { ...state.loading, products: false },
            errors: { ...state.errors, products: null },
          }),
          false,
          "resetProducts"
        );
      },

      resetProductColors: () => {
        set(
          (state) => ({
            productColors: [],
            loading: { ...state.loading, productColors: false },
            errors: { ...state.errors, productColors: null },
          }),
          false,
          "resetProductColors"
        );
      },

      resetReservations: () => {
        set(
          (state) => ({
            reservations: [],
            loading: { ...state.loading, reservations: false },
            errors: { ...state.errors, reservations: null },
          }),
          false,
          "resetReservations"
        );
      },

      resetAll: () => {
        set(
          {
            collections: [],
            colors: [],
            products: [],
            productColors: [],
            reservations: [],
            loading: initialLoadingState,
            errors: initialErrorState,
            lastFetched: {
              collections: null,
              colors: null,
              products: null,
              productColors: null,
              reservations: null,
            },
          },
          false,
          "resetAll"
        );
      },

      // Add force refresh method
      forceRefreshAll: async () => {
        set(
          (state) => ({
            lastFetched: {
              collections: null,
              colors: null,
              products: null,
              productColors: null,
              reservations: null,
            },
          }),
          false,
          "forceRefreshAll"
        );

        const { fetchAllData } = get();
        await fetchAllData();
      },
    })),
    {
      name: "nelly-store",
    }
  )
);

// Selectors for optimized re-renders
export const useCollections = () => useStore((state) => state.collections);
export const useColors = () => useStore((state) => state.colors);
export const useProducts = () => useStore((state) => state.products);
export const useProductColors = () => useStore((state) => state.productColors);
export const useReservations = () => useStore((state) => state.reservations);

export const useLoading = () => useStore((state) => state.loading);
export const useErrors = () => useStore((state) => state.errors);

export const useProductsFull = () =>
  useStore((state) => state.getProductsFull());
export const useProductsWithCollections = () =>
  useStore((state) => state.getProductsWithCollections());
export const useProductsWithColors = () =>
  useStore((state) => state.getProductsWithColors());
