import { Navbar } from "@/components/global";
import FilterByCollections from "@/components/views/store/filter-by-collections";
import FilterDrawer from "@/components/views/store/filter-drawer";
import HeaderStore from "@/components/views/store/header-store";
import ProductsGrid from "@/components/views/store/products-grid";

export default function StorePage() {
  // With Zustand stores, we no longer need the FilterProviderWrapper
  // as stores are globally accessible
  return (
    <>
      <Navbar />
      <HeaderStore />
      <FilterDrawer />
      <div className="relative over-hidden">
        <FilterByCollections />
        <ProductsGrid />
      </div>
    </>
  );
}
