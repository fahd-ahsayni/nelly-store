import { FilterByCollections, HeaderStore } from "@/components/views/store";

export default function page() {
  return (
    <>
      <HeaderStore />
      <FilterByCollections />
    </>
  );
}
