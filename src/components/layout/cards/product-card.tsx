import type { ProductFull } from "@/types/database";

export interface ProductCardProps {
  product: ProductFull;
  locale: string;
  onClick?: () => void;
  allProducts?: ProductFull[];
  translations: any;
}

// Helper function to check if product is in the last 20 created products
const isProductNew = (
  product: ProductFull,
  allProducts: ProductFull[] = []
): boolean => {
  if (allProducts.length === 0) return false;

  const sortedProducts = allProducts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdat).getTime() - new Date(a.createdat).getTime()
    );

  const last20Products = sortedProducts.slice(0, 20);
  return last20Products.some((p) => p.id === product.id);
};

export default function ProductCard({
  product,
  locale,
  onClick,
  allProducts = [],
  translations,
}: ProductCardProps) {
  const isNew = isProductNew(product, allProducts);

  return (
    <div key={product.id} className="group relative">
      <img
        alt={product.name}
        src={product.imagesrc}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />

      {isNew && (
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-gray-800 shadow-sm">
            {translations?.new || "New"}
          </span>
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-gray-80 font-medium line-clamp-1">
            <div onClick={onClick} className="cursor-pointer">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </div>
          </h3>
          <p className="text-gray-600">{product.collections.name}</p>
        </div>
        <p className="font-medium text-gray-900">
          {product.price} {translations?.currency?.mad || "MAD"}
        </p>
      </div>
    </div>
  );
}
