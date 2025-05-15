import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { HeroSection } from "@/components/views/home";
import ProductsList from "@/components/views/home/products-list";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VelocityScroll numRows={1} defaultVelocity={-3} className="bg-zinc-900 py-4">
        <span className="tracking-widest text-rose-200">Nelly Collection</span>
      </VelocityScroll>
      <ProductsList />
    </>
  );
}
