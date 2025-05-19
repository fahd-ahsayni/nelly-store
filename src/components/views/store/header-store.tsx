import { Navbar } from "@/components/global";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeaderStore() {
  return (
    <section className="flex flex-col w-full overflow-hidden bg-rose-50/70">
      {/* Header */}
      <Navbar />
      <div className="py-4 px-3 lg:px-8 border-b border-zinc-800 flex justify-between items-center">
        <div className="flex gap-x-4 items-center max-w-lg">
          <Input placeholder="Search for a product" />
          <Button>Filter</Button>
          <Button variant="outline" className="bg-white">
            Sort By
          </Button>
        </div>
        <p className="mt-3 text-sm text-zinc-600 hidden lg:block">Showing 1–24 of 37 results</p>
      </div>
    </section>
  );
}
