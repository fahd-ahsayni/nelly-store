import FilterProviderWrapper from "@/components/providers/filter-provider-wrapper";
import HeaderStore from "@/components/views/store/header-store";
import FilterDrawer from "@/components/views/store/filter-drawer";
import FilterByCollections from "@/components/views/store/filter-by-collections";
import ProductsGrid from "@/components/views/store/products-grid";

export default function StorePage() {
  return (
    <FilterProviderWrapper>
      <HeaderStore />
      <FilterDrawer />
      <FilterByCollections />
      <ProductsGrid />
    </FilterProviderWrapper>
  );
}
