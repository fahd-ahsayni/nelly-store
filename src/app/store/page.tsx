import { FilterByCollections, HeaderStore, ProductsGrid } from "@/components/views/store";

export default function page() {
  return (
    <>
      <HeaderStore />
      <FilterByCollections />
      <ProductsGrid />
    </>
  );
}
