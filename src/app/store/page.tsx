import { Navbar } from "@/components/global";
import FilterProviderWrapper from "@/components/providers/filter-provider-wrapper";
import FilterByCollections from "@/components/views/store/filter-by-collections";
import FilterDrawer from "@/components/views/store/filter-drawer";
import HeaderStore from "@/components/views/store/header-store";
import ProductsGrid from "@/components/views/store/products-grid";

export default function StorePage() {
  return (
    <FilterProviderWrapper>
      <Navbar />
      <HeaderStore />
      <FilterDrawer />
      <FilterByCollections />
      <ProductsGrid />
    </FilterProviderWrapper>
  );
}
