import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import {
  CollectionPerview,
  HeroSection,
  ProductsList,
} from "@/components/views/home";
import CtaOne from "@/components/views/home/cta-one";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VelocityScroll
        numRows={1}
        defaultVelocity={-3}
        className="bg-zinc-900 py-4"
      >
        <span className="tracking-widest text-rose-200 font-newyork">
          Nelly Collection
        </span>
      </VelocityScroll>
      <ProductsList />
      <CollectionPerview />
      <CtaOne />
    </>
  );
}
